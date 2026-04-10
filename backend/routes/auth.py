from fastapi import APIRouter, HTTPException
from database.db import users_collection

router = APIRouter()

@router.post("/login")
def login(data: dict):

    email = data.get("email")
    password = data.get("password")
    role = data.get("role")

    user = users_collection.find_one({
        "email": email,
        "password": password,
        "role": role
    })

    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "user": {
            "email": user["email"],
            "role": user["role"],
            "organization": user.get("organization", "")
        }
    }