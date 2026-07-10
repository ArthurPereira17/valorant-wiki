import { Link } from "react-router-dom"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] gap-8 px-4 text-center">
      <h1 className="text-6xl font-bold text-red-500 tracking-widest uppercase">Valorant Wiki</h1>
      <p className="text-gray-400 text-lg max-w-xl">
        Explore agentes, mapas, armas e estatísticas de jogadores.
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {[
          { label: "Agentes", path: "/agentes" },
          { label: "Mapas", path: "/mapas" },
          { label: "Armas", path: "/armas" },
          { label: "Jogador", path: "/jogador" },
        ].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="bg-gray-900 border border-red-600 hover:bg-red-600 transition-colors px-8 py-6 rounded text-sm font-bold uppercase tracking-widest"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  )
}
