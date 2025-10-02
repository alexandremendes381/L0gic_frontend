import Link from 'next/link'
import ContactForm from '@/components/ContactForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white overflow-hidden relative">
      <div className="absolute left-0 top-0 w-px h-full bg-gray-600 opacity-20"></div>
      <div className="absolute right-0 top-0 w-px h-full bg-gray-600 opacity-20"></div>
      
      <nav className="relative z-20 flex items-center justify-between px-8 py-6 lg:px-12">
        <div className="flex items-center">
          <Link href="/" className="group">
            <span className="text-3xl font-bold text-logic-green tracking-wide hover:scale-105 transition-transform">
              l0gik
            </span>
          </Link>
        </div>
        <div className="hidden lg:flex items-center space-x-10">
        </div>
      </nav>

      <div className="relative z-10 min-h-[calc(100vh-100px)] flex items-center">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-12">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            
            <div className="lg:col-span-3 space-y-6 text-center lg:text-left order-2 lg:order-1">
              <div className="relative">
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-logic-green opacity-5 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-green-400 opacity-5 rounded-full blur-2xl"></div>
                
                <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                  <span className="text-white block">Gerando e</span>
                  <span className="text-white block">Centralizando</span>
                  <span className="text-logic-green block">Análises e</span>
                  <span className="text-logic-green block">Otimizando Custos!</span>
                </h1>
                
                <p className="mt-6 text-lg lg:text-xl text-gray-300 leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Descubra novas oportunidades para desenvolver seus resultados com nosso time.
                </p>
                
                <div className="mt-6 flex items-center justify-center lg:justify-start space-x-2">
                  <span className="text-logic-green font-bold text-lg">L0gik</span> 
                  <span className="text-gray-400">-</span>
                  <span className="text-gray-300 font-medium">Make Data Happen</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl p-6 lg:p-8 border border-gray-700/30 shadow-2xl max-w-lg mx-auto lg:mx-0">
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-logic-green/10 rounded-full mb-3">
                    <svg className="w-6 h-6 text-logic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h2 className="text-xl lg:text-2xl font-bold text-white mb-2">
                    Entre em Contato
                  </h2>
                  <p className="text-gray-400 text-sm">
                    Preencha o formulário e nossa equipe entrará em contato em breve.
                  </p>
                </div>
                
                <ContactForm />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}