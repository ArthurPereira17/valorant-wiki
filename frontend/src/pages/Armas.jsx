import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Armas() {
  const [armas, setArmas] = useState([])
  const [busca, setBusca] = useState("")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/armas")
      .then(r => r.json())
      .then(data => { setArmas(data.data); setLoading(false) })
  }, [])

  const filtradas = armas?.filter(a =>
    a.displayName.toLowerCase().includes(busca.toLowerCase())
  )

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-red-500 uppercase tracking-widest mb-6">Armas</h2>
      <input
        type="text"
        placeholder="Buscar arma..."
        value={busca}
        onChange={e => setBusca(e.target.value)}
        className="bg-gray-900 border border-red-600 text-white px-4 py-2 rounded mb-8 w-full max-w-sm outline-none"
      />
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtradas.map(arma => (
            <div
              key={arma.uuid}
              onClick={() => navigate(`/armas/${arma.displayName}`)}
              className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-colors rounded p-4 flex flex-col items-center gap-3 cursor-pointer hover:bg-gray-800"
            >
              <img src={arma.displayIcon} alt={arma.displayName} className="w-32 h-16 object-contain" />
              <p className="font-bold uppercase tracking-wide text-sm">{arma.displayName}</p>
              <p className="text-xs text-red-400">{arma.shopData?.category ?? "Habilidade"}</p>
              {arma.shopData && (
                <p className="text-xs text-gray-400">{arma.shopData.cost} créditos</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
