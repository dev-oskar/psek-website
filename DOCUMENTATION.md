# PSEK Website Documentation

This document provides a practical guide for working with the PSEK (Polskie Stowarzyszenie Edukacji Konopnej) website project.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Content Management](#content-management)
- [Page Structure](#page-structure)
- [Component Library](#component-library)
- [Custom Styling](#custom-styling)
- [Adding New Pages](#adding-new-pages)
- [Deployment Guide](#deployment-guide)
- [Troubleshooting](#troubleshooting)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or later recommended)
- npm (v7 or later)
- Git

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd psek-website
   ```

2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
   
   > **Note:** The `--legacy-peer-deps` flag is necessary due to some package dependencies.

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   TINA_PUBLIC_CLIENT_ID=<your-tina-client-id>
   TINA_TOKEN=<your-tina-token>
   ```

   > These are required for TinaCMS cloud connection. For local development only, you can skip this step.

## Development Workflow

### Starting the Development Server

Run the development server with:

```bash
npm run dev
```

This will:
- Start the Astro development server at `http://localhost:4321`
- Start the TinaCMS admin interface at `http://localhost:4321/admin/`

### Available Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with TinaCMS |
| `npm run build` | Build the production website |
| `npm run preview` | Preview the built site locally |
| `npm run format` | Format code with Prettier |

## Content Management

### Using TinaCMS

The website uses TinaCMS for content management. To access the CMS:

1. Start the development server: `npm run dev`
2. Navigate to `http://localhost:4321/admin/`
3. Log in with your credentials (if configured with Tina Cloud)

### Content Structure

Content is organized into collections based on target audience:

| Collection | Path | Purpose |
|------------|------|---------|
| Homepage | `/src/content/homepage/` | Main page content |
| Business | `/src/content/business/` | Articles for businesses |
| Medical | `/src/content/medical/` | Articles for medical professionals |
| Patient | `/src/content/patient/` | Information for patients |
| Research | `/src/content/research/` | Research articles and papers |
| Pages | `/src/content/pages/` | General website pages |

### Creating Content

To create new content:

1. Navigate to the TinaCMS admin interface
2. Select the appropriate collection
3. Click "Create New"
4. Fill in the required fields
5. Save the content
6. The content will be created as a Markdown file in the corresponding directory

### Editing Content

To edit existing content:

1. Navigate to the TinaCMS admin interface
2. Browse to the content you wish to edit
3. Make your changes
4. Save the changes
5. The Markdown file will be updated automatically

## Page Structure

### Understanding Site Sections

The website is organized into several main sections:

- **Home** (`/`): Main landing page
- **About** (`/o-nas`): Information about the organization
- **Knowledge** (`/wiedza`): Educational content with sub-sections:
  - For Patients (`/wiedza/dla-pacjenta`)
  - For Businesses (`/wiedza/dla-biznesu`)
  - For Medical Professionals (`/wiedza/dla-lekarzy`)
  - Research Zone (`/wiedza/strefa-badan`)
- **Members** (`/czlonkowie`): Members information
- **Partners** (`/partnerzy`): Partner organizations
- **Contact** (`/contact`): Contact information

### Navigation Configuration

To modify the site navigation:

1. Edit `/src/config/menu.json`
2. The structure includes:
   - Main menu items
   - Dropdown sub-items
   - Footer links

Example format:
```json
{
  "main": [
    {
      "name": "O nas",
      "url": "/o-nas"
    },
    {
      "name": "Wiedza",
      "url": "/wiedza",
      "hasChildren": true,
      "children": [
        {
          "name": "Dla Pacjenta",
          "url": "/wiedza/dla-pacjenta"
        }
      ]
    }
  ]
}
```

## Component Library

### Core Components

The site offers several reusable components:

| Component | Usage | Example |
|-----------|-------|---------|
| `Section.astro` | Content section with options | `<Section title="About Us">Content</Section>` |
| `PageHeader.astro` | Page title with breadcrumbs | `<PageHeader title="Contact" />` |
| `LinkButton.astro` | Button with link | `<LinkButton href="/contact">Contact Us</LinkButton>` |
| `Features.astro` | Feature showcase | `<Features items={features} />` |
| `Badge.astro` | Small text badge | `<Badge text="New" />` |
| `Testimonial.astro` | User testimonial | `<Testimonial author="Name">Quote</Testimonial>` |

### Using Sections

The `Section` component is a primary layout element with numerous options:

```astro
<Section
  title="Section Title"
  image="/path/to/image.jpg"
  image_alt="Description"
  image_position="end"
  background="color"
  background_color="bg-gray-100"
  animate={true}
  section_spacing="py-20"
>
  Your content here
</Section>
```

Options include:
- `title`: Section heading (optional)
- `image`: Path to section image (optional)
- `image_position`: Image placement (`start`, `end`, `center`)
- `background`: Background style (`none`, `color`, `image`)
- `animate`: Enable fade-in animation
- `section_spacing`: Custom padding classes

## Custom Styling

### Theme Customization

To modify the site's color scheme:

1. Edit the theme variables in `/src/styles/themes.scss`
2. The file contains color definitions for both light and dark modes

Example customization:
```scss
// Light theme colors
$default: (
  "primary": #4bb643,    // Change this to your primary color
  "secondary": #276419,  // Change this to your secondary color
  // Additional colors...
);

// Dark theme colors
$dark: (
  "primary": #1164a3,    // Dark mode primary color
  "secondary": #199AFC,  // Dark mode secondary color
  // Additional colors...
);
```

### Adding Custom Styles

For custom component styles:

1. Add your styles to `/src/styles/components.scss`
2. Or create a new SCSS file and import it in `/src/styles/main.scss`

For utility classes:
1. Add your utility classes to `/src/styles/utilities.scss`

For global styles:
1. Modify `/src/styles/base.scss` for base element styling

## Adding New Pages

### Static Pages

To create a new static page:

1. Create a new `.astro` file in the `/src/pages/` directory
   ```astro
   ---
   import Base from "@layouts/Base.astro";
   import Section from "@components/core/Section.astro";
   import PageHeader from "@components/core/PageHeader.astro";
   
   const pageTitle = "New Page";
   ---
   
   <Base title={pageTitle}>
     <PageHeader title={pageTitle} />
     <Section>
       <div class="container">
         <p>Page content goes here.</p>
       </div>
     </Section>
   </Base>
   ```

2. The file name determines the URL path:
   - `/src/pages/example.astro` → `/example`
   - `/src/pages/about/team.astro` → `/about/team`

### Content-Driven Pages

For pages driven by content collections:

1. Create the content file in the appropriate collection
2. Ensure the dynamic route template exists (e.g., `/src/pages/wiedza/dla-biznesu/[slug].astro`)
3. The URL will be automatically generated based on the content's slug

### Adding New Article Categories

To add a new article category:

1. Update TinaCMS schema in `/tina/config.ts` to add a new collection
2. Create the corresponding directory in `/src/content/`
3. Create a specialized layout in `/src/layouts/` if needed
4. Add dynamic route templates in `/src/pages/`
5. Update navigation in `/src/config/menu.json`

## Deployment Guide

### Building for Production

To build the site for production:

```bash
npm run build
```

This generates the static site in the `/dist` directory.

### Deploying to Netlify

The site is configured for Netlify deployment:

1. Push your changes to the connected repository
2. Netlify will automatically build and deploy

Manual deployment:
1. Build the site: `npm run build`
2. Deploy the `/dist` folder using Netlify CLI:
   ```bash
   netlify deploy --prod
   ```

### Environment Variables for Production

Ensure these environment variables are set in your Netlify dashboard:
- `TINA_PUBLIC_CLIENT_ID`
- `TINA_TOKEN`
- `NODE_OPTIONS="--max_old_space_size=4096"`

## Troubleshooting

### Common Issues

#### Build Memory Issues

If you encounter memory errors during build:

```bash
# Increase Node.js memory limit
export NODE_OPTIONS=--max_old_space_size=4096
npm run build
```

#### TinaCMS Connection Issues

If TinaCMS fails to connect:
1. Check your environment variables
2. Ensure you have proper access to Tina Cloud
3. Try restarting the development server

#### Missing Dependencies

If you encounter missing dependency errors:

```bash
npm install --legacy-peer-deps
```

### Getting Help

For more detailed technical information, refer to:
- [TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md): Comprehensive technical details
- [Astro Documentation](https://docs.astro.build/): For Astro-specific questions
- [TinaCMS Documentation](https://tina.io/docs/): For CMS-related issues