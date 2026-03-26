# Arnav Dixit Portfolio

A modern portfolio website for **Arnav Dixit**, built to showcase real work across **SharePoint Online**, **SPFx**, **React**, **Power Automate**, **Microsoft Graph**, and broader **Microsoft 365 intranet solutions**.

## Live Website

**https://arnav-my-porfolio.uk/**

## Overview

This portfolio presents my work as a **SharePoint & SPFx Developer** with a strong focus on:

- modern SharePoint Online intranets
- custom SPFx solutions
- reusable React-based UI components
- Power Automate workflows
- Microsoft Graph and REST API integrations
- responsive, polished Microsoft 365 experiences

The site includes a featured case study for **Tawasol – Revamp Intranet Portal**, a gallery of project screens, selected project work, experience highlights, a resume section, and direct contact options.

## Featured Work

### Tawasol – Revamp Intranet Portal
**Sep 2025 – Current**

A modern SharePoint Online intranet revamp built to centralize news, events, policies, forms, dashboards, and collaboration tools in one branded digital workplace.

**Stack used:**
- SharePoint Online
- SPFx
- PnP JS
- PnP PowerShell
- Microsoft Graph API
- REST APIs
- Power BI
- SCSS
- Amplitude Analytics

### Additional Highlighted Projects

#### GlobalOne News Hub
**Sep 2024 – Sep 2025**

A multi-country, multilingual intranet news portal built to centralize corporate news and deliver role- and country-targeted content through one enterprise hub.

#### MetaPort – Internal Travel Desk
**Jun 2023 – Aug 2024**

An internal travel management solution for travel requests, approvals, itineraries, reminders, and coordinator workflows using SharePoint, Canvas Apps, and Power Automate.

#### Custom SharePoint Solutions at Teceon
**May 2023 – Sep 2025**

Delivered client-specific SharePoint solutions including custom web parts, forms, permissions, integrations, and workflow-driven business modules.

## Core Skills Highlighted on the Site

- SharePoint Online
- SPFx
- React
- TypeScript
- JavaScript
- Tailwind CSS / SCSS / CSS
- Power Automate
- Canvas Apps
- Dataverse Basics
- Microsoft Graph
- REST APIs
- PnP JS
- PnP PowerShell
- Power BI
- ShareGate

## Site Sections

- Hero
- About
- Skills
- Featured Work
- Gallery
- Projects
- Experience
- Resume
- Contact

## Key UI / UX Features

- responsive layout for desktop and mobile
- sticky header with section navigation
- mobile navigation drawer
- smooth scroll between sections
- scroll-reveal animation for content blocks
- gallery cards with image viewer modal
- hover-enhanced project and skill cards
- protected phone reveal interaction
- downloadable resume section

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **JavaScript / JSX**

## Project Structure

```text
src/
  components/
    cards/
    common/
    layout/
    modals/
    sections/
  data/
    portfolioData.js
    tawasolGallery.js
  hooks/
  utils/
  App.jsx
  main.jsx
  index.css
```

## Running the Project Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## Content Management

Most portfolio content is maintained through the data layer:

- `src/data/portfolioData.js` for profile details, skills, featured work, projects, and experience
- `src/data/tawasolGallery.js` for gallery items and image mappings

This keeps the UI components cleaner and makes future content updates easier.

## Deployment

The site is deployed on **Netlify** and currently live at:

**https://arnav-my-porfolio.uk/**

For new production deployments:

```bash
npm run build
```

Then deploy the generated `dist` folder to Netlify, or push updated code if the repository is connected to Netlify for automatic builds.

## Contact

**Arnav Dixit**  
**SharePoint & SPFx Developer**  
**Location:** Gurugram, Haryana  
**Email:** dixitarnav20@gmail.com  
**LinkedIn:** https://www.linkedin.com/in/arnav-dixit-5a5870148/  
**GitHub:** https://github.com/arnav2404

## License

This repository is intended for personal portfolio use and professional showcase purposes. Please do not reuse the full design, content, or branding as-is without permission.
