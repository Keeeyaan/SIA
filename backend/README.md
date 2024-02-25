# Installation

To set up and run the project, follow these steps:

1. Create a virtual environment (recommended):

```
python -m venv venv
```

Activate the virtual environment:

- Linux/macOS:

```
source venv/bin/activate
```

- Windows:

```
.\venv\Scripts\activate
```

2. Install the required Python packages from the requirements.txt file:

```
pip install -r requirements.txt
```

3. Do not forget to add .env file - these are the environment variables you should have: Contact the owner for the .env contents.

4. Run the server using Uvicorn with the following command:

```
python -m main
```

The server should now be accessible at http://127.0.0.1:8000.
