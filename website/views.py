from flask import Blueprint, render_template

views = Blueprint('views', __name__)

@views.route('/')
def home():
    return render_template("home.html", active_page="home")

@views.route('/path')
def path():
    return render_template("path.html")

@views.route('/todo')
def todo():
    return render_template("todo.html")
