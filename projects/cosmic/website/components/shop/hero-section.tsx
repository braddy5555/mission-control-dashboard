export function HeroSection() {
  return (
    <div className="bg-gradient-to-r from-blue-800 to-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          AI & Web3 Shop
        </h1>
        <p className="mt-4 max-w-3xl mx-auto text-xl text-blue-100">
          Van kant-en-klare AI-automatiseringen tot Web3-ecosystemen en digitale producten.
          Alles wat je nodig hebt om je business te transformeren.
        </p>
        <div className="mt-8">
          <a
            href="#products"
            className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
          >
            Bekijk Producten
          </a>
        </div>
      </div>
    </div>
  )
}