from beanie import Document

class Inquiry(Document):
    token: str
    inquiry: str
    version: str
    tag: str

    class Settings:
        name = "inquiries"

    class Config:
        json_schema_extra = {
            "example": {
                "token": "m0,`wF=U_N1(r+D&I0c_3/)g£f<^3o-j7&e?<W'M>!I£36i£V]",
                "inquiry": "What is your name?",
                "version": "version_2.2",
                "tag": "about",
            }
        }