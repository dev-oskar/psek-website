# PSEK Website Technical Documentation

This document provides comprehensive technical details about the Polskie Stowarzyszenie Edukacji Konopnej (PSEK) website architecture, development workflow, and implementation specifics.

## Table of Contents

- [Core Technologies](#core-technologies)
- [Project Structure](#project-structure)
- [Build and Deployment Pipeline](#build-and-deployment-pipeline)
- [Routing and Navigation System](#routing-and-navigation-system)
- [TinaCMS Integration](#tinacms-integration)
- [Content Management Architecture](#content-management-architecture)
- [Component System](#component-system)
- [Styling Architecture](#styling-architecture)
- [Performance Optimizations](#performance-optimizations)
- [Technical Configuration Details](#technical-configuration-details)

## Core Technologies

The website is built using a modern Jamstack architecture with the following core technologies:

| Technology | Version | Purpose |
|------------|---------|---------|
| Astro | 4.x | Core static site generation framework |
| TailwindCSS | 3.x | Utility-first CSS framework |
| React | 18.x | Interactive component library |
| TinaCMS | 1.x | Headless CMS for content management |
| TypeScript | 5.x | Type-safe JavaScript |
| MDX | 2.x | Enhanced Markdown with component support |

## Project Structure

The repository follows a specialized organization structure:

```
/
├── public/               # Static assets (images, fonts, etc.)
├── src/
│   ├── components/       # UI component library
│   │   ├── core/         # Framework-agnostic components
│   │   └── react/        # React-specific components
│   ├── config/           # Site configuration files (JSON)
│   ├── content/          # Content collections (Markdown/MDX)
│   │   ├── about/        # About pages content
│   │   ├── business/     # Business articles
│   │   ├── medical/      # Medical professional articles
│   │   ├── patient/      # Patient-focused content
│   │   ├── research/     # Research articles
│   │   └── pages/        # General pages
│   ├── layouts/          # Page layout templates
│   │   └── partials/     # Layout sections (header, footer)
│   ├── lib/              # Utility functions
│   ├── pages/            # Route definitions
│   │   └── wiedza/       # Knowledge section routes
│   └── styles/           # Global styles (SCSS)
├── tina/                 # TinaCMS configuration
│   └── __generated__/    # Auto-generated TinaCMS types
├── astro.config.mjs      # Astro configuration
├── tailwind.config.js    # TailwindCSS configuration
└── netlify.toml          # Deployment configuration
```

### Key Files

- `CLAUDE.md`: AI assistant instructions and project overview
- `astro.config.mjs`: Core Astro configuration with integrations
- `tailwind.config.js`: TailwindCSS theme customization
- `tina/config.ts`: TinaCMS schema definitions
- `src/layouts/Base.astro`: Base HTML template
- `src/config/config.json`: Global site metadata and configuration

## Build and Deployment Pipeline

### Development Workflow

The development environment combines Astro and TinaCMS in dev mode:

```bash
npm run dev  # Runs: tinacms dev -c "astro dev"
```

This command:
1. Starts the TinaCMS dev server as a wrapper around Astro
2. Initializes the TinaCMS admin interface at `/admin/`
3. Serves the Astro development server at `localhost:4321`
4. Connects to TinaCMS Cloud for authentication (if configured)
5. Provides hot module reloading for both content and code changes

### Production Build Process

Building for production follows a multi-step process:

```bash
npm run build  # Runs: cross-env NODE_OPTIONS="--max_old_space_size=4096" tinacms build && astro build
```

This sequence:
1. Increases Node.js memory allocation to 4GB to handle large builds
2. Builds the TinaCMS admin interface first
3. Then builds the Astro site with optimized assets
4. Outputs everything to the `/dist` directory

### Netlify Deployment

Deployment is configured for Netlify in `netlify.toml`:

```toml
[build]
  command = "npm install --legacy-peer-deps && npm run build"
  publish = "dist"

[build.environment]
  NODE_OPTIONS = "--max_old_space_size=4096"

[[redirects]]
  from = "/*"
  to = "/404"
  status = 404
```

This configuration:
- Uses a custom build command with `--legacy-peer-deps` for compatibility
- Sets the publish directory to `/dist`
- Increases Node memory allocation 
- Configures a custom 404 page redirect
- Handles form submissions via Netlify Forms

### Environment Variables

The build process requires several environment variables:
- `TINA_PUBLIC_CLIENT_ID`: For TinaCMS Cloud authentication
- `TINA_TOKEN`: For authorized CMS API requests
- Other environment variables may be needed for specific integrations

## Routing and Navigation System

### File-Based Routing

Astro implements file-based routing where the file structure in `/src/pages/` directly maps to URL paths:

| File Path | URL Route |
|-----------|-----------|
| `/src/pages/index.astro` | `/` |
| `/src/pages/o-nas.astro` | `/o-nas` |
| `/src/pages/kontakt.astro` | `/kontakt` |

### Dynamic Routes

Dynamic routes use Astro's bracket notation and `getStaticPaths()` function:

```typescript
// /src/pages/wiedza/dla-biznesu/[slug].astro
export async function getStaticPaths() {
  const businessArticles = await getCollection("business");
  return businessArticles.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
```

This generates a unique URL for each content entry at build time with paths following the pattern `/wiedza/dla-biznesu/:slug`.

### Content Section Routes

Knowledge (`wiedza`) section implements a specialized routing structure:

```
/wiedza/
├── abc-konopi.astro            # Cannabis basics page
├── dla-biznesu/                # Business section
│   ├── [slug].astro            # Dynamic business article template
│   └── index.astro             # Business section index
├── dla-lekarzy/                # Medical professionals section
│   ├── [slug].astro            # Dynamic medical article template
│   └── index.astro             # Medical section index
├── dla-pacjenta/               # Patient section
│   ├── [slug].astro            # Dynamic patient article template
│   └── index.astro             # Patient section index
├── index.astro                 # Knowledge section main page
└── strefa-badan/               # Research section
    ├── [slug].astro            # Dynamic research article template
    ├── index.astro             # Research section index
    └── publikacje.astro        # Publications page
```

### Navigation Configuration

The site's navigation is defined in `/src/config/menu.json`:

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
        // Dropdown menu items...
      ]
    }
    // Additional menu items...
  ],
  "footer": [
    // Footer navigation links...
  ]
}
```

This JSON structure:
- Defines main navigation and footer links
- Supports nested dropdown menus
- Is processed by the `Header.astro` component

## TinaCMS Integration

### Schema Definition

Content types are defined in `/tina/config.ts` with detailed field specifications:

```typescript
export default defineConfig({
  schema: {
    collections: [
      {
        name: "homepage",
        label: "Homepage",
        path: "src/content/homepage",
        format: "md",
        fields: [
          // Field definitions...
        ],
      },
      {
        name: "business",
        label: "Dla Biznesu",
        path: "src/content/business",
        fields: [
          // Business article fields...
        ],
      },
      // Additional collections...
    ],
  },
  // TinaCMS configuration...
});
```

Each collection defines:
- Storage location in the filesystem
- Content format (MD/MDX)
- Field structure with validation
- UI representation in the admin

### Backend Configuration

TinaCMS uses a local filesystem backend in development and can connect to Tina Cloud in production:

```typescript
// tina/config.ts
export default defineConfig({
  // ...schema definition
  clientId: process.env.TINA_PUBLIC_CLIENT_ID,
  token: process.env.TINA_TOKEN,
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  // Additional configuration...
});
```

### GraphQL API

TinaCMS generates a GraphQL API for content, accessible via:
- Development: `http://localhost:4321/api/graphql`
- Production: Through Tina Cloud API endpoints

This API provides:
- Content query capabilities
- Full-text search
- Content filtering and sorting
- Relationship resolution

### Admin Interface

The admin UI is built to `/public/admin/` and accessible via:
- Development: `http://localhost:4321/admin/`
- Production: `https://example.com/admin/`

## Content Management Architecture

### Content Organization

Content is organized into typed collections based on target audience:

```
/src/content/
├── about/              # About the organization
├── business/           # For businesses and entrepreneurs
├── homepage/           # Homepage content blocks
├── medical/            # For medical professionals
├── patient/            # For patients
├── research/           # Research papers and studies
└── pages/              # General pages
```

### Content Collection Types

Each collection has TypeScript types defined in `/src/content/config.ts`:

```typescript
import { defineCollection, z } from "astro:content";

// Schema validation with Zod
const businessCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    meta_title: z.string().optional(),
    // Additional fields...
  }),
});

// Export collections configuration
export const collections = {
  business: businessCollection,
  medical: medicalCollection,
  // Other collections...
};
```

### Content Retrieval Pattern

Fetching content follows a consistent pattern:

```typescript
// For single entries
const homepage = await getEntry("homepage", "index");

// For collections
const businessArticles = await getCollection("business");

// With filtering
const sortedArticles = await getCollection("business", ({ data }) => {
  return data.featured === true;
});
```

### Markdown Rendering Pipeline

Content rendering follows this path:
1. Markdown/MDX file loaded from filesystem
2. Parsed by Astro's content collections
3. Rendered into HTML via specialized layouts
4. Enhanced with Astro components

## Component System

### Component Organization

Components are organized by framework and purpose:

```
/src/components/
├── Badge.astro             # UI badge component
├── CounterComponent.astro  # Animated counter
├── Features.astro          # Features section
├── Gallery.astro           # Image gallery
├── LinkButton.astro        # Button component
├── Social.astro            # Social media links
├── Testimonial.astro       # Testimonial component
├── core/                   # Core structural components
│   ├── Logo.astro          # Site logo
│   ├── PageHeader.astro    # Page header with title/meta
│   ├── Section.astro       # Section layout component
│   └── ThemeToggle.astro   # Dark mode toggle
└── react/                  # React components
    ├── Changelog.tsx       # Changelog display
    ├── FeatherIcon.tsx     # Icon component
    ├── HomepageFeature.jsx # Feature display
    └── TestimonialSlider.jsx # Testimonial carousel
```

### Layout Architecture

The site employs a multi-level layout hierarchy:

1. **Base Layout (`/src/layouts/Base.astro`)**: Global HTML structure
   ```html
   <!DOCTYPE html>
   <html lang={config.site.lang}>
     <head>
       <!-- Meta tags, SEO, CSS -->
     </head>
     <body>
       <Header />
       <main>
         <slot />  <!-- Content injection point -->
       </main>
       <Footer />
       <!-- JS imports -->
     </body>
   </html>
   ```

2. **Specialized Layouts**: Topic-specific templates
   - `BusinessArticle.astro`: For business content
   - `MedicalArticle.astro`: For medical content
   - `PatientArticle.astro`: For patient content
   - `ResearchArticle.astro`: For research papers

3. **Section Layouts**: Content organization
   - `WiedzaSection.astro`: Knowledge section template

### Core Component: Section

The `Section.astro` component provides a flexible content section with:
- Responsive column layouts
- Image positioning options
- Background control
- Container sizing
- Animation options

Implementation excerpt:
```astro
---
// Props definition
const { 
  title,
  image,
  image_alt,
  image_position = "start",
  background = "none",
  image_max_width, 
  container_max_width,
  background_color,
  animate = false,
  section_spacing = "default"
} = Astro.props;

// Complex position class calculations
const image_position_classes = (() => {
  // Logic for position classes based on props
})();
---

<section 
  class:list={[
    "astro-section",
    `background-${background}`,
    section_spacing === "default" ? "py-16 lg:py-28" : section_spacing,
    { "overflow-hidden": animate },
    background_color
  ]}
>
  <!-- Section implementation with dynamic classes -->
</section>
```

### React Integration

React components are integrated using Astro's React island pattern:

```astro
---
// Import React component
import TestimonialSlider from "@components/react/TestimonialSlider";
---

<!-- Use React component as an Astro island -->
<TestimonialSlider 
  testimonials={testimonials}
  client:load 
/>
```

The `client:load` directive hydrates the component on page load, enabling interactive functionality.

## Styling Architecture

### Styling Technology Stack

The website uses a hybrid styling approach:

| Technology | Purpose |
|------------|---------|
| TailwindCSS | Primary utility-based styling |
| SCSS | Custom components and theming |
| CSS Variables | Dynamic theme values |
| PostCSS | Processing and optimization |

### Global Style Files

Styles are organized into specialized SCSS files:

```
/src/styles/
├── base.scss       # Base element styles
├── buttons.scss    # Button component styles
├── components.scss # Component-specific styles
├── main.scss       # Main import file
├── navigation.scss # Navigation styling
├── themes.scss     # Theme definitions
└── utilities.scss  # Custom utility classes
```

### Theme System Implementation

The theme system is implemented in `/src/styles/themes.scss`:

```scss
// Theme color maps
$default: (
  "primary": #4bb643,
  "secondary": #276419,
  "body": #ffffff,
  "text": #333333,
  // Additional color variables...
);

$dark: (
  "primary": #1164a3,
  "secondary": #199AFC,
  "body": #0d1117,
  "text": #ffffff,
  // Dark theme colors...
);

// CSS variable generation
:root {
  @each $name, $color in $default {
    --color-#{$name}: #{$color};
  }
}

// Dark theme class
.dark {
  @each $name, $color in $dark {
    --color-#{$name}: #{$color};
  }
}
```

This generates CSS variables that are then consumed by TailwindCSS via the configuration:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        // Additional theme colors...
      },
    },
  },
  // Additional configuration...
};
```

### Theme Toggle Mechanism

The theme toggle uses localStorage and a media query listener:

```javascript
// Simplified theme toggle logic
function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.theme = 'light';
  } else {
    document.documentElement.classList.add('dark');
    localStorage.theme = 'dark';
  }
}

// Initialize theme from localStorage or system preference
if (
  localStorage.theme === 'dark' || 
  (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
```

### Animation System

Custom animations are defined in `tailwind.config.js`:

```javascript
// Animation definitions
keyframes: {
  "fade-in": {
    '0%': { transform: 'translateY(15pt)', opacity: 0 },
    '100%': { transform: 'translateY(0pt)' },
  },
  // Additional animation keyframes...
},
animation: {
  "fade-in": "fade-in 1s ease forwards",
  // Additional animation definitions...
},
```

These are applied conditionally to elements:

```html
<div class:list={[
  { "animate-fade-in": animate },
  // Additional classes...
]}>
  <!-- Content -->
</div>
```

## Performance Optimizations

### Image Processing

Images are optimized using Astro's built-in image service:

```javascript
// astro.config.mjs
export default defineConfig({
  // Other configuration...
  image: {
    service: sharpImageService(),
  },
  // Additional settings...
});
```

Usage in components:
```astro
---
import { Image } from "astro:assets";
import myImage from "../path/to/image.jpg";
---

<Image 
  src={myImage} 
  alt="Description" 
  width={800} 
  height={600} 
  format="webp" 
/>
```

### View Transitions

The site uses Astro's View Transitions API for smooth page navigation:

```astro
---
import { ViewTransitions } from "astro:transitions";
---
<head>
  <!-- Other head elements -->
  <ViewTransitions />
</head>
```

Individual elements can be annotated for transition effects:
```html
<h1 transition:name="page-title">Page Title</h1>
```

### Static Generation

All pages are statically generated at build time for optimal loading performance:
- HTML is pre-rendered
- JavaScript is minimized with hydration only where needed
- CSS is optimized and critical CSS is inlined

### Code Splitting

JavaScript is automatically code-split by Astro's bundler:
- Each page only loads the JS it needs
- React components are isolated into separate chunks
- Shared code is extracted into common chunks

## Technical Configuration Details

### Astro Configuration

Complete `astro.config.mjs` details:

```javascript
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import AutoImport from "astro-auto-import";
import mdx from "@astrojs/mdx";
import { sharpImageService } from "astro/config/sharp";

export default defineConfig({
  site: "https://example.com",
  trailingSlash: "never",
  integrations: [
    react(),
    sitemap(),
    tailwind(),
    AutoImport({
      imports: [
        // Components to auto-import in MDX
      ],
    }),
    mdx()
  ],
  image: {
    service: sharpImageService(),
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  }
});
```

### TailwindCSS Configuration

Complete `tailwind.config.js` details:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        // Additional color variables...
      },
      fontFamily: {
        // Font family definitions...
      },
      keyframes: {
        // Animation keyframes...
      },
      animation: {
        // Animation definitions...
      },
      textShadow: {
        // Text shadow utilities...
      },
      // Additional theme extensions...
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid"),
    // Custom plugins...
  ],
};
```

### Content Collection Types

Extended configuration from `/src/content/config.ts`:

```typescript
import { defineCollection, z } from "astro:content";

// Reusable schema components
const baseFields = {
  title: z.string(),
  meta_title: z.string().optional(),
  description: z.string(),
  image: z.string().optional(),
  excerpt: z.string().optional(),
  draft: z.boolean().default(false),
  date: z.date().optional(),
};

// Collection schemas
const businessCollection = defineCollection({
  schema: z.object({
    ...baseFields,
    industries: z.array(z.string()).optional(),
    // Collection-specific fields...
  }),
});

// Export collections
export const collections = {
  homepage: homepageCollection,
  business: businessCollection,
  medical: medicalCollection,
  patient: patientCollection,
  research: researchCollection,
  pages: pagesCollection,
  about: aboutCollection,
};
```

### Netlify Form Integration

Contact forms are integrated with Netlify's form handling:

```html
<form
  method="POST"
  name="contact-home"
  netlify
  netlify-honeypot="bot-field"
  action="/thank-you"
>
  <input type="hidden" name="form-name" value="contact-home" />
  <div class="hidden">
    <input name="bot-field" />
  </div>
  
  <!-- Form fields -->
  
  <button type="submit" class="btn btn-primary">
    Send Message
  </button>
</form>
```

This implementation:
- Uses `netlify` attribute for Netlify form detection
- Implements honeypot spam protection
- Redirects to a thank-you page on submission
- Uses hidden field to ensure proper form name

### SEO Optimization

SEO is implemented through a combination of:

1. Global configuration in `src/config/config.json`
2. Per-page metadata in frontmatter
3. Schema.org structured data

Example implementation:
```astro
---
// SEO metadata construction
const {
  title,
  meta_title,
  description,
  image,
  noindex,
  canonical,
} = Astro.props;

const metaTitle = meta_title ? meta_title : title;
const metaImage = image ? image : config.site.image;
const metaDescription = description ? description : config.site.description;
---

<!-- SEO tags -->
<title>{metaTitle}</title>
<meta name="description" content={metaDescription} />

<!-- Open Graph -->
<meta property="og:title" content={metaTitle} />
<meta property="og:description" content={metaDescription} />
<meta property="og:type" content="website" />
<meta property="og:image" content={metaImage} />

<!-- Twitter -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={metaTitle} />
<meta name="twitter:description" content={metaDescription} />
<meta name="twitter:image" content={metaImage} />

<!-- Canonical URL -->
{canonical && <link rel="canonical" href={canonical} />}

<!-- Robots -->
{noindex && <meta name="robots" content="noindex,nofollow" />}
```

---

This technical documentation is meant for developers working on the PSEK website and provides comprehensive information about the architecture, build process, and implementation details.