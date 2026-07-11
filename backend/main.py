from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5174", "https://valorant-wiki-topaz.vercel.app"],
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_URL = "https://valorant-api.com/v1"
HENRIK_KEY = "HDEV-ab42080b-a9a4-45c5-800c-9b5f09d196fd"
HENRIK_URL = "https://api.henrikdev.xyz"

HEADERS_HENRIK = {"Authorization": HENRIK_KEY}

@app.get("/agentes")
async def listar_agentes():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/agents?isPlayableCharacter=true&language=pt-BR")
        return res.json()

@app.get("/agentes/{nome}")
async def buscar_agente(nome: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/agents?isPlayableCharacter=true&language=pt-BR")
        agentes = res.json()["data"]
        agente = next((a for a in agentes if a["displayName"].lower() == nome.lower()), None)
        return agente or {"erro": "Agente não encontrado"}

@app.get("/mapas")
async def listar_mapas():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/maps?language=pt-BR")
        return res.json()

@app.get("/armas")
async def listar_armas():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/weapons?language=pt-BR")
        return res.json()

@app.get("/jogador/{nick}/{tag}")
async def buscar_jogador(nick: str, tag: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{HENRIK_URL}/valorant/v1/account/{nick}/{tag}",
            headers=HEADERS_HENRIK
        )
        return res.json()

@app.get("/jogador/{nick}/{tag}/agentes")
async def stats_agentes_jogador(nick: str, tag: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{HENRIK_URL}/valorant/v2/mmr/pc/br/{nick}/{tag}",
            headers=HEADERS_HENRIK
        )
        mmr = res.json()

        res2 = await client.get(
            f"{HENRIK_URL}/valorant/v1/stored-matches/pc/br/{nick}/{tag}?mode=competitive&size=20",
            headers=HEADERS_HENRIK
        )
        matches = res2.json()

        agente_stats = {}
        for match in matches.get("data", []):
            agente = match.get("meta", {}).get("agent", {}).get("name")
            won = match.get("teams", {}).get("red", {}).get("won") or match.get("teams", {}).get("blue", {}).get("won")
            if agente:
                if agente not in agente_stats:
                    agente_stats[agente] = {"partidas": 0, "vitorias": 0}
                agente_stats[agente]["partidas"] += 1

        return {"mmr": mmr, "agente_stats": agente_stats}
BASE_URL = "https://valorant-api.com/v1"
HENRIK_KEY = "HDEV-ab42080b-a9a4-45c5-800c-9b5f09d196fd"
HENRIK_URL = "https://api.henrikdev.xyz"

HEADERS_HENRIK = {"Authorization": HENRIK_KEY}

@app.get("/agentes")
async def listar_agentes():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/agents?isPlayableCharacter=true&language=pt-BR")
        return res.json()

@app.get("/agentes/{nome}")
async def buscar_agente(nome: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/agents?isPlayableCharacter=true&language=pt-BR")
        agentes = res.json()["data"]
        agente = next((a for a in agentes if a["displayName"].lower() == nome.lower()), None)
        return agente or {"erro": "Agente não encontrado"}

@app.get("/mapas")
async def listar_mapas():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/maps?language=pt-BR")
        return res.json()

@app.get("/armas")
async def listar_armas():
    async with httpx.AsyncClient() as client:
        res = await client.get(f"{BASE_URL}/weapons?language=pt-BR")
        return res.json()

@app.get("/jogador/{nick}/{tag}")
async def buscar_jogador(nick: str, tag: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{HENRIK_URL}/valorant/v1/account/{nick}/{tag}",
            headers=HEADERS_HENRIK
        )
        return res.json()

@app.get("/jogador/{nick}/{tag}/agentes")
async def stats_agentes_jogador(nick: str, tag: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(
            f"{HENRIK_URL}/valorant/v2/mmr/pc/br/{nick}/{tag}",
            headers=HEADERS_HENRIK
        )
        mmr = res.json()

        res2 = await client.get(
            f"{HENRIK_URL}/valorant/v1/stored-matches/pc/br/{nick}/{tag}?mode=competitive&size=20",
            headers=HEADERS_HENRIK
        )
        matches = res2.json()

        agente_stats = {}
        for match in matches.get("data", []):
            agente = match.get("meta", {}).get("agent", {}).get("name")
            won = match.get("teams", {}).get("red", {}).get("won") or match.get("teams", {}).get("blue", {}).get("won")
            if agente:
                if agente not in agente_stats:
                    agente_stats[agente] = {"partidas": 0, "vitorias": 0}
                agente_stats[agente]["partidas"] += 1

        return {"mmr": mmr, "agente_stats": agente_stats}
