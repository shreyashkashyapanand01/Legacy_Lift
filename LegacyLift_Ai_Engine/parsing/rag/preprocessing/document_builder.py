import logging
from typing import List, Dict

from parsing.utils.path_utils import normalize_path

logger = logging.getLogger(__name__)


def build_documents(parsed_output: Dict, root_path: str) -> List[Dict]:
    """
    Converts parsed JSON -> documents for RAG
    """

    documents = []

    try:
        functions = parsed_output.get("functions", [])

        for func in functions:

            #   FIX 1: schema compatibility
            function_name = func.get("function") or func.get("name", "")

            #   FIX 2: use parser-provided code (FAST + CORRECT)
            code_snippet = func.get("code", "")

            if not code_snippet.strip():
                continue

            doc = {
                "text": code_snippet,
                "metadata": {
                    "id": func.get("id"),
                    "file": normalize_path(func.get("file")),
                    "function": function_name,
                    "language": func.get("language"),
                    "start_line": func.get("line"),
                    "end_line": func.get("end_line")
                }
            }

            documents.append(doc)

        logger.info(f"Built {len(documents)} documents from parsed output")

        return documents

    except Exception:
        logger.exception("Failed to build documents")
        raise RuntimeError("Document building failed")