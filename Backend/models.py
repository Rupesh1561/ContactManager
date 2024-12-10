from app import db
from sqlalchemy.sql import func

class Contact(db.Model):
    id=db.Column(db.Integer, primary_key=True,autoincrement=True)
    first_name=db.Column(db.String(80),nullable=False,unique=False)
    last_name=db.Column(db.String(80),nullable=False,unique=False)
    gender = db.Column(db.String(10))
    email=db.Column(db.String(120),nullable=False)
    mobile_no=db.Column(db.String(15),nullable=False)
    description =db.Column(db.String(300),nullable=True)
    profile=db.Column(db.String(120),nullable=True,default="static/uploads/default.img")
    created_date = db.Column(db.DateTime, default=func.now())

    def to_json(self):
        return {
            "id":self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "gender":self.gender,
            "email":self.email,
            "mobileNo":self.mobile_no,
            "description":self.description,
            "profile":self.profile,
            "created_date":self.created_date
        }
    
    