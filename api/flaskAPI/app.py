import time
from flask import Flask, render_template, request, redirect, url_for, jsonify

import userDb

app = Flask(__name__)

def UserSerializer(user):
    return{
        "userName": user.userName
    }

@app.route("/api", methods=['GET'])
def index():
    allUsers = userDb.AllUsers()
    return{ "userName": userDb.UserName("pyuan@whittleschool.org")}
    #return jsonify([*map(UserSerializer, allUsers)])
    #return {'time': time.time()}

@app.route("/name/<string:firstName>")    
def name(firstName):
    return firstName

if __name__ == "__main__":
    app.run(debug=False)