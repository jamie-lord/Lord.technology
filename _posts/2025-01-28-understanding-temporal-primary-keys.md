---
date: 2025-01-28T13:00
title: Understanding Bitemporal Primary Keys
categories:
  - databases
---
Temporal databases just got more interesting. With PostgreSQL 18's upcoming support for bitemporal primary and foreign keys, we're seeing a fundamental shift in how databases handle time-aware data. Let's dive into why this matters and how it works.

## Beyond Simple Time Tracking

Most developers are familiar with basic temporal data - tracking when things change. But real-world scenarios often need to answer two distinct temporal questions:

1.  When was something true in reality? (Valid Time)
    
2.  When did we know about it? (System Time)
    

This is where bitemporal data comes in.

## The Bitemporal Difference

Imagine a bank's transaction system. A customer's balance isn't just about what it is now - it's about:

*   What was the balance at any given point? (Valid Time)
    
*   When did we record each change? (System Time)
    

A bitemporal primary key uniquely identifies records across both these dimensions, allowing queries like "What did we think the balance was last week for the period covering January?"

## Practical Implementation

In PostgreSQL 18, you'll be able to define bitemporal tables with both system and valid time dimensions:

```sql
CREATE TABLE accounts (
    account_id integer,
    balance decimal,
    valid_from timestamp,
    valid_until timestamp,
    system_time_start timestamp GENERATED ALWAYS AS ROW START,
    system_time_end timestamp GENERATED ALWAYS AS ROW END,
    PRIMARY KEY (account_id,
                PERIOD valid_time WITHOUT OVERLAPS,
                SYSTEM VERSIONING)
);
```

This ensures that:

*   No account has overlapping valid time periods
    
*   All changes are automatically versioned in system time
    
*   You can query the data as it was at any point in time
    

## Real-World Benefits

The advantages are significant:

*   **Audit Compliance**: Track not just what changed, but when you knew about it
    
*   **Historical Analysis**: Compare what you knew then vs what you know now
    
*   **Data Corrections**: Handle retroactive changes while preserving historical records
    
*   **Time-Travel Queries**: See the data as it appeared at any point in time
    

## Looking Forward

While bitemporal features have existed in some form in enterprise databases like DB2, PostgreSQL 18's implementation promises to make these capabilities more accessible and standardised. It's particularly exciting because it aligns with the SQL:2011 standard while adding practical improvements.

The addition of native bitemporal support means developers can finally handle complex temporal scenarios without resorting to custom implementations or application-level workarounds. Whether you're building financial systems, insurance applications, or any system where historical accuracy is crucial, these features provide a robust foundation for temporal data management.