// Mise à jour complète de configuration.js pour inclure des vérifications, des fonctions nécessaires, et des points de débogage

function toggleDetails(checkbox) {
    const details = checkbox.closest('.config-section').querySelector('.details');
    details.style.display = checkbox.checked ? 'block' : 'none';
}

function formatDataAsCommands(data) {
    // Formatage des données pour le serveur en appelant les fonctions Python
    const commands = [];

    try {
        // Configuration de base
        commands.push(`set_hostname(\"${data.hostname}\")`);
        commands.push(`set_enable_secret(\"${data.enableSecret}\")`);
        commands.push(`set_banner(\"${data.banner}\")`);

        if (data.disableDomainLookup) {
            commands.push('disable_domain_lookup()');
        }

        // Interfaces
        data.interfaces.forEach((iface) => {
            commands.push(`configure_interface(\"${iface.type}${iface.number}\", \"${iface.ip}\", \"${iface.mask}\", \"${iface.description}\", \"${iface.mode}\", ${iface.vlan})`);
        });

        // VLANs
        data.vlans.forEach((vlan) => {
            commands.push(`create_vlan(${vlan.id}, \"${vlan.name}\")`);
        });

        // OSPF
        if (data.ospf) {
            commands.push(`configure_ospf(${data.ospf.asNumber}, \"${data.ospf.routerId}\")`);
            data.ospf.networks.forEach((network) => {
                commands.push(`add_ospf_network(\"${network.address}\", \"${network.mask}\", ${network.area})`);
            });
        }

        // RIP
        if (data.rip) {
            commands.push(`configure_rip(${data.rip.version})`);
            data.rip.networks.forEach((network) => {
                commands.push(`add_rip_network(\"${network.address}\")`);
            });
        }

        // EIGRP
        if (data.eigrp) {
            commands.push(`configure_eigrp(${data.eigrp.asNumber})`);
            data.eigrp.networks.forEach((network) => {
                commands.push(`add_eigrp_network(\"${network.address}\", \"${network.mask}\")`);
            });
        }

        // QoS
        if (data.qos.length > 0) {
            commands.push('create_qos_policy(\"QoS-Policy\")');
            data.qos.forEach((qos) => {
                commands.push(`add_qos_class(\"${qos.class}\", ${qos.bandwidth})`);
            });
        }

    } catch (error) {
        console.error('Erreur lors du formatage des données :', error);
        commands.push('log_error(\"Erreur de formatage des données\")');
    }

    return commands;
}
function sendData() {
    console.log("Début de l'envoi des données..."); // Point de débogage 1
    
    // Vérifications globales
    const hostnameElement = document.getElementById('hostname');
    const enableSecretElement = document.getElementById('enableSecret');
    const bannerElement = document.getElementById('banner');
    const disableDomainLookupElement = document.getElementById('disableDomainLookup');

    if (!hostnameElement || !enableSecretElement || !bannerElement || !disableDomainLookupElement) {
        console.error('Un ou plusieurs éléments requis sont introuvables.');
        console.log('Éléments trouvés :', {
            hostname: !!hostnameElement,
            enableSecret: !!enableSecretElement,
            banner: !!bannerElement,
            disableDomainLookup: !!disableDomainLookupElement
        });
        return;
    }

    const data = {
        hostname: hostnameElement?.value || 'default-hostname',
        enableSecret: enableSecretElement?.value || 'default-secret',
        banner: bannerElement?.value || 'Bienvenue sur le routeur !',
        disableDomainLookup: disableDomainLookupElement?.checked || false,
        interfaces: getInterfaces(),
        vlans: getVLANs(),
        ospf: {
            asNumber: document.getElementById('ospfAsNumber')?.value || '1',
            routerId: document.getElementById('ospfRouterId')?.value || '0.0.0.0',
            networks: getOSPFNetworks()
        },
        rip: {
            version: document.getElementById('ripVersion')?.value || '2',
            networks: getRIPNetworks()
        },
        eigrp: {
            asNumber: document.getElementById('eigrpAsNumber')?.value || '1',
            networks: getEIGRPNetworks()
        },
        qos: getQoSSettings()
    };

    console.log('Données collectées pour envoi :', data); // Point de débogage 2
    // Transformation des données en commandes
    const formattedData = formatDataAsCommands(data);

    console.log('Données formatées pour envoi :', formattedData);
    fetch('/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
    })
    .then(response => {
        console.log('Réponse brute reçue :', response); // Affiche les métadonnées de la réponse
        return response.text(); // Récupère la réponse brute sous forme de texte
    })
    .then(result => {
        console.log('Contenu brut reçu du backend :', result); // Affiche le contenu brut
        document.getElementById('outputConfig').value = result || 'Aucune réponse reçue.';
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('outputConfig').value = 'Une erreur est survenue lors de la génération.';
    });
}

function getInterfaces() {
    console.log('Collecte des interfaces...'); // Point de débogage 5
    const interfaces = [];
    document.querySelectorAll('.interface-config').forEach((interfaceEl, index) => {
        const type = interfaceEl.querySelector(`[id="interface-type-${index}"]`)?.value || 'GigabitEthernet';
        const number = interfaceEl.querySelector(`[id="interface-number-${index}"]`)?.value || '0/0';
        const ip = interfaceEl.querySelector(`[id="interface-ip-${index}"]`)?.value || '192.168.1.1';
        const mask = interfaceEl.querySelector(`[id="interface-mask-${index}"]`)?.value || '255.255.255.0';
        const description = interfaceEl.querySelector(`[id="interface-description-${index}"]`)?.value || 'Interface par défaut';
        const mode = interfaceEl.querySelector(`[id="interface-mode-${index}"]`)?.value || 'access';
        const vlan = interfaceEl.querySelector(`[id="interface-vlan-${index}"]`)?.value || '1';

        interfaces.push({ type, number, ip, mask, description, mode, vlan });
    });
    console.log('Interfaces collectées :', interfaces); // Point de débogage 6
    return interfaces;
}

function getVLANs() {
    console.log('Collecte des VLANs...'); // Point de débogage 7
    const vlans = [];
    document.querySelectorAll('.vlan-config').forEach((vlanEl, index) => {
        const id = vlanEl.querySelector(`[id="vlan-id-${index}"]`)?.value || '1';
        const name = vlanEl.querySelector(`[id="vlan-name-${index}"]`)?.value || 'Default VLAN';
        vlans.push({ id, name });
    });
    console.log('VLANs collectés :', vlans); // Point de débogage 8
    return vlans;
}

function getOSPFNetworks() {
    console.log('Collecte des réseaux OSPF...'); // Point de débogage 9
    const networks = [];
    document.querySelectorAll('.ospf-network').forEach((networkEl, index) => {
        const address = networkEl.querySelector(`[id="ospf-address-${index}"]`)?.value || '192.168.0.0';
        const mask = networkEl.querySelector(`[id="ospf-mask-${index}"]`)?.value || '0.0.0.255';
        const area = networkEl.querySelector(`[id="ospf-area-${index}"]`)?.value || '0';
        networks.push({ address, mask, area });
    });
    console.log('Réseaux OSPF collectés :', networks); // Point de débogage 10
    return networks;
}

function getRIPNetworks() {
    console.log('Collecte des réseaux RIP...'); // Point de débogage 11
    const networks = [];
    document.querySelectorAll('.rip-network').forEach((networkEl, index) => {
        const address = networkEl.querySelector(`[id="rip-address-${index}"]`)?.value || '192.168.1.0';
        networks.push({ address });
    });
    console.log('Réseaux RIP collectés :', networks); // Point de débogage 12
    return networks;
}
function getEIGRPNetworks() {
    console.log("Collecte des réseaux EIGRP..."); // Point de débogage 13
    const networks = [];
    document.querySelectorAll(".eigrp-network").forEach((networkEl, index) => {
        const address = networkEl.querySelector(`[id="eigrp-address-${index}"]`)?.value || "192.168.2.0";
        const mask = networkEl.querySelector(`[id="eigrp-mask-${index}"]`)?.value || "0.0.0.255";
        networks.push({ address, mask });
    });
    console.log("Réseaux EIGRP collectés :", networks); // Point de débogage 14
    return networks;
}
function getQoSSettings() {
    console.log('Collecte des paramètres QoS...'); // Point de débogage 15
    const qos = [];
    document.querySelectorAll('.qos-class').forEach((qosEl, index) => {
        const className = qosEl.querySelector(`[id="qosClass-${index}"]`)?.value || 'DefaultQoS';
        const bandwidth = qosEl.querySelector(`[id="qosBandwidth-${index}"]`)?.value || '10';
        qos.push({ class: className, bandwidth });
    });
    console.log('Paramètres QoS collectés :', qos); // Point de débogage 16
    return qos;
}

function addInterface() {
    console.log("Ajout d'une interface..."); // Point de débogage 17
    const interfaceSection = document.getElementById('interfaces');
    const index = document.querySelectorAll('.interface-config').length;
    const newInterface = document.createElement('div');
    newInterface.classList.add('interface-config');
    newInterface.innerHTML = `
        <label for="interface-type-${index}">Type :</label>
        <input type="text" id="interface-type-${index}" name="interfaceType[]" placeholder="Type (e.g., GigabitEthernet)">
        <label for="interface-number-${index}">Numéro :</label>
        <input type="text" id="interface-number-${index}" name="interfaceNumber[]" placeholder="Numéro (e.g., 0/1)">
        <label for="interface-ip-${index}">Adresse IP :</label>
        <input type="text" id="interface-ip-${index}" name="interfaceIp[]" placeholder="Adresse IP">
        <label for="interface-mask-${index}">Masque :</label>
        <input type="text" id="interface-mask-${index}" name="interfaceMask[]" placeholder="Masque de sous-réseau">
        <label for="interface-description-${index}">Description :</label>
        <input type="text" id="interface-description-${index}" name="interfaceDescription[]" placeholder="Description">
        <label for="interface-mode-${index}">Mode :</label>
        <input type="text" id="interface-mode-${index}" name="interfaceMode[]" placeholder="Mode (access/trunk)">
        <label for="interface-vlan-${index}">VLAN :</label>
        <input type="text" id="interface-vlan-${index}" name="interfaceVlan[]" placeholder="VLAN">
        <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
    `;
    interfaceSection.appendChild(newInterface);
}

function addVlan() {
    console.log("Ajout d'un VLAN..."); // Point de débogage 18
    const vlanSection = document.getElementById('vlans');
    const index = document.querySelectorAll('.vlan-config').length;
    const newVlan = document.createElement('div');
    newVlan.classList.add('vlan-config');
    newVlan.innerHTML = `
        <label for="vlan-id-${index}">ID VLAN :</label>
        <input type="text" id="vlan-id-${index}" name="vlanId[]" placeholder="VLAN ID">
        <label for="vlan-name-${index}">Nom VLAN :</label>
        <input type="text" id="vlan-name-${index}" name="vlanName[]" placeholder="Nom VLAN">
        <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
    `;
    vlanSection.appendChild(newVlan);
}
