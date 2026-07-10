import { useState } from "react"

export default function Jogador() {
  const [nick, setNick] = useState("")
  const [tag, setTag] = useState("")
  const [dados, setDados] = useState(null)
  const [stats, setStats] = useState(null)
  const [erro, setErro] = useState("")
  const [loading, setLoading] = useState(false)

  const buscar = async () => {
    if (!nick || !tag) return
    setLoading(true)
    setErro("")
    setDados(null)
    setStats(null)

    try {
      const [perfil, agentes] = await Promise.all([
        fetch(`http://127.0.0.1:8000/jogador/${nick}/${tag}`).then(r => r.json()),
        fetch(`http://127.0.0.1:8000/jogador/${nick}/${tag}/agentes`).then(r => r.json()),
      ])

      if (perfil.status !== 200) {
        setErro("Jogador não encontrado.")
      } else {
        setDados(perfil.data)
        setStats(agentes)
      }
    } catch {
      setErro("Erro ao buscar jogador.")
    }

    setLoading(false)
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold text-red-500 uppercase tracking-widest mb-6">Buscar Jogador</h2>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Nick"
          value={nick}
          onChange={e => setNick(e.target.value)}
          className="bg-gray-900 border border-red-600 text-white px-4 py-2 rounded outline-none flex-1"
        />
        <input
          type="text"
          placeholder="Tag (ex: BR1)"
          value={tag}
          onChange={e => setTag(e.target.value)}
          className="bg-gray-900 border border-red-600 text-white px-4 py-2 rounded outline-none w-32"
        />
        <button
          onClick={buscar}
          className="bg-red-600 hover:bg-red-700 transition-colors px-4 py-2 rounded font-bold uppercase text-sm"
        >
          Buscar
        </button>
      </div>

      {loading && <p className="text-gray-400">Carregando...</p>}
      {erro && <p className="text-red-400">{erro}</p>}

      {dados && (
        <div className="flex flex-col gap-6">
          {/* Perfil */}
          <div className="bg-gray-900 border border-red-600 rounded p-6 flex items-center gap-6">
            <img src={dados.card?.small} alt={dados.name} className="rounded-full w-20 h-20 object-cover border-2 border-red-600" />
            <div>
              <p className="text-2xl font-bold">{dados.name}<span className="text-red-500">#{dados.tag}</span></p>
              <p className="text-gray-400 text-sm mt-1">Região: {dados.region?.toUpperCase()}</p>
              <p className="text-gray-400 text-sm">Nível da conta: {dados.account_level}</p>
            </div>
          </div>

          {/* Stats por agente */}
          {stats?.agente_stats && Object.keys(stats.agente_stats).length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-red-500 uppercase tracking-widest mb-4">
                Agentes Recentes (últimas 20 partidas)
              </h3>
              <div className="flex flex-col gap-2">
                {Object.entries(stats.agente_stats)
                  .sort((a, b) => b[1].partidas - a[1].partidas)
                  .map(([agente, s]) => (
                    <div key={agente} className="bg-gray-900 border border-gray-800 rounded p-4 flex items-center justify-between">
                      <p className="font-bold uppercase tracking-wide">{agente}</p>
                      <div className="flex gap-6 text-sm">
                        <span className="text-gray-400">{s.partidas} partidas</span>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* MMR */}
          {stats?.mmr?.data && (
            <div className="bg-gray-900 border border-gray-800 rounded p-4">
              <h3 className="text-lg font-bold text-red-500 uppercase tracking-widest mb-3">Rank Atual</h3>
              <div className="flex items-center gap-4">
                {stats.mmr.data.current?.tier?.name && (
                  <p className="text-xl font-bold">{stats.mmr.data.current.tier.name}</p>
                )}
                {stats.mmr.data.current?.rr !== undefined && (
                  <p className="text-gray-400">{stats.mmr.data.current.rr} RR</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
