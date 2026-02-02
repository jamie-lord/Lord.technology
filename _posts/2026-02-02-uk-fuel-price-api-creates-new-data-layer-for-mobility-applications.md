---
date: 2026-02-02T22:00
title: UK Fuel Price API creates new data layer for mobility applications
categories:
  - gov
---
The UK government's Fuel Finder service, which launched on 2 February 2026, mandates that petrol stations report price changes within 30 minutes. For organisations building navigation, fleet management, or price comparison applications, this represents the first authoritative real-time data source for UK fuel pricing. The practical value depends entirely on enforcement, which appears designed to be lenient.

## What the service provides

Fuel Finder offers three access methods: a CSV download updated twice daily, email subscription alerts, and a REST API requiring OAuth 2.0 authentication. The data includes current retail prices by fuel type, forecourt details including address and operator, site amenities and opening hours, and timestamps for each price update.

The API is available to anyone, from commercial developers to individual hobbyists, through [GOV.UK](http://GOV.UK) One Login authentication. This openness contrasts with the previous landscape where comprehensive fuel pricing required either crowdsourced data (often days or weeks stale) or commercial agreements with aggregators.

## The enforcement problem

The compliance framework reveals more than the technical specification. According to the government's published enforcement approach, the process begins only when the aggregator notices a price discrepancy. Stations then receive multiple opportunities to rectify without penalty. Each step appears to allow roughly 30 days for response, meaning five months could pass before financial penalties become possible. Even then, the regulator 'may' impose a penalty rather than 'will'.

This structure suggests the government prioritised adoption over accuracy. Small independent stations, which lack technical staff to integrate APIs, can report by phone. The practical result will likely be a two-tier data quality system: large chains with automated reporting and high accuracy, smaller independents with manual processes and inconsistent compliance.

The current CSV contains only around 650 rows, far short of the UK's estimated 8,000 petrol stations. A three-month grace period for compliance means the data will remain incomplete until at least May 2026.

## Why this matters for platform builders

The strategic value lies not in the government's own CSV but in what this enables for third-party applications. Navigation apps like Waze already display fuel prices, but rely on crowdsourced data that users frequently report as outdated. Fleet management systems have historically needed commercial data feeds of variable quality. Fuel comparison applications have operated with incomplete coverage.

An authoritative government-mandated data source changes the competitive dynamics. Applications that previously differentiated on data quality will need to find new advantages as the baseline improves. Conversely, applications that avoided fuel pricing due to data reliability concerns may now find integration worthwhile.

For fleet operators, the decision calculus depends on scale. A logistics company routing hundreds of vehicles daily could optimise fuel stops algorithmically once reliable real-time pricing exists. The savings compound: 3p per litre across 50 litres per vehicle across 200 vehicles equals £300 per fill-up cycle, or potentially tens of thousands annually. But this only works if the data is trustworthy, which the enforcement framework does not guarantee.

## The economic reality of fuel price hunting

The mathematics of fuel price hunting rarely favour the consumer. Driving 20 minutes each way to save 5p per litre on 30 litres yields roughly 85p in net savings after accounting for fuel consumed. Over 30 years of weekly trips, that totals approximately £1,275 saved against 62.5 days of waking hours spent. At that rate, the driver implicitly values their time at £1.28 per hour.

This arithmetic explains why the API's primary value is not enabling consumers to drive further for cheaper fuel. It is enabling applications to identify the cheapest option among stations already on a driver's route. The time cost of a routing deviation measured in seconds is trivial; measured in 20-minute detours it is irrational.

For businesses, the equation differs. A courier service does not value driver time at £1.28 per hour, but route optimisation that adds five minutes to deliver meaningful fuel savings could still prove worthwhile when multiplied across thousands of daily journeys.

## Precedent from other markets

Western Australia has operated a similar scheme, Fuelwatch, for approximately 30 years. Germany's Markttransparenzstelle für Kraftstoffe requires stations to report prices, with Google Maps displaying the results directly. The private APIs that surface German fuel pricing draw from this government-mandated data source. The UK is following an established model rather than innovating.

The Australian experience suggests these systems do contribute to price competition, though the effect is difficult to isolate from other market factors. What they demonstrably achieve is eliminating information asymmetry. Motorway service stations in the UK currently charge roughly 20% more than nearby alternatives, a premium sustained partly by drivers' uncertainty about where cheaper options exist. Transparent pricing makes that premium visible.

## What to watch

Three factors will determine whether Fuel Finder becomes genuinely useful data infrastructure or remains an incomplete compliance exercise.

First, major chain adoption rates over the next 90 days. If Tesco, Sainsbury's, Asda, and the major fuel brands integrate automated reporting, the data will cover the majority of UK fuel sales regardless of independent station compliance.

Second, third-party application integration. Google Maps, Waze, and Apple Maps incorporating this data would reach more consumers than any government interface. Whether they choose to integrate, and how quickly, will determine the scheme's practical impact.

Third, the first enforcement actions. If the government demonstrates willingness to penalise non-compliance, data quality will improve. If the lenient framework results in zero penalties through 2026, stations will correctly conclude that compliance is optional.

The underlying data infrastructure is sound. The question is whether the surrounding incentive structure will populate it with accurate information.