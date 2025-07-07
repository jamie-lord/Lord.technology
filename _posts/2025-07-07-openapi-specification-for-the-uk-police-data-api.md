---
date: 2025-07-07T15:00
title: OpenAPI Specification for the UK Police Data API
---
The UK government provides an excellent open data resource through [data.police.uk](https://data.police.uk/docs/), offering free access to street-level crime statistics, police force information, and neighbourhood policing details across England, Wales, and Northern Ireland. However, whilst the API documentation exists, there hasn't been a comprehensive OpenAPI specification available for developers who want to integrate this data into their applications.

I've created a complete OpenAPI 3.0.3 specification that covers all 22 available endpoints in the UK Police Data API. This specification provides a machine-readable description of every method, parameter, and response schema, making it much easier for developers to understand and implement the API in their projects.

## What's Included

The specification covers the full range of data available through the API. You can query street-level crime data within specific areas or around particular coordinates, access detailed information about police forces and their senior officers, and explore neighbourhood policing teams including their boundaries, upcoming events, and current priorities. The API also provides access to stop and search records and crime outcome data, giving a comprehensive view of policing activity.

The specification includes proper validation for all parameters, handles both GET and POST methods where complex polygon queries might exceed URL length limits, and documents all the various response formats and error conditions you might encounter.

## Why This Matters

Having a proper OpenAPI specification means developers can auto-generate client libraries, import the API directly into tools like Postman or Insomnia, and build applications with confidence knowing exactly what data structures to expect. It also makes the API more accessible to civic technologists, researchers, and journalists who want to analyse crime patterns or build community safety applications.

The UK Police Data API represents one of the most comprehensive open crime datasets available anywhere in the world. This specification should make it significantly easier for developers to put this valuable public data to good use.

You can play with the API immediatly by copying the OpenAPI specification into the [online Swagger editor](https://editor.swagger.io/) and executing some requests, no authentication required.

You can find the complete OpenAPI specification below, ready to use in your own projects or API development tools.

```
{
  "openapi": "3.0.3",
  "info": {
    "title": "UK Police Data API",
    "description": "Open data about crime and policing in England, Wales and Northern Ireland. The API provides access to street-level crime data, outcomes, police force information, neighbourhood details, and stop and search records.",
    "version": "1.0.0",
    "contact": {
      "name": "UK Police Data API",
      "url": "https://data.police.uk/contact/"
    },
    "license": {
      "name": "Open Government Licence",
      "url": "http://www.nationalarchives.gov.uk/doc/open-government-licence/"
    }
  },
  "servers": [
    {
      "url": "https://data.police.uk",
      "description": "Production server"
    }
  ],
  "paths": {
    "/api/forces": {
      "get": {
        "summary": "List all police forces",
        "description": "Returns a list of all police forces available via the API, excluding the British Transport Police.",
        "operationId": "getForces",
        "tags": ["Forces"],
        "responses": {
          "200": {
            "description": "List of police forces",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/ForceBasic"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/forces/{force}": {
      "get": {
        "summary": "Get specific police force details",
        "description": "Returns detailed information about a specific police force.",
        "operationId": "getForce",
        "tags": ["Forces"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier (e.g., 'leicestershire')",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Police force details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Force"
                }
              }
            }
          },
          "404": {
            "description": "Force not found"
          }
        }
      }
    },
    "/api/forces/{force}/people": {
      "get": {
        "summary": "Get senior officers for a force",
        "description": "Returns a list of senior officers for the specified police force.",
        "operationId": "getSeniorOfficers",
        "tags": ["Forces"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of senior officers",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Officer"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/neighbourhoods": {
      "get": {
        "summary": "List neighbourhoods for a force",
        "description": "Returns a list of neighbourhoods for the specified police force.",
        "operationId": "getNeighbourhoods",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of neighbourhoods",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/NeighbourhoodBasic"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/{neighbourhood}": {
      "get": {
        "summary": "Get specific neighbourhood details",
        "description": "Returns detailed information about a specific neighbourhood.",
        "operationId": "getNeighbourhood",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighbourhood",
            "in": "path",
            "required": true,
            "description": "Neighbourhood identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Neighbourhood details",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/Neighbourhood"
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/{neighbourhood}/boundary": {
      "get": {
        "summary": "Get neighbourhood boundary",
        "description": "Returns latitude/longitude pairs that make up the boundary of a neighbourhood.",
        "operationId": "getNeighbourhoodBoundary",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighbourhood",
            "in": "path",
            "required": true,
            "description": "Neighbourhood identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Neighbourhood boundary coordinates",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Coordinate"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/{neighbourhood}/events": {
      "get": {
        "summary": "Get neighbourhood events",
        "description": "Returns upcoming events for the specified neighbourhood.",
        "operationId": "getNeighbourhoodEvents",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighbourhood",
            "in": "path",
            "required": true,
            "description": "Neighbourhood identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of neighbourhood events",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Event"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/{neighbourhood}/priorities": {
      "get": {
        "summary": "Get neighbourhood priorities",
        "description": "Returns current and historical priorities for the specified neighbourhood.",
        "operationId": "getNeighbourhoodPriorities",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighbourhood",
            "in": "path",
            "required": true,
            "description": "Neighbourhood identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of neighbourhood priorities",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Priority"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/locate-neighbourhood": {
      "get": {
        "summary": "Find neighbourhood by location",
        "description": "Find which neighbourhood a latitude/longitude coordinate falls within.",
        "operationId": "locateNeighbourhood",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "q",
            "in": "query",
            "required": true,
            "description": "Latitude,longitude coordinate (e.g., '51.500617,-0.124629')",
            "schema": {
              "type": "string",
              "pattern": "^-?\\d+\\.\\d+,-?\\d+\\.\\d+$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Neighbourhood location",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/NeighbourhoodLocation"
                }
              }
            }
          }
        }
      }
    },
    "/api/crimes-street/{category}": {
      "get": {
        "summary": "Get street-level crimes",
        "description": "Returns crimes at street-level within a radius or custom area. Maximum of 10,000 crimes per request.",
        "operationId": "getStreetCrimes",
        "tags": ["Crimes"],
        "parameters": [
          {
            "name": "category",
            "in": "path",
            "required": true,
            "description": "Crime category (e.g., 'all-crime', 'burglary', 'violent-crime')",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "lat",
            "in": "query",
            "description": "Latitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "lng",
            "in": "query",
            "description": "Longitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "poly",
            "in": "query",
            "description": "Custom area as lat/lng pairs separated by colons (e.g., '52.268,0.543:52.794,0.238')",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of crimes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Crime"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request (invalid parameters or URL too long)"
          },
          "503": {
            "description": "Too many crimes in area (>10,000)"
          }
        }
      },
      "post": {
        "summary": "Get street-level crimes (POST)",
        "description": "Alternative POST method for complex polygon queries that exceed GET URL length limits.",
        "operationId": "getStreetCrimesPost",
        "tags": ["Crimes"],
        "parameters": [
          {
            "name": "category",
            "in": "path",
            "required": true,
            "description": "Crime category",
            "schema": {
              "type": "string"
            }
          }
        ],
        "requestBody": {
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "poly": {
                    "type": "string",
                    "description": "Custom area as lat/lng pairs"
                  },
                  "date": {
                    "type": "string",
                    "pattern": "^\\d{4}-\\d{2}$"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "List of crimes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Crime"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/crimes-at-location": {
      "get": {
        "summary": "Get crimes at a specific location",
        "description": "Returns crimes that occurred at a specific pre-defined location rather than within a radius.",
        "operationId": "getCrimesAtLocation",
        "tags": ["Crimes"],
        "parameters": [
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          },
          {
            "name": "lat",
            "in": "query",
            "description": "Latitude",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "lng",
            "in": "query",
            "description": "Longitude",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "location_id",
            "in": "query",
            "description": "Specific location ID",
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of crimes at location",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Crime"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/crimes-no-location": {
      "get": {
        "summary": "Get crimes with no location",
        "description": "Returns crimes reported by a force that have no location data.",
        "operationId": "getCrimesNoLocation",
        "tags": ["Crimes"],
        "parameters": [
          {
            "name": "category",
            "in": "query",
            "required": true,
            "description": "Crime category",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "force",
            "in": "query",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of crimes with no location",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Crime"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/crime-categories": {
      "get": {
        "summary": "Get crime categories",
        "description": "Returns a list of valid crime categories for a given date.",
        "operationId": "getCrimeCategories",
        "tags": ["Crimes"],
        "parameters": [
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of crime categories",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/CrimeCategory"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/crimes-street-dates": {
      "get": {
        "summary": "Get available crime data dates",
        "description": "Returns a list of available dates for crime data and which forces provide data for each date.",
        "operationId": "getCrimeStreetDates",
        "tags": ["Crimes"],
        "responses": {
          "200": {
            "description": "List of available dates",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/AvailableDate"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/crime-last-updated": {
      "get": {
        "summary": "Get last crime data update",
        "description": "Returns when the crime data was last updated.",
        "operationId": "getCrimeLastUpdated",
        "tags": ["Crimes"],
        "responses": {
          "200": {
            "description": "Last update information",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/LastUpdated"
                }
              }
            }
          }
        }
      }
    },
    "/api/outcomes-for-crime/{crime_id}": {
      "get": {
        "summary": "Get outcomes for a specific crime",
        "description": "Returns the outcomes (case history) for a specific crime by its 64-character identifier. Not available for Police Service of Northern Ireland.",
        "operationId": "getOutcomesForCrime",
        "tags": ["Outcomes"],
        "parameters": [
          {
            "name": "crime_id",
            "in": "path",
            "required": true,
            "description": "64-character crime identifier",
            "schema": {
              "type": "string",
              "minLength": 64,
              "maxLength": 64
            }
          }
        ],
        "responses": {
          "200": {
            "description": "Crime with outcomes",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/CrimeWithOutcomes"
                }
              }
            }
          },
          "404": {
            "description": "Crime not found"
          }
        }
      }
    },
    "/api/outcomes-at-location": {
      "get": {
        "summary": "Get outcomes at location",
        "description": "Returns outcomes at street-level within a radius or custom area. Maximum of 10,000 outcomes per request.",
        "operationId": "getOutcomesAtLocation",
        "tags": ["Outcomes"],
        "parameters": [
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          },
          {
            "name": "lat",
            "in": "query",
            "description": "Latitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "lng",
            "in": "query",
            "description": "Longitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "poly",
            "in": "query",
            "description": "Custom area as lat/lng pairs",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "location_id",
            "in": "query",
            "description": "Specific location ID",
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of outcomes",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/Outcome"
                  }
                }
              }
            }
          },
          "503": {
            "description": "Too many outcomes in area (>10,000)"
          }
        }
      }
    },
    "/api/stops-street": {
      "get": {
        "summary": "Get stop and searches by area",
        "description": "Returns stop and search records within a radius or custom area.",
        "operationId": "getStopsStreet",
        "tags": ["Stop and Search"],
        "parameters": [
          {
            "name": "lat",
            "in": "query",
            "description": "Latitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "lng",
            "in": "query",
            "description": "Longitude for point-based search",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "poly",
            "in": "query",
            "description": "Custom area as lat/lng pairs separated by colons (e.g., '52.278,0.563:52.794,0.238')",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of stop and search records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/StopAndSearch"
                  }
                }
              }
            }
          },
          "400": {
            "description": "Bad request (invalid parameters or URL too long)"
          }
        }
      },
      "post": {
        "summary": "Get stop and searches by area (POST)",
        "description": "Alternative POST method for complex polygon queries that exceed GET URL length limits.",
        "operationId": "getStopsStreetPost",
        "tags": ["Stop and Search"],
        "requestBody": {
          "content": {
            "application/x-www-form-urlencoded": {
              "schema": {
                "type": "object",
                "properties": {
                  "poly": {
                    "type": "string",
                    "description": "Custom area as lat/lng pairs"
                  },
                  "date": {
                    "type": "string",
                    "pattern": "^\\d{4}-\\d{2}$"
                  }
                }
              }
            }
          }
        },
        "responses": {
          "200": {
            "description": "List of stop and search records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/StopAndSearch"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/stops-at-location": {
      "get": {
        "summary": "Get stop and searches at location",
        "description": "Returns stop and search records at a specific location.",
        "operationId": "getStopsAtLocation",
        "tags": ["Stop and Search"],
        "parameters": [
          {
            "name": "location_id",
            "in": "query",
            "description": "Specific location ID",
            "schema": {
              "type": "integer"
            }
          },
          {
            "name": "lat",
            "in": "query",
            "description": "Latitude",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "lng",
            "in": "query",
            "description": "Longitude",
            "schema": {
              "type": "number",
              "format": "double"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of stop and search records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/StopAndSearch"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/{force}/{neighbourhood}/people": {
      "get": {
        "summary": "Get neighbourhood team members",
        "description": "Returns a list of team members for the specified neighbourhood.",
        "operationId": "getNeighbourhoodTeam",
        "tags": ["Neighbourhoods"],
        "parameters": [
          {
            "name": "force",
            "in": "path",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "neighbourhood",
            "in": "path",
            "required": true,
            "description": "Neighbourhood identifier",
            "schema": {
              "type": "string"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of neighbourhood team members",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/TeamMember"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/stops-no-location": {
      "get": {
        "summary": "Get stop and searches with no location",
        "description": "Returns stop and search records that could not be mapped to a location.",
        "operationId": "getStopsNoLocation",
        "tags": ["Stop and Search"],
        "parameters": [
          {
            "name": "force",
            "in": "query",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of stop and search records with no location",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/StopAndSearchNoLocation"
                  }
                }
              }
            }
          }
        }
      }
    },
    "/api/stops-force": {
      "get": {
        "summary": "Get stop and searches by force",
        "description": "Returns stop and search records reported by a specific police force.",
        "operationId": "getStopsForce",
        "tags": ["Stop and Search"],
        "parameters": [
          {
            "name": "force",
            "in": "query",
            "required": true,
            "description": "Force identifier",
            "schema": {
              "type": "string"
            }
          },
          {
            "name": "date",
            "in": "query",
            "description": "Date in YYYY-MM format",
            "schema": {
              "type": "string",
              "pattern": "^\\d{4}-\\d{2}$"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "List of stop and search records",
            "content": {
              "application/json": {
                "schema": {
                  "type": "array",
                  "items": {
                    "$ref": "#/components/schemas/StopAndSearch"
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  "components": {
    "schemas": {
      "ForceBasic": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Force identifier"
          },
          "name": {
            "type": "string",
            "description": "Force name"
          }
        },
        "required": ["id", "name"]
      },
      "Force": {
        "allOf": [
          {
            "$ref": "#/components/schemas/ForceBasic"
          },
          {
            "type": "object",
            "properties": {
              "description": {
                "type": "string",
                "description": "Force description"
              },
              "url": {
                "type": "string",
                "format": "uri",
                "description": "Force website URL"
              },
              "engagement_methods": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/EngagementMethod"
                }
              },
              "telephone": {
                "type": "string",
                "description": "Contact telephone number"
              }
            }
          }
        ]
      },
      "EngagementMethod": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri"
          },
          "description": {
            "type": "string"
          },
          "title": {
            "type": "string"
          }
        }
      },
      "Officer": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Officer name"
          },
          "rank": {
            "type": "string",
            "description": "Officer rank"
          },
          "bio": {
            "type": "string",
            "description": "Officer biography"
          },
          "contact_details": {
            "type": "object",
            "description": "Contact information"
          }
        },
        "required": ["name", "rank"]
      },
      "NeighbourhoodBasic": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Neighbourhood identifier"
          },
          "name": {
            "type": "string",
            "description": "Neighbourhood name"
          }
        },
        "required": ["id", "name"]
      },
      "Neighbourhood": {
        "allOf": [
          {
            "$ref": "#/components/schemas/NeighbourhoodBasic"
          },
          {
            "type": "object",
            "properties": {
              "url_force": {
                "type": "string",
                "format": "uri",
                "description": "Force-specific neighbourhood URL"
              },
              "contact_details": {
                "type": "object",
                "description": "Contact information"
              },
              "centre": {
                "$ref": "#/components/schemas/Coordinate"
              },
              "locations": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Location"
                }
              },
              "links": {
                "type": "array",
                "items": {
                  "$ref": "#/components/schemas/Link"
                }
              },
              "description": {
                "type": "string",
                "description": "Neighbourhood description"
              },
              "population": {
                "type": "string",
                "description": "Population figure"
              }
            }
          }
        ]
      },
      "NeighbourhoodLocation": {
        "type": "object",
        "properties": {
          "force": {
            "type": "string",
            "description": "Force identifier"
          },
          "neighbourhood": {
            "type": "string",
            "description": "Neighbourhood identifier"
          }
        },
        "required": ["force", "neighbourhood"]
      },
      "Coordinate": {
        "type": "object",
        "properties": {
          "latitude": {
            "type": "string",
            "description": "Latitude coordinate"
          },
          "longitude": {
            "type": "string",
            "description": "Longitude coordinate"
          }
        },
        "required": ["latitude", "longitude"]
      },
      "Location": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string"
          },
          "address": {
            "type": "string"
          },
          "postcode": {
            "type": "string"
          },
          "telephone": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "description": {
            "type": "string"
          }
        }
      },
      "Link": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "format": "uri"
          },
          "description": {
            "type": "string"
          },
          "title": {
            "type": "string"
          }
        }
      },
      "Event": {
        "type": "object",
        "properties": {
          "title": {
            "type": "string",
            "description": "Event title"
          },
          "description": {
            "type": "string",
            "description": "Event description"
          },
          "address": {
            "type": "string",
            "description": "Event address"
          },
          "type": {
            "type": "string",
            "description": "Event type"
          },
          "start_date": {
            "type": "string",
            "format": "date-time",
            "description": "Event start date and time"
          },
          "end_date": {
            "type": "string",
            "format": "date-time",
            "description": "Event end date and time"
          }
        }
      },
      "Priority": {
        "type": "object",
        "properties": {
          "issue": {
            "type": "string",
            "description": "Priority issue description"
          },
          "action": {
            "type": "string",
            "nullable": true,
            "description": "Action taken"
          },
          "issue-date": {
            "type": "string",
            "format": "date-time",
            "description": "Date issue was raised"
          },
          "action-date": {
            "type": "string",
            "format": "date-time",
            "nullable": true,
            "description": "Date action was taken"
          }
        }
      },
      "Crime": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "Crime ID"
          },
          "category": {
            "type": "string",
            "description": "Crime category"
          },
          "persistent_id": {
            "type": "string",
            "description": "Persistent crime identifier (64 characters)"
          },
          "location": {
            "$ref": "#/components/schemas/CrimeLocation"
          },
          "context": {
            "type": "string",
            "description": "Additional context"
          },
          "month": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}$",
            "description": "Month in YYYY-MM format"
          },
          "location_type": {
            "type": "string",
            "description": "Type of location"
          },
          "location_subtype": {
            "type": "string",
            "description": "Location subtype"
          },
          "outcome_status": {
            "$ref": "#/components/schemas/OutcomeStatus"
          }
        },
        "required": ["id", "category", "location", "month"]
      },
      "CrimeLocation": {
        "type": "object",
        "properties": {
          "latitude": {
            "type": "string",
            "description": "Latitude coordinate"
          },
          "longitude": {
            "type": "string",
            "description": "Longitude coordinate"
          },
          "street": {
            "$ref": "#/components/schemas/Street"
          }
        },
        "required": ["latitude", "longitude", "street"]
      },
      "Street": {
        "type": "object",
        "properties": {
          "id": {
            "type": "integer",
            "description": "Street ID"
          },
          "name": {
            "type": "string",
            "description": "Street name"
          }
        },
        "required": ["id", "name"]
      },
      "OutcomeStatus": {
        "type": "object",
        "nullable": true,
        "properties": {
          "category": {
            "type": "string",
            "description": "Outcome category"
          },
          "date": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}$",
            "description": "Outcome date in YYYY-MM format"
          }
        }
      },
      "CrimeCategory": {
        "type": "object",
        "properties": {
          "url": {
            "type": "string",
            "description": "Category URL identifier"
          },
          "name": {
            "type": "string",
            "description": "Category display name"
          }
        },
        "required": ["url", "name"]
      },
      "AvailableDate": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}$",
            "description": "Available date in YYYY-MM format"
          },
          "stop-and-search": {
            "type": "array",
            "items": {
              "type": "string"
            },
            "description": "Forces providing stop and search data"
          }
        },
        "required": ["date"]
      },
      "LastUpdated": {
        "type": "object",
        "properties": {
          "date": {
            "type": "string",
            "format": "date-time",
            "description": "Last update timestamp"
          }
        }
      },
      "CrimeWithOutcomes": {
        "type": "object",
        "properties": {
          "crime": {
            "$ref": "#/components/schemas/Crime"
          },
          "outcomes": {
            "type": "array",
            "items": {
              "$ref": "#/components/schemas/OutcomeDetail"
            }
          }
        }
      },
      "Outcome": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/OutcomeCategory"
          },
          "date": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}$",
            "description": "Outcome date"
          },
          "person_id": {
            "type": "string",
            "nullable": true,
            "description": "Person identifier"
          },
          "crime": {
            "$ref": "#/components/schemas/Crime"
          }
        }
      },
      "OutcomeDetail": {
        "type": "object",
        "properties": {
          "category": {
            "$ref": "#/components/schemas/OutcomeCategory"
          },
          "date": {
            "type": "string",
            "pattern": "^\\d{4}-\\d{2}$",
            "description": "Outcome date"
          },
          "person_id": {
            "type": "string",
            "nullable": true,
            "description": "Person identifier"
          }
        }
      },
      "OutcomeCategory": {
        "type": "object",
        "properties": {
          "code": {
            "type": "string",
            "description": "Outcome category code"
          },
          "name": {
            "type": "string",
            "description": "Outcome category name"
          }
        }
      },
      "TeamMember": {
        "type": "object",
        "properties": {
          "name": {
            "type": "string",
            "description": "Team member name"
          },
          "rank": {
            "type": "string",
            "description": "Team member rank"
          },
          "bio": {
            "type": "string",
            "description": "Team member biography"
          },
          "contact_details": {
            "type": "object",
            "description": "Contact information"
          }
        },
        "required": ["name", "rank"]
      },
      "StopAndSearch": {
        "type": "object",
        "properties": {
          "age_range": {
            "type": "string",
            "description": "Age range of person stopped"
          },
          "officer_defined_ethnicity": {
            "type": "string",
            "nullable": true,
            "description": "Officer-defined ethnicity"
          },
          "self_defined_ethnicity": {
            "type": "string",
            "description": "Self-defined ethnicity"
          },
          "gender": {
            "type": "string",
            "description": "Gender"
          },
          "legislation": {
            "type": "string",
            "nullable": true,
            "description": "Legislative power used"
          },
          "object_of_search": {
            "type": "string",
            "description": "What was being searched for"
          },
          "outcome": {
            "type": "string",
            "description": "Outcome of search"
          },
          "outcome_object": {
            "$ref": "#/components/schemas/OutcomeObject"
          },
          "outcome_linked_to_object_of_search": {
            "type": "boolean",
            "nullable": true,
            "description": "Whether outcome was linked to object of search"
          },
          "datetime": {
            "type": "string",
            "format": "date-time",
            "description": "Date and time of stop and search"
          },
          "operation": {
            "type": "boolean",
            "nullable": true,
            "description": "Whether part of a police operation"
          },
          "operation_name": {
            "type": "string",
            "nullable": true,
            "description": "Name of the police operation"
          },
          "involved_person": {
            "type": "boolean",
            "description": "Whether a person was involved"
          },
          "removal_of_more_than_outer_clothing": {
            "type": "boolean",
            "description": "Whether more than outer clothing was removed"
          },
          "location": {
            "$ref": "#/components/schemas/CrimeLocation"
          },
          "type": {
            "type": "string",
            "description": "Type of search"
          }
        }
      },
      "StopAndSearchNoLocation": {
        "allOf": [
          {
            "$ref": "#/components/schemas/StopAndSearch"
          },
          {
            "type": "object",
            "properties": {
              "location": {
                "nullable": true,
                "description": "Location is null for records with no location"
              }
            }
          }
        ]
      },
      "OutcomeObject": {
        "type": "object",
        "properties": {
          "id": {
            "type": "string",
            "description": "Outcome ID"
          },
          "name": {
            "type": "string",
            "description": "Outcome name"
          }
        }
      }
    }
  },
  "tags": [
    {
      "name": "Forces",
      "description": "Police force information and senior officers"
    },
    {
      "name": "Neighbourhoods",
      "description": "Neighbourhood policing teams, boundaries, events and priorities"
    },
    {
      "name": "Crimes",
      "description": "Street-level crime data and categories"
    },
    {
      "name": "Outcomes",
      "description": "Crime outcomes and case histories"
    },
    {
      "name": "Stop and Search",
      "description": "Stop and search records"
    }
  ]
}
```