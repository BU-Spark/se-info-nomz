import os
import sys

from flask import Flask, make_response
from flask_sqlalchemy import SQLAlchemy
from flask import render_template

app = Flask(__name__)
db = SQLAlchemy(app)

@app.route("/")
def root_site():
    return render_template("home.html")

@app.route("/history", methods="GET")
def show_history():
    return render_template("")
