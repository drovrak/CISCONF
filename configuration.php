<?php include 'includes/header.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personnalisation de Configuration - Cisconf</title>
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="styles/configuration.css">
</head>
<body>
    <main class="container">
        <h2>Personnalisation de Configuration</h2>
        <form id="configForm">
            <!-- Section Main Configuration -->
            <div class="config-section">
                <h3>
                    <label>Configuration Principale</label>
                </h3>
                <div>
                    <label>Nom d'hôte :</label>
                    <input type="text" id="hostname" placeholder="ROUTER1">
                    <label>Mot de passe enable secret :</label>
                    <input type="text" id="enableSecret" placeholder="cisco123">
                    <label>Message d'accueil :</label>
                    <input type="text" id="banner" placeholder="Bienvenue !">
                    <label><input type="checkbox" id="disableDomainLookup"> Désactiver la recherche de domaine IP</label>
                </div>
            </div>

            <!-- Section NTP -->
            <div class="config-section">
                <h3>
                    <label><input type="checkbox" onclick="toggleDetails(this)"> Configuration NTP</label>
                </h3>
                <div class="details">
                    <label>Serveur NTP :</label>
                    <input type="text" id="ntpServer" placeholder="192.168.1.1">
                    <label>Clé d'authentification :</label>
                    <input type="text" id="ntpAuthKey" placeholder="Clé123">
                    <label>Clé de confiance :</label>
                    <input type="text" id="ntpTrustedKey" placeholder="1">
                </div>
            </div>

            <!-- Section DHCP -->
            <div class="config-section">
                <h3>
                    <label><input type="checkbox" onclick="toggleDetails(this)"> Configuration DHCP</label>
                </h3>
                <div class="details">
                    <label>Nom du pool DHCP :</label>
                    <input type="text" id="dhcpPool" placeholder="POOL1">
                    <label>Adresse réseau :</label>
                    <input type="text" id="dhcpNetwork" placeholder="192.168.1.0">
                    <label>Masque :</label>
                    <input type="text" id="dhcpMask" placeholder="255.255.255.0">
                </div>
            </div>

            <!-- Section OSPF -->
            <div class="config-section">
                <h3>
                    <label><input type="checkbox" onclick="toggleDetails(this)"> Configuration OSPF</label>
                </h3>
                <div class="details">
                    <label>Numéro AS OSPF :</label>
                    <input type="text" id="ospfAsNumber" placeholder="1">
                    <label>Router ID :</label>
                    <input type="text" id="ospfRouterId" placeholder="1.1.1.1">
                    <label>Network :</label>
                    <input type="text" id="ospfNetwork" placeholder="192.168.1.0">
                    <label>Masque inversé :</label>
                    <input type="text" id="ospfMask" placeholder="0.0.0.255">
                    <label>Zone :</label>
                    <input type="text" id="ospfArea" placeholder="0">
                </div>
            </div>

            <!-- Section SSH -->
            <div class="config-section">
                <h3>
                    <label><input type="checkbox" onclick="toggleDetails(this)"> Configuration SSH</label>
                </h3>
                <div class="details">
                    <label>Nom de domaine :</label>
                    <input type="text" id="sshDomain" placeholder="exemple.com">
                    <label>Clé RSA (bits) :</label>
                    <input type="text" id="sshKey" placeholder="2048">
                    <label>Version SSH :</label>
                    <select id="sshVersion">
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                    </select>
                </div>
            </div>

            <!-- Section QoS -->
            <div class="config-section">
                <h3>
                    <label><input type="checkbox" onclick="toggleDetails(this)"> Configuration QoS</label>
                </h3>
                <div class="details">
                    <label>Nom de la classe QoS :</label>
                    <input type="text" id="qosClass" placeholder="VOIP">
                    <label>Bande passante (%) :</label>
                    <input type="text" id="qosBandwidth" placeholder="20">
                </div>
            </div>

            <!-- Bouton pour envoyer -->
            <button type="button" onclick="sendData()">Générer Configuration</button>
        </form>

        <textarea id="outputConfig" readonly></textarea>
    </main>

    <script src="scripts/configuration.js"></script>
    <?php include 'includes/footer.php'; ?>
</body>
</html>
