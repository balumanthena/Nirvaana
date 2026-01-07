import { CONFIG } from '@/content/config';

export function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: CONFIG.BRAND_NAME,
        image: `${CONFIG.SITE_URL}/images/logologo.png`,
        '@id': CONFIG.SITE_URL,
        url: CONFIG.SITE_URL,
        telephone: CONFIG.PHONE,
        email: CONFIG.EMAIL,
        priceRange: '$$',
        address: {
            '@type': 'PostalAddress',
            addressLocality: CONFIG.CITY,
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '18.4386', // Karimnagar approximate
            longitude: '79.1288',
        },
        sameAs: [
            CONFIG.SOCIAL_LINKS.LINKEDIN,
            CONFIG.SOCIAL_LINKS.TWITTER,
        ],
        areaServed: {
            '@type': 'Country',
            name: 'India',
        },
        description: CONFIG.TAGLINE,
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
