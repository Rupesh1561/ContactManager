from flask import Flask,render_template,redirect,url_for,request,jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
import os,json,uuid,re


app=Flask(__name__)
app.config.from_object(Config)

UPLOAD_FOLDER = 'static/profiles/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
# Ensure the folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


db=SQLAlchemy(app)
migrate = Migrate(app,db)

from controllers import add_contact,get_all_contacts,delete_contact,update_contact,allowed_file
from models import Contact


@app.route('/')
def index():
    try:
        contacts = get_all_contacts()
        return contacts
    except Exception as e:
        return jsonify({"error":f"something went wrong while fetching contact {str(e)}"})

@app.route('/add',methods=['POST'])
def add():
    try:
        #handling sent text data
        contact = json.loads(request.form.get('data',{}))
        for i in ['firstName','lastName','email','mobileNo','gender']:
            if i not in contact:
                return jsonify({'error':'required fields are missing'})

        #handling sent image profile    
        profile_path="static/profiles/default.png"
        if 'profile' not in request.files:
            profile_path="static/profiles/default.png"
        else:
        
            profile = request.files['profile']

            if not allowed_file(profile.filename):
                return jsonify({"error": "File type not allowed"}), 400
            
            # Save the profile with a custom name (e.g., using key1 or any unique identifier)
            filename = f"{uuid.uuid4()}_{profile.filename}"
            filename = re.sub(r'[() ]', '_', filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            profile_path=file_path
            
            # Save the profile to the specific folder
            profile.save(file_path)


        msg=add_contact(contact["firstName"],contact['lastName'],contact['gender'],contact['email'],contact['mobileNo'],contact.get('description','Null'),profile_path)
        db.session.commit()
        return msg
    
    except Exception as e:
         db.session.rollback()
         return jsonify({"error":f"something went wrong while Adding contact {str(e)}"})

@app.route('/update<int:id>',methods=['PATCH'])
def update(id):
    try:
        contact = Contact.query.get(id)
        data = json.loads(request.form.get('data','{}'))
        if not contact:
            return jsonify({'error': 'Contact not found'}), 404

        profile_path="static/profiles/default.png"
        # Check if the 'profile' part is in the request
        if 'profile' not in request.files:
            profile_path=Contact.query.get(id).profile
        else:
        
            profile = request.files['profile']

            # Check if the profile has an allowed extension
            if not allowed_file(profile.filename):
                return jsonify({"error": "File type not allowed"}), 400
            
            
            if os.path.exists(contact.profile) and contact.profile.split('/')[-1] != "default.jpg":
              os.remove(contact.profile)

            # Save the profile with a custom name (e.g., using key1 or any unique identifier)
            filename = f"{uuid.uuid4()}_{profile.filename}"
            filename1 = re.sub(r'[() ]', '_', filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename1)
            profile_path=file_path

            
            # Save the profile to the specific folder
            profile.save(profile_path)
        msg=update_contact(id,data.get('firstName',contact.first_name),data.get('lastName',contact.last_name),data.get('gender',contact.gender),data.get('email',contact.email),data.get('mobileNo',contact.mobile_no),data.get('description',contact.description),profile_path)
        db.session.commit()
        return msg
    except Exception as e:
         db.session.rollback()
         return jsonify({'error':f"something went wrong while update contact {str(e)}"})
    
@app.route('/delete<int:id>',methods=['DELETE'])
def delete(id):
    try:
        contact = Contact.query.get(id)
        if not contact:
            return jsonify({'error':'Contact not found'})
        if os.path.exists(contact.profile) and contact.profile.split('/')[-1] != "default.jpg":
              os.remove(contact.profile)
        msg= delete_contact(contact.id)
        db.session.commit()
        return msg
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':f'something went wrong while delete contact {str(e)}'})
    
    