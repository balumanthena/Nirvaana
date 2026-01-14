import { CONFIG } from '@/content/config';

export function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: CONFIG.BRAND_NAME,
        url: CONFIG.SITE_URL,
        logo: `${CONFIG.SITE_URL}/images/logologo.png`,
        image: `${CONFIG.SITE_URL}/images/logologo.png`,
        description: CONFIG.TAGLINE,
        telephone: CONFIG.PHONE,
        email: CONFIG.EMAIL,
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Karimnagar',
            addressRegion: 'Telangana',
            addressCountry: 'IN',
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '18.4386',
            longitude: '79.1288',
        },
        areaServed: [
            {
                '@type': 'City',
                name: 'Karimnagar',
                address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Telangana',
                    addressCountry: 'IN'
                }
            },
            {
                '@type': 'City',
                name: 'Bangalore',
                address: {
                    '@type': 'PostalAddress',
                    addressRegion: 'Karnataka',
                    addressCountry: 'IN'
                }
            }
        ],
        priceRange: '$$',
        openingHoursSpecification: [
            {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: [
                    'Monday',
                    'Tuesday',
                    'Wednesday',
                    'Thursday',
                    'Friday',
                    'Saturday'
                ],
                opens: '09:00',
                closes: '18:00',
            }
        ],
        sameAs: [
            CONFIG.SOCIAL_LINKS.LINKEDIN,
            CONFIG.SOCIAL_LINKS.TWITTER,
            CONFIG.WHATSAPP_URL
        ],
        contactPoint: {
            '@type': 'ContactPoint',
            telephone: CONFIG.PHONE,
            contactType: 'customer service',
            areaServed: 'IN',
            availableLanguage: ['en', 'te', 'hi']
        }
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
    );
}
