# 📌 CISCONF - Outil de configuration Cisco

## 📖 Résumé
CISCONF est une application permettant de générer et gérer des fichiers de configuration pour les équipements réseau **Cisco** via une interface web conviviale. Elle est conçue pour être facilement déployable grâce à **Docker**.

---

## 🚀 Fonctionnalités
✔️ Génération de fichiers de configuration Cisco  
✔️ Interface web ergonomique et intuitive  
✔️ Enregistrement et chargement de configurations  
✔️ Journalisation des actions effectuées  
✔️ Déploiement simplifié avec **Docker**  

---

## 🏗️ Technologies utilisées
- **Backend** : Python avec Flask  
- **Frontend** : HTML / CSS / JavaScript  
- **Conteneurisation** : Docker & Docker Compose  
- **Gestion des logs** : Fichiers journaux pour le suivi des actions  
- **Système de fichiers** : Stockage des configurations générées  

---

## 🛠️ Installation et déploiement

### ✅ Prérequis
- [Python 3.12]
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)
- **Git** (optionnel, pour cloner le projet)

### 📥 Installation rapide
```bash
# Cloner le projet
git clone https://github.com/utilisateur/CISCONF.git

# Aller dans le dossier
cd CISCONF

# Lancer le conteneur
docker-compose up -d
```
L’application sera accessible à l’adresse : [http://ciscconf.boby.ovh/](http://cisconf.boby.ovh)

---

## 🎯 Utilisation

### 🖥️ Interface Web  
*(Ajouter ici une image de l'interface)*

1. **Accéder à l'interface web** depuis un navigateur.  
2. **Choisir les paramètres** pour la configuration Cisco.  
3. **Générer et télécharger** le fichier `running-config`.  

### ⚙️ Options disponibles
```bash
- Mode d'accès : SSH / Telnet  
- Protocoles actifs : OSPF / BGP / EIGRP / Static Routes  
- Services additionnels : DHCP, NAT, ACL  
- Personnalisation : Nom du routeur, interfaces réseau, VLAN  
```


---

## 📂 Structure du projet

```bash
CISCONF/
│-- app/
│   ├── flask_main.py        # Serveur Flask
│   ├── main_class.py        # Gestion des configurations
│   ├── child_class.py       # Classes secondaires
│   ├── tools.py             # Fonctions utilitaires
│   ├── static/              # CSS et JS
│   ├── templates/           # Fichiers HTML/PHP
│-- logs/                    # Logs d'exécution
│-- Dockerfile               # Fichier Docker
│-- docker-compose.yml       # Configuration Docker Compose
```

---

## 🔧 Développement et contribution

Les contributions sont les bienvenues !  

### 💡 Comment contribuer ?
```bash
1. Fork ce dépôt 📌  
2. Créer une branche de développement  
3. Implémenter vos modifications  
4. Soumettre une Pull Request  
```

### 📌 TODO
```bash
- 🔄 Améliorer l'interface utilisateur  
- 📡 Ajouter des fonctions cisco  
- 🔒 Améliorer la gestion des permissions & des sécurités 
```

---

### 🔗 Liens utiles
```bash
- Documentation Cisco : https://www.cisco.com/c/en/us/support/docs.html    
```

