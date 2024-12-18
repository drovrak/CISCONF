<?php include 'includes/header.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CISCONF - Configuration Cisco</title>
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="styles/index.css">
</head>
<body>
    <!-- Hero Section -->
    <section id="home" class="hero">
        <div class="hero-content">
            <h2>Créez, générez et configurez vos réseaux Cisco facilement</h2>
            <p>Une interface intuitive pour les professionnels et étudiants du réseau.</p>
            <a href="#services" class="btn">Découvrir nos services</a>
        </div>
    </section>

    <!-- About Section -->
    <section id="about">
        <div class="container">
            <h2>A propos de CISCONF</h2>
            <p>Notre outil vous permet de générer des commandes de configuration pour routeurs et switches Cisco en toute simplicité. Nous simplifions la configuration des équipements réseau tout en fournissant des références fiables pour l'apprentissage.</p>
        </div>
    </section>

    <!-- Services Section -->
    <section id="services">
        <div class="container">
            <h2>Nos Services</h2>
            <div class="services-grid">
                <a href="configuration.php" class="service-card">
                    <h3>Génération de Configurations</h3>
                    <p>Créez des fichiers <code>show running-config</code> personnalisés rapidement.</p>
                </a>
                <a href="#" class="service-card">
                    <h3>Prise en Main Facile</h3>
                    <p>Une interface claire et intuitive pour les novices comme les experts.</p>
                </a>
                <a href="#" class="service-card">
                    <h3>Support Technique</h3>
                    <p>Une équipe disponible pour vous accompagner dans vos projets réseaux.</p>
                </a>
            </div>
        </div>
    </section>

    <!-- Contact Section -->
    <section id="contact">
        <div class="container">
            <h2>Contactez-nous</h2>
            <form>
                <label for="name">Nom :</label>
                <input type="text" id="name" placeholder="Votre nom">

                <label for="email">Email :</label>
                <input type="email" id="email" placeholder="Votre email">

                <label for="message">Message :</label>
                <textarea id="message" rows="5" placeholder="Votre message"></textarea>

                <button type="submit" class="btn">Envoyer</button>
            </form>
        </div>
    </section>

<?php include 'includes/footer.php'; ?>
</body>
</html>
