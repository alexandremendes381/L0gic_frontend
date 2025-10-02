import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactQueryProvider } from '@/components/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'L0gic - Make Data Happen',
  description: 'Gerando e Centralizando Análises e Otimizando Custos! Descubra novas oportunidades para desenvolver seus resultados com nosso time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <ReactQueryProvider>
          {children}
        </ReactQueryProvider>
      </body>
    </html>
  )
}