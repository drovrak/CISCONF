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
                <h3><label><input type="checkbox" id="enable-main" name="enable-main" onclick="toggleSection('main')">Commandes Principale</label></h3>
                <div id="main" style="display: none;">
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
                <h3>
                    <label>
                        <input type="checkbox" id="enable-Interfaces" name="enable-Interfaces" onclick="toggleSection('Interfaces')">Interfaces
                    </label>
                </h3>
                <div id="Interfaces" style="display: none;">
                    <div id="interfaces-container">
                        <!-- Les interfaces ajoutées dynamiquement apparaîtront ici -->
                    </div>
                    <button type="button" onclick="addInterface()">Ajouter une interface</button>
                </div>
            </div>


            <!-- Section DHCP -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-DHCP" name="enable-DHCP" onclick="toggleSection('DHCP')">DHCP</label></h3>
                <div id="DHCP" style="display: none;">
                    <label for="dhcp-pool-name">Nom du pool :</label>
                    <input type="text" id="dhcp-pool-name" name="dhcp-pool-name" placeholder="POOL_NAME">

                    <label for="network-address">Adresse réseau :</label>
                    <input type="number" id="network-address" name="network-address" placeholder="192.168.1.0">

                    <label for="subnet-mask">Masque de sous-réseau :</label>
                    <input type="number" id="subnet-mask" name="subnet-mask" placeholder="255.255.255.0">

                    <label for="default-router">Routeur par défaut :</label>
                    <input type="number" id="default-router" name="default-router" placeholder="192.168.1.1">

                    <label for="dns-server">Serveur DNS :</label>
                    <input type="number" id="dns-server" name="dns-server" placeholder="8.8.8.8">

                    <label for="domain-name">Nom de domaine :</label>
                    <input type="text" id="domain-name" name="domain-name" placeholder="example.com">

                    <label for="excluded-start">Adresse exclue (début) :</label>
                    <input type="number" id="excluded-start" name="excluded-start" placeholder="192.168.1.100">

                    <label for="excluded-end">Adresse exclue (fin) :</label>
                    <input type="number" id="excluded-end" name="excluded-end" placeholder="192.168.1.150">
                </div>
            </div>


            <!-- Section VLANs -->
            <div class="config-section">
                <h3>
                    <label>
                        <input type="checkbox" id="enable-VLANs" name="enable-VLANs" onclick="toggleSection('VLANs')">VLANs
                    </label>
                </h3>
                <div id="VLANs" style="display: none;">
                    <!-- Premier VLAN par défaut -->
                    <div id="vlans-container">
                        <div class="vlan-config">
                            <label for="vlan-id-0">ID VLAN :</label>
                            <input type="number" id="vlan-id-0" name="vlanId[]" placeholder="VLAN ID">
                            <label for="vlan-name-0">Nom VLAN :</label>
                            <input type="text" id="vlan-name-0" name="vlanName[]" placeholder="Nom VLAN">
                        </div>
                    </div>
                    <button type="button" onclick="addVlan()">Ajouter un VLAN</button>
                </div>
            </div>

            <!-- Section RIP -->
            <div class="config-section" id="rip">
                <h3>
                    <label>
                        <input type="checkbox" id="enable-RIP" name="enable-RIP" onclick="toggleSection('RIP')">RIP
                    </label>
                </h3>
                <div id="RIP" style="display: none;">
                    <label for="ripVersion">Version RIP :</label>
                    <select id="ripVersion" name="ripVersion">
                        <option value="1">1</option>
                        <option value="2" selected>2</option>
                    </select>
                    <!-- Premier réseau par défaut -->
                    <div class="rip-network-container">
                        <label for="ripNetwork">Network :</label>
                        <input type="number" class="rip-network" placeholder="192.168.1.0">
                        <label for="ripMask">Masque inversé :</label>
                        <input type="number" class="rip-mask" placeholder="0.0.0.255">
                    </div>
                    <button type="button" onclick="addRipNetwork()">Ajouter un réseau RIP</button>
                </div>
            </div>


            <!-- Section OSPF -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-OSPF" name="enable-OSPF" onclick="toggleSection('OSPF')">OSPF</label></h3>
            <div id="OSPF" style="display: none;">
                <div>
                    <label for="ospf-as-number">Numéro AS OSPF :</label>
                    <input type="number" id="ospf-as-number" name="ospf-as-number" placeholder="1">

                    <label for="router-id">Router ID :</label>
                    <input type="number" id="router-id" name="router-id" placeholder="1.1.1.1">

                    <label for="ospf-network">Adresse réseau :</label>
                    <input type="number" id="ospf-network" name="ospf-network" placeholder="192.168.1.0">

                    <label for="ospf-wildcard-mask">Masque inversé :</label>
                    <input type="number" id="ospf-wildcard-mask" name="ospf-wildcard-mask" placeholder="0.0.0.255">

                    <label for="ospf-area-number">Numéro d'Area :</label>
                    <input type="number" id="ospf-area-number" name="ospf-area-number" placeholder="0">

                    <label for="ospf-passive-interface">Interface passive :</label>
                    <input type="text" id="ospf-passive-interface" name="ospf-passive-interface" placeholder="GigabitEthernet0/1">

                    <!-- <label for="ospf-summary-network">Résumé de réseau :</label>
                    <input type="text" id="ospf-summary-network" name="ospf-summary-network" placeholder="192.168.0.0">

                    <label for="ospf-summary-mask">Masque du résumé :</label>
                    <input type="text" id="ospf-summary-mask" name="ospf-summary-mask" placeholder="255.255.0.0"> -->

                    <label for="default-information">Activer Default Information :</label>
                    <input type="checkbox" id="default-information" name="default-information">
                </div>
                </div>
            </div>
            <!-- Section EIGRP -->
            <div class="config-section">
                <h3>
                    <label>
                        <input type="checkbox" id="enable-eigrp" name="enable-eigrp" onclick="toggleSection('eigrp')"> EIGRP
                    </label>
                </h3>
                <div id="eigrp" style="display: none;">
                    <!-- Champ pour le numéro AS -->
                    <label for="eigrp-as-number">Numéro AS EIGRP :</label>
                    <input type="number" id="eigrp-as-number" name="eigrp-as-number" placeholder="1">
                    
                    <!-- Conteneur pour les réseaux EIGRP -->
                    <div id="eigrp-networks-container">
                        <!-- Premier réseau par défaut -->
                        <div class="eigrp-network-container">
                            <label for="eigrp-network-0">Adresse réseau :</label>
                            <input type="number" id="eigrp-network-0" class="eigrp-network" placeholder="192.168.1.0">

                            <label for="eigrp-mask-0">Masque inversé :</label>
                            <input type="number" id="eigrp-mask-0" class="eigrp-mask" placeholder="0.0.0.255">
                        </div>
                    </div>
                    <!-- Bouton pour ajouter un réseau supplémentaire -->
                    <button type="button" onclick="addEIGRPNetwork()">Ajouter un réseau EIGRP</button>

                    <!-- Interface passive -->
                    <label for="eigrp-passive-interface">Interface passive :</label>
                    <input type="text" id="eigrp-passive-interface" name="eigrp-passive-interface" placeholder="GigabitEthernet0/1">

                    <!-- Désactivation de l'auto-summary -->
                    <label for="disable-auto-summary">Désactiver Auto-Summary :</label>
                    <input type="checkbox" id="disable-auto-summary" name="disable-auto-summary">
                </div>
            </div>

            <!-- Section HSRP -->
            <div class="config-section">
            <h3><label><input type="checkbox" id="enable-HSRP" name="enable-HSRP" onclick="toggleSection('HSRP')">HSRP configuration</label></h3>
            <div id="HSRP" style="display: none;">
                    <label for="hsrp-group">Groupe HSRP :</label>
                    <input type="number" id="hsrp-group" name="hsrp-group" placeholder="1">

                    <label for="hsrp-virtual-ip">Adresse IP virtuelle :</label>
                    <input type="number" id="hsrp-virtual-ip" name="hsrp-virtual-ip" placeholder="192.168.1.1">

                    <label for="hsrp-priority">Priorité :</label>
                    <input type="number" id="hsrp-priority" name="hsrp-priority" placeholder="100">

                    <label for="hsrp-preempt">Activer Preempt :</label>
                    <input type="checkbox" id="hsrp-preempt" name="hsrp-preempt">

                    <label for="hsrp-authentication">Authentification :</label>
                    <input type="text" id="hsrp-authentication" name="hsrp-authentication" placeholder="cisco123">

                    <label for="hsrp-hello-time">Timer Hello (sec) :</label>
                    <input type="number" id="hsrp-hello-time" name="hsrp-hello-time" placeholder="3">

                    <label for="hsrp-hold-time">Timer Hold (sec) :</label>
                    <input type="number" id="hsrp-hold-time" name="hsrp-hold-time" placeholder="10">

                    <label for="tracked-interface">Interface suivie :</label>
                    <input type="text" id="tracked-interface" name="tracked-interface" placeholder="GigabitEthernet0/1">

                    <label for="decrement-value">Valeur de décrémentation :</label>
                    <input type="number" id="decrement-value" name="decrement-value" placeholder="20">
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
                    <input type="number" id="vlan-root-number" name="vlan-root-number" placeholder="10">

                    <label for="vlan-root-role">Rôle Root :</label>
                    <select id="vlan-root-role" name="vlan-root-role">
                        <option value="primary">Primaire</option>
                        <option value="secondary">Secondaire</option>
                    </select>
                    <label for="portfast-bpduguard"><input type="checkbox" id="portfast-bpduguard" name="portfast-bpduguard">
                    Activer PortFast et BPDU Guard :</label>

                    <!-- Sélection du type et numéro d'interface -->
                    <label for="stp-interface-type">Type d'interface STP :</label>
                    <select id="stp-interface-type" name="stp-interface-type">
                        <option value="FastEthernet">FastEthernet</option>
                        <option value="GigabitEthernet">GigabitEthernet</option>
                        <option value="Serial">Serial</option>
                    </select>

                    <label for="stp-interface-number">Numéro d'interface :</label>
                    <input type="text" id="stp-interface-number" name="stp-interface-number" placeholder="0/6">

                    <label for="stp-portfast"><input type="checkbox" id="stp-portfast" name="stp-portfast">Activer PortFast sur cette interface : </label>
                    
                    
                </div>
            </div>


            <!-- Section NAT -->
            <div class="config-section">
                <h3><label><input type="checkbox" id="enable-NAT" name="enable-NAT" onclick="toggleSection('NAT')">Network Address Translation (NAT)</label></h3>
                <div id="NAT" style="display: none;">
                    <!-- Interface Inside -->
                    <label for="nat-inside-type">Type d'interface Inside :</label>
                    <select id="nat-inside-type" name="nat-inside-type">
                        <option value="FastEthernet">FastEthernet</option>
                        <option value="GigabitEthernet">GigabitEthernet</option>
                        <option value="Serial">Serial</option>
                    </select>

                    <label for="nat-inside-number">Numéro d'interface Inside :</label>
                    <input type="number" id="nat-inside-number" name="nat-inside-number" placeholder="0/6">

                    <!-- Interface Outside -->
                    <label for="nat-outside-type">Type d'interface Outside :</label>
                    <select id="nat-outside-type" name="nat-outside-type">
                        <option value="FastEthernet">FastEthernet</option>
                        <option value="GigabitEthernet">GigabitEthernet</option>
                        <option value="Serial">Serial</option>
                    </select>

                    <label for="nat-outside-number">Numéro d'interface Outside :</label>
                    <input type="text" id="nat-outside-number" name="nat-outside-number" placeholder="0/2">

                    <!-- NAT Statique -->
                    <h4><label><input type="checkbox" id="enable-static-nat" onclick="toggleSection('static-nat')"> NAT Statique</label></h4>
                    <div id="static-nat" style="display: none;">
                        <label for="nat-static-local">Adresse IP locale :</label>
                        <input type="number" id="nat-static-local" name="nat-static-local" placeholder="192.168.1.10">

                        <label for="nat-static-global">Adresse IP publique :</label>
                        <input type="number" id="nat-static-global" name="nat-static-global" placeholder="203.0.113.5">
                    </div>

                    <!-- NAT Dynamique -->
                    <h4><label><input type="checkbox" id="enable-dynamic-nat" onclick="toggleSection('dynamic-nat')"> NAT Dynamique</label></h4>
                    <div id="dynamic-nat" style="display: none;">
                        <label for="nat-pool-name">Nom du pool :</label>
                        <input type="text" id="nat-pool-name" name="nat-pool-name" placeholder="POOL1">

                        <label for="nat-pool-start">Adresse IP de début :</label>
                        <input type="number" id="nat-pool-start" name="nat-pool-start" placeholder="203.0.113.6">

                        <label for="nat-pool-end">Adresse IP de fin :</label>
                        <input type="number" id="nat-pool-end" name="nat-pool-end" placeholder="203.0.113.10">

                        <label for="nat-mask">Masque de sous-réseau :</label>
                        <input type="number" id="nat-mask" name="nat-mask" placeholder="255.255.255.248">

                        <label for="nat-access-list">Numéro de l'Access-List :</label>
                        <input type="number" id="nat-access-list" name="nat-access-list" placeholder="10">
                    </div>
                    <!-- PAT -->
                    <h4><label><input type="checkbox" id="enable-pat" onclick="toggleSection('pat')"> PAT (Port Address Translation)</label></h4>
                    <div id="pat" style="display: none;">
                        <label for="nat-pat-interface">Interface NAT Outside :</label>
                        <input type="text" id="nat-pat-interface" name="nat-pat-interface" placeholder="GigabitEthernet0/2">

                        <label for="nat-pat-access-list">Numéro de l'Access-List pour PAT :</label>
                        <input type="number" id="nat-pat-access-list" name="nat-pat-access-list" placeholder="10">
                    </div>

                </div>
            </div>



        <!-- Section QoS -->
        <div class="config-section">
            <h3><label><input type="checkbox" id="enable-qos" onclick="toggleSection('qos')"> Quality of Service (QoS)</label></h3>
            <div id="qos" style="display: none;">
                <!-- QoS Class Map VoIP -->
                <h4><label><input type="checkbox" id="enable-qos-voip" onclick="toggleSection('qos-voip')"> Class-Map VoIP</label></h4>
                <div id="qos-voip" style="display: none;">
                    <label for="qos-voip-name">Nom de la Class-Map :</label>
                    <input type="text" id="qos-voip-name" name="qos-voip-name" placeholder="VOIP">

                    <label for="qos-dscp">Valeur DSCP :</label>
                    <select id="qos-dscp" name="qos-dscp">
                        <option value="ef">Expedited Forwarding (EF)</option>
                        <option value="af41">Assured Forwarding 41 (AF41)</option>
                        <option value="cs5">Class Selector 5 (CS5)</option>
                        <option value="custom">Autre (Saisir manuellement)</option>
                    </select>
                    <input type="text" id="qos-dscp-custom" placeholder="Valeur DSCP personnalisée" style="display: none;">

                    <label for="qos-protocol">Protocole :</label>
                    <select id="qos-protocol" name="qos-protocol">
                        <option value="rtp">RTP</option>
                        <option value="sip">SIP</option>
                        <option value="custom">Autre (Saisir manuellement)</option>
                    </select>
                    <input type="text" id="qos-protocol-custom" placeholder="Protocole personnalisé" style="display: none;">
                </div>

                <!-- QoS Class Map HTTP -->
                <h4><label><input type="checkbox" id="enable-qos-http" onclick="toggleSection('qos-http')"> Class-Map HTTP</label></h4>
                <div id="qos-http" style="display: none;">
                    <label for="qos-http-name">Nom de la Class-Map :</label>
                    <input type="text" id="qos-http-name" name="qos-http-name" placeholder="HTTP">

                    <label for="qos-http-match">Type de match :</label>
                    <select id="qos-http-match" name="qos-http-match">
                        <option value="match-all">Match-All</option>
                        <option value="match-any">Match-Any</option>
                    </select>

                    <label for="qos-http-protocol">Protocole :</label>
                    <select id="qos-http-protocol" name="qos-http-protocol">
                        <option value="http">HTTP</option>
                        <option value="custom">Autre (Saisir manuellement)</option>
                    </select>
                    <input type="text" id="qos-http-protocol-custom" placeholder="Protocole personnalisé" style="display: none;">

                    <label for="qos-http-precedence">IP Precedence :</label>
                    <select id="qos-http-precedence" name="qos-http-precedence">
                        <option value="3">Flash</option>
                        <option value="custom">Autre (Saisir manuellement)</option>
                    </select>
                    <input type="text" id="qos-http-precedence-custom" placeholder="Valeur personnalisée" style="display: none;">
                </div>

                <!-- Policy Map -->
                <h4>Policy-Map</h4>
                <label for="qos-policy-name">Nom de la Policy-Map :</label>
                <input type="text" id="qos-policy-name" name="qos-policy-name" placeholder="QOS_POLICY">

                <label for="qos-voip-bandwidth">Bande passante VoIP (%) :</label>
                <input type="number" id="qos-voip-bandwidth" name="qos-voip-bandwidth" placeholder="20">

                <label for="qos-http-bandwidth">Bande passante HTTP (%) :</label>
                <input type="number" id="qos-http-bandwidth" name="qos-http-bandwidth" placeholder="10">

                <!-- Application sur interface -->
                <h4>Application de QoS</h4>
                <label for="qos-interface-type">Type d'interface QoS :</label>
                <select id="qos-interface-type" name="qos-interface-type">
                    <option value="GigabitEthernet">GigabitEthernet</option>
                    <option value="FastEthernet">FastEthernet</option>
                </select>

                <label for="qos-interface-number">Numéro d'interface QoS :</label>
                <input type="text" id="qos-interface-number" name="qos-interface-number" placeholder="0/1">

                <label for="qos-policy-direction">Direction :</label>
                <select id="qos-policy-direction" name="qos-policy-direction">
                    <option value="input">Input</option>
                    <option value="output">Output</option>
                </select>
            </div>
        </div>



        <!-- Section SNMP -->
        <div class="config-section">
            <h3><label><input type="checkbox" id="enable-snmp" onclick="toggleSection('snmp')"> SNMP Configuration</label></h3>
            <div id="snmp" style="display: none;">
                <!-- Configuration des Communautés SNMP -->
                <h4>Communautés SNMP</h4>
                <label for="snmp-community-ro">Communauté Read-Only (RO) :</label>
                <input type="text" id="snmp-community-ro" name="snmp-community-ro" placeholder="PUBLIC">

                <label for="snmp-community-rw">Communauté Read-Write (RW) :</label>
                <input type="text" id="snmp-community-rw" name="snmp-community-rw" placeholder="PRIVATE">

                <!-- Emplacement et Contact -->
                <h4>Informations SNMP</h4>
                <label for="snmp-location">Emplacement (Location) :</label>
                <input type="text" id="snmp-location" name="snmp-location" placeholder="Data Center - Paris">

                <label for="snmp-contact">Contact :</label>
                <input type="text" id="snmp-contact" name="snmp-contact" placeholder="Admin: admin@domain.com">

                <!-- Configuration des Traps SNMP -->
                <h4>SNMP Traps</h4>
                <label for="snmp-trap-type">Type de Trap SNMP :</label>
                <select id="snmp-trap-type" name="snmp-trap-type">
                    <option value="all">All</option>
                    <option value="linkup">LinkUp</option>
                    <option value="linkdown">LinkDown</option>
                    <option value="environment">Environment</option>
                    <option value="custom">Autre (Saisir manuellement)</option>
                </select>
                <input type="text" id="snmp-trap-custom" name="snmp-trap-custom" placeholder="Trap personnalisé" style="display: none;">
            </div>
        </div>


        <!-- Section Téléphonie -->
        <div class="config-section">
            <h3><label><input type="checkbox" id="enable-telephony" onclick="toggleSection('telephony')"> Configuration Téléphonie</label></h3>
            <div id="telephony" style="display: none;">
                <!-- Configuration du service de téléphonie -->
                <h4>Service de téléphonie</h4>
                <label for="max-dn">Nombre maximal de Directory Numbers (DN) :</label>
                <input type="number" id="max-dn" name="max-dn" value="10" min="1" max="20">

                <label for="max-ephone">Nombre maximal de téléphones (ephone) :</label>
                <input type="number" id="max-ephone" name="max-ephone" value="5" min="1" max="10">

                <label for="source-address">Adresse IP source :</label>
                <input type="number" id="source-address" name="source-address" placeholder="192.168.1.1">

                <label for="port">Port :</label>
                <input type="number" id="port" name="port" value="2000">

                <label for="voicemail">Numéro de la messagerie vocale :</label>
                <input type="number" id="voicemail" name="voicemail" placeholder="6000">

                <!-- Gestion des Directory Numbers (DN) -->
                <h4>Configuration des Directory Numbers (DN)</h4>
                <div id="dn-container"></div>
                <button type="button" id="add-dn-btn">Ajouter un DN</button>

                <!-- Gestion des téléphones (ephone) -->
                <h4>Configuration des téléphones (ephone)</h4>
                <div id="ephone-container"></div>
                <button type="button" id="add-ephone-btn">Ajouter un téléphone</button>
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
