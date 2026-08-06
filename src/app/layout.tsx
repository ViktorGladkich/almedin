import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NoiseOverlay } from '@/components/effects/NoiseOverlay';

export const metadata: Metadata = {
  title: {
    default: 'Almedin Bau | Premium Bauunternehmen in Dresden',
    template: '%s | Almedin Bau',
  },
  description: 'Ihr Bauunternehmen aus Dresden für hochwertige Gewerbe- und Wohnprojekte. Wir stehen für Qualität und Zuverlässigkeit in ganz Sachsen.',
  keywords: ['Almedin', 'Bauunternehmen Dresden', 'Baufirma Dresden', 'Premium Bau', 'Sachsen'],
  authors: [{ name: 'Almedin Bau GmbH' }],
  creator: 'Almedin Bau GmbH',
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url: 'https://www.almedin-bau.de',
    title: 'Almedin Bau | Premium Bauunternehmen in Dresden',
    description: 'Ihr Bauunternehmen aus Dresden für hochwertige Bauprojekte.',
    siteName: 'Almedin Bau',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ConstructionBusiness',
  name: 'Almedin Bau GmbH',
  image: 'https://www.almedin-bau.de/logo.png',
  '@id': 'https://www.almedin-bau.de',
  url: 'https://www.almedin-bau.de',
  telephone: '+49351000000',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Musterstraße 1',
    addressLocality: 'Dresden',
    postalCode: '01067',
    addressCountry: 'DE',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.0504,
    longitude: 13.7373,
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className="scroll-smooth">
      <body className="antialiased font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NoiseOverlay />
        <Header />
        <main className="min-h-screen flex flex-col">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
