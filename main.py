# handle upload and chat api requests

# right now, this just checks the file and saves it
# not ready for question answering yet
from pathlib import Path
from uuid import uuid4
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
# connect frontend with fastapi
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["POST", "GET"],
    allow_headers=["*"],    
)
BASE_DIR = Path(__file__).resolve().parent
DATA_DIR = BASE_DIR / "data"
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10 MB

@app.get('/')
def home():
    return {"message": "chatbot backend is running"}

@app.post("/upload")
async def upload_paper(file: UploadFile = File(...)):
    filename = file.filename or ""
    if not filename.lower().endswith(".xml"):
        raise HTTPException(status_code=400, detail="Only XML files are allowed.")

    # check file size
    content = await file.read(MAX_FILE_SIZE + 1)
    await file.close()
    
    if not content:
        raise HTTPException(status_code=400, detail="The uploaded file is empty.")
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="The uploaded file is too large.")

    # generate a unique id for files
    paper_id = uuid4().hex
    file_path = DATA_DIR / f"{paper_id}.xml"

    file_path.write_bytes(content)
    return {"message": "Paper uploaded successfully", 
            "paper_id": paper_id,
            "filename": filename,
            "status": "saved"}
