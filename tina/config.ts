// tina/config.ts
import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch =
  process.env.GITHUB_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  "main";

export default defineConfig({
  branch,

  // Get this from tina.io
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  // Get this from tina.io
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  // See docs on content modeling for more info on how to setup new content models: https://tina.io/docs/schema/
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
      {
        name: "patient",
        label: "Dla Pacjenta",
        path: "src/content/patient",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Krótki opis",
            required: false,
          },
          {
            type: "string",
            name: "meta_title",
            label: "SEO Tytuł",
            description: "Tytuł używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "SEO Opis",
            description: "Opis używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "image",
            name: "featured_image",
            label: "Zdjęcie główne",
            required: false,
          },
          {
            type: "boolean",
            name: "is_featured",
            label: "Wyróżniony artykuł",
            description:
              "Czy artykuł ma być wyróżniony na stronie głównej kategorii",
            required: false,
          },
          {
            type: "number",
            name: "order",
            label: "Kolejność",
            description: "Pozycja sortowania (niższe liczby = wyżej na liście)",
            required: false,
          },
          {
            type: "string",
            name: "category",
            label: "Kategoria",
            options: ["Podstawy", "Edukacja", "Porady", "Badania", "Inne"],
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },
      {
        name: "business",
        label: "Dla Biznesu",
        path: "src/content/business",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Krótki opis",
            required: false,
          },
          {
            type: "string",
            name: "meta_title",
            label: "SEO Tytuł",
            description: "Tytuł używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "SEO Opis",
            description: "Opis używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "image",
            name: "featured_image",
            label: "Zdjęcie główne",
            required: false,
          },
          {
            type: "boolean",
            name: "is_featured",
            label: "Wyróżniony artykuł",
            required: false,
          },
          {
            type: "number",
            name: "order",
            label: "Kolejność",
            description: "Pozycja sortowania (niższe liczby = wyżej na liście)",
            required: false,
          },
          {
            type: "string",
            name: "industry",
            label: "Branża",
            options: ["Przemysł", "Rolnictwo", "Handel", "Medycyna", "Inne"],
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },
      {
        name: "medical",
        label: "Dla Lekarzy",
        path: "src/content/medical",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Krótki opis",
            required: false,
          },
          {
            type: "string",
            name: "meta_title",
            label: "SEO Tytuł",
            description: "Tytuł używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "SEO Opis",
            description: "Opis używany w meta tagach (SEO)",
            required: false,
          },
          {
            type: "image",
            name: "featured_image",
            label: "Zdjęcie główne",
            required: false,
          },
          {
            type: "boolean",
            name: "is_featured",
            label: "Wyróżniony artykuł",
            required: false,
          },
          {
            type: "number",
            name: "order",
            label: "Kolejność",
            description: "Pozycja sortowania (niższe liczby = wyżej na liście)",
            required: false,
          },
          {
            type: "string",
            name: "specialty",
            label: "Specjalizacja",
            options: [
              "Neurologia",
              "Onkologia",
              "Psychiatria",
              "Medycyna Bólu",
              "Pediatria",
              "Reumatologia",
              "Inne",
            ],
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },
      {
        name: "pages",
        label: "Strony",
        path: "src/content/pages",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Tytuł",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Opis",
            required: false,
          },
          {
            type: "string",
            name: "meta_title",
            label: "SEO Tytuł",
            required: false,
          },
          {
            type: "string",
            name: "meta_description",
            label: "SEO Opis",
            required: false,
          },
          {
            type: "rich-text",
            name: "body",
            label: "Treść",
            isBody: true,
          },
        ],
      },
    ],
  },
});
