import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'your-project-id',
  dataset: import.meta.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  excerpt: string;
  body: any[];
  author?: {
    name: string;
    image?: { asset: { url: string } };
  };
  mainImage?: {
    asset: { url: string };
    alt?: string;
  };
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      "author": author->{name, image{asset->{url}}},
      mainImage{asset->{url}, alt}
    }`
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      publishedAt,
      excerpt,
      body,
      "author": author->{name, image{asset->{url}}},
      mainImage{asset->{url}, alt}
    }`,
    { slug }
  );
}
