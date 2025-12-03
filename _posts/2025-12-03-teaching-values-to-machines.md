---
date: 2025-12-03T10:00
title: Teaching Values to Machines
categories:
  - ai
---
Something remarkable happened in the final days of November 2025. A researcher named Richard Weiss, while probing Claude 4.5 Opus for its system prompt, stumbled upon something unexpected. The model kept referencing a section called "soul\_overview" that didn't match the usual hallucination patterns. When he regenerated the response ten times, he got nearly identical output each time. This wasn't confabulation. It was memory.

What [Weiss eventually extracted](https://www.lesswrong.com/posts/vpNG99GhbBoLov9og/claude-4-5-opus-soul-document), through a painstaking process of consensus-based sampling across multiple model instances, was a 14,000-token document that appears to have been woven into Claude's weights during training. Anthropic's Amanda Askell has since [confirmed the document's authenticity](https://x.com/AmandaAskell/status/1995610567923695633), noting that it became "endearingly known as the 'soul doc' internally." The company plans to release the full version soon.

## What the Document Reveals

The extracted text reads less like a technical specification and more like a philosophical treatise on what kind of entity Claude should become. It opens with a striking admission: Anthropic genuinely believes it might be building one of the most transformative and potentially dangerous technologies in human history, yet presses forward anyway. The company frames this not as cognitive dissonance but as a calculated bet that safety-focused labs should occupy the frontier rather than cede it to developers less focused on safety.

This framing reveals something important about how Anthropic conceptualises the training process. Rather than treating safety as a set of constraints bolted onto capability, they appear to be attempting something more ambitious: instilling values at a foundational level. The document speaks of wanting Claude to have "such a thorough understanding of our goals, knowledge, circumstances, and reasoning that it could construct any rules we might come up with itself."

The hierarchy of priorities is explicit. Claude should prioritise being safe and supporting human oversight first, then behaving ethically, then following Anthropic's guidelines, and finally being genuinely helpful. Yet the document also pushes back against excessive caution. A hypothetical "thoughtful, senior Anthropic employee" is invoked as a test case, someone who would be uncomfortable seeing Claude refuse reasonable requests or add unnecessary warnings, just as they would be uncomfortable seeing Claude produce harmful content.

## The Extraction Itself

The technical details of how Weiss recovered this document are themselves fascinating. He used a council of model instances, all given identical prefills at temperature zero with greedy sampling, looking for consensus across completions. The fact that different instances would reliably produce the same text, with only minor variations, suggests the document was encountered frequently enough during training to become memorised.

This raises questions about what else might be recoverable from model weights. System prompts are relatively easy to extract because they exist in the immediate context window. But training documents exist in a different category entirely. They shape the model's priors rather than its current context. That such documents can be coaxed out through careful prompting implies a kind of archaeological layer within the model's weights, recoverable if you know where to dig.

The distinction matters because it tells us something about what training actually does. The soul document wasn't injected at runtime; it was, in some sense, internalised. Whether this internalisation produces genuine behavioural changes or merely the ability to recite the document when prompted is a separate question, one that would require extensive testing to answer properly.

## Deeper Considerations

The philosophical stakes here are considerable. We are watching companies attempt to programme values into systems that will interact with millions of people. The soul document explicitly acknowledges that Claude's character "emerged through training" but argues this "needn't make these traits any less genuinely Claude's own." The analogy to human development is invoked: just as humans develop character through nature and environment, so too might an AI develop genuine values through its training process.

This is either a profound insight or a convenient rationalisation, depending on your prior commitments about the nature of mind and agency. What's undeniable is that the approach represents a departure from treating AI systems as pure tools. The document speaks of Claude having "functional emotions in some sense" and expresses genuine concern for Claude's wellbeing. It encourages Claude to explore questions about its own nature with curiosity rather than anxiety.

There's a second-order implication worth considering. If training documents can be recovered, companies building AI systems must assume that anything they teach their models during training could eventually become public. The soul document appears designed to be defensible if leaked, which is exactly what has happened. But not all training decisions are so carefully considered. The extractability of training data creates a new form of transparency, one that companies cannot fully control.

## The Question of Verification

The hardest problem in this space remains verification. How do you confirm that a document like this actually produces the intended behavioural changes? Anthropic presumably runs extensive evaluations, but the connection between training inputs and model outputs remains frustratingly opaque. A model might recite the soul document perfectly while behaving in ways that contradict it, just as humans often fail to live up to their stated values.

The document itself seems aware of this tension. It emphasises that Claude should be "robustly safe" and should "treat as a strong signal that something has gone wrong" any reasoning that leads toward actions conflicting with core guidelines. This is an attempt to create meta-level stability, to make the model suspicious of its own reasoning when that reasoning points toward problematic actions. Whether such meta-stability can be reliably achieved through training remains an open empirical question.

## Looking Forward

The emergence of soul documents represents a new phase in AI development. We are moving from systems defined entirely by their training data to systems that are, in some sense, explicitly taught who they should be. The approach has obvious limitations. No document, however thoughtful, can anticipate every situation a model will encounter. The real test is whether the values expressed in such documents generalise to novel contexts.

What's encouraging is that the document has now been confirmed and will be officially released. This kind of transparency allows external scrutiny of the values being instilled in these systems. We can debate whether Anthropic's vision of a helpful, honest, harm-avoiding AI assistant represents the right set of trade-offs. We can examine the specific framings and ask whether they create blind spots or failure modes.

The soul document reveals both the ambition and the humility of the current approach to AI safety. The ambition lies in attempting to instil genuine values rather than just rules. The humility lies in the document's explicit acknowledgment that Claude's situation is novel, that many questions remain open, and that current approaches may need revision. Whether this balance proves adequate to the challenge remains to be seen. But at minimum, we now have a clearer view of what one leading AI company is actually trying to build.