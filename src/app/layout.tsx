import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'
import { GoogleTagManager } from '@next/third-parties/google'
import { UsePageView } from '@/hooks/usePageView'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'L0gic - Make Data Happen',
  description: 'Gerando e Centralizando Análises e Otimizando Custos! Descubra novas oportunidades para desenvolver seus resultados com nosso time.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <GoogleTagManager gtmId="GTM-K8NGP84L" />
      <body className={inter.className}>
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8NGP84L"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <UsePageView />
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}