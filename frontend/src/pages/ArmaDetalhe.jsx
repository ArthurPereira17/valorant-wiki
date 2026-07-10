import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"

export default function ArmaDetalhe() {
  const { nome } = useParams()
  const navigate = useNavigate()
  const [arma, setArma] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://valorant-wiki-fmzs.onrender.com/armas")
      .then(r => r.json())
      .then(data => {
        const encontrada = data.data.find(a => a.displayName.toLowerCase() === nome.toLowerCase())
        setArma(encontrada)
        setLoading(false)
      })
  }, [nome])

  if (loading) return <p className="p-8 text-gray-400">Carregando...</p>
  if (!arma) return <p className="p-8 text-red-400">Arma não encontrada.</p>

  const dano = arma.weaponStats?.damageRanges?.[0]

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate("/armas")}
        className="text-red-500 hover:text-red-400 text-sm uppercase tracking-widest mb-6 flex items-center gap-2"
      >
        ← Voltar
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row gap-8 items-center mb-12 bg-gray-900 border border-gray-800 rounded p-8">
        <img src={arma.displayIcon} alt={arma.displayName} className="w-64 object-contain" />
        <div className="flex flex-col gap-3">
          <p className="text-red-500 text-sm uppercase tracking-widest">{arma.shopData?.category ?? "Habilidade"}</p>
          <h1 className="text-4xl font-bold uppercase tracking-widest">{arma.displayName}</h1>
          {arma.shopData && (
            <p className="text-gray-400">{arma.shopData.cost} créditos</p>
          )}
        </div>
      </div>

      {/* Stats gerais */}
      {arma.weaponStats && (
        <>
          <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Estatísticas</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-12">
            {[
              { label: "Cadência de tiro", valor: arma.weaponStats.fireRate + " tiros/s" },
              { label: "Munição", valor: arma.weaponStats.magazineSize },
              { label: "Tempo de recarga", valor: arma.weaponStats.reloadTimeSeconds + "s" },
              { label: "Balas por rajada", valor: arma.weaponStats.shotgunPelletCount > 1 ? arma.weaponStats.shotgunPelletCount : "—" },
              { label: "Precisão ao correr", valor: arma.weaponStats.runSpeedMultiplier + "x" },
              { label: "Zoom", valor: arma.weaponStats.zoomMultiplier ? arma.weaponStats.zoomMultiplier + "x" : "—" },
            ].map(stat => (
              <div key={stat.label} className="bg-gray-900 border border-gray-800 rounded p-4">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{stat.label}</p>
                <p className="text-lg font-bold">{stat.valor}</p>
              </div>
            ))}
          </div>

          {/* Dano por parte do corpo */}
          {arma.weaponStats.damageRanges?.length > 0 && (
            <>
              <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Dano por Parte do Corpo</h2>
              <div className="overflow-x-auto mb-12">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-800 text-gray-400 uppercase tracking-widest text-xs">
                      <th className="py-3 text-left">Alcance</th>
                      <th className="py-3 text-center">Cabeça</th>
                      <th className="py-3 text-center">Corpo</th>
                      <th className="py-3 text-center">Pernas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {arma.weaponStats.damageRanges.map((range, i) => (
                      <tr key={i} className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
                        <td className="py-3 text-gray-400">{range.rangeStartMeters}m – {range.rangeEndMeters}m</td>
                        <td className="py-3 text-center text-red-400 font-bold">{Math.round(range.headDamage)}</td>
                        <td className="py-3 text-center font-bold">{Math.round(range.bodyDamage)}</td>
                        <td className="py-3 text-center text-gray-400">{Math.round(range.legDamage)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {/* Skins */}
      {arma.skins?.length > 0 && (
        <>
          <h2 className="text-2xl font-bold text-red-500 uppercase tracking-widest mb-4">Skins</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {arma.skins.filter(s => s.displayIcon).slice(0, 8).map(skin => (
              <div key={skin.uuid} className="bg-gray-900 border border-gray-800 hover:border-red-600 transition-colors rounded p-3 flex flex-col items-center gap-2">
                <img src={skin.displayIcon} alt={skin.displayName} className="w-24 h-12 object-contain" />
                <p className="text-xs text-center text-gray-400">{skin.displayName}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
