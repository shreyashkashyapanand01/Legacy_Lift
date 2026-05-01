<p align="center">
  <img src="https://img.shields.io/badge/Python-3.13+-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/FastAPI-2.0-009688?style=for-the-badge&logo=fastapi&logoColor=white" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/LangGraph-Agentic_AI-FF6F00?style=for-the-badge" />
  <img src="https://img.shields.io/badge/FAISS-Vector_Search-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

<h1 align="center">🚀 LegacyLift</h1>
<h3 align="center">AI-Powered Legacy Code Modernization Engine</h3>

<p align="center">
  <i>Upload legacy codebases. Get intelligent refactoring, automated test generation, execution validation, and engineering-grade quality metrics — all powered by a multi-agent AI pipeline.</i>
</p>



------------------------------------------------------------

## 📌 Note on Repository Structure

LegacyLift was originally developed as a **distributed system across two separate repositories** — one for the **AI Engine** and one for the **Frontend UI**. This separation was intentionally designed to follow **real-world software engineering practices**, enabling independent development, scalability, and a clear separation of concerns.

This repository serves as a **centralized project hub**, created specifically to provide a **unified overview of the entire system**. It consolidates all components in one place to make it easier for reviewers, recruiters, and collaborators to understand the complete architecture, system flow, and integration between services without navigating multiple repositories individually.

By combining the documentation here, the project becomes more **accessible, well-structured, and resume-friendly**, while the actual implementation remains modular and maintained in their respective repositories.

---
## 🔗 Project Repositories

- 🤖 **AI Engine (Python + LangGraph)**  
https://github.com/shreyashkashyapanand01/LegacyLift_AI_Engine.git

- 🎨 **Frontend (React 19)**  
https://github.com/shreyashkashyapanand01/LegacyLift_UI.git

------------------------------------------------------------


---

## 📖 Overview

**LegacyLift** is a full-stack AI platform that transforms legacy Python and Java codebases into modern, maintainable software. It goes far beyond simple linting — LegacyLift builds an intelligent understanding of your code through AST parsing, semantic embeddings, and RAG-powered retrieval, then deploys a coordinated pipeline of LLM agents to analyze, refactor, test, and validate every change.

### The Problem

Legacy codebases accumulate technical debt: high cyclomatic complexity, poor maintainability, missing tests, and tangled dependencies. Manual refactoring is slow, error-prone, and expensive.

### The Solution

LegacyLift automates the entire modernization workflow:

1. **Upload** a ZIP of your legacy project
2. **Query** specific areas for improvement (e.g., _"Refactor the database connection handling"_)
3. **Receive** AI-generated refactored code with diff analysis, automated tests, execution validation, quality metrics, and an accept/reject decision — all in seconds

---

## ✨ Features

| Feature | Description |
|---|---|
| 🧠 **Multi-Agent AI Pipeline** | Four specialized LLM agents (Analyzer → Refactor → Test Generator → Validator) orchestrated via LangGraph with conditional retry logic |
| 🔍 **RAG-Powered Code Search** | Semantic code retrieval using FAISS vector store + `e5-base-v2` sentence embeddings with hybrid scoring (vector + keyword + function matching) |
| 🌳 **AST-Level Parsing** | Deep code understanding via Python `ast` and `javalang` parsers — extracts functions, methods, dependencies, and call graphs |
| 🔄 **Refactor Engine** | Code cleaning, auto-formatting (`autopep8`), diff generation, syntax validation, and structured change explanations |
| 🐳 **Sandboxed Execution** | Docker-isolated test execution for both original and refactored code with output comparison |
| 📊 **Engineering Metrics** | Cyclomatic complexity, Halstead metrics, LOC analysis, maintainability index, and quality scoring with before/after comparison |
| ⚖️ **Decision Engine** | Automated ACCEPT / REJECT / REVIEW decisions based on execution results and metric improvements |
| 🔌 **Multi-LLM Support** | Swap between OpenAI (GPT-4o), Groq (Llama 3.3 70B), and Google Gemini via environment config |
| 🎨 **Modern React Dashboard** | Glassmorphism UI with animated panels for code diff, metrics visualization, execution results, and AI insights |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        LEGACY LIFT PLATFORM                        │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌─────────────┐        ┌──────────────────────────────────────┐   │
│  │  React UI   │──HTTP──│         FastAPI Backend (v2.0)       │   │
│  │  (Vite)     │        │                                      │   │
│  │             │        │  /index ──► Indexing Pipeline         │   │
│  │  • Upload   │        │  /query ──► Query + AI Pipeline      │   │
│  │  • Query    │        │  /parse ──► Parse-Only Mode          │   │
│  │  • Results  │        │  /health ─► Health Check             │   │
│  └─────────────┘        └──────────┬───────────────────────────┘   │
│                                    │                                │
│                    ┌───────────────┴───────────────┐                │
│                    ▼                               ▼                │
│  ┌─────────────────────────┐   ┌──────────────────────────────┐   │
│  │   MODULE 1: Parsing     │   │   MODULE 2: RAG Pipeline     │   │
│  │   • ZIP Extraction      │   │   • Document Building        │   │
│  │   • Project Scanning    │   │   • Code Chunking            │   │
│  │   • AST Parsing (Py/J)  │   │   • Embedding (e5-base-v2)  │   │
│  │   • Dependency Mapping  │   │   • FAISS Indexing           │   │
│  │   • Schema Validation   │   │   • Hybrid Retrieval         │   │
│  └─────────────────────────┘   └──────────────┬───────────────┘   │
│                                                │                    │
│                    ┌───────────────────────────┘                    │
│                    ▼                                                │
│  ┌──────────────────────────────────────────────────────────────┐  │
│  │              MODULE 3: LangGraph Agent Pipeline              │  │
│  │                                                              │  │
│  │   ┌──────────┐   ┌──────────┐   ┌────────┐   ┌──────────┐  │  │
│  │   │ Analyzer │──►│ Refactor │──►│  Test  │──►│Validator │  │  │
│  │   │  Agent   │   │  Agent   │   │ Agent  │   │  Agent   │  │  │
│  │   └──────────┘   └──────────┘   └────────┘   └────┬─────┘  │  │
│  │                                                    │        │  │
│  │                    ◄── Conditional Retry (max 2) ──┘        │  │
│  └──────────────────────────────────────────────────────────────┘  │
│                    │                                                │
│       ┌────────────┼────────────────┐                              │
│       ▼            ▼                ▼                              │
│  ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌────────────────────┐  │
│  │ MODULE 4 │ │ MODULE 5 │ │  MODULE 6  │ │  DECISION ENGINE   │  │
│  │ Refactor │ │Execution │ │  Metrics   │ │                    │  │
│  │ Engine   │ │ Engine   │ │  Pipeline  │ │  ACCEPT / REJECT   │  │
│  │          │ │          │ │            │ │  / REVIEW           │  │
│  │ • Clean  │ │ • Docker │ │ • Complex. │ │                    │  │
│  │ • Format │ │ • Run Py │ │ • Halstead │ │  Based on exec +   │  │
│  │ • Diff   │ │ • Run Jv │ │ • Maint.   │ │  metrics results   │  │
│  │ • Explain│ │ • Compare│ │ • Quality  │ │                    │  │
│  └──────────┘ └──────────┘ └────────────┘ └────────────────────┘  │
│                                                                     │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 📂 Folder Structure

```
LegacyLift/
├── LegacyLift_Ai_Engine/              # 🔥 Backend (FastAPI + AI Pipeline)
│   ├── main.py                         # App entry point
│   ├── pyproject.toml                  # Dependencies & project config
│   ├── requirements.txt               # Pip dependencies
│   ├── .env                           # API keys & LLM config
│   ├── workspace/                     # Runtime workspace for job files
│   ├── logs/                          # Rotating log files
│   │
│   └── parsing/
│       ├── api/
│       │   ├── main.py                # FastAPI app + CORS + route registration
│       │   ├── routes/
│       │   │   ├── health.py          # GET /health
│       │   │   ├── parse.py           # POST /parse (parse-only mode)
│       │   │   ├── index.py           # POST /index (indexing pipeline)
│       │   │   └── query.py           # POST /query (full AI pipeline)
│       │   └── services/
│       │       ├── parse_service.py   # Parse orchestration logic
│       │       └── rag_service.py     # Full RAG + Agent + Metrics pipeline
│       │
│       ├── core/                      # MODULE 1: Parsing Core
│       │   ├── zip_handler.py         # ZIP extraction & workspace mgmt
│       │   ├── scanner.py             # Project directory scanner
│       │   ├── parser.py              # Parser entry point
│       │   └── orchestrator.py        # Scan → Parse → Deps → Validate
│       │
│       ├── analyzers/                 # AST Analysis
│       │   ├── ast_parser.py          # Python AST + Java javalang parsing
│       │   └── dependency_mapper.py   # Import/dependency graph extraction
│       │
│       ├── rag/                       # MODULE 2 + 3: RAG + Agents
│       │   ├── preprocessing/         # Document building from parsed output
│       │   ├── chunking/              # Smart code chunking with expansion
│       │   ├── embedding/             # Sentence-transformer embeddings
│       │   ├── vector_store/          # FAISS index + persistence manager
│       │   ├── retrieval/             # Hybrid retrieval with scoring
│       │   ├── pipeline/              # RAG pipeline orchestrator
│       │   ├── llm/                   # LLM config & provider abstraction
│       │   ├── agents/                # LangGraph multi-agent system
│       │   │   ├── analyzer/          # Code analysis agent
│       │   │   ├── refactor/          # Code refactoring agent
│       │   │   ├── test_generator/    # Test case generation agent
│       │   │   ├── validator/         # Validation agent
│       │   │   ├── orchestrator/      # LangGraph flow + router + state
│       │   │   ├── prompts/           # Agent prompt templates
│       │   │   ├── schemas/           # Pydantic state models
│       │   │   ├── config/            # Agent settings (LLM, retries)
│       │   │   └── utils/             # LLM client + tracer
│       │   ├── refactor_engine/       # MODULE 4: Post-processing engine
│       │   │   ├── cleaner/           # Code cleaning
│       │   │   ├── formatter/         # Python (autopep8) & Java formatting
│       │   │   ├── diff/              # Diff generation
│       │   │   ├── explanation/       # Change explanation builder
│       │   │   ├── validation/        # Syntax validation
│       │   │   └── pipeline/          # Refactor pipeline orchestrator
│       │   └── models/                # RAG response schemas
│       │
│       ├── execution_engine/          # MODULE 5: Execution Validation
│       │   ├── runner/                # Python & Java code runners
│       │   ├── sandbox/               # Docker sandbox + temp workspace
│       │   ├── test_handler/          # Test case injection & parsing
│       │   ├── comparator/            # Output comparison engine
│       │   ├── executor/              # Execution manager
│       │   └── validator/             # Validation engine
│       │
│       ├── metrics/                   # MODULE 6: Quality Metrics
│       │   ├── extractors/            # Complexity, LOC, Halstead, Maintainability
│       │   ├── feature_builder/       # Feature engineering
│       │   ├── comparator/            # Before/after comparison
│       │   ├── scorer/                # Quality scoring
│       │   ├── analyzer/              # Improvement analysis & risk assessment
│       │   ├── pipeline/              # Metrics pipeline orchestrator
│       │   └── models/                # Metrics schemas
│       │
│       ├── models/                    # Schema builder
│       ├── shared/                    # Shared Pydantic models
│       ├── config/                    # App settings & supported languages
│       └── utils/                     # File I/O, logging, path & validation utils
│
└── Legacy_Lift_UI/                    # 🎨 Frontend (React + Vite)
    ├── package.json                   # Node dependencies
    ├── index.html                     # Entry HTML
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS config
    └── src/
        ├── App.jsx                    # Root component
        ├── main.jsx                   # React mount
        ├── index.css                  # Global styles
        ├── App.css                    # App-level styles
        ├── pages/
        │   └── Home.jsx               # Main dashboard page
        ├── components/
        │   ├── UploadSection.jsx      # ZIP upload with drag-and-drop
        │   ├── QuerySection.jsx       # Query input for AI analysis
        │   ├── CodeViewer.jsx         # Side-by-side code diff viewer
        │   ├── MetricsPanel.jsx       # Engineering metrics visualization
        │   ├── AnalysisPanel.jsx      # AI insights & suggestions
        │   ├── ExecutionPanel.jsx     # Test execution results
        │   └── DecisionBadge.jsx      # Accept/Reject/Review badge
        └── services/
            └── api.js                 # Axios API client
```

---

## ⚙️ How It Works (Step-by-Step)

### Phase 1 — Indexing (`POST /index`)

```
ZIP Upload → Extract → Scan → AST Parse → Build Documents → Chunk → Embed → FAISS Index → Save
```

1. **ZIP Extraction** — Uploaded archive is extracted into an isolated workspace directory
2. **Project Scanning** — Walks the directory tree, identifies `.py` and `.java` files, ignores `__pycache__`, `.git`, `node_modules`
3. **AST Parsing** — Extracts every function/method with full code snippets, line numbers, and metadata using Python's `ast` module and `javalang`
4. **Dependency Mapping** — Traces all `import` statements to build a dependency graph
5. **Document Building** — Converts parsed functions into structured documents for RAG
6. **Code Chunking** — Smart chunking with brace-matching expansion for small functions and size limiting for large ones
7. **Embedding** — Generates normalized vector embeddings using `intfloat/e5-base-v2` via SentenceTransformers
8. **FAISS Indexing** — Stores vectors in a FAISS `IndexFlatIP` index for cosine similarity search
9. **Persistence** — Saves the FAISS index and metadata to disk via pickle

### Phase 2 — Query & AI Pipeline (`POST /query`)

```
Query → Embed → Retrieve → Agent Pipeline → Refactor Engine → Execution → Metrics → Decision
```

1. **Hybrid Retrieval** — Embeds the query, searches FAISS, then applies hybrid scoring (55% vector similarity + 25% keyword overlap + 20% function name match) with language filtering and deduplication
2. **LangGraph Agent Pipeline** — Runs four sequential agents:
   - **Analyzer Agent** — Identifies code issues, anti-patterns, and improvement suggestions
   - **Refactor Agent** — Generates refactored code with change explanations
   - **Test Generator Agent** — Creates unit tests and edge cases
   - **Validator Agent** — Validates refactored code quality and correctness
   - If validation fails, the pipeline **retries** the refactor cycle (up to 2 retries)
3. **Refactor Engine** — Cleans, formats (autopep8/Java), generates diffs, builds change explanations, validates syntax
4. **Execution Engine** — Runs both original and refactored code against generated tests inside Docker containers, compares outputs
5. **Metrics Pipeline** — Computes cyclomatic complexity, LOC, Halstead volume/difficulty/effort, maintainability index, and quality scores for before and after
6. **Decision Engine** — Issues ACCEPT (metrics improved + tests pass), REJECT (tests fail or quality degraded), or REVIEW (trade-off detected)

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | Async REST API framework |
| **Python 3.13+** | Core language |
| **LangGraph** | Multi-agent workflow orchestration |
| **LangChain** | LLM abstractions |
| **FAISS** | High-performance vector similarity search |
| **SentenceTransformers** | Code embedding generation (`e5-base-v2`) |
| **Pydantic** | Data validation and schema enforcement |
| **javalang** | Java AST parser |
| **autopep8** | Python code auto-formatting |
| **Docker** | Sandboxed code execution |
| **Uvicorn** | ASGI server |

### LLM Providers (Configurable)
| Provider | Model |
|---|---|
| **Groq** | `llama-3.3-70b-versatile` (default) |
| **OpenAI** | `gpt-4o-mini` |
| **Google Gemini** | `gemini-1.5-flash` |

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite** | Build tool & dev server |
| **Tailwind CSS** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Lucide React** | Icon library |
| **Axios** | HTTP client |

---

## 🚀 Installation & Setup

### Prerequisites

- Python 3.13+
- Node.js 18+
- Docker (for execution engine)
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/shreyashkashyapanand01/Legacy_Lift.git
cd LegacyLift
```

### 2. Backend Setup

```bash
cd LegacyLift_Ai_Engine

# Create virtual environment
python -m venv .venv

# Activate (Windows)
.venv\Scripts\activate

# Activate (macOS/Linux)
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Configure Environment Variables

Create or edit `.env` in `LegacyLift_Ai_Engine/`:

```env
# Embedding
EMBEDDING_MODEL=intfloat/e5-base-v2
DEVICE=cpu
HF_TOKEN=your_huggingface_token

# LLM Provider (choose one)
LLM_PROVIDER=groq
LLM_MODEL=llama-3.3-70b-versatile
LLM_TEMPERATURE=0.2

# API Keys (set the one matching your provider)
OPENAI_API_KEY=your_openai_key
GROQ_API_KEY=your_groq_key
GEMINI_API_KEY=your_gemini_key

# System
MAX_RETRIES=2
DEBUG=true
```

### 4. Start Backend Server

```bash
uvicorn parsing.api.main:app --reload --port 8000
```

### 5. Frontend Setup

```bash
cd ../Legacy_Lift_UI

# Install dependencies
npm install

# Start dev server
npm run dev
```

The frontend will be available at `http://localhost:5173` and connects to the backend at `http://localhost:8000`.

---

## 🔌 API Documentation

### `GET /health`

Health check endpoint.

**Response:**
```json
{ "status": "ok" }
```

---

### `POST /parse`

Parse a ZIP file and extract code structure (parse-only, no AI).

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| `file` | `UploadFile` | ZIP archive of the project |

**Response:**
```json
{
  "job_id": "uuid",
  "result": {
    "project": "my-project",
    "files": [{ "path": "main.py", "language": "python" }],
    "functions": [{
      "id": "main.py::calculate",
      "function": "calculate",
      "file": "main.py",
      "line": 1,
      "end_line": 10,
      "type": "function",
      "language": "python",
      "code": "def calculate(x): ..."
    }],
    "dependencies": [{
      "source": "main.py",
      "target": "os",
      "type": "import",
      "language": "python"
    }]
  }
}
```

---

### `POST /index`

Upload and index a project for RAG-powered querying.

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| `file` | `UploadFile` | ZIP archive of the project |

**Response:**
```json
{
  "message": "Indexing successful",
  "job_id": "550e8400-e29b-41d4-a716-446655440000"
}
```

---

### `POST /query`

Run the full AI analysis pipeline on an indexed project.

**Request:** `application/json`
```json
{
  "job_id": "550e8400-e29b-41d4-a716-446655440000",
  "query": "Refactor the database connection handling",
  "top_k": 3
}
```

**Response:**
```json
{
  "results": [{
    "score": 0.92,
    "code": "def connect_db(): ...",
    "file": "db/connection.py",
    "function": "connect_db",
    "language": "python"
  }],
  "context": "File: db/connection.py\nFunction: connect_db\n...",
  "analysis": {
    "issues": ["No connection pooling", "Missing error handling"],
    "patterns": ["Singleton anti-pattern detected"],
    "suggestions": ["Add connection pooling", "Implement retry logic"]
  },
  "refactor": {
    "code": "def connect_db(): # improved ...",
    "changes": ["Added connection pooling", "Added error handling"],
    "explanation": "Refactored to use connection pooling..."
  },
  "refactor_engine": {
    "language": "python",
    "formatting_applied": true,
    "original_code": "...",
    "refactored_code": "...",
    "diff": { "added": [], "removed": [], "modified": [] },
    "explanations": [{ "change": "...", "impact": "...", "type": "..." }],
    "validation": { "is_valid": true, "errors": [] }
  },
  "execution_validation": {
    "status": "PASS",
    "confidence": 1.0,
    "summary": "All tests passed successfully.",
    "failed_cases": []
  },
  "metrics": {
    "before": { "complexity": 8, "loc": 45, "maintainability": 52.3, ... },
    "after": { "complexity": 4, "loc": 38, "maintainability": 71.8, ... },
    "comparison": { "complexity_reduction": 4, "complexity_reduction_pct": 50.0, ... },
    "score": { "before": 45.2, "after": 72.1, "improvement": 26.9 },
    "analysis": { "summary": "...", "quality_level": "Good", "risk": "Low", ... }
  },
  "decision": {
    "status": "ACCEPT",
    "reason": "Refactor is valid and beneficial"
  },
  "tests": { "unit_tests": ["..."], "edge_cases": ["..."] },
  "validation": { "is_valid": true, "confidence": 0.95, "errors": [], "warnings": [] }
}
```

---

## 📸 UI Features

The React dashboard provides a complete visualization of the AI pipeline results:

- **Upload Panel** — Drag-and-drop ZIP upload with progress feedback and file size display
- **Query Panel** — Natural language input to describe desired improvements
- **Decision Badge** — Color-coded ACCEPT (green) / REJECT (red) / REVIEW (yellow) indicator
- **Code Viewer** — Side-by-side diff view of original vs. refactored code
- **Metrics Panel** — Animated before/after comparison of complexity, LOC, maintainability, and Halstead effort with trend indicators
- **Execution Panel** — Test execution results with pass/fail status and confidence score
- **Analysis Panel** — AI-generated insights including suggestions, key improvements, risk assessment, and confidence level

---

## 🧪 Testing

The project includes unit tests across all major modules:

```bash
cd LegacyLift_Ai_Engine

# Run all tests
python -m pytest

# Run specific module tests
python -m pytest parsing/analyzers/test_ast_parser.py
python -m pytest parsing/core/test_scanner.py
python -m pytest parsing/rag/pipeline/test_rag_pipeline.py
python -m pytest parsing/rag/chunking/test_chunker.py
python -m pytest parsing/rag/embedding/test_embedder.py
python -m pytest parsing/rag/vector_store/test_faiss.py
python -m pytest parsing/rag/retrieval/test_retriever.py
python -m pytest parsing/execution_engine/runner/test_python_runner.py
python -m pytest parsing/metrics/pipeline/test_metrics_pipeline.py
```

Test coverage spans:
- AST parsing (Python & Java)
- Project scanning
- Code chunking & embedding
- FAISS vector store operations
- RAG retrieval accuracy
- Refactor engine pipeline
- Execution engine runners
- Metrics extraction & scoring
- Agent orchestration

---

## 💡 Why This Project Stands Out

| Aspect | Details |
|---|---|
| **Not just a wrapper** | Custom-built RAG pipeline with FAISS, hybrid scoring, and smart chunking — not a simple ChatGPT wrapper |
| **Production architecture** | Clean modular design with 6 distinct processing modules, Pydantic schema validation, and structured logging |
| **Multi-agent orchestration** | LangGraph-powered agent pipeline with conditional routing and automatic retry on validation failure |
| **End-to-end validation** | Refactored code is actually executed in Docker sandboxes and compared against original behavior |
| **Quantitative metrics** | Halstead metrics, cyclomatic complexity, and maintainability index provide objective quality measurement |
| **Multi-language support** | Handles both Python and Java codebases with language-specific parsers and runners |

---

## 🎯 Use Cases

- **Enterprise Modernization** — Assess and refactor legacy enterprise Java/Python applications
- **Technical Debt Reduction** — Quantify and systematically reduce complexity across a codebase
- **Code Review Automation** — Get AI-powered suggestions with confidence scores before merging
- **Education** — Learn refactoring best practices by seeing before/after diffs with explanations
- **Due Diligence** — Evaluate code quality of acquired software assets with objective metrics

---

## 📈 Future Enhancements

- [ ] Support for additional languages (JavaScript/TypeScript, C#, Go)
- [ ] Persistent database storage (PostgreSQL) for job history and analytics
- [ ] Batch processing for multi-file refactoring in a single query
- [ ] WebSocket-based real-time progress updates during pipeline execution
- [ ] GitHub/GitLab integration for direct repository import
- [ ] User authentication and project management dashboard
- [ ] Export refactored code as downloadable ZIP or pull request
- [ ] Custom prompt templates for domain-specific refactoring rules
- [ ] GPU-accelerated embedding generation for large codebases
- [ ] CI/CD integration for automated quality gates

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Guidelines

- Follow existing code structure and naming conventions
- Add unit tests for new modules
- Update documentation for API changes
- Use Pydantic models for all data schemas
- Ensure all agent prompts are stored in `prompts/` directory as `.txt` files

---

## 🧑‍💻 Author

**Built with purpose** — This project demonstrates advanced software engineering across AI/ML systems, distributed architecture, and modern full-stack development.

- Architecture: Modular, production-grade Python backend with React frontend
- AI: Multi-agent LLM orchestration with RAG retrieval and semantic search
- Engineering: Docker sandboxing, Pydantic validation, rotating logs, and comprehensive test coverage

---

<p align="center">
  <b>⭐ Star this repo if LegacyLift helps you modernize legacy code!</b>
</p>
