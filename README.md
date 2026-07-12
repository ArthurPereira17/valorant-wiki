# 🎯 Valorant Wiki

Site completo sobre Valorant com informações de agentes, mapas, armas e estatísticas de jogadores.

🔗 **[Acesse o site](https://valorant-wiki-topaz.vercel.app)**

---

## 📸 Preview

| Agentes | Detalhe do Agente | Armas |
|--------|-------------------|-------|
| Grid com filtro por função | Habilidades e melhores mapas | Stats e tabela de dano |

---

## ✨ Funcionalidades

- 🧑‍🤝‍🧑 **Agentes** — Grid completo com filtro por função (Duelista, Sentinela, Iniciador, Controlador) e busca por nome
- 🔍 **Detalhe do Agente** — Portrait, descrição, habilidades com ícones e melhores mapas para cada agente
- 🗺️ **Mapas** — Todos os mapas com splash art e descrição
- 🔫 **Armas** — Grid com busca, página de detalhe com estatísticas e tabela de dano por parte do corpo
- 👤 **Jogador** — Busca por nick#tag com perfil, nível, rank atual e agentes mais jogados

---

## 🛠️ Tecnologias

### Frontend
- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Router](https://reactrouter.com/)

### Backend
- [Python](https://python.org/) + [FastAPI](https://fastapi.tiangolo.com/)
- [httpx](https://www.python-httpx.org/)

### APIs
- [valorant-api.com](https://valorant-api.com/) — Agentes, mapas e armas
- [Henrik Dev API](https://docs.henrikdev.xyz/) — Estatísticas de jogadores

### Deploy
- **Frontend:** [Vercel](https://vercel.com/)
- **Backend:** [Render](https://render.com/)

---

## 🚀 Como rodar localmente

### Pré-requisitos
- Python 3.10+
- Node.js 18+

### Backend

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

O backend estará disponível em `http://localhost:8000`

### Frontend

```bash
cd frontend
npm install
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

> **Obs:** Para rodar localmente, altere as URLs no frontend de `https://valorant-wiki-fmzs.onrender.com` para `http://127.0.0.1:8000`

---

## 📁 Estrutura do Projeto

```
valorant-site/
├── backend/
│   ├── main.py          # Endpoints da API
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── Agentes.jsx
    │   │   ├── AgenteDetalhe.jsx
    │   │   ├── Mapas.jsx
    │   │   ├── Armas.jsx
    │   │   ├── ArmaDetalhe.jsx
    │   │   └── Jogador.jsx
    │   ├── components/
    │   │   └── Navbar.jsx
    │   └── App.jsx
    └── vercel.json
```

---

## 👨‍💻 Autor

Desenvolvido por **Arthur Nascimento Pereira**

[![GitHub](https://img.shields.io/badge/GitHub-ArthurPereira17-black?logo=github)](https://github.com/ArthurPereira17)
