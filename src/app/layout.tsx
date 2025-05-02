'use client';

import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { MainLayout } from '@/components/layout/main-layout';
import { Toaster } from '@/components/ui/toaster';
import i18next from 'i18next';
import {initReactI18next} from 'react-i18next';
import {useEffect, useState} from 'react';
import LanguageDetector from 'i18next-browser-languagedetector';
import {useTranslation} from 'react-i18next';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// Removing the metadata export from here
// export const metadata: Metadata = {
//   title: 'Etoile Sportive Du Sahel',
//   description: 'Official website for Etoile Sportive Du Sahel',
// };

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      fr: {
        translation: {
          title: 'Etoile Sportive Du Sahel',
          description: 'Site officiel de l\'Etoile Sportive Du Sahel',
        },
      },
      ar: {
        translation: {
          title: 'النجم الرياضي الساحلي',
          description: 'الموقع الرسمي للنجم الرياضي الساحلي',
        },
      },
    },
    fallbackLng: 'fr',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {i18n} = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Render a fallback UI while i18next is initializing or in non-browser environments.
    return (
      <html lang={i18n.language}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  // Define metadata here, inside the component
  const metadata: Metadata = {
    title: i18n.t('title'), // Access translated title
    description: i18n.t('description'), // Access translated description
  };

  return (
    <html lang={i18n.language}>
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MainLayout>{children}</MainLayout>
        <Toaster />
      </body>
    </html>
  );
}


