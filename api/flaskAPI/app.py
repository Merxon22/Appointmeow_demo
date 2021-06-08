from configparser import ExtendedInterpolation
import datetime
from flask import Flask, request, json, redirect
import userDb, eventDb
import random, string

app = Flask(__name__)

@app.route("/register/createuser", methods=["POST"])
def CreateUser():
    data = json.loads(request.data)
    print(data["identity"])
    message = userDb.CreateUser(data["username"] + "@whittleschool.org", data["password"], data["identity"])
    return {"message": message}

@app.route("/login/verify", methods=["POST"])
def VerifyLogin():
    print("Verifying login")
    data = json.loads(request.data)
    email = data["username"] + "@whittleschool.org"
    pw = userDb.UserPassword(email)
    verified = (pw == data["password"] and pw != "")
    loginKey = ""
    if verified:
        loginKey = ''.join(random.choice(string.ascii_lowercase + string.digits) for _ in range(32))
        userDb.UpdateLoginKey(loginKey, email)
    return {
        "message": verified,
        "loginKey": loginKey
    }

def DateTimeToDate(timeValue):
    """Extract date from a dateTime variable and return ot in string format 'YYYY-MM-DD'"""
    return timeValue.strftime("%Y") + "-" + timeValue.strftime("%m") + "-" + timeValue.strftime("%d")

@app.route("/home/events/<loginKey>", methods = ["POST"])
def GetEvents(loginKey):
    data = json.loads(request.data)
    today = data["date"]
    today = today.split("-")
    today = datetime.datetime(int(today[0]), int(today[1]), int(today[2]))
    weekDay = int(data["weekday"])
    startDay = today + datetime.timedelta(days = (0-weekDay))
    endDay = today + datetime.timedelta(days = (6 - weekDay))
    email = userDb.EmailByKey(loginKey)
    if email == "":
        return {"message": False}
    else:
        results = eventDb.UserEventsBetweenDate(email, DateTimeToDate(startDay), DateTimeToDate(endDay))
        for i in range(len(results)):
            result = results[i]
            dict = {
                "eventID": result[0],
                "title": result[1],
                "description": result[2],
                "startTime": result[3],
                "endTime": result[4],
                "email": result[5]
            }
            results[i] = dict
        return {"message": results}

@app.route("/home/createevent", methods = ["POST"])
def CreateEvent():
    data = json.loads(request.data)
    email = userDb.EmailByKey(data["loginKey"])
    message = eventDb.CreateEvent(data[""], data[""], data[""], data[""], email)
    return {"message": message}


@app.route("/logout/<loginKey>", methods = ["POST"])
def ConfirmLogout(loginKey):
    data = json.loads(request.data)
    if data["logOut"] == True:
        userDb.EraseLoginKey(loginKey)

# @app.route("/home/<string: email>", methods=["GET"])
# def HomePage():

if __name__ == "__main__":
    app.run(debug=False)