import { useEffect, useState } from "react"

export default function Mapas() {
  const [mapas, setMapas] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://127.0.0.1:8000/mapas")
      .then(r => r.json())
      .then(data => {
        const filtrados = data.data.filter(m => m.displayName && m.splash)
        setMapas(filtrados)
        setLoading(false)
      })
  }, [])

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-red-500 uppercase tracking-widest mb-6">Mapas</h2>
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {mapas.map(mapa => (
            <div key={mapa.uuid} className="relative rounded overflow-hidden border border-gray-800 hover:border-red-600 transition-colors">
              <img src={mapa.splash} alt={mapa.displayName} className="w-full h-48 object-cover opacity-70" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <p className="font-bold text-lg uppercase tracking-widest">{mapa.displayName}</p>
                <p className="text-xs text-gray-400">{mapa.narrativeDescription ?? "Mapa competitivo"}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
