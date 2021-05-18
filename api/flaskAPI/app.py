import time
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route("/", methods=['GET'])
def index():
    return {
        "name" : "Hello world"
    }
@app.route("/name/<string:firstName>")
def name(firstName):
    return firstName

# if __name__ == "__main__":
#     app.run(debug=False)