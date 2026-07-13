import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const POOL_COMPETITIVA = ["Summit", "Sunset", "Breeze", "Haven", "Lotus", "Split", "Ascent"]

export default function Mapas() {
  const [mapas, setMapas] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("https://valorant-wiki-fmzs.onrender.com/mapas")
      .then(r => r.json())
      .then(data => {
        const filtrados = data.data.filter(m => m.displayName && m.splash)
        setMapas(filtrados)
        setLoading(false)
      })
  }, [])

  const naPool = mapas.filter(m => POOL_COMPETITIVA.includes(m.displayName))
  const foraPool = mapas.filter(m => !POOL_COMPETITIVA.includes(m.displayName))

  const CardMapa = ({ mapa, competitivo }) => (
    <div
      onClick={() => navigate(`/mapas/${mapa.displayName}`)}
      className={`relative rounded overflow-hidden border transition-colors cursor-pointer group ${
        competitivo
          ? "border-red-600 hover:border-red-400"
          : "border-gray-800 hover:border-gray-600"
      }`}
    >
      <img
        src={mapa.splash}
        alt={mapa.displayName}
        className="w-full h-48 object-cover opacity-70 group-hover:opacity-90 transition-opacity"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      {competitivo && (
        <div className="absolute top-3 right-3 bg-red-600 text-white text-xs font-bold uppercase tracking-widest px-2 py-1 rounded">
          Pool Ativa
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 p-4">
        <p className="font-bold text-lg uppercase tracking-widest">{mapa.displayName}</p>
        <p className={`text-xs mt-1 ${competitivo ? "text-red-400" : "text-gray-500"}`}>
          {competitivo ? "Ver composições →" : "Fora da rotação competitiva"}
        </p>
      </div>
    </div>
  )

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-red-500 uppercase tracking-widest mb-2">Mapas</h2>
      <p className="text-gray-400 text-sm mb-8">
        Pool competitiva atual: <span className="text-red-400 font-bold">Act 4 — Patch 13.00</span>
      </p>

      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <>
          <h3 className="text-lg font-bold uppercase tracking-widest text-red-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full inline-block"></span>
            Pool Competitiva ({naPool.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {naPool.map(mapa => (
              <CardMapa key={mapa.uuid} mapa={mapa} competitivo={true} />
            ))}
          </div>

          <h3 className="text-lg font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-gray-500 rounded-full inline-block"></span>
            Fora da Rotação ({foraPool.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {foraPool.map(mapa => (
              <CardMapa key={mapa.uuid} mapa={mapa} competitivo={false} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}