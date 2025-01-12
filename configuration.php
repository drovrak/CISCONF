<?php include 'includes/header.php'; ?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personnalisation de Configuration - Cisconf</title>
    <link rel="stylesheet" href="styles/global.css">
    <link rel="stylesheet" href="styles/configuration.css">
    <script src="scripts/configuration.js" defer></script>
</head>
<body>
    <main class="container">
        <h2>Personnalisation de Configuration</h2>
        <form id="configForm">
            <!-- Section Main Configuration -->
            <div class="config-section">
                <h3>Configuration Principale</h3>
                <div>
                    <label for="hostname">Nom d'hôte :</label>
                    <input type="text" id="hostname" name="hostname" placeholder="ROUTER1">
                    <label for="enableSecret">Mot de passe enable secret :</label>
                    <input type="text" id="enableSecret" name="enableSecret" placeholder="cisco123">
                    <label for="banner">Message d'accueil :</label>
                    <input type="text" id="banner" name="banner" placeholder="Bienvenue !">
                    <label for="disableDomainLookup"><input type="checkbox" id="disableDomainLookup" name="disableDomainLookup"> Désactiver la recherche de domaine IP</label>
                </div>
            </div>

            <!-- Section Interfaces -->
            <div class="config-section" id="interfaces">
                <h3>Interfaces</h3>
                <div class="interface-config">
                    <label for="interface-type">Type :</label>
                    <input type="text" id="interface-type" name="interfaceType[]" placeholder="Type (e.g., GigabitEthernet)">
                    <label for="interface-number">Numéro :</label>
                    <input type="text" id="interface-number" name="interfaceNumber[]" placeholder="Numéro (e.g., 0/1)">
                    <label for="interface-ip">Adresse IP :</label>
                    <input type="text" id="interface-ip" name="interfaceIp[]" placeholder="Adresse IP">
                    <label for="interface-mask">Masque :</label>
                    <input type="text" id="interface-mask" name="interfaceMask[]" placeholder="Masque de sous-réseau">
                    <label for="interface-description">Description :</label>
                    <input type="text" id="interface-description" name="interfaceDescription[]" placeholder="Description">
                    <label for="interface-mode">Mode :</label>
                    <input type="text" id="interface-mode" name="interfaceMode[]" placeholder="Mode (access/trunk)">
                    <label for="interface-vlan">VLAN :</label>
                    <input type="text" id="interface-vlan" name="interfaceVlan[]" placeholder="VLAN">
                </div>
                <button type="button" onclick="addInterface()">Ajouter une interface</button>
            </div>

            <!-- Section VLANs -->
            <div class="config-section" id="vlans">
                <h3>VLANs</h3>
                <div class="vlan-config">
                    <label for="vlan-id">ID VLAN :</label>
                    <input type="text" id="vlan-id" name="vlanId[]" placeholder="VLAN ID">
                    <label for="vlan-name">Nom VLAN :</label>
                    <input type="text" id="vlan-name" name="vlanName[]" placeholder="Nom VLAN">
                </div>
                <button type="button" onclick="addVlan()">Ajouter un VLAN</button>
            </div>

            <!-- Section OSPF -->
            <div class="config-section" id="ospf">
                <h3>OSPF</h3>
                <div>
                    <label for="ospfAsNumber">Numéro AS OSPF :</label>
                    <input type="text" id="ospfAsNumber" name="ospfAsNumber" placeholder="1">
                    <label for="ospfRouterId">Router ID :</label>
                    <input type="text" id="ospfRouterId" name="ospfRouterId" placeholder="1.1.1.1">
                </div>
                <button type="button" onclick="addOspfNetwork()">Ajouter un réseau OSPF</button>
            </div>

            <!-- Section RIP -->
            <div class="config-section" id="rip">
                <h3>RIP</h3>
                <div>
                    <label for="ripVersion">Version RIP :</label>
                    <select id="ripVersion" name="ripVersion">
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                    </select>
                    <label for="ripNetwork">Network :</label>
                    <input type="text" id="ripNetwork" name="ripNetwork[]" placeholder="192.168.1.0">
                </div>
                <button type="button" onclick="addRipNetwork()">Ajouter un réseau RIP</button>
            </div>

            <!-- Section EIGRP -->
            <div class="config-section" id="eigrp">
                <h3>EIGRP</h3>
                <div>
                    <label for="eigrpAsNumber">Numéro AS EIGRP :</label>
                    <input type="text" id="eigrpAsNumber" name="eigrpAsNumber" placeholder="1">
                    <label for="eigrpNetwork">Network :</label>
                    <input type="text" id="eigrpNetwork" name="eigrpNetwork[]" placeholder="192.168.1.0">
                    <label for="eigrpMask">Masque inversé :</label>
                    <input type="text" id="eigrpMask" name="eigrpMask[]" placeholder="0.0.0.255">
                </div>
                <button type="button" onclick="addEigrpNetwork()">Ajouter un réseau EIGRP</button>
            </div>

            <!-- Section QoS -->
            <div class="config-section" id="qos">
                <h3>QoS</h3>
                <div>
                    <label for="qosClass">Nom de la classe QoS :</label>
                    <input type="text" id="qosClass" name="qosClass[]" placeholder="VOIP">
                    <label for="qosBandwidth">Bande passante (%) :</label>
                    <input type="text" id="qosBandwidth" name="qosBandwidth[]" placeholder="20">
                </div>
                <button type="button" onclick="addQosClass()">Ajouter une classe QoS</button>
            </div>

            <!-- Résultat -->
            <div class="config-output">
                <h3>Configuration Générée</h3>
                <textarea id="outputConfig" readonly></textarea>
            </div>

            <!-- Bouton pour générer la configuration -->
            <button type="button" onclick="sendData()">Générer Configuration</button>
        </form>
    </main>
    <?php include 'includes/footer.php'; ?>
</body>
</html>
