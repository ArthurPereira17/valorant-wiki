import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Agentes from "./pages/Agentes"
import AgenteDetalhe from "./pages/AgenteDetalhe"
import Mapas from "./pages/Mapas"
import MapaDetalhe from "./pages/MapaDetalhe"
import Armas from "./pages/Armas"
import ArmaDetalhe from "./pages/ArmaDetalhe"
import Jogador from "./pages/Jogador"

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-950 text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agentes" element={<Agentes />} />
          <Route path="/agentes/:nome" element={<AgenteDetalhe />} />
          <Route path="/mapas" element={<Mapas />} />
          <Route path="/mapas/:nome" element={<MapaDetalhe />} />
          <Route path="/armas" element={<Armas />} />
          <Route path="/armas/:nome" element={<ArmaDetalhe />} />
          <Route path="/jogador" element={<Jogador />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
