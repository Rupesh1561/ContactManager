from models import db, Contact
from flask import jsonify


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg','JPG'}

def get_all_contacts():
    l=[]
    for i in Contact.query.order_by(Contact.created_date).all():
        l.append(i.to_json())
    return l,200

def add_contact(first_name,last_name,gender,email,mobile_no,description,profile):
    new_contact =Contact(first_name=first_name,last_name=last_name,gender=gender,email=email,mobile_no=mobile_no,description=description,profile=profile)
    db.session.add(new_contact)
    return get_all_contacts()


def delete_contact(contact_id):
    contact_to_delete = Contact.query.get(contact_id)
    db.session.delete(contact_to_delete)
    return get_all_contacts()

def update_contact(contact_id,first_name,last_name,gender,email,mobile_no,description,profile):
    contact = Contact.query.get(contact_id)
    contact.first_name = first_name
    contact.last_name = last_name
    contact.gender=gender
    contact.email = email
    contact.mobile_no = mobile_no
    contact.description=description
    contact.profile=profile

    return get_all_contacts()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


