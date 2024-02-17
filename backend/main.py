import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()
RELOAD = bool(os.getenv('RELOAD'))
if __name__ == "__main__":
    uvicorn.run("src.app:app", reload=RELOAD)
