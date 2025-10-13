---
date: 2025-10-13T23:00
title: The Deliberate Constraints of MCP Elicitation
categories:
  - ai
---
AI systems need to interact with the world. They need to read files, query databases, call APIs, and access services that require credentials, configuration, and context. The Model Context Protocol emerged to standardise how AI models connect to these resources through "servers"—services that expose tools, data sources, and capabilities to AI applications.

But here's the problem: these servers often need information they don't have. An MCP server providing GitHub integration needs your username. A database server requires connection strings. A deployment tool needs to know which environment you're targeting. The AI can request these tools, but the server lacks the context to execute them.

This creates an architectural challenge that's genuinely new. Traditional APIs assume the caller knows what parameters to provide. REST endpoints document their requirements upfront. GraphQL schemas define every possible query. But when an AI agent autonomously decides to use a tool, neither the agent nor the server necessarily has all the required information. Someone needs to ask the human.

MCP's elicitation feature solves this through a deliberately constrained design that reveals something fundamental about building protocols for AI systems. The choices it makes—and those it refuses to make—create a framework where simplicity enables adoption rather than limiting it.

## The User-in-the-Loop Problem

Picture an AI assistant helping you deploy an application. It has access to an MCP server that can interact with your cloud infrastructure. The assistant decides it needs to create a new database instance. The server has the capability, but it needs to know: which region, what instance size, what backup schedule?

The traditional solution would be a configuration file. Define everything upfront in YAML or JSON, reference it when needed. But this breaks the conversational flow. Users expect to chat with an AI that handles details contextually, not stop mid-conversation to edit configuration files.

Another approach: the AI could guess. Use sensible defaults, pick a random region, choose the smallest instance size. This works until it doesn't—until the AI deploys production infrastructure in the wrong continent or provisions resources that cost more than expected.

Elicitation offers a third path. The MCP server can pause execution, request specific information from the user through the client, and continue once it receives a response. The AI agent initiated the workflow, but the human retains control over critical decisions.

The interaction looks like this: the server sends an `elicitation/create` request containing a message explaining what it needs and a JSON schema defining the expected data structure. The client—the application hosting the AI, whether Claude Desktop, an IDE, or a custom interface—presents this request to the user. The user provides the information (or declines), and the server continues processing with that context.

This creates a new kind of protocol interaction. It's not synchronous request-response where the caller has all parameters. It's not asynchronous messaging where responses arrive later. It's collaborative execution where the human, the AI, and the server negotiate through structured exchanges.

## Why Flat Schemas Win

Here's where MCP makes its most interesting design choice. JSON Schema can describe almost any data structure imaginable: nested objects, arrays, conditional fields, recursive types. MCP elicitation permits none of this. Schemas must be flat objects containing only primitives.

```json
{
  "type": "object",
  "properties": {
    "region": {
      "type": "string",
      "enum": ["us-east-1", "eu-west-1", "ap-southeast-2"],
      "title": "Deployment Region"
    },
    "instanceType": {
      "type": "string",
      "pattern": "^db\\.[a-z0-9]+\\.[a-z]+$",
      "title": "Database Instance Type"
    },
    "backupRetentionDays": {
      "type": "integer",
      "minimum": 1,
      "maximum": 35,
      "default": 7
    }
  },
  "required": ["region", "instanceType"]
}
```

String properties with optional length limits, patterns, and format validators. Numbers with bounds. Booleans. Enumerations. That's the complete vocabulary.

This constraint isn't a temporary limitation awaiting future expansion. It's the entire point. A flat schema maps directly to a form. Every client supporting elicitation needs to build form rendering logic exactly once, then it works for every possible elicitation request.

The alternative—supporting full JSON Schema—would create an implementation barrier that most client developers wouldn't cross. Building a complete schema renderer handles conditional fields, dynamic properties, nested validation rules, and array manipulation. That's weeks of development for a feature that might be used occasionally.

By making the simple case trivial and the complex case impossible, MCP ensures the simple case actually gets implemented. This isn't dumbing down the protocol. It's recognising that protocol adoption depends on implementation tractability.

## Three Responses, Not Two

Most protocols distinguish between success and failure. MCP elicitation defines three states: accept, decline, and cancel.

Accept means the user explicitly approved and provided data. The response includes a `content` field matching the requested schema.

Decline signals deliberate rejection. The user understood the request and chose not to provide information. Perhaps they don't have the credentials, or they don't trust the server, or they want to use a different approach.

Cancel indicates dismissal without decision. The user closed the dialogue, pressed Escape, or was interrupted. They didn't engage enough to form an opinion.

This distinction matters because it captures user intent more precisely than binary success/failure. A cancelled request might warrant a retry with clearer explanation—maybe the user didn't understand what was being asked. A declined request means the server needs to respect that decision or fundamentally reconsider its approach.

Consider an MCP server requesting API credentials. If the user cancels, showing the prompt again with a help link makes sense. If they explicitly decline, repeatedly asking becomes harassment. The server might need to offer alternative authentication methods or explain why the credentials matter.

The three-action model acknowledges that human interaction is messier than success/failure binaries. People get distracted, change their minds, and need time to find information. Protocols that capture this nuance enable better user experiences.

## What's Not Allowed

The security section of the specification contains a critical constraint: servers must not request sensitive information through elicitation. This isn't a suggestion. It's a boundary declaration about what elicitation is designed to handle.

Elicitation is for configuration parameters and operational choices, not authentication credentials or secrets. Those require purpose-built flows with appropriate security controls, audit logs, and encryption. By explicitly excluding sensitive data from elicitation's scope, MCP prevents servers from building ad-hoc credential collection through a general-purpose mechanism.

This reflects a broader principle about protocol design: the most dangerous features are those flexible enough to be misused. If elicitation supported complex nested schemas, servers would inevitably use it for things it wasn't designed to handle. Password collection forms. Credit card entry. Multi-step authentication flows. By the time security vulnerabilities emerged, these patterns would be entrenched across the ecosystem.

The flat schema constraint makes these misuses awkward enough that developers build proper solutions instead. Complex authentication flows can't be shoehorned into simple forms. Servers must use dedicated authentication mechanisms, which can be designed with security requirements in mind.

## The Cost of Simplicity

Nothing comes free. Servers needing multiple related pieces of information face awkward choices. Send separate elicitation requests for each parameter, interrupting the user repeatedly? Or compress everything into a single flat object where choices might be interdependent?

A server configuring cloud infrastructure might need region, instance type, storage options, and networking configuration. Ideally, selecting a region would filter available instance types. Choosing an instance type would suggest appropriate storage configurations. But flat schemas don't support dynamic field behaviour.

MCP forces these scenarios into separate requests or complex single forms. This creates friction, but it's intentional friction that pushes complex configuration toward dedicated tools rather than inline protocol requests. Just as HTTP's stateless design makes shopping carts inconvenient, leading to proper session management, elicitation's constraints shape how developers build configuration experiences.

## Why Constraints Enable Adoption

Protocols that survive aren't those with the most features. They're those that can be implemented correctly by teams who haven't memorised the specification. REST succeeded because developers grasp its concepts quickly. GraphQL gained adoption because its query language feels familiar to anyone who's written SQL.

MCP elicitation follows this philosophy. The entire feature fits in your head: servers request flat objects conforming to simple schemas, clients render appropriate interfaces, users choose to accept, decline, or cancel. A development team can implement basic support in a day and iteratively improve form rendering and validation.

The alternative—supporting full JSON Schema with nested objects, conditional validation, and dynamic fields—would make elicitation more powerful and less implemented. Every client team would face the same decision: invest weeks building a complete schema renderer or skip elicitation entirely. Most would skip it, fragmenting the ecosystem.

By constraining what's possible, MCP makes implementation tractable for a broader range of clients. This trades theoretical expressiveness for practical adoption. It's the same trade-off that made HTTP ubiquitous despite being inefficient, and REST popular despite being opinionated about architecture.

The lesson extends beyond MCP. When designing protocols for AI systems—where agents make autonomous decisions but humans retain authority—simplicity matters more than flexibility. The goal isn't building a protocol that can handle every scenario. It's building one that gets implemented consistently, enabling an ecosystem where servers and clients interoperate reliably.

That's not a limitation. That's architecture working as intended.