import logging
from logging.handlers import RotatingFileHandler
from flask import Flask, request, jsonify, render_template
from main_class import *
from child_class import *
from tools import prefixe_vers_masque
from os import path,makedirs

# Création du dossier logs s'il n'existe pas
if not path.exists("logs"):
    makedirs("logs")

# Format des logs
log_format = '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'

# Logger pour les événements généraux
general_log_handler = RotatingFileHandler('logs/general.log', maxBytes=10**6, backupCount=10, encoding='utf-8')
general_log_handler.setLevel(logging.INFO)
general_log_handler.setFormatter(logging.Formatter(log_format))
general_logger = logging.getLogger('general_logger')
general_logger.setLevel(logging.INFO)
general_logger.addHandler(general_log_handler)

# Logger pour les erreurs
error_log_handler = RotatingFileHandler('logs/error.log', maxBytes=10**6, backupCount=10, encoding='utf-8')
error_log_handler.setLevel(logging.ERROR)
error_log_handler.setFormatter(logging.Formatter(log_format))
error_logger = logging.getLogger('error_logger')
error_logger.setLevel(logging.ERROR)
error_logger.addHandler(error_log_handler)

# Désactiver la propagation des logs vers le logger Flask par défaut
general_logger.propagate = False
error_logger.propagate = False

# Initialisation de l'application Flask
app = Flask(__name__)


# Route principale
@app.route("/")
def home():
    general_logger.info("Accès à la page d'accueil")
    return render_template("index.php", title="Accueil")

@app.route('/configuration.php')
def configuration():
    return render_template('configuration.php', config='')

@app.route('/includes/header.php')
def header():
    return render_template('includes/header.php')

@app.route('/includes/footer.php')
def footer():
    return render_template('includes/footer.php')


# Route pour exécuter les fonctions
@app.route('/execute', methods=['POST'])
def execute_commands():
    try:
        data = request.get_json()  # Recevoir les données JSON envoyées depuis le frontend
        general_logger.info(f"Requête reçue avec les commandes : {data}")

        if not isinstance(data, list):
            raise ValueError("Les données reçues doivent être une liste de commandes valides.")

        # Remplacement de eval() pour éviter les failles de sécurité
        data_rendu = "\n".join([str(function) for function in data])

        general_logger.info("Configuration générée avec succès")
        return data_rendu
    except Exception as e:
        error_logger.error(f"Erreur lors de l'exécution des fonctions : {str(e)}", exc_info=True)
        return jsonify({"error": "Une erreur est survenue"}), 500


# Gestion des erreurs 404
@app.errorhandler(404)
def page_not_found(e):
    error_logger.warning(f"Page non trouvée : {request.path}")
    return render_template('404.html'), 404


# Gestion des erreurs 500
@app.errorhandler(500)
def server_error(e):
    error_logger.error(f"Erreur serveur : {e}", exc_info=True)
    return render_template('500.html'), 500


if __name__ == '__main__':
    general_logger.info("Démarrage de l'application Flask")
    app.run(debug=True)