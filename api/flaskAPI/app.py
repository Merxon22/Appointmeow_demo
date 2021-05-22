import time
from flask import Flask, request, json

import userDb

app = Flask(__name__)

def UserSerializer(user):
    return{
        "userName": user.userName
    }

@app.route("/api", methods=['GET'])
def index():
    allUsersNames = userDb.AllUserNames()
    print(type(allUsersNames[0]))
    return{ "userName": allUsersNames}
    #return jsonify([*map(UserSerializer, allUsers)])
    #return {'time': time.time()}

@app.route("/api/createuser", methods=['POST'])
def CreateUser():
    data = json.loads(request.data)
    print(data)
    #print(data["content"])
    #userDb.CreateUser(data["content"], "testEmail@whittleschool.org", "testPassword", "testIdentity", 11, "testHomeroom")
    return {'201': 'user created successfully'}

@app.route("/name/<string:firstName>")    
def name(firstName):
    return firstName

if __name__ == "__main__":
    app.run(debug=False)