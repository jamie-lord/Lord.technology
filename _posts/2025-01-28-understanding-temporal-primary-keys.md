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

## Update: Important Correction (24 November 2025)

**This post originally contained incorrect information about PostgreSQL 18's temporal features.** I apologise for the confusion this may have caused.

### What PostgreSQL 18 Actually Supports

PostgreSQL 18 implements **application time temporal constraints** (also known as valid time), not system versioning (system time). The `GENERATED ALWAYS AS ROW START/END` syntax shown in the original example is not supported in PostgreSQL 18.

What PostgreSQL 18 actually provides:

*   `WITHOUT OVERLAPS` for PRIMARY KEY and UNIQUE constraints
    
*   `PERIOD` for FOREIGN KEY constraints
    
*   Support for range types like `daterange` and `tstzrange`
    

### Corrected Example

Here's a working example of what PostgreSQL 18 actually supports:

```sql
CREATE EXTENSION btree_gist;

CREATE TABLE accounts (
    account_id integer,
    balance decimal,
    valid_period tstzrange NOT NULL,
    PRIMARY KEY (account_id, valid_period WITHOUT OVERLAPS)
);
```

This ensures that no account has overlapping valid time periods. You can track the valid time dimension (when something was true in reality), but PostgreSQL 18 does not automatically track system time (when changes were recorded in the database).

### Achieving True Bitemporal Support

For actual bitemporal support combining both valid time and system time, you'll need to use one of these approaches:

1.  **The periods extension** - Available at [github.com/xocolatl/periods](http://github.com/xocolatl/periods), which implements SQL:2011 system versioning
    
2.  **The temporal\_tables extension** - Available on PGXN, which provides system-versioned temporal tables through triggers
    
3.  **Manual implementation** using triggers and history tables
    

Whilst the temporal constraints in PostgreSQL 18 are valuable for preventing overlapping time periods, they represent a first step towards full temporal support rather than the complete bitemporal solution I originally described. I remain hopeful that system versioning support will be added in future PostgreSQL versions.

* * *