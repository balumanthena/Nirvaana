import { MetadataRoute } from 'next';
import { CONFIG } from '@/content/config';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: CONFIG.BRAND_NAME,
        short_name: "Nirvana",
        description: CONFIG.TAGLINE,
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8d6e63', // Nirvaana Bronze approximate
        icons: [
            {
                src: '/favicon.png',
                sizes: 'any',
                type: 'image/png',
            },
        ],
    };
}
