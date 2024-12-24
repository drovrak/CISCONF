from flask import Flask, request, jsonify, render_template
from main_class import *
from child_class import *
from tools import prefixe_vers_masque


import os

app = Flask(__name__)


@app.route('/execute', methods=['POST'])
def execute_functions():
    data = request.json.get('commands', [])  # Recevoir les données JSON envoyées depuis le frontend
    configuration = "".join([eval(function) for function in data])



    return render_template("index.html", config=configuration)

if __name__ == 'main':
    app.run(debug=True)
    
