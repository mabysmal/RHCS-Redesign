import type { Metadata } from 'next'
import { Inter, Poppins, Open_Sans } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'

//Configure for Tekton Pro (Local Font used in logo)
export const tektonFont = localFont ({
  src: './fonts/TektonPro-Bold.otf'
})

// Configure for Google Fonts
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  subsets: ['latin'],
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})

const openSans = Open_Sans({ 
  subsets: ['latin'],
  variable: '--font-open-sans',
  display: 'swap',
})

//todo check for grammar l8r

export const metadata: Metadata = {
  title: 'RHCS - Riverview Horticultural Centre Society',
  description: 'Preserving Riverview Lands through education, advocacy, and community engagement',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${tektonFont.className} ${inter.variable} ${poppins.variable} ${openSans.variable}`}>
      <head>
      <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" async></script>
      </head>
      <body className="font-sans bg-background text-primary antialiased">
        {children}
        
      </body>
    </html>
  )
}