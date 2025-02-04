---
date: 2025-02-04T13:00
title: What is Cloudflare Workers Analytics Engine?
categories:
  - cloudflare
---
Time-series databases are hardly new, but [Cloudflare's Workers Analytics Engine](https://developers.cloudflare.com/analytics/analytics-engine/) offers an intriguing twist on the traditional approach. After diving into its technical documentation and architecture, I found some fascinating design choices worth exploring – particularly around how it handles high-cardinality data at scale.

## The Cardinality Challenge

Traditional time-series databases often struggle when data has high cardinality - imagine tracking metrics per user across millions of users. Each new dimension (like adding device type or country) multiplies the problem. You typically end up choosing between expensive storage, slow queries, or dropping data dimensions entirely.

This is where Workers Analytics Engine takes an interesting departure from conventional approaches. Rather than trying to solve the cardinality problem through brute force or compromise, it embraces statistical sampling as a fundamental design principle.

## The Core Innovation: Embracing Sampling

Most analytics systems treat sampling as a last resort – something you enable when your queries become too slow or your storage costs spiral. Workers Analytics Engine instead builds sampling into its fundamental design, using a clever two-tiered approach:

1.  Write-time sampling uses an "equitable sampling" strategy based on index values. If you're tracking per-customer metrics, for instance, high-volume customers get sampled more aggressively than low-volume ones. This ensures you maintain visibility across your entire customer base rather than letting your largest customers dominate the dataset.
    
2.  Read-time sampling implements what they call "Adaptive Bit Rate Sampling" – similar to how video streaming adjusts quality based on bandwidth. Queries spanning longer time ranges automatically use higher sampling rates to maintain consistent query times.
    

This dual-sampling approach is particularly elegant because it solves different problems: write-time sampling handles cardinality explosions, while read-time sampling ensures query performance.

## The Data Model

The system uses a straightforward but effective data model:

*   Events contain up to 20 string fields ("blobs") for dimensions
    
*   Up to 20 numeric fields ("doubles") for metrics
    
*   A single "index" field for partitioning and sampling
    
*   Automatic timestamps
    

What's notable here is the constraints: you can't do JOINs, there's a single index field, and you can't guarantee exact event sequences. These limitations might seem harsh, but they enable the system to make strong performance guarantees.

## Real-world Applications

The sweet spot for this architecture is high-volume, high-cardinality metrics where statistical accuracy is sufficient. Think:

*   Per-customer API usage tracking
    
*   Feature adoption metrics across user segments
    
*   Performance monitoring with high-dimensional data
    
*   Cost attribution in multi-tenant systems
    

What's particularly clever is how the pricing model aligns with the architecture: you pay separately for writes and reads, encouraging you to think carefully about your data model and query patterns.

## The Edge Computing Angle

The tight integration with Cloudflare Workers isn't just convenience – it's part of a broader trend toward processing analytics closer to where data originates. Traditional architectures often require shipping all raw events to a central location for processing. Here, you can sample and aggregate at the edge, potentially reducing both costs and latency.

## Technical Tradeoffs

The system makes some opinionated choices that won't suit everyone:

*   3-month retention limit
    
*   No complex joins or multi-table queries
    
*   Cannot reconstruct exact event sequences
    
*   Single index field for sampling control
    
*   25 data points per Worker invocation limit
    

But these limitations enable some valuable guarantees:

*   Predictable query performance regardless of data volume
    
*   Consistent sampling across high-cardinality dimensions
    
*   No sudden performance cliffs as data grows
    

The constraints are carefully chosen to prevent resource abuse while maintaining practical utility. For instance, while the system limits you to 25 data points per Worker invocation, this translates to a theoretical maximum of around 25,000 points per second per Worker instance - more than sufficient for most use cases while preventing runaway resource usage. Similarly, the 5KB blob size limit and 96-byte index limit ensure efficient data packing without significantly constraining real-world use cases.

## Broader Implications

What's fascinating here is how this design challenges some common assumptions in analytics systems. Rather than promising exact answers, it explicitly embraces statistical approximation while providing clear guarantees about performance and resource usage.

This approach might well influence future analytics system designs, particularly as we deal with ever-increasing data volumes and cardinality. The key insight isn't just using sampling – it's making sampling a core architectural principle rather than an optimisation technique.

## When to Use It

Workers Analytics Engine is worth considering when:

*   You need to track metrics across high-cardinality dimensions
    
*   Statistical accuracy is sufficient
    
*   Query performance predictability is crucial
    
*   You're already using or considering Cloudflare Workers
    

It's probably not suitable when:

*   You need exact event counts or sequences
    
*   Your queries require complex joins
    
*   You need retention beyond three months
    
*   You require raw event access
    

## Conclusion

What makes Workers Analytics Engine interesting isn't any single feature, but rather how it combines sampling theory, edge computing, and time-series database design into a coherent whole. It's a thoughtful example of how making the right tradeoffs can lead to elegant solutions for specific problems.

While it won't replace general-purpose analytics systems, it's a fascinating example of how constraints and careful design choices can create something genuinely useful. As we continue to generate more data at the edge, this kind of specialised analytics architecture may become increasingly relevant.