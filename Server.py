from flask import Flask, request, jsonify, send_file
from pymongo import MongoClient
import bson.binary
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
import io
app = Flask(__name__)

# connecting to the mongoDb client 
cluster = MongoClient(
        host="localhost",
        port=27017, 
        serverSelectionTimeoutMS = 1000)

# giving the cluster name 
db  = cluster['RestaurantDB']

# giving the collection name 
user     = db['user']
productImage = db['productImage']

@app.route("/", methods=['GET'])
def startup():
    return "Connected to Restaurant Server"

#Create User
@app.route("/createuser",methods=['POST'])
def createUser():
    details = request.json
    email = request.json["email"]
    phoneNo = request.json["phoneNo"]
    password = generate_password_hash(request.json["password"], method='sha256', salt_length=8)
    details["password"] = password

    details["isAdmin"]= details.get('isAdmin',False)

    if(user.count_documents({"$or":[{"email":email},{"phoneNo":phoneNo}]}) == 0):
        user.insert_one(details)
        return 'Success'
    else:
        return 'User Already Exists'

#Login User
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    # Check if email and password are provided in the request
    if not email or not password:
        return jsonify({'error': 'Email and password are required'}), 400
    
    # Retrieve user from the database
    users = user.find_one({'email': email})
    users["_id"] = str(users["_id"])
    # Check if user exists and password is correct
    if not users or not check_password_hash(users['password'], password):
        return jsonify({'error': 'Invalid email or password'}), 401
    
    # Return success message with user information
    return jsonify({
        'message': 'Login successful',
        'user':users
    })

@app.route('/uploadimage', methods=['POST'])
def upload_image():
    file = request.files['image']
    filename = secure_filename(file.filename)
    with file.stream as f:
        image_data = bson.binary.Binary(f.read())
    result = productImage.insert_one({'filename': filename, 'image': image_data})
    return jsonify({'id': str(result.inserted_id)}), 201

@app.route('/getimage/<id>', methods=["GET"])
def get_image(id):
    document = productImage.find_one({'_id': bson.objectid.ObjectId(id)})
    if document is None or 'image' not in document:
        return 'Image not found', 404
    return send_file(io.BytesIO(document['image']), mimetype='image/jpeg')

if __name__ == "__main__":
    app.run(port=5000, debug=True)