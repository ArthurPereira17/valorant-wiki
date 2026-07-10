import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const FUNCOES = ["Todos", "Duelista", "Sentinela", "Iniciador", "Controlador"]

export default function Agentes() {
  const [agentes, setAgentes] = useState([])
  const [busca, setBusca] = useState("")
  const [funcao, setFuncao] = useState("Todos")
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    fetch("http://127.0.0.1:8000/agentes")
      .then(r => r.json())
      .then(data => {
        setAgentes(data.data)
        setLoading(false)
      })
  }, [])

  const filtrados = agentes.filter(a => {
    const nomeBate = a.displayName.toLowerCase().includes(busca.toLowerCase())
    const funcaoBate = funcao === "Todos" || a.role?.displayName === funcao
    return nomeBate && funcaoBate
  })

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-red-500 uppercase tracking-widest mb-6">Agentes</h2>
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Buscar agente..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="bg-gray-900 border border-red-600 text-white px-4 py-2 rounded w-full max-w-sm outline-none"
        />
        <div className="flex gap-2 flex-wrap">
          {FUNCOES.map(f => (
            <button
              key={f}
              onClick={() => setFuncao(f)}
              className={`px-4 py-2 rounded text-xs uppercase tracking-widest font-bold transition-colors border ${
                funcao === f
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-gray-900 border-gray-700 text-gray-400 hover:border-red-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
      {loading ? (
        <p className="text-gray-400">Carregando...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filtrados.map(agente => (
            <div
              key={agente.uuid}
              onClick={() => navigate(`/agentes/${agente.displayName}`)}
              className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-colors rounded p-3 flex flex-col items-center gap-2 cursor-pointer hover:bg-gray-800"
            >
              <img src={agente.displayIcon} alt={agente.displayName} className="w-20 h-20 object-contain" />
              <p className="text-sm font-bold uppercase tracking-wide text-center">{agente.displayName}</p>
              <p className="text-xs text-red-400">{agente.role?.displayName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}