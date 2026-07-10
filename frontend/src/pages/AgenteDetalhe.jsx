import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function AgenteDetalhe() {
  const { nome } = useParams()
  const navigate = useNavigate()
  const [agente, setAgente] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch(`https://valorant-wiki-fmzs.onrender.com/agentes/${nome}`)
      .then(r => r.json())
      .then(data => { setAgente(data); setLoading(false) })
  }, [nome])

  if (loading) return <p className="p-8 text-gray-400">Carregando...</p>
  if (!agente || agente.erro) return <p className="p-8 text-red-400">Agente não encontrado.</p>

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <button
        onClick={() => navigate("/agentes")}
        className="text-red-500 hover:text-red-400 text-sm uppercase tracking-widest mb-6 flex items-center gap-2"
      >
        ← Voltar
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <img
          src={agente.fullPortrait}
          alt={agente.displayName}
          className="w-64 h-64 object-contain"
        />
        <div className="flex flex-col justify-center gap-3">
          <p className="text-red-500 text-sm uppercase tracking-widest">{agente.role?.displayName}</p>
          <h1 className="text-5xl font-bold uppercase tracking-widest">{agente.displayName}</h1>
          <p className="text-gray-400 max-w-xl leading-relaxed">{agente.description}</p>
          <div className="flex gap-2 mt-2">
            {agente.characterTags?.map(tag => (
              <span key={tag} className="bg-gray-800 border border-red-600 text-xs px-3 py-1 rounded-full uppercase tracking-wide">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Habilidades */}
      <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Habilidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
        {agente.abilities?.filter(a => a.displayName).map(habilidade => (
          <div key={habilidade.slot} className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-colors rounded p-4 flex gap-4">
            {habilidade.displayIcon && (
              <img src={habilidade.displayIcon} alt={habilidade.displayName} className="w-12 h-12 object-contain" />
            )}
            <div>
              <p className="font-bold uppercase tracking-wide text-sm">{habilidade.displayName}</p>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">{habilidade.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Melhores mapas (curadoria manual) */}
      <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Melhores Mapas</h2>
      <MelhoresMapas agente={agente.displayName} />
    </div>
  )
}

const MAPAS_POR_AGENTE = {
  "Cypher":   ["Bind", "Ascent", "Lotus"],
  "Killjoy":  ["Ascent", "Bind", "Haven"],
  "Sage":     ["Icebox", "Haven", "Pearl"],
  "Jett":     ["Breeze", "Fracture", "Ascent"],
  "Reyna":    ["Haven", "Ascent", "Split"],
  "Viper":    ["Icebox", "Breeze", "Pearl"],
  "Omen":     ["Haven", "Bind", "Lotus"],
  "Brimstone":["Ascent", "Split", "Fracture"],
  "Sova":     ["Icebox", "Breeze", "Bind"],
  "Breach":   ["Haven", "Split", "Fracture"],
  "Raze":     ["Split", "Bind", "Fracture"],
  "Skye":     ["Ascent", "Haven", "Lotus"],
  "Yoru":     ["Bind", "Split", "Haven"],
  "Astra":    ["Bind", "Breeze", "Pearl"],
  "KAY/O":    ["Ascent", "Haven", "Split"],
  "Chamber":  ["Breeze", "Fracture", "Ascent"],
  "Neon":     ["Fracture", "Split", "Haven"],
  "Fade":     ["Haven", "Lotus", "Ascent"],
  "Harbor":   ["Pearl", "Icebox", "Breeze"],
  "Gekko":    ["Ascent", "Bind", "Haven"],
  "Deadlock": ["Icebox", "Lotus", "Pearl"],
  "Iso":      ["Haven", "Ascent", "Split"],
  "Clove":    ["Bind", "Split", "Lotus"],
  "Vyse":     ["Icebox", "Pearl", "Lotus"],
  "Tejo":     ["Ascent", "Haven", "Fracture"],
  "Waylay":   ["Split", "Bind", "Haven"],
}

function MelhoresMapas({ agente }) {
  const mapas = MAPAS_POR_AGENTE[agente] || ["Ascent", "Haven", "Bind"]
  return (
    <div className="flex gap-3 flex-wrap mb-12">
      {mapas.map(mapa => (
        <span key={mapa} className="bg-gray-900 border border-red-600 px-6 py-3 rounded uppercase tracking-widest text-sm font-bold">
          {mapa}
        </span>
      ))}
    </div>
  )
}
