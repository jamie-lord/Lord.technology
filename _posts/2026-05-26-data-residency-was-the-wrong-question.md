---
date: 2026-05-26T17:30
title: Data residency was the wrong question
categories:
  - policy
tags:
  - sovereignty
  - cloud
  - cloud-act
---
The Dutch government [today blocked](https://www.politico.eu/article/netherlands-blocks-us-takeover-vital-digital-supplier/) Kyndryl's acquisition of Solvinity, the IT company that operates DigiD. DigiD is the digital identity system roughly fourteen million Dutch citizens use to file their tax returns, book GP appointments, and pay municipal bills. The block came under the Act on Undesirable Control in Telecommunications, WOZT in Dutch, on advice from the Investment Screening Bureau. The Authority for Consumers and Markets had cleared the deal in February on competition grounds. The veto came from a separate sovereignty review that had been running in parallel the whole time.

This is the first time a European government has used a dedicated sovereignty mechanism to block a US acquisition of a domestic digital infrastructure operator. The precedent matters more than the deal.

For a decade, data sovereignty has effectively meant data residency. Where do the bytes physically live, which region of which hyperscaler holds them, can the European customer get a contractual commitment that data does not leave the EU. The Dutch decision says that question was never the relevant one. The relevant question is who owns the company holding the bytes, because under the US CLOUD Act of 2018 American authorities can compel a US-headquartered company to produce data regardless of where in the world the data physically sits.

A US-owned Solvinity running DigiD in Dutch data centres on Dutch hardware would still be a US-owned company. The data sitting in Amsterdam would not change that. The legislation has been on the books for years. What is new is the political appetite to use it on a deal the competition authority had already cleared.

## Why this is not just a Dutch story

The UK has the National Security and Investment Act 2021, which gives the Cabinet Office screening powers across seventeen sectors including communications and data infrastructure. Germany has the Außenwirtschaftsverordnung. France has Décret 2014-479, expanded in 2019. Every large European member state has a sovereign-investment screening regime now. Until today, almost every high-profile use of those regimes was a Chinese acquirer in semiconductors or robotics being waved away from the door. The Solvinity block is the first time the same screening logic has been pointed at an American buyer, against a target whose technical role any solution architect would recognise as routine.

Solvinity runs a managed cloud platform for the Dutch government. They do middleware, identity, hosting, the same work any large managed-services provider does for any government. There is nothing about Solvinity that makes it categorically different from the providers UK government departments use, the ones German Länder use, or the integrators French ministries hire. If WOZT applies to Solvinity, then NSIA applies to any equivalent UK firm, and the same logic applies right up the stack to the hyperscalers themselves.

## Operator nationality is now a first-class procurement question

For solution architects working with European public sector clients, the operator's nationality is now a first-class concern in the way data location used to be. This is not a hypothetical compliance risk. The Dutch government has just demonstrated that an established Dutch operator with Dutch staff, Dutch data centres, and Dutch contractual terms can still be vetoed at the corporate parent layer if the parent becomes American.

That changes what the procurement conversation looks like. A managed service running on Azure, AWS, GCP, or Cloudflare is unremarkable while the operating company sits in the country buying the service. The moment the operating company is acquired by, or already belongs to, a US parent, the same managed service is reviewable under the local sovereign-investment regime regardless of where the workload sits. Contract terms, hosting region, and encryption all sit downstream of that decision. Only the corporate ownership of the operator addresses it.

I work with Cloudflare frequently. I [wrote a book](https://architectingoncloudflare.com/) earlier this year arguing more teams should. Cloudflare is also US-headquartered. So is Microsoft, Amazon, Google, Kyndryl, IBM. The list of credible non-US-headquartered managed-cloud providers fits comfortably on a Post-it note. Anyone proposing one of those vendors to a European government client now has to explain, in writing, why the WOZT-equivalent in the buyer's jurisdiction does not apply to the proposed arrangement. The honest answer is usually that the workload is not yet critical enough to invite review. That is not the basis to build a five-year procurement on.

## What the block does and does not solve

The Dutch veto is not a turn against US technology. Kyndryl will continue to operate in the Netherlands and Solvinity will continue to run DigiD under its existing ownership. The acquisition does not happen, but commerce does. The block is a narrow, surgical use of an existing screening regime to keep a specific category of national infrastructure out of US ownership.

It is also not the end of the matter. The Dutch parliament has been pushing since April to move DigiD operations away from Solvinity entirely, on the grounds that the next acquisition attempt could come from any direction. The block stops this deal. It does not solve the underlying problem of a private operator running the national identity system. The sovereignty regimes were never designed to address that. Solving it is the rest of this decade's work.

For the rest of us, the takeaway is narrower. If you are advising a European client on a multi-year cloud arrangement, ownership of the operator is the question to ask first. Residency comes after. The EU-hosted footprint of a US company has been sold as a sovereignty defence for a decade. It is not one.
