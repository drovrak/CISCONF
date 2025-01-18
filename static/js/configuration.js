// Mise à jour complète de configuration.js pour inclure des vérifications, des fonctions nécessaires, et des points de débogage

function toggleDetails(checkbox) {
    const details = checkbox.closest('.config-section').querySelector('.details');
    details.style.display = checkbox.checked ? 'block' : 'none';
}
function formatDataAsCommands(data) {
    
    //formatage du contenue pour etre compatible avec le serveur
    const commands = [];

    // Ajout des commandes basées sur les données collectées
    if (data.hostname) {
        commands.push(`Ssh.set_domain_name('${data.hostname}')`);
    }
    if (data.banner) {
        commands.push(`System.set_banner('${data.banner}')`);
    }
    if (data.disableDomainLookup) {
        commands.push(`System.disable_domain_lookup()`);
    }

    data.interfaces.forEach((iface) => {
        commands.push(`Interface.set_description('${iface.description}')`);
    });

    if (data.ospf) {
        commands.push(`Routing.OSPF.set_as_number('${data.ospf.asNumber}')`);
        commands.push(`Routing.OSPF.set_router_id('${data.ospf.routerId}')`);
        data.ospf.networks.forEach((network) => {
            commands.push(`Routing.OSPF.add_network('${network.address}', '${network.mask}', '${network.area}')`);
        });
    }

    if (data.rip) {
        commands.push(`Routing.RIP.set_version('${data.rip.version}')`);
        data.rip.networks.forEach((network) => {
            commands.push(`Routing.RIP.add_network('${network.address}')`);
        });
    }

    if (data.eigrp) {
        commands.push(`Routing.EIGRP.set_as_number('${data.eigrp.asNumber}')`);
        data.eigrp.networks.forEach((network) => {
            commands.push(`Routing.EIGRP.add_network('${network.address}', '${network.mask}')`);
        });
    }

    data.qos.forEach((qos) => {
        commands.push(`QoS.set_class('${qos.class}', '${qos.bandwidth}')`);
    });

    return { data: commands };
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
        console.log('Réponse du serveur reçue :', response); // Point de débogage 3
        if (!response.ok) {
            throw new Error('Erreur réseau lors de la communication avec le backend.');
        }
        return response.json();
    })
    .then(result => {
        console.log('Résultat reçu du backend :', result); // Point de débogage 4
        document.getElementById('outputConfig').value = result.config || 'Aucune configuration générée.';
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
