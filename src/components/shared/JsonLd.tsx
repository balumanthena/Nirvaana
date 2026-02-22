import { CONFIG } from '@/content/config';

export function JsonLd() {
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'FinancialService',
        name: CONFIG.BRAND_NAME,
        url: CONFIG.SITE_URL,
        logo: `${CONFIG.SITE_URL}/images/Untitled_design__10_-removebg-preview.png`,
        image: `${CONFIG.SITE_URL}/images/Untitled_design__10_-removebg-preview.png`,
        description: CONFIG.TAGLINE,
        telephone: CONFIG.PHONE,
        email: CONFIG.EMAIL,
        address: CONFIG.ADDRESSES.map(addr => ({
            '@type': 'PostalAddress',
            streetAddress: `${addr.line1}, ${addr.line2}, ${addr.line3}`,
            addressLocality: addr.city,
            addressRegion: addr.state,
            postalCode: addr.pincode,
            addressCountry: 'IN',
        })),
        geo: {
            '@type': 'GeoCoordinates',
            latitude: '18.4386',
            longitude: '79.1288',
        },
        areaServed: CONFIG.ADDRESSES.map(addr => ({
            '@type': 'City',
            name: addr.city,
            address: {
                '@type': 'PostalAddress',
                addressRegion: addr.state,
                addressCountry: 'IN'
            }
        })),
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
