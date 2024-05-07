
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

import { notFound } from "next/navigation";
import React from "react";
import NextIntlProvider from "./NextIntlProvider";
// import Sidebar from '@/components/sidebar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CHAI-GPT',
  description: 'AI Generator Platform',
}

export function generateStaticParams() {
  return [{locale:"en"},{locale:"fr"},{locale:"it"},{locale:"de"},{locale:"ja"},{locale:"hi"},{locale:"zh"},{locale:"es"},{locale:"pa"},{locale:"ta"},{locale:"te"}];
}

export default async function LocaleLayout({
  children, params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale || "en"}.json`))
      .default;
  } catch (error) {
    notFound();
  }


  return (
    <NextIntlProvider
          locale={locale}
          messages={messages}
          timeZone="Europe/Berlin"
          now={new Date()}>
              <ClerkProvider>
              <html lang={locale}>
                <body suppressHydrationWarning={true} className={inter.className}>
                    {children}
                </body>
              </html>
              </ClerkProvider>
    </NextIntlProvider>
  );
}











// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <ClerkProvider>
//       <html>
//            <body className={inter.className}>{children}</body>
//       </html>
//     </ClerkProvider>
//   )
// }


// export default function LocaleLayout({
//   children,
//   params: {locale}
// }: {
//   children: React.ReactNode;
//   params: {locale: string};
// }) {
//   return (
//     <ClerkProvider>
//       <html>
//            <body className={inter.className}>{children}</body>
//       </html>
//     </ClerkProvider>
//   );
// }
