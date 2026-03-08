import { MetadataRoute } from 'next';
import { SERVICES } from '@/content/services';
import { CONFIG } from '@/content/config';
import { getAllBlogs } from '@/lib/blog-db';
import { isConfigured } from '@/lib/firebase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = CONFIG.SITE_URL;

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
        '/blog',
        '/contact',
        '/schedule',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Dynamic service routes
    const serviceRoutes = SERVICES.map((service) => ({
        url: `${baseUrl}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // Dynamic blog routes
    let blogRoutes: MetadataRoute.Sitemap = [];
    if (isConfigured) {
        try {
            const blogs = await getAllBlogs(true);
            blogRoutes = blogs.map((blog) => ({
                url: `${baseUrl}/blog/${blog.slug}`,
                lastModified: blog.publishedAt ? blog.publishedAt.toDate() : new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.8,
            }));
        } catch (error) {
            console.error("Failed to generate blog sitemap:", error);
        }
    }

    return [...routes, ...serviceRoutes, ...blogRoutes];
}
