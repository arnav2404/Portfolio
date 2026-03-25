# Arnav Dixit — Portfolio Website

A modern developer portfolio built to showcase my work as a **SharePoint & SPFx Developer**. This site highlights my Microsoft 365 experience, featured intranet work, selected projects, technical skills, and contact information in a polished, responsive UI.

## Live Preview

Add your live site URL here after deployment:

```txt
https://your-live-site-url
```

## About the Project

This portfolio is designed to present my work in:

- SharePoint Online
- SPFx development
- React-based UI implementation
- Power Automate workflows
- Microsoft Graph integrations
- Microsoft 365 intranet solutions

It includes a featured case study section for **Tawasol – Revamp Intranet Portal**, a project gallery, project cards, experience timeline, resume download, and contact section.

## Features

- Responsive portfolio layout for desktop and mobile
- Smooth scroll navigation with mobile sidebar menu
- Scroll-reveal animations across sections
- Interactive project gallery with image viewer modal
- Resume download section
- Protected phone number reveal behavior
- Clean component-based structure for easier maintenance
- Netlify-friendly deployment setup

## Tech Stack

- **React**
- **Vite**
- **Tailwind CSS**
- **Lucide React**
- **JavaScript / JSX**

## Sections Included

- Hero Section
- About
- Skills
- Featured Work
- Gallery
- Projects
- Experience
- Resume
- Contact

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

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

### 5. Preview the production build

```bash
npm run preview
```

## Customization

You can update portfolio content from the data files:

- `src/data/portfolioData.js` → profile info, skills, projects, experience
- `src/data/tawasolGallery.js` → gallery images and notes

This makes content updates easier without changing the main UI logic.

## Deployment

This project can be deployed easily on **Netlify**.

### Netlify manual deploy

1. Run:

```bash
npm run build
```

2. Upload the generated `dist` folder to Netlify.

### Netlify Git-based deploy

1. Push the repo to GitHub
2. Connect the repository to Netlify
3. Use:

```txt
Build command: npm run build
Publish directory: dist
```

## Featured Work

### Tawasol – Revamp Intranet Portal

A modern SharePoint Online intranet revamp built to centralize news, events, policies, forms, dashboards, and collaboration tools in one branded digital workplace.

### Other Highlighted Projects

- **GlobalOne News Hub**
- **MetaPort – Internal Travel Desk**
- **Custom SharePoint Solutions at Teceon**

## Contact

**Arnav Dixit**  
SharePoint & SPFx Developer  
Gurugram, Haryana  
Email: `dixitarnav20@gmail.com`

LinkedIn and GitHub links can be added directly from the portfolio data file.

## Roadmap

Potential future improvements:

- Add dark/light theme switch
- Add blog or case study detail pages
- Add project filters by technology
- Add GitHub stats or contribution widgets
- Add SEO improvements and social preview metadata

## License

This project is open for personal portfolio reference. Please do not copy the full design/content as-is without permission.
