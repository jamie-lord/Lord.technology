---
date: 2025-06-24T20:00
title: Cloudflare Containers Changes Everything for Serverless Computing
categories:
  - cloudflare
---
Today marks a watershed moment for the serverless ecosystem. Cloudflare has launched Containers, and it fundamentally changes how we think about building applications at the edge. This isn't just another container platform—it's the missing piece that transforms Cloudflare's developer platform from impressive to genuinely revolutionary.

After spending time with the beta and analysing the architecture, I'm convinced this represents the most significant advancement in serverless computing since AWS Lambda's introduction. Here's why Containers matters, what it unlocks, and where it's heading.

## The Problem Containers Solves

Workers has been brilliant for JavaScript-based edge computing, but every developer eventually hits the walls. You need more memory, longer execution times, or you want to run Python, Go, or that legacy binary that's been powering your business for years. Previously, this meant choosing between Cloudflare's excellent developer experience and the flexibility you needed.

Containers eliminates this false choice entirely. It's not trying to replace Workers—it's completing the platform by handling everything Workers wasn't designed for, whilst maintaining the same deployment simplicity and global reach.

## A Fundamentally Different Approach

What makes Containers special isn't that it runs Docker images (plenty of platforms do that). It's the architectural decisions that make it feel like a natural extension of Workers rather than a separate service bolted on.

Every container instance is backed by a Durable Object, which means containers aren't just compute resources—they're programmable, addressable entities with their own routing logic and state management. You can spin up a container for a specific user session, pass it custom configuration, and know that subsequent requests will hit the same instance.

```javascript
export class MyContainer extends Container {
  defaultPort = 8080;
  sleepAfter = '10m';
  
  override onStart() {
    console.log('Container ready for user session');
  }
}
```

This is profound. Instead of containers being infrastructure you deploy separately, they become components in your Workers application that you control programmatically.

## The Unified Development Experience

The real magic happens when you see the full architecture working together. You can now build applications that seamlessly blend static assets, Workers functions, and containers in a single deployment:

Your static React frontend serves from the edge, your API routes run as Workers functions for low latency, and your video processing happens in containers with ffmpeg. All deployed with a single `wrangler deploy` command, all globally distributed, all scaling automatically.

This unified approach eliminates the complexity that usually comes with multi-service architectures. No API gateways to configure, no service meshes to maintain, no CORS issues between different domains. It's all just... there.

## Unlocking New Possibilities

The use cases emerging from the beta are fascinating and show the platform's potential:

**AI Code Execution**: [Coder.com](http://Coder.com) is using containers to run arbitrary user-generated code safely. Each chat session gets its own container sandbox, enabling AI agents to execute code, modify files, and interact with tools like git and package managers. The security isolation is built-in, and the automatic sleep functionality means resources are only used when needed.

**Interactive Development Environments**: [Val.town](http://Val.town) integrated the Deno Language Server running in containers to power their web-based code editor. WebSocket connections stream LSP messages between the browser and container, providing full IDE features like autocomplete and diagnostics. The durable object model ensures each user gets their own persistent language server instance.

**Legacy Application Modernisation**: Companies are lifting existing applications that require specific runtimes or system dependencies. Rails applications, legacy binaries, or tools that need a full Linux environment can now run globally without rewriting.

The creativity doesn't stop there. Developers are running full desktop environments accessed via VNC, processing media with ffmpeg, and executing AI training workloads. The constraint that sparked this creativity is simple: if it runs in a Linux container, it can run on Containers.

## Intelligent Global Distribution

Behind the scenes, Cloudflare pre-warms container images across their global network. When you request a new instance, the platform selects the optimal location based on proximity and capacity. Cold starts typically complete in 2-3 seconds, which is remarkable for full container boot times.

The billing model reinforces the serverless philosophy—you're charged in 10-millisecond increments for active usage. When containers sleep, the charges stop entirely. This makes high-utilisation possible even with sporadic traffic patterns.

## Current Limitations and Beta Reality

Containers is launching in beta with clear constraints. Total account limits of 40GB memory, 20 vCPUs, and 100GB disk space will constrain large-scale usage initially. Instance sizes top out at 4GB memory and half a vCPU, which rules out memory-intensive workloads for now.

The platform doesn't yet guarantee container and Durable Object co-location, which can add latency for some request patterns. Persistent disk storage isn't available, meaning containers start fresh each time. The autoscaling and load balancing features shown in the roadmap aren't yet implemented.

These aren't fundamental flaws—they're the natural constraints of a beta platform that will expand over time. The architectural foundations are sound, and the missing pieces are clearly planned.

## The Roadmap Ahead

The development roadmap addresses every current limitation whilst adding powerful new capabilities:

**Autoscaling and Load Balancing**: True stateless container scaling is coming, removing the need for manual instance management when you just want traditional server behaviour.

**Enhanced Integration**: Container-to-Worker calls will enable secure communication between services. R2 bucket mounting will provide object storage access as a filesystem. Hyperdrive integration will bring globally cached database connectivity.

**Expanded Capabilities**: Larger instance types will support more resource-intensive workloads. Exec functionality will enable programmatic container interaction beyond HTTP requests.

The vision is clear: make Containers feel as integrated and automatic as Workers whilst supporting any workload imaginable.

## Platform Synergy

The real excitement comes from understanding how Containers amplifies the entire Cloudflare platform. D1 databases can serve as shared state between containers and Workers. R2 storage becomes both a content delivery mechanism and a data processing pipeline. Workers AI can orchestrate container-based inference workloads.

This isn't just about running containers—it's about having a truly unified platform where every service enhances every other service. The architectural coherence is remarkable and increasingly rare in our fragmented cloud landscape.

## Looking Forward

Containers represents Cloudflare's completion of a full-stack edge computing platform. They've methodically built each layer—CDN, DNS, security, Workers, databases, storage, AI—and now containers provide the final piece for running any workload.

The implications extend beyond technical capabilities. This could reshape how we think about application architecture, moving us away from the traditional three-tier model towards edge-native designs that feel natural rather than forced.

We're likely seeing the early stages of a new computing paradigm where the global edge network becomes the primary deployment target rather than an optimisation layer. Containers makes this vision tangible and achievable.

The beta is available now for Workers Paid plan subscribers. The getting started experience is remarkably smooth—create a Worker, define a container class, write a Dockerfile, and deploy. The platform handles the rest.

For developers who've been waiting for serverless containers that actually feel serverless, that day has arrived. For those building the next generation of globally distributed applications, the tooling just became substantially more powerful.

Containers isn't just another product launch—it's the moment edge computing becomes genuinely universal.