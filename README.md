# Ctor
Ctor is a web-based software for construction companies. The platform allows planning and managing constructions. It is supposed to store all project documentation, the information about materials and vendors. At the same time Ctor provides roadmap development and workflow management for the architects and managers.Ctor shows current state of the building via dashboards and reports. Ctor is a B2B multi-tenant system and provides custom configuration per client.

## Navigation

`.azure` - Microsoft Azure related scripts

`.docker` - docker related scripts

`env.example` - environment variables per services

`backend` - Rest API service

`docs` - project documentation

`frontend` - Angular application

`scripts` - common scripts to build or deploy application

## Installation

- For backend setup see: [Backend](./backend/)

_Don't forget to fill in the **`.env`** file. Use the **`.env.example`** file as a reference._

- For frontend setup see: [Frontend](./frontend/)

_Don't forget to fill in the **`.env`** file. Use the **`.env.example`** file as a reference._

## Requirements

- [Node](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/)
- [.NET 6](https://dotnet.microsoft.com/en-us/download/dotnet/6.0)
- [PostgreSQL](https://www.postgresql.org/download/)

## Tools
_TBD_

## Git

### Status
- ![backend workflow](https://github.com/Radency/internship-2022-ctor/actions/workflows/backend-workflow.yml/badge.svg)
- ![frontend workflow](https://github.com/Radency/internship-2022-ctor/actions/workflows/frontend-workflow.yml/badge.svg)

### Branches
- `main` - release version.
- `dev` - development version.

### Branch example

`<type>/<num>-<title>`

- `bug/11-fix-spinner`
- `feat/15-add-user`
