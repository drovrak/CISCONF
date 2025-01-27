<?php include 'includes/header.php'; ?>
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Personnalisation de Configuration - Cisconf</title>
    <link rel="stylesheet" href="../static/css/global.css">
    <link rel="stylesheet" href="../static/css/configuration.css">
    <script src="static/js/configuration.js" defer></script>
</head>
<body>
    <main class="container">
        <h2>Personnalisation de Configuration</h2>
        <form id="configForm">
            <!-- Section Main Common Command -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-interfaces" name="enable-interfaces" onclick="toggleSection('interfaces')">Interfaces</label></h3>
                <div id="interfaces" style="display: none;">
                    <label for="hostname">Nom d'hôte :</label>
                    <input type="text" id="hostname" name="hostname" placeholder="ROUTER1">
                    <label for="enableSecret">Mot de passe enable secret :</label>
                    <input type="text" id="enableSecret" name="enableSecret" placeholder="cisco123">
                    <label for="banner">Message d'accueil :</label>
                    <input type="text" id="banner" name="banner" placeholder="Bienvenue !">
                    <label for="disableDomainLookup"><input type="checkbox" id="disableDomainLookup" name="disableDomainLookup"> Désactiver la recherche de domaine IP</label>
                </div>
            </div>

            <!-- Section VTY -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-VTY" name="enable-VTY" onclick="toggleSection('VTY')">VTY</label></h3>
                <div id="VTY" style="display: none;">
                    <label for="exec-timeout">Exec Timeout :</label>
                    <input type="text" id="exec-timeout" name="exec-timeout" placeholder="3">
                    <label for="transport-input-protocol">Transport Input :</label>
                    <input type="text" id="transport-input-protocol" name="transport-input-protocol" placeholder="ssh">
                    <label for="enable-login">Login :</label>
                    <input type="text" id="enable-login" name="enable-login" placeholder="login">
                </div>
            </div>

            <!-- Section Line Console -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-lineConsole" name="enable-lineConsole" onclick="toggleSection('lineConsole')">Line Console</label></h3>
                <div id="lineConsole" style="display: none;">
                    <label for="set-console-line"><input type="checkbox" id="set-console-line" name="set-console-line">Console Line</label>
                    <label for="logging-sync"><input type="checkbox" id="logging-sync" name="logging-sync">Enable Logging Sync</label>

                    <label for="enable-login-console">Enable Login :</label>
                    <input type="text" id="enable-login-console" name="enable-login-console" placeholder="login">
                </div>
            </div>

            <!-- Section SSH -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-ssh" name="enable-ssh" onclick="toggleSection('ssh')">SSH</label></h3>
            <div id="ssh" style="display: none;">
                    <label for="domain-name">Domain Name :</label>
                    <input type="text" id="domain-name" name="domain-name" placeholder="example.com">
                    <label for="ssh-version">SSH Version :</label>
                    <select id="ssh-version" name="ssh-version">
                        <option value="1">version 1</option>
                        <option value="2">version 2 (*)</option>
                    </select>
                    <label for="auth-retries">Authentication Retries :</label>
                    <input type="number" id="auth-retries" name="auth-retries" placeholder="3">
                </div>
            </div>

            <!-- Section Interfaces -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-Interfaces" name="enable-Interfaces" onclick="toggleSection('Interfaces')">Interfaces</label></h3>
            <div id="Interfaces" style="display: none;">
                    <label for="interface-type">Type d'interface :</label>
                    <select id="interface-type" name="interface-type">
                        <option value="FastEthernet">FastEthernet</option>
                        <option value="GigabitEthernet">GigabitEthernet</option>
                        <option value="Serial" selected>Serial</option>
                    </select>
                    
                    <label for="interface-number">Numéro d'interface :</label>
                    <input type="text" id="interface-number" name="interface-number" placeholder="0/1">

                    <label for="ip-address">Adresse IP :</label>
                    <input type="text" id="ip-address" name="ip-address" placeholder="192.168.1.1">
                    <label for="subnet-mask">Masque :</label>
                    <input type="text" id="subnet-mask" name="subnet-mask" placeholder="255.255.255.0">

                    <label for="description">Description :</label>
                    <input type="text" id="description" name="description" placeholder="Description de l'interface">
                    <label for="speed">Vitesse :</label>
                    <select id="speed" name="speed">
                        <option value="auto" selected>Auto</option>
                        <option value="10">10 Mbps</option>
                        <option value="100">100 Mbps</option>
                        <option value="1000">1000 Mbps</option>
                    </select>

                    <label for="duplex">Duplex :</label>
                    <select id="duplex" name="duplex">
                        <option value="auto" selected>Auto</option>
                        <option value="full">Full</option>
                        <option value="half">Half</option>
                    </select>

                    <label for="port-channel-number">Port Channel :</label>
                    <input type="text" id="port-channel-number" name="port-channel-number" placeholder="1">
                    
                    <label for="port-channel-mode">Mode Port Channel :</label>
                    <select id="port-channel-mode" name="port-channel-mode">
                        <option value="active">Active</option>
                        <option value="passive">Passive</option>
                        <option value="on">On</option>
                    </select>

                    <label for="interface-mode">Mode d'interface :</label>
                    <select id="interface-mode" name="interface-mode">
                        <option value="access">Access</option>
                        <option value="trunk">Trunk</option>
                    </select>

                    <label for="interface-range-start">Plage d'interface (Début) :</label>
                    <input type="text" id="interface-range-start" name="interface-range-start" placeholder="0/1">

                    <label for="interface-range-end">Plage d'interface (Fin) :</label>
                    <input type="text" id="interface-range-end" name="interface-range-end" placeholder="0/8">
                </div>
            </div>
            <!-- Section DHCP -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-DHCP" name="enable-DHCP" onclick="toggleSection('DHCP')">DHCP</label></h3>
                <div id="DHCP" style="display: none;">
                    <label for="dhcp-pool-name">Nom du pool :</label>
                    <input type="text" id="dhcp-pool-name" name="dhcp-pool-name" placeholder="POOL_NAME">

                    <label for="network-address">Adresse réseau :</label>
                    <input type="text" id="network-address" name="network-address" placeholder="192.168.1.0">

                    <label for="subnet-mask-DHCP">Masque de sous-réseau :</label>
                    <input type="text" id="subnet-mask-DHCP" name="subnet-mask-DHCP" placeholder="255.255.255.0">

                    <label for="default-router">Routeur par défaut :</label>
                    <input type="text" id="default-router" name="default-router" placeholder="192.168.1.1">

                    <label for="dns-server">Serveur DNS :</label>
                    <input type="text" id="dns-server" name="dns-server" placeholder="8.8.8.8">

                    <label for="domain-name">Nom de domaine :</label>
                    <input type="text" id="domain-name" name="domain-name" placeholder="example.com">

                    <label for="excluded-start">Adresse exclue (début) :</label>
                    <input type="text" id="excluded-start" name="excluded-start" placeholder="192.168.1.100">

                    <label for="excluded-end">Adresse exclue (fin) :</label>
                    <input type="text" id="excluded-end" name="excluded-end" placeholder="192.168.1.150">
                </div>
            </div>


            <!-- Section VLANs -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-VLANs" name="enable-VLANs" onclick="toggleSection('VLANs')">VLANs</label></h3>
                <div id="VLANs" style="display: none;">
                <div>
                    <label for="vlan-id">ID VLAN :</label>
                    <input type="text" id="vlan-id" name="vlan-id" placeholder="10">
                    <label for="vlan-name">Nom VLAN :</label>
                    <input type="text" id="vlan-name" name="vlan-name" placeholder="DEFAULT">
                </div>
            </div>
            </div>
            <!-- Section RIP -->
            <div class="config-section" id="rip">
            <h3><label><input type="checkbox" id="enable-RIP" name="enable-RIP" onclick="toggleSection('RIP')">RIP</label></h3>
            <div id="RIP" style="display: none;">
                    <label for="ripVersion">Version RIP :</label>
                    <select id="ripVersion" name="ripVersion">
                    <option value="1">1</option>
                    <option value="2" selected>2</option>
                    </select>
                    <label for="ripNetwork">Network :</label>
                    <input type="text" id="ripNetwork-0" name="ripNetwork[]" placeholder="192.168.1.0">
                    <button type="button" onclick="addRipNetwork()">Ajouter un réseau RIP</button>
            </div>
            </div>
            <!-- Section OSPF -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-OSPF" name="enable-OSPF" onclick="toggleSection('OSPF')">OSPF</label></h3>
            <div id="OSPF" style="display: none;">
                <div>
                    <label for="ospf-as-number">Numéro AS OSPF :</label>
                    <input type="text" id="ospf-as-number" name="ospf-as-number" placeholder="1">

                    <label for="router-id">Router ID :</label>
                    <input type="text" id="router-id" name="router-id" placeholder="1.1.1.1">

                    <label for="ospf-network">Adresse réseau :</label>
                    <input type="text" id="ospf-network" name="ospf-network" placeholder="192.168.1.0">

                    <label for="ospf-wildcard-mask">Masque inversé :</label>
                    <input type="text" id="ospf-wildcard-mask" name="ospf-wildcard-mask" placeholder="0.0.0.255">

                    <label for="ospf-area-number">Numéro d'Area :</label>
                    <input type="text" id="ospf-area-number" name="ospf-area-number" placeholder="0">

                    <label for="ospf-passive-interface">Interface passive :</label>
                    <input type="text" id="ospf-passive-interface" name="ospf-passive-interface" placeholder="GigabitEthernet0/1">

                    <label for="ospf-summary-network">Résumé de réseau :</label>
                    <input type="text" id="ospf-summary-network" name="ospf-summary-network" placeholder="192.168.0.0">

                    <label for="ospf-summary-mask">Masque du résumé :</label>
                    <input type="text" id="ospf-summary-mask" name="ospf-summary-mask" placeholder="255.255.0.0">

                    <label for="default-information">Activer Default Information :</label>
                    <input type="checkbox" id="default-information" name="default-information">
                </div>
                </div>
            </div>
            <!-- Section EIGRP -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-EIGRP" name="enable-EIGRP" onclick="toggleSection('EIGRP')">EIGRP</label></h3>
            <div id="EIGRP" style="display: none;">
                    <label for="eigrp-as-number">Numéro AS EIGRP :</label>
                    <input type="text" id="eigrp-as-number" name="eigrp-as-number" placeholder="1">

                    <label for="eigrp-network">Adresse réseau :</label>
                    <input type="text" id="eigrp-network" name="eigrp-network" placeholder="192.168.1.0">

                    <label for="eigrp-wildcard-mask">Masque inversé :</label>
                    <input type="text" id="eigrp-wildcard-mask" name="eigrp-wildcard-mask" placeholder="0.0.0.255">

                    <label for="eigrp-passive-interface">Interface passive :</label>
                    <input type="text" id="eigrp-passive-interface" name="eigrp-passive-interface" placeholder="GigabitEthernet0/1">

                    <label for="disable-auto-summary">Désactiver Auto-Summary :</label>
                    <input type="checkbox" id="disable-auto-summary" name="disable-auto-summary">
                </div>
            </div>
            <!-- Section HSRP -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-HSRP" name="enable-HSRP" onclick="toggleSection('HSRP')">HSRP configuration</label></h3>
            <div id="HSRP" style="display: none;">
                    <label for="hsrp-group">Groupe HSRP :</label>
                    <input type="text" id="hsrp-group" name="hsrp-group" placeholder="1">

                    <label for="hsrp-virtual-ip">Adresse IP virtuelle :</label>
                    <input type="text" id="hsrp-virtual-ip" name="hsrp-virtual-ip" placeholder="192.168.1.1">

                    <label for="hsrp-priority">Priorité :</label>
                    <input type="text" id="hsrp-priority" name="hsrp-priority" placeholder="100">

                    <label for="hsrp-preempt">Activer Preempt :</label>
                    <input type="checkbox" id="hsrp-preempt" name="hsrp-preempt">

                    <label for="hsrp-authentication">Authentification :</label>
                    <input type="text" id="hsrp-authentication" name="hsrp-authentication" placeholder="cisco123">

                    <label for="hsrp-hello-time">Timer Hello (sec) :</label>
                    <input type="text" id="hsrp-hello-time" name="hsrp-hello-time" placeholder="3">

                    <label for="hsrp-hold-time">Timer Hold (sec) :</label>
                    <input type="text" id="hsrp-hold-time" name="hsrp-hold-time" placeholder="10">

                    <label for="tracked-interface">Interface suivie :</label>
                    <input type="text" id="tracked-interface" name="tracked-interface" placeholder="GigabitEthernet0/1">

                    <label for="decrement-value">Valeur de décrémentation :</label>
                    <input type="text" id="decrement-value" name="decrement-value" placeholder="20">
                </div>
            </div>

            <!-- Section ACL -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-ACL" name="enable-ACL" onclick="toggleSection('ACL')">ACL</label></h3>
            <div id="ACL" style="display: none;">
                    <label for="acl-type">Type d'ACL :</label>
                    <select id="acl-type" name="acl-type">
                        <option value="standard">Standard</option>
                        <option value="extended">Extended</option>
                    </select>

                    <label for="acl-name-or-number">Nom ou numéro d'ACL :</label>
                    <input type="text" id="acl-name-or-number" name="acl-name-or-number" placeholder="100">

                    <label for="acl-action">Action :</label>
                    <select id="acl-action" name="acl-action">
                        <option value="permit">Permit</option>
                        <option value="deny">Deny</option>
                    </select>

                    <label for="acl-source">Source :</label>
                    <select id="acl-source" name="acl-source">
                        <option value="any">Any</option>
                        <option value="host">Host</option>
                        <option value="ip">IP</option>
                    </select>

                    <label for="acl-source-address">Adresse source :</label>
                    <input type="text" id="acl-source-address" name="acl-source-address" placeholder="192.168.1.0">

                    <label for="acl-wildcard-mask">Masque inversé (Wildcard) :</label>
                    <input type="text" id="acl-wildcard-mask" name="acl-wildcard-mask" placeholder="0.0.0.255">

                    <label for="acl-extended-args">Arguments supplémentaires (pour ACL Extended) :</label>
                    <input type="text" id="acl-extended-args" name="acl-extended-args" placeholder="tcp host 192.168.1.1 any eq 80">
                </div>
            </div>


            <!-- Section STP -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-STP" name="enable-STP" onclick="toggleSection('STP')">Spanning Tree Protocole (STP)</label></h3>
            <div id="STP" style="display: none;">
                    <label for="stp-mode">Mode STP :</label>
                    <select id="stp-mode" name="stp-mode">
                        <option value="pvst">PVST</option>
                        <option value="rapid-pvst" selected>Rapid-PVST</option>
                        <option value="mst">MST</option>
                    </select>

                    <label for="vlan-root-number">VLAN (Root) :</label>
                    <input type="text" id="vlan-root-number" name="vlan-root-number" placeholder="10">

                    <label for="vlan-root-role">Rôle Root :</label>
                    <select id="vlan-root-role" name="vlan-root-role">
                        <option value="primary">Primaire</option>
                        <option value="secondary">Secondaire</option>
                    </select>

                    <label for="vlan-priority-number">VLAN (Priorité) :</label>
                    <input type="text" id="vlan-priority-number" name="vlan-priority-number" placeholder="20">

                    <label for="portfast-bpduguard">Activer PortFast et BPDU Guard :</label>
                    <input type="checkbox" id="portfast-bpduguard" name="portfast-bpduguard">
                </div>
            </div>


            <!-- Section NAT -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-NAT" name="enable-NAT" onclick="toggleSection('NAT')">Network Address Translation (NAT)</label></h3>
            <div id="NAT" style="display: none;">
                    <label for="nat-inside">Interface Inside :</label>
                    <input type="text" id="nat-inside" name="nat-inside" placeholder="GigabitEthernet0/1">
                    <label for="nat-outside">Interface Outside :</label>
                    <input type="text" id="nat-outside" name="nat-outside" placeholder="GigabitEthernet0/2">
                </div>
            </div>

            <!-- Section QoS -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-QoS" name="enable-QoS" onclick="toggleSection('QoS')">QoS</label></h3>
            <div id="QoS" style="display: none;">
                    <label for="class-map-name">Nom de la Class-Map :</label>
                    <input type="text" id="class-map-name" name="class-map-name" placeholder="VOIP">

                    <label for="match-type">Type de correspondance :</label>
                    <select id="match-type" name="match-type">
                        <option value="match-all" selected>Match-All</option>
                        <option value="match-any">Match-Any</option>
                    </select>

                    <label for="match-dscp">Valeur DSCP :</label>
                    <input type="text" id="match-dscp" name="match-dscp" placeholder="EF">

                    <label for="match-ip-precedence">Valeur IP Precedence :</label>
                    <input type="text" id="match-ip-precedence" name="match-ip-precedence" placeholder="5">

                    <label for="match-protocol">Protocole :</label>
                    <input type="text" id="match-protocol" name="match-protocol" placeholder="http">

                    <label for="policy-map-name">Nom de la Policy-Map :</label>
                    <input type="text" id="policy-map-name" name="policy-map-name" placeholder="QOS_POLICY">

                    <label for="bandwidth-percent">Bande passante (%) :</label>
                    <input type="text" id="bandwidth-percent" name="bandwidth-percent" placeholder="20">

                    <label for="default-class">Configurer une classe par défaut :</label>
                    <input type="checkbox" id="default-class" name="default-class">

                    <label for="policy-direction">Direction de la Policy-Map :</label>
                    <select id="policy-direction" name="policy-direction">
                        <option value="input">Input</option>
                        <option value="output" selected>Output</option>
                    </select>

                    <label for="policy-application-name">Nom de la Policy à appliquer :</label>
                    <input type="text" id="policy-application-name" name="policy-application-name" placeholder="QOS_POLICY">
                </div>
            </div>

        <!-- Section SNMP -->
        <div class="config-section">
        <h3><label><input type="checkbox" id="enable-SNMP" name="enable-SNMP" onclick="toggleSection('SNMP')">SNMP configuration</label></h3>
        <div id="SNMP" style="display: none;">
                <label for="snmp-community">Nom de la communauté :</label>
                <input type="text" id="snmp-community" name="snmp-community" placeholder="public">

                <label for="snmp-access-type">Type d'accès :</label>
                <select id="snmp-access-type" name="snmp-access-type">
                    <option value="RO" selected>Read-Only (RO)</option>
                    <option value="RW">Read-Write (RW)</option>
                </select>

                <label for="snmp-location">Emplacement (Location) :</label>
                <input type="text" id="snmp-location" name="snmp-location" placeholder="Data Center">

                <label for="snmp-contact">Contact :</label>
                <input type="text" id="snmp-contact" name="snmp-contact" placeholder="admin@example.com">

                <label for="snmp-trap-type">Type de Trap SNMP :</label>
                <select id="snmp-trap-type" name="snmp-trap-type">
                    <option value="all" selected>All</option>
                    <option value="linkup">LinkUp</option>
                    <option value="linkdown">LinkDown</option>
                    <option value="environment">Environment</option>
                </select>
            </div>
        </div>


        <!-- Section Téléphonie -->
        <div class="config-section">
        <h3><label><input type="checkbox" id="enable-Téléphonie" name="enable-Téléphonie" onclick="toggleSection('Téléphonie')">Téléphonie configuration</label></h3>
        <div id="Téléphonie" style="display: none;">
            <div>
                <!-- Configuration du service de téléphonie -->
                <h4>Service de téléphonie</h4>
                <label for="max-dn">Nombre maximal de Directory Numbers (DN) :</label>
                <input type="text" id="max-dn" name="max-dn" placeholder="10">

                <label for="max-ephone">Nombre maximal de téléphones (ephone) :</label>
                <input type="text" id="max-ephone" name="max-ephone" placeholder="5">

                <label for="source-address">Adresse IP source :</label>
                <input type="text" id="source-address" name="source-address" placeholder="192.168.1.1">

                <label for="port">Port :</label>
                <input type="text" id="port" name="port" placeholder="2000">

                <label for="voicemail">Numéro de la messagerie vocale :</label>
                <input type="text" id="voicemail" name="voicemail" placeholder="6000">
            </div>

            <!-- Configuration des Directory Numbers (DN) -->
            <h4>Configuration des Directory Numbers (DN)</h4>
            <div>
                <label for="dn-number">Numéro de DN :</label>
                <input type="text" id="dn-number" name="dn-number" placeholder="1">

                <label for="dn-phone-number">Numéro de téléphone associé :</label>
                <input type="text" id="dn-phone-number" name="dn-phone-number" placeholder="1001">

                <label for="dn-name">Nom associé :</label>
                <input type="text" id="dn-name" name="dn-name" placeholder="Utilisateur1">
            </div>

            <!-- Configuration des téléphones (ephone) -->
            <h4>Configuration des téléphones (ephone)</h4>
            <div>
                <label for="ephone-number">Numéro de l'ephone :</label>
                <input type="text" id="ephone-number" name="ephone-number" placeholder="1">

                <label for="mac-address">Adresse MAC :</label>
                <input type="text" id="mac-address" name="mac-address" placeholder="0012.3456.789A">

                <label for="phone-type">Type de téléphone :</label>
                <input type="text" id="phone-type" name="phone-type" placeholder="7965">

                <label for="button-config">Configuration des boutons :</label>
                <input type="text" id="button-config" name="button-config" placeholder="1:1">
            </div>
        </div>
        </div>



            <!-- Résultat -->
            <div class="config-output">
                <h3>Configuration Générée</h3>
                <textarea id="config" readonly>{{config}}</textarea>
            </div>

            <!-- Bouton pour générer la configuration -->
            <button type="button" onclick="sendData()">Générer Configuration</button>
        </form>
    </main>
    <?php include 'includes/footer.php'; ?>

</body>
</html>
