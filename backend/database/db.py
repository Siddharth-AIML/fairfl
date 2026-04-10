import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Load .env file
load_dotenv()

# Get Mongo URI
MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("MONGO_URI is not set in .env file")

# Connect to MongoDB
client = MongoClient(MONGO_URI)

db = client["fairfl"]

clients_collection = db["clients"]
users_collection = db["users"]