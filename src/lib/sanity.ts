const SANITY_PROJECT_ID = import.meta.env.SANITY_PROJECT_ID || '3ctnj5ee';
const SANITY_DATASET = import.meta.env.SANITY_DATASET || 'production';
const SANITY_API_VERSION = import.meta.env.SANITY_API_VERSION || '2024-01-01';
const SANITY_READ_TOKEN = import.meta.env.SANITY_READ_TOKEN;

const SANITY_HOST = SANITY_READ_TOKEN ? 'api.sanity.io' : 'apicdn.sanity.io';
const SANITY_QUERY_URL = `https://${SANITY_PROJECT_ID}.${SANITY_HOST}/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`;

export interface SanityImage {
  asset?: {
    url?: string;
  };
  alt?: string;
  caption?: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  author?: {
    name?: string;
    image?: SanityImage;
  };
  mainImage?: SanityImage;
}

interface PortableTextSpan {
  _type?: string;
  text?: string;
  marks?: string[];
}

interface PortableTextMarkDef {
  _key: string;
  _type?: string;
  href?: string;
}

export interface PortableTextBlock {
  _type?: string;
  _key?: string;
  style?: string;
  listItem?: 'bullet' | 'number';
  level?: number;
  children?: PortableTextSpan[];
  markDefs?: PortableTextMarkDef[];
  asset?: {
    url?: string;
  };
  alt?: string;
  caption?: string;
}

interface SanityResponse<Result> {
  result?: Result;
  error?: {
    description?: string;
  };
}

const postListProjection = `{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  "author": author->{name, image{asset->{url}}},
  mainImage{asset->{url}, alt}
}`;

const postDetailProjection = `{
  _id,
  title,
  slug,
  publishedAt,
  excerpt,
  body[]{
    ...,
    asset->{url},
    markDefs[]{...}
  },
  "author": author->{name, image{asset->{url}}},
  mainImage{asset->{url}, alt}
}`;

async function sanityFetch<Result>(query: string, params: Record<string, unknown> = {}): Promise<Result> {
  const url = new URL(SANITY_QUERY_URL);
  url.searchParams.set('query', query);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(`$${key}`, JSON.stringify(value));
  });

  const headers = SANITY_READ_TOKEN ? { Authorization: `Bearer ${SANITY_READ_TOKEN}` } : undefined;
  const response = await fetch(url, {
    headers,
    signal: AbortSignal.timeout(8000),
  });

  const payload = (await response.json()) as SanityResponse<Result>;

  if (!response.ok) {
    throw new Error(payload.error?.description || `Sanity returned ${response.status}`);
  }

  return payload.result as Result;
}

async function fetchOrFallback<Result>(
  label: string,
  query: string,
  fallback: Result,
  params?: Record<string, unknown>
): Promise<Result> {
  try {
    return await sanityFetch<Result>(query, params);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    console.warn(`[sanity] ${label} unavailable: ${message}`);
    return fallback;
  }
}

export async function getAllPosts(): Promise<BlogPost[]> {
  return fetchOrFallback(
    'posts',
    `*[
      _type == "post" &&
      defined(slug.current) &&
      !(_id in path("drafts.**"))
    ] | order(publishedAt desc) ${postListProjection}`,
    []
  );
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  return fetchOrFallback(
    `post "${slug}"`,
    `*[
      _type == "post" &&
      slug.current == $slug &&
      !(_id in path("drafts.**"))
    ][0] ${postDetailProjection}`,
    null,
    { slug }
  );
}

export function formatPostDate(value?: string): string {
  if (!value) return 'Unpublished';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;

  return new Intl.DateTimeFormat('en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function getPostUrl(post: BlogPost): string {
  return `/blog/${post.slug.current}/`;
}

export function portableTextToHtml(blocks: PortableTextBlock[] = []): string {
  let html = '';

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];

    if (isListBlock(block)) {
      const listTag = block.listItem === 'number' ? 'ol' : 'ul';
      const items: string[] = [];

      while (index < blocks.length && isListBlock(blocks[index]) && blocks[index].listItem === block.listItem) {
        items.push(`<li>${renderChildren(blocks[index])}</li>`);
        index += 1;
      }

      index -= 1;
      html += `<${listTag}>${items.join('')}</${listTag}>`;
      continue;
    }

    if (block._type === 'image' && block.asset?.url) {
      const alt = escapeAttribute(block.alt || block.caption || '');
      const caption = block.caption ? `<figcaption>${escapeHtml(block.caption)}</figcaption>` : '';
      html += `<figure><img src="${escapeAttribute(block.asset.url)}" alt="${alt}" loading="lazy" decoding="async">${caption}</figure>`;
      continue;
    }

    if (block._type !== 'block') continue;

    const children = renderChildren(block);
    if (!children) continue;

    const tag = getBlockTag(block.style);
    html += `<${tag}>${children}</${tag}>`;
  }

  return html;
}

function isListBlock(block: PortableTextBlock): boolean {
  return block._type === 'block' && Boolean(block.listItem);
}

function getBlockTag(style?: string): string {
  switch (style) {
    case 'h1':
    case 'h2':
      return 'h2';
    case 'h3':
      return 'h3';
    case 'h4':
      return 'h4';
    case 'blockquote':
      return 'blockquote';
    default:
      return 'p';
  }
}

function renderChildren(block: PortableTextBlock): string {
  const markDefs = new Map((block.markDefs || []).map((markDef) => [markDef._key, markDef]));

  return (block.children || [])
    .map((child) => {
      if (child._type && child._type !== 'span') return '';

      let value = escapeHtml(child.text || '');

      for (const mark of child.marks || []) {
        if (mark === 'strong') value = `<strong>${value}</strong>`;
        if (mark === 'em') value = `<em>${value}</em>`;
        if (mark === 'code') value = `<code>${value}</code>`;

        const markDef = markDefs.get(mark);
        if (markDef?._type === 'link' && markDef.href) {
          const href = sanitizeHref(markDef.href);
          const externalAttrs = href.startsWith('http') ? ' target="_blank" rel="noopener noreferrer"' : '';
          value = `<a href="${escapeAttribute(href)}"${externalAttrs}>${value}</a>`;
        }
      }

      return value;
    })
    .join('');
}

function sanitizeHref(href: string): string {
  const trimmed = href.trim();
  if (/^(https?:|mailto:|\/)/i.test(trimmed)) return trimmed;
  return '#';
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeAttribute(value: string): string {
  return escapeHtml(value).replace(/`/g, '&#096;');
}
