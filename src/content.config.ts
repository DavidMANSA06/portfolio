/**
 * Collections de contenu : chaque fichier YAML de src/content/<collection>/ est une entrée.
 * Le schéma (zod) vérifie CHAQUE fichier au build : un champ manquant, une date mal écrite
 * ou une traduction oubliée font échouer `pnpm build` (et donc la CI) avec un message clair.
 * Le contenu ne peut donc pas casser le site en silence.
 * strictObject : un champ inconnu (faute de frappe, ligne mal commentée) est aussi une erreur.
 *
 * Guide : src/content/README.md
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { hasLogo } from './lib/logos';

/** Un texte dans les deux langues : les deux sont obligatoires. */
const localized = z.object({
  fr: z.string().min(1),
  en: z.string().min(1),
});

/** Une liste de textes dans les deux langues. */
const localizedList = z.object({
  fr: z.array(z.string().min(1)),
  en: z.array(z.string().min(1)),
});

/** Date « 2026 » ou « 2026-04 » (année, ou année-mois). Entre guillemets dans le YAML. */
const yearMonth = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, 'Format attendu : "AAAA" ou "AAAA-MM" (ex. "2026-04")');

/** Lien externe : https uniquement (jamais http:, javascript:, data:…). */
const httpsUrl = z.url({ protocol: /^https$/ });

const common = {
  /** true = brouillon : le fichier est vérifié mais pas affiché sur le site. */
  draft: z.boolean().default(false),
};

const experiences = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/experiences' }),
  schema: z.strictObject({
    ...common,
    title: localized,
    organization: z.string().min(1),
    location: z.string().min(1),
    type: z.enum(['stage', 'alternance', 'cdd', 'cdi', 'freelance', 'benevolat']),
    duration: localized.optional(), // ex. { fr: "4 mois", en: "4 months" }
    start: yearMonth,
    end: yearMonth.optional(), // absent = « en cours »
    points: localizedList,
    tags: z.array(z.string().min(1)).default([]),
  }),
});

// Une formation = UN diplôme. Plusieurs diplômes dans la même école = plusieurs fichiers
// (ex. 2021-esatic-licence.yaml et 2024-esatic-master.yaml) : ils sont regroupés sous l'école.
const formations = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/formations' }),
  schema: z.strictObject({
    ...common,
    degree: localized,
    school: z.string().min(1),
    location: z.string().min(1),
    start: yearMonth,
    end: yearMonth.optional(),
    description: localized,
    courses: localizedList.optional(), // matières clés (étiquettes)
    // --- Fenêtre « Détails » (affichée au clic sur la carte) : tout est facultatif ---
    details: localized.optional(), // texte libre ; une ligne vide = nouveau paragraphe
    highlights: localizedList.optional(), // points forts : projets, mention, rang…
    website: httpsUrl.optional(), // site de l'école ou de la formation
  }),
});

const certifications = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/certifications' }),
  schema: z
    .strictObject({
      ...common,
      name: localized,
      issuer: z.string().min(1),
      status: z.enum(['obtenue', 'en-preparation']),
      date: yearMonth, // date d'obtention, ou date prévue
      verifyUrl: httpsUrl.optional(), // lien officiel de vérification (Credly…)
    })
    // Une certification obtenue doit pouvoir être vérifiée
    .refine((c) => c.status !== 'obtenue' || c.verifyUrl, {
      message: 'Une certification "obtenue" doit avoir un verifyUrl',
      path: ['verifyUrl'],
    }),
});

/** Nom d'un logo simple-icons (ex. "python") : une faute de frappe fait échouer le build. */
const logo = z
  .string()
  .refine(hasLogo, 'Logo inconnu : cherche son nom (slug) sur https://simpleicons.org');

/** Un texte identique dans les deux langues (« Docker ») ou traduit ({ fr: …, en: … }). */
const text = z.union([z.string().min(1), localized]);

// Un groupe de compétences = un fichier (01-devsecops.yaml…) : le numéro fixe l'ordre d'affichage.
const competences = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/competences' }),
  schema: z.strictObject({
    ...common,
    title: localized,
    icon: z.enum(['shield', 'target', 'server', 'network', 'code']), // icône du titre
    skills: z
      .array(
        z.strictObject({
          name: text,
          level: z.number().int().min(0).max(5), // nombre d'étoiles
          logo: logo.optional(), // pas de logo : les initiales (abbr) s'affichent
          abbr: z.string().min(1).max(4).optional(),
        }),
      )
      .min(1),
  }),
});

// Plateformes d'entraînement (TryHackMe, Root-Me…) : un fichier par plateforme.
const plateformes = defineCollection({
  loader: glob({ pattern: '**/*.yaml', base: './src/content/plateformes' }),
  schema: z.strictObject({
    ...common,
    name: z.string().min(1),
    logo: logo.optional(),
    abbr: z.string().min(1).max(4).optional(),
    stat: text, // ex. "pseudo · Top 5 %"
    profileUrl: httpsUrl.optional(), // lien vers le profil public
  }),
});

export const collections = { experiences, formations, certifications, competences, plateformes };
