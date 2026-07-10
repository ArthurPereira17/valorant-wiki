import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="bg-gray-900 border-b border-red-600 px-8 py-4 flex items-center gap-8">
      <Link to="/" className="text-red-500 font-bold text-xl tracking-widest uppercase">
        Valorant Wiki
      </Link>
      <Link to="/agentes" className="hover:text-red-400 transition-colors uppercase text-sm tracking-wide">Agentes</Link>
      <Link to="/mapas" className="hover:text-red-400 transition-colors uppercase text-sm tracking-wide">Mapas</Link>
      <Link to="/armas" className="hover:text-red-400 transition-colors uppercase text-sm tracking-wide">Armas</Link>
      <Link to="/jogador" className="hover:text-red-400 transition-colors uppercase text-sm tracking-wide">Jogador</Link>
    </nav>
  )
}
