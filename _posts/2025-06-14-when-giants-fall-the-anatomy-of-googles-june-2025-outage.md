---
date: 2025-06-14T16:00
title: When Giants Fall - The Anatomy of Google's June 2025 Outage
categories:
  - programming
---
On 12 June 2025, Google Cloud Platform experienced what can only be described as a catastrophic failure that brought down not only their own services but cascaded across the internet, taking Cloudflare, numerous third-party applications, and countless businesses offline for nearly three hours. As someone who has spent years working with cloud architecture, reading Google's incident report left me genuinely stunned—not by the complexity of the failure, but by its sheer preventability.

## The Technical Breakdown

The [root cause](https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW) was startlingly simple: a null pointer exception in Service Control, Google's API management and policy enforcement system. Here's what happened:

On 29 May, Google deployed new quota policy checking code to Service Control. This code lacked two fundamental safeguards: proper error handling and feature flag protection. The deployment went through their standard region-by-region rollout, but the problematic code path was never exercised because it required specific policy data to trigger.

Two weeks later, on 12 June, someone inserted a policy change into their regional Spanner tables containing "unintended blank fields." Due to the global nature of quota management, this metadata replicated globally within seconds. When Service Control attempted to process these policies, the blank fields caused a null pointer dereference, sending the binaries into a crash loop worldwide.

The cascading failure was swift and merciless. Within two minutes, Site Reliability Engineering teams were investigating. Within ten minutes, they'd identified the root cause and began deploying their "red-button" fix. But the damage was done—and in larger regions like us-central-1, a thundering herd effect overwhelmed infrastructure as services attempted to restart, extending the outage to nearly three hours.

## The Process Failures

What makes this incident particularly damning is the catalogue of basic engineering failures that enabled it:

**Inadequate Error Handling**: In 2025, allowing null pointer exceptions to crash critical infrastructure services represents a fundamental failure of defensive programming. The fact that this code made it to production without proper null checking is bewildering.

**Missing Feature Flags**: Google's own Site Reliability Engineering literature emphasises the importance of feature flags for gradual rollouts. Yet this critical change deployed without any such protection, making it impossible to isolate the blast radius when things went wrong.

**Absent Exponential Backoff**: When services began restarting, they lacked proper randomised exponential backoff, creating a thundering herd that prolonged the outage. This is infrastructure engineering 101.

**Global Policy Replication**: Perhaps most critically, policy changes replicated globally within seconds without any staging or validation. This meant that a single malformed configuration could—and did—take down their entire global infrastructure instantaneously.

## The Broader Implications

This wasn't a novel distributed systems problem or an edge case that only manifests at Google's scale. This was a collection of rookie mistakes that would have been caught by standard engineering practices at most competent organisations.

The incident highlights a disturbing trend in big tech engineering culture. We've seen similar patterns across the industry—CrowdStrike's kernel crash from improper input validation, Facebook's BGP self-lockout, AWS's cascading storage failures. These aren't sophisticated technical challenges; they're basic engineering hygiene failures.

What's particularly concerning is that Google literally wrote the book on Site Reliability Engineering. Their own documentation covers precisely these failure modes and their prevention. Yet their own critical infrastructure apparently doesn't follow their own published best practices.

## The Human Element

The discussion on social platforms revealed another troubling aspect: the casual acceptance of these failures as inevitable. Comments about "vibe coding" and AI-generated code suggest an industry that's prioritising velocity over reliability, output over quality.

Google's workforce has been significantly reduced through layoffs whilst simultaneously being asked to deliver more features faster. When management signals that speed trumps safety, these outcomes become predictable. The pressure to ship features "yesterday" creates environments where fundamental safeguards get skipped.

## Architectural Lessons

From an architectural perspective, this incident illuminates several critical principles:

**Fail Gracefully**: Critical services must be designed to degrade gracefully rather than catastrophically fail. A quota service should allow requests to proceed with default policies rather than blocking all traffic when it can't make policy decisions.

**Staged Rollouts for Everything**: The distinction between "code changes" and "configuration changes" proved meaningless here. Any change that can affect system behaviour must be rolled out gradually with proper validation at each stage.

**Circuit Breaker Patterns**: Proper circuit breakers could have limited the blast radius, allowing unaffected regions to continue operating whilst the problematic region was isolated and recovered.

**Dependency Management**: The incident demonstrates how quickly failures can cascade across seemingly independent systems. Cloudflare's dependence on Google Cloud for Workers KV meant that a Google outage became a broader internet outage.

## The Status Page Debacle

Almost as damaging as the technical failure was Google's communication breakdown. Their status page remained green for nearly an hour whilst their infrastructure burned. When your own status reporting system depends on the infrastructure that's failing, you've created a perfect storm of customer confusion and lost trust.

The fact that Firebase's status page was acknowledging the outage whilst Google Cloud's showed everything as normal suggests either deliberate obfuscation or system design so poor that they couldn't report on their own failures.

## Looking Forward

Google's incident response plan includes some sensible remediation:

*   Modularising Service Control architecture to isolate failure domains
    
*   Enforcing feature flags for all critical binary changes
    
*   Improving static analysis and testing practices
    
*   Implementing proper exponential backoff patterns
    
*   Ensuring monitoring infrastructure remains operational during outages
    

These are all reasonable steps, but they're also things that should have been in place already. The fact that they weren't suggests deeper cultural and process issues that go beyond this single incident.

## The Trillion-Dollar Mistake

Tony Hoare famously called null references his "billion-dollar mistake." Given the scale of this outage—affecting not just Google's services but cascading across the global internet—we might need to update that figure. The economic impact of a three-hour outage affecting millions of businesses and users worldwide likely exceeds that threshold by some margin.

More importantly, this incident represents a failure of institutional memory and engineering discipline. Google has dealt with these exact failure modes before. They've written extensively about preventing them. Yet here we are, watching the same preventable mistakes play out on a global stage.

## Conclusion

The June 2025 Google Cloud outage serves as a sobering reminder that even the most sophisticated organisations are vulnerable to basic engineering failures. More troubling, it suggests that the industry's pursuit of rapid feature delivery may be undermining the foundational engineering practices that keep critical infrastructure reliable.

As architects and engineers, we must resist the pressure to skip fundamental safeguards in favour of speed. Feature flags, proper error handling, gradual rollouts, and defensive programming aren't optional niceties—they're the bedrock upon which reliable systems are built.

The most successful companies in our industry will be those that maintain engineering discipline whilst scaling rapidly. Those that sacrifice reliability for velocity may find themselves explaining to the world how a single null pointer brought down significant portions of the internet.

In an era where our digital infrastructure increasingly resembles critical utilities, we simply cannot afford this level of preventable failure. The stakes are too high, and the engineering knowledge to prevent these incidents is too well-established to excuse their occurrence.

Google will recover from this incident, implement their remediation plans, and likely prevent this specific failure mode from recurring. But until the industry as a whole recommits to engineering fundamentals over feature velocity, we'll continue to see these preventable catastrophes play out on an increasingly global stage.