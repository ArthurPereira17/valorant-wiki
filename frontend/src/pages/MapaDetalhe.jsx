import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

const COMPOSICOES_POR_MAPA = {
  "Ascent": [
    {
      nome: "Composição Padrão",
      descricao: "Controle de mid com Killjoy e informação constante do Sova. Omen e Skye abrem entradas.",
      agentes: ["Jett", "Sova", "Omen", "Killjoy", "Skye"]
    },
    {
      nome: "Composição Agressiva",
      descricao: "KAY/O suprime utilidades inimigas enquanto Neon e Raze criam espaço rapidamente.",
      agentes: ["Neon", "Raze", "KAY/O", "Brimstone", "Skye"]
    },
    {
      nome: "Composição Defensiva",
      descricao: "Cypher e Killjoy travam o mapa inteiro. Astra controla rounds lentos com fumaças globais.",
      agentes: ["Chamber", "Sova", "Astra", "Killjoy", "Cypher"]
    }
  ],
  "Bind": [
    {
      nome: "Composição Padrão",
      descricao: "Raze domina os corredores estreitos. Cypher e Skye garantem informação nos teleportes.",
      agentes: ["Raze", "Cypher", "Skye", "Viper", "Omen"]
    },
    {
      nome: "Composição de Controle",
      descricao: "Viper bloqueia ângulos críticos. Brimstone e Astra controlam os sites com fumaças precisas.",
      agentes: ["Viper", "Brimstone", "Fade", "Killjoy", "Jett"]
    }
  ],
  "Haven": [
    {
      nome: "Composição Padrão",
      descricao: "Três sites exigem muita informação. Sova e Skye revelam posições enquanto Omen cria pressão.",
      agentes: ["Jett", "Sova", "Omen", "Skye", "Killjoy"]
    },
    {
      nome: "Composição Rápida",
      descricao: "KAY/O e Breach abrem entradas violentamente. Neon chega antes dos inimigos se reposicionarem.",
      agentes: ["Neon", "Breach", "KAY/O", "Brimstone", "Sage"]
    }
  ],
  "Split": [
    {
      nome: "Composição Padrão",
      descricao: "Mapa vertical favorece Raze e Jett. Cypher trava flancos e Breach abre mid com força.",
      agentes: ["Raze", "Jett", "Breach", "Cypher", "Sage"]
    },
    {
      nome: "Composição de Controle",
      descricao: "Omen e Viper bloqueiam visão nos ângulos altos. KAY/O suprime sentinelas defensivas.",
      agentes: ["Omen", "Viper", "KAY/O", "Killjoy", "Skye"]
    }
  ],
  "Icebox": [
    {
      nome: "Composição Padrão",
      descricao: "Viper é essencial no site B. Sova revela posições no mapa aberto e Jett opera nos ângulos altos.",
      agentes: ["Jett", "Sova", "Viper", "Killjoy", "Skye"]
    },
    {
      nome: "Composição Alternativa",
      descricao: "Chamber controla ângulos longos. KAY/O e Breach forçam entradas no site A.",
      agentes: ["Chamber", "Breach", "KAY/O", "Viper", "Fade"]
    }
  ],
  "Breeze": [
    {
      nome: "Composição Padrão",
      descricao: "Mapa aberto favorece operadores. Viper divide o site B. Sova tem linizações poderosas.",
      agentes: ["Jett", "Sova", "Viper", "Astra", "Skye"]
    },
    {
      nome: "Composição Alternativa",
      descricao: "Chamber domina os corredores longos. KAY/O e Fade controlam informação no mid.",
      agentes: ["Chamber", "Fade", "KAY/O", "Viper", "Omen"]
    }
  ],
  "Fracture": [
    {
      nome: "Composição Padrão",
      descricao: "Mapa de dois lados exige muito utilitário. Breach e KAY/O criam pressão simultânea.",
      agentes: ["Neon", "Breach", "KAY/O", "Brimstone", "Skye"]
    },
    {
      nome: "Composição Defensiva",
      descricao: "Killjoy e Cypher controlam os acessos duplos. Sova fornece informação constante.",
      agentes: ["Chamber", "Sova", "Brimstone", "Killjoy", "Skye"]
    }
  ],
  "Pearl": [
    {
      nome: "Composição Padrão",
      descricao: "Mapa fechado favorece sentinelas. Viper controla mid e Fade busca informação nos acessos.",
      agentes: ["Jett", "Fade", "Viper", "Killjoy", "Omen"]
    },
    {
      nome: "Composição Agressiva",
      descricao: "KAY/O e Breach forçam entradas rápidas. Neon explora os corredores internos.",
      agentes: ["Neon", "Breach", "KAY/O", "Brimstone", "Skye"]
    }
  ],
  "Lotus": [
    {
      nome: "Composição Padrão",
      descricao: "Três sites com portas giratórias. Fade e Skye revelam rotações. Viper divide sites.",
      agentes: ["Jett", "Fade", "Viper", "Killjoy", "Skye"]
    },
    {
      nome: "Composição de Controle",
      descricao: "Astra controla as rotações com fumaças globais. Cypher e KAY/O travam os flancos.",
      agentes: ["Chamber", "KAY/O", "Astra", "Cypher", "Skye"]
    }
  ],
  "Sunset": [
    {
      nome: "Composição Padrão",
      descricao: "Killjoy domina o site B. Sova e Fade fornecem informação constante no mid.",
      agentes: ["Jett", "Sova", "Omen", "Killjoy", "Skye"]
    },
    {
      nome: "Composição Agressiva",
      descricao: "Raze e Neon criam pressão rápida. KAY/O suprime sentinelas defensivas.",
      agentes: ["Raze", "Neon", "KAY/O", "Brimstone", "Fade"]
    }
  ]
}

export default function MapaDetalhe() {
  const { nome } = useParams()
  const navigate = useNavigate()
  const [mapa, setMapa] = useState(null)
  const [agentes, setAgentes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      fetch("https://valorant-wiki-fmzs.onrender.com/mapas").then(r => r.json()),
      fetch("https://valorant-wiki-fmzs.onrender.com/agentes").then(r => r.json())
    ]).then(([mapasData, agentesData]) => {
      const encontrado = mapasData.data.find(m => m.displayName.toLowerCase() === nome.toLowerCase())
      setMapa(encontrado)
      setAgentes(agentesData.data)
      setLoading(false)
    })
  }, [nome])

  const getAgente = (nomeAgente) =>
    agentes.find(a => a.displayName.toLowerCase() === nomeAgente.toLowerCase())

  const composicoes = COMPOSICOES_POR_MAPA[nome] || []

  if (loading) return <p className="p-8 text-gray-400">Carregando...</p>
  if (!mapa) return <p className="p-8 text-red-400">Mapa não encontrado.</p>

  return (
    <div className="max-w-5xl mx-auto p-8">
      <button
        onClick={() => navigate("/mapas")}
        className="text-red-500 hover:text-red-400 text-sm uppercase tracking-widest mb-6 flex items-center gap-2"
      >
        ← Voltar
      </button>

      {/* Header */}
      <div className="relative rounded overflow-hidden mb-10 border border-gray-800">
        <img src={mapa.splash} alt={mapa.displayName} className="w-full h-72 object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex flex-col justify-end p-8">
          <h1 className="text-5xl font-bold uppercase tracking-widest">{mapa.displayName}</h1>
          {mapa.narrativeDescription && (
            <p className="text-gray-400 mt-2 max-w-xl">{mapa.narrativeDescription}</p>
          )}
        </div>
      </div>

      {/* Composições */}
      <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-6">
        Melhores Composições
      </h2>

      {composicoes.length === 0 ? (
        <p className="text-gray-400">Composições não disponíveis para este mapa.</p>
      ) : (
        <div className="flex flex-col gap-6">
          {composicoes.map((comp, i) => (
            <div key={i} className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-colors rounded p-6">
              <h3 className="text-lg font-bold uppercase tracking-wide mb-1">{comp.nome}</h3>
              <p className="text-gray-400 text-sm mb-4">{comp.descricao}</p>
              <div className="flex gap-4 flex-wrap">
                {comp.agentes.map(nomeAgente => {
                  const agente = getAgente(nomeAgente)
                  return (
                    <div
                      key={nomeAgente}
                      onClick={() => navigate(`/agentes/${nomeAgente}`)}
                      className="flex flex-col items-center gap-1 cursor-pointer group"
                    >
                      {agente ? (
                        <img
                          src={agente.displayIcon}
                          alt={nomeAgente}
                          className="w-14 h-14 object-contain rounded border border-gray-700 group-hover:border-red-500 transition-colors"
                        />
                      ) : (
                        <div className="w-14 h-14 bg-gray-800 rounded border border-gray-700" />
                      )}
                      <p className="text-xs text-gray-400 group-hover:text-red-400 transition-colors uppercase tracking-wide">
                        {nomeAgente}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
