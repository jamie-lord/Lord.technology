---
date: 2025-11-02T22:00
title: TikTok's payment service struggled at 100,000 queries per second until
  engineers rewrote critical APIs in Rust
categories:
  - programming
---
At exactly 100,000 queries per second, TikTok's payment service stopped being an engineering problem and became an economic one. The APIs fetching user balances and transaction statistics consumed so much CPU that continuing to scale horizontally meant spending hundreds of thousands on additional servers annually. The team faced a choice: keep optimising Go code that was already well-written, or rewrite the bottlenecks in Rust and risk everything that could go wrong.

They rewrote precisely three endpoints. Everything else - the business logic, integrations, operational tooling - stayed in Go. The Rust code doubled throughput, cut infrastructure costs by $300,000 yearly, and shipped within months. More remarkably, it worked.

## When microseconds become money

TikTok's payment platform was built sensibly. Go's simplicity let small teams ship quickly, its concurrency model handled I/O elegantly, and the ecosystem provided mature tooling. The language was designed exactly for this: web services waiting on networks and databases.

But as TikTok Live's audience grew, a handful of endpoints performing intensive serialisation and deserialisation began consuming disproportionate CPU. Not from poor code - from doing actual work. Heavy marshalling between formats, rapid allocation and deallocation, constant data structure manipulation. At 85,000 queries per second, the service buckled.

The team could scale horizontally. Add machines, spread the load, carry on. Except the arithmetic was clear: handling the traffic comfortably meant deploying hundreds of additional CPU cores. That translated to hundreds of thousands in annual cloud spending for the same functionality.

Here's what changed the calculation: they could identify exactly which code caused the spending. And that code represented perhaps 5% of their payment platform. The question wasn't "should we rewrite?" but "does spending engineering months on a selective rewrite cost less than the infrastructure we'll otherwise buy?"

## Why good enough stopped being good enough

Go's garbage collector is genuinely impressive. Concurrent, sub-100-microsecond pauses, barely perceptible. For most applications at most scales, it's invisible. But at 100,000 requests per second, even tiny pauses compound into measurable latency percentiles.

The deeper issue was runtime overhead. Go prioritises safety and developer productivity, which means the runtime does background work - memory management, goroutine scheduling, allocation tracking. For I/O-bound services, this overhead disappears into waiting time. For CPU-intensive serialisation, it becomes the bottleneck.

TikTok's team tried everything. Memory pooling with sync.Pool, allocation reduction, garbage collection tuning. The optimisations helped marginally. They'd hit the ceiling of what Go's design could deliver for this workload. The language wasn't failing - it was operating exactly as designed, solving problems Google faced in 2007. TikTok's scale in 2024 simply exceeded those design assumptions.

## The discipline that made it work

Software rewrite projects fail spectacularly. Netscape spent three years rebuilding their browser from scratch between versions 4 and 6, shipping nothing whilst Internet Explorer captured their market. Joel Spolsky's essay on why you should never rewrite code became gospel because the temptation is universal and the results catastrophic.

TikTok avoided disaster through ruthless scope discipline. They identified the exact bottleneck - three CPU-intensive endpoints. Everything else stayed in Go. The payment platform's business logic, system integrations, operational tooling - untouched. Only the hot paths got rewritten.

This violated every developer instinct. Engineers facing frustrating code naturally want to rebuild properly. The team resisted. They accepted their production system would remain polyglot: Go for logic, Rust for performance-critical paths. They wrote only what needed writing.

Then came validation. Before switching any traffic, they deployed the Rust service in shadow mode. For weeks, production requests went to both implementations. Every response was compared. Any discrepancy triggered investigation. This sounds obvious but represents something new: cloud infrastructure made running duplicate production systems cheap enough that the cost of parallel deployment became less than the risk of production bugs.

The results: 150,000 queries per second on hardware that gave Go 85,000. Another endpoint doubled from 105,000 to 210,000. CPU usage dropped 33%, memory 72%, 99th percentile latency improved 76%. The team calculated they could shed over 400 CPU cores. $300,000 in annual savings.

## How Rust eliminated the bottleneck

Rust's advantage is architectural. Where Go uses garbage collection, Rust enforces memory safety at compile time through its infamous borrow checker. No runtime overhead. Memory frees deterministically when variables go out of scope. No pauses, no background scanning, no allocation tracking.

Zero-cost abstractions matter here. Most languages force a choice between clear high-level code or fast low-level code. Rust's compiler optimises high-level constructs to machine code identical to hand-written implementations. Iterators, closures, generics - they compile away completely.

For TikTok's serialisation-heavy workload, this meant writing maintainable, type-safe code whilst achieving bare-metal performance. Copy-on-write data structures optimised down to raw memory operations. Type system enforcing correctness at compile time, not runtime. And crucially: Rust's ownership system eliminates allocation overhead entirely. The compiler knows when memory can be freed, removing the runtime tracking that consumed Go's CPU cycles.

## The pattern spreading across companies

Grab ran the identical playbook. Their Counter Service, processing tens of thousands of queries per second, needed 20 CPU cores in Go. The Rust rewrite needed 4.5 cores. Same workload, same functionality, 70% cost reduction.

The consistency reveals something. Both companies chose services with simple functionality but high traffic. Both rewrote selectively rather than optimising further. Both validated exhaustively before switching. Both kept the majority of their infrastructure unchanged. Both achieved not marginal improvements but multiple performance gains translating directly to infrastructure savings.

Discord, Dropbox, and others report similar patterns. Not 10% improvements - 30% to 70% cost reductions from surgical rewrites of specific bottlenecks. This isn't fashion. It's companies with operational sophistication identifying genuine problems, infrastructure to validate safely, and organisational discipline to limit scope.

A decade ago, "rewrite it in Rust" meant either premature optimisation or magical thinking. Today it means: we've identified the precise 5% of our system causing 50% of our costs, and we can migrate it without touching the rest.

## The decision framework that emerges

TikTok kept 95% of their payment platform in Go. That's the insight. For most applications at most scales, Go's productivity advantages win. Ship features quickly, maintain confidence in correctness, leverage mature tooling. But at 100,000 queries per second for CPU-intensive work, the calculation inverts. Infrastructure spending becomes visible enough that selective migration pays for itself within months.

The question isn't "which language is better?" but "at what scale do this language's trade-offs become economically wrong for this workload?" An I/O-bound API gateway can serve hundreds of thousands of requests per second in Go, Python, or Ruby because the bottleneck is network latency, not CPU. A service performing intensive computation or serialisation hits limits far sooner.

Selective migration solves what complete rewrites cannot. Full rewrites discard institutional knowledge - years of bug fixes, edge case handling, business logic refinements. They take so long that requirements shift mid-project. They prevent shipping features whilst the rewrite continues. Surgical rewrites preserve the system's core whilst optimising bottlenecks. You keep the knowledge, maintain shipping velocity, deliver results within quarters.

What's changing is where bottlenecks appear. The traditional approach - write code, measure, optimise algorithms and data structures - assumes the bottleneck is your code. At modern scales, language runtime overhead often dominates before algorithmic inefficiency does. TikTok's engineers couldn't optimise their Go code further without effectively reimplementing language features. At that point, using a language designed for different trade-offs makes economic sense.

This doesn't mean everyone should rewrite everything in Rust. Most applications never reach the scale where language choice matters economically. But for companies at substantial scale, selective migration represents a genuine tool. Optimise infrastructure costs without abandoning productivity benefits for the majority of your code. The wisdom lies in knowing precisely when and where that choice makes sense - and having the discipline to rewrite only what needs rewriting.