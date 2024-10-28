import rss from '@astrojs/rss';
import type { APIRoute } from "astro";
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site}) => {
    const blogPosts = await getCollection('blog');

  return rss({
    title: 'Mi blog',
    description: 'Un simple blog sobre mis aventuras con astro',
    site: site ?? '',
    items: blogPosts.map(({ data, slug}) => ({
        title: data.title,
        pubDate: data.date,
        description: data.description,
        link: `posts/${slug}`
    })),
    customData: `<language>es-mx</language>`,
    // stylesheet: '/styles/rss.xsl'
  })
};
