import { MetadataRoute } from 'next';
import { CONFIG } from '@/content/config';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: '/private/',
        },
        sitemap: `${CONFIG.SITE_URL}/sitemap.xml`,
    };
}
