import { MetadataRoute } from 'next';
import { SERVICES } from '@/content/services';
import { CONFIG } from '@/content/config';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = CONFIG.SITE_URL;

    // Static routes
    const routes = [
        '',
        '/about',
        '/services',
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

    return [...routes, ...serviceRoutes];
}
