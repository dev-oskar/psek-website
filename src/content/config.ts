import type { Testimonial } from "@/components/Testimonial.astro";
import type { Section } from "@/components/core/Section.astro";
import type { LinkButton, PageType } from "@/content/page.types";
import { defineCollection, z } from "astro:content";

const zodPageConfig = z.custom<PageType>();

// Pages collection schema
const pagesCollection = defineCollection({
  type: "content",
  schema: zodPageConfig,
});

// Patient content schema
const patientCollection = defineCollection({
  type: "content",
  schema: z.intersection(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      meta_description: z.string().optional(),
      featured_image: z.string().optional(),
      is_featured: z.boolean().optional().default(false),
      order: z.number().optional(),
      category: z.string().optional(),
    }),
    zodPageConfig,
  ),
});

// Business content schema
const businessCollection = defineCollection({
  type: "content",
  schema: z.intersection(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      meta_description: z.string().optional(),
      featured_image: z.string().optional(),
      is_featured: z.boolean().optional().default(false),
      order: z.number().optional(),
      industry: z.string().optional(),
    }),
    zodPageConfig,
  ),
});

// Medical content schema
const medicalCollection = defineCollection({
  type: "content",
  schema: z.intersection(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      meta_description: z.string().optional(),
      featured_image: z.string().optional(),
      is_featured: z.boolean().optional().default(false),
      order: z.number().optional(),
      specialty: z.string().optional(),
    }),
    zodPageConfig,
  ),
});

// Research content schema
const researchCollection = defineCollection({
  type: "content",
  schema: z.intersection(
    z.object({
      title: z.string(),
      description: z.string().optional(),
      meta_title: z.string().optional(),
      meta_description: z.string().optional(),
      featured_image: z.string().optional(),
      is_featured: z.boolean().optional().default(false),
      order: z.number().optional(),
      authors: z.string().optional(),
      institution: z.string().optional(),
      year: z.string().optional(),
      category: z.string().optional(),
    }),
    zodPageConfig,
  ),
});

const indexSchema = z.intersection(
  z.object({
    banner: z.custom<Section>(),
    features: z.object({
      title: z.string(),
      description: z.string(),
      feature_list: z.array(
        z.object({
          title: z.string(),
          content: z.string(),
          icon: z.string(),
        }),
      ),
    }),
    testimonial: z.custom<Testimonial>(),
    call_to_action: z.object({
      title: z.string(),
      description: z.string(),
      button: z.custom<LinkButton>(),
    }),
  }),
  zodPageConfig,
);

const indexPage = defineCollection({
  type: "content",
  schema: indexSchema,
});

// Export collections
export const collections = {
  about: pagesCollection,
  changelog: pagesCollection,
  contact: pagesCollection,
  features: pagesCollection,
  homepage: indexPage,
  pages: pagesCollection,
  patient: patientCollection,
  business: businessCollection,
  medical: medicalCollection,
  research: researchCollection,
};
