// Mise à jour complète de configuration.js pour inclure des vérifications, des fonctions nécessaires, et des points de débogage

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const checkbox = document.querySelector(`#enable-${sectionId}`);
    section.style.display = checkbox.checked ? 'block' : 'none';
}

function formatDataAsCommands(data) {
    // Formatage des données pour le serveur en appelant les fonctions Python
    const commands = [];

    try {
        // Configuration de base
        if (data.hostname) commands.push(`MainCommonCommand.set_hostname("${data.hostname}")`);
        if (data.enableSecret) commands.push(`MainCommonCommand.set_enable_secret("${data.enableSecret}")`);
        if (data.banner) commands.push(`MainCommonCommand.set_banner("${data.banner}")`);
        if (data.disableDomainLookup) {
            commands.push('MainCommonCommand.disable_ip_domain_lookup()');
        }

        // Interfaces
        if (data.interfacesEnabled) {
            data.interfaces.forEach((iface) => {
                commands.push(`Interface.configure_interface("${iface.type}","${iface.number}")`);
                if (iface.ip && iface.mask) {
                    commands.push(`Interface.set_ip_address("${iface.ip}","${iface.mask}")`);
                }
                if (iface.description) commands.push(`Interface.set_description("${iface.description}")`);
                if (iface.mode) commands.push(`Interface.set_interface_mode("${iface.mode}")`);
                if (iface.vlan) commands.push(`Interface.set_vlan("${iface.vlan}")`);
            });
        }

    
        // RIP
        if (data.ripEnabled) {
            commands.push(`Rip.router_rip()`);
            commands.push(`Rip.set_version(${data.rip.version})`);
            data.rip.networks.forEach((network) => {
                commands.push(`Rip.set_network("${network.address}")`);
            });
        }

        // EIGRP
        if (data.eigrpEnabled) {
            commands.push(`Eigrp.router_eigrp(${data.eigrp.asNumber})`);
            data.eigrp.networks.forEach((network) => {
                commands.push(`Eigrp.set_network("${network.address}", "${network.mask}")`);
            });
        }

        // QoS
        if (data.qosEnabled && data.qos.length > 0) {
            commands.push('Qos.create_policy_map("QoS-Policy")');
            data.qos.forEach((qos) => {
                commands.push(`Qos.create_class_map("${qos.class}")`);
                commands.push(`Qos.set_bandwidth(${qos.bandwidth})`);
            });
        }
        // VTY
        if (data.vty) {
            commands.push('Vty.set_vty_line()');
            if (data.vty.execTimeout) {
                commands.push(`Vty.set_exec_timeout("${data.vty.execTimeout}")`);
            }
            if (data.vty.transportInput) {
                commands.push(`Vty.set_transport_input("${data.vty.transportInput}","${data.vty.protocol}")`);
            }
            if (data.vty.login) {
                commands.push(`Vty.enable_login()`);
            }
            commands.push('Vty.exit()');
        }
        // Line Console
        if (data.lineConsole) {
            if (data.lineConsole.consoleLineEnabled) {
                commands.push('LineConsole.set_console_line()');
            }
            if (data.lineConsole.loggingSyncEnabled) {
                commands.push('LineConsole.enable_logging_synchronous()');
            }
            if (data.lineConsole.enableLoginConsole) {
                commands.push('LineConsole.enable_login()');
            }
            commands.push('LineConsole.exit()');
        }
        // VLANs
        if (data.vlans) {
            if (data.vlans.vlanId && data.vlans.vlanName) {
                commands.push(`Vlan.set_vlan_name(${data.vlans.vlanId}, "${data.vlans.vlanName}")`);
            }
        }
        // SSH
        if (data.ssh) {
            if (data.ssh.domainName) {
                commands.push(`Ssh.set_domain_name("${data.ssh.domainName}")`);
            }
            if (data.ssh.sshVersion) {
                commands.push(`Ssh.set_ssh_version(${data.ssh.sshVersion})`);
            }
            if (data.ssh.authRetries) {
                commands.push(`Ssh.set_ssh_authentication_retries(${data.ssh.authRetries})`);
            }
        }
        //EIGRP
        if (data.eigrp) {
            commands.push(`Eigrp.router_eigrp("${data.eigrp.asNumber}")`);
        
            data.eigrp.networks.forEach(network => {
                if (network.address && network.mask) {
                    commands.push(`Eigrp.set_network("${network.address}", "${network.mask}")`);
                }
            });
        
            if (data.eigrp.passiveInterface) {
                commands.push(`Eigrp.set_passive_interface("${data.eigrp.passiveInterface}")`);
            }
        
            if (data.eigrp.autoSummaryDisabled) {
                commands.push('Eigrp.disable_auto_summary()');
            }
        
            commands.push('Eigrp.exit()');
        }
        
        // Interfaces
        if (data.interfaces) {
            data.interfaces.forEach((iface) => {
                commands.push(`Interface.configure_interface("${iface.type}","${iface.number}")`);

                if (iface.ip && iface.mask) {
                    commands.push(`Interface.set_ip_address("${iface.ip}","${iface.mask}")`);
                }
                if (iface.description) {
                    commands.push(`Interface.set_description("${iface.description}")`);
                }
                if (iface.speed !== 'auto') {
                    commands.push(`Interface.set_speed("${iface.speed}")`);
                }
                if (iface.duplex !== 'auto') {
                    commands.push(`Interface.set_duplex("${iface.duplex}")`);
                }
                if (iface.portChannelNumber && iface.portChannelMode) {
                    commands.push(
                        `Interface.add_to_port_channel("${iface.portChannelNumber}","${iface.portChannelMode}")`
                    );
                }
                if (iface.mode) {
                    commands.push(`Interface.set_interface_mode("${iface.mode}")`);
                }
                if (iface.rangeStart && iface.rangeEnd) {
                    commands.push(
                        `Interface.interface_range_until("${iface.type}","${iface.rangeStart}","${iface.rangeEnd}")`
                    );
                }
                commands.push(`Interface.enable_interface()`);
                commands.push(`Interface.exit_interface()`);
            });
        }
        // DHCP
        if (data.dhcp) {
            if (data.dhcp.excludedRange) {
                commands.push(
                    `Dhcp.exclude_addresses("${data.dhcp.excludedRange.start}", "${data.dhcp.excludedRange.end}")`
                );
            }
            commands.push(`Dhcp.enter_pool("${data.dhcp.poolName}")`);
            if (data.dhcp.networkAddress && data.dhcp.subnetMask) {
                commands.push(
                    `Dhcp.set_network("${data.dhcp.networkAddress}", "${data.dhcp.subnetMask}")`
                );
            }
            if (data.dhcp.defaultRouter) {
                commands.push(`Dhcp.set_default_router("${data.dhcp.defaultRouter}")`);
            }
            if (data.dhcp.dnsServer) {
                commands.push(`Dhcp.set_dns_server("${data.dhcp.dnsServer}")`);
            }
            if (data.dhcp.domainName) {
                commands.push(`Dhcp.set_domain_name("${data.dhcp.domainName}")`);
            }
            commands.push('Dhcp.exit()');
        }
        // Formatage des commandes OSPF
        if (data.ospf) {
            if (data.ospf.asNumber) {
                commands.push(`Ospf.router_ospf("${data.ospf.asNumber}")`);
            }

            if (data.ospf.routerId) {
                commands.push(`Ospf.set_router_id("${data.ospf.routerId}")`);
            }

            data.ospf.networks.forEach(network => {
                if (network.address && network.mask && network.area) {
                    commands.push(`Ospf.set_network("${network.address}", "${network.mask}", "${network.area}")`);
                }
            });

            if (data.ospf.defaultInformation) {
                commands.push('Ospf.set_default_information()');
            }

            commands.push('Ospf.exit()');
        }

        // Formatage des commandes RIP
        if (data.rip) {
            commands.push('Rip.router_rip()');

            if (data.rip.version) {
                commands.push(`Rip.set_version(${data.rip.version})`);
            }

            data.rip.networks.forEach(network => {
                if (network.address) {
                    commands.push(`Rip.set_network("${network.address}")`);
                }
            });

    commands.push('Rip.exit()');
}

        
    } catch (error) {
        console.error('Erreur lors du formatage des données :', error);
        commands.push('MainCommonCommand.log_error("Erreur de formatage des données")');
    }

    return commands;
}

function sendData() {
    console.log("Début de l'envoi des données...");

    const data = {
        hostname: document.getElementById('hostname')?.value || '',
        enableSecret: document.getElementById('enableSecret')?.value || '',
        banner: document.getElementById('banner')?.value || '',
        disableDomainLookup: document.getElementById('disableDomainLookup')?.checked || false,
        vty: getVTYData(),
        lineConsole: getLineConsoleData(),
        ssh: getSSHData(),
        dhcp: getDHCPData(),
        vlans: getVLANData(),
        interfacesEnabled: document.getElementById('enable-interfaces')?.checked || false,
        //ospfEnabled: document.getElementById('enable-ospf')?.checked || false,
        ripEnabled: document.getElementById('enable-rip')?.checked || false,
        eigrpEnabled: document.getElementById('enable-eigrp')?.checked || false,
        eigrp: getEIGRPData(), // Inclure la collecte des données EIGRP
        qosEnabled: document.getElementById('enable-qos')?.checked || false,
        interfaces: getInterfaceData(),
        ospf: getOSPFData(),
        rip: getRIPData(),
        eigrp: getEIGRPData(),
        qos: getQoSSettings()
    };

    console.log('Données collectées pour envoi :', data);

    const formattedData = formatDataAsCommands(data);

    console.log('Données formatées pour envoi :', formattedData);
    fetch('/execute', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formattedData)
    })
    .then(response => response.text())
    .then(result => {
        document.getElementById('config').value = result || 'Aucune réponse reçue.';
    })
    .catch(error => {
        console.error('Erreur:', error);
        document.getElementById('config').value = 'Une erreur est survenue lors de la génération.';
    });
}
function addRipNetwork() {
    console.log("Ajout d'un réseau RIP...");
    const ripSection = document.getElementById('RIP');
    const newNetwork = document.createElement('div');
    newNetwork.innerHTML = `
        <label for="ripNetwork">Network :</label>
        <input type="text" name="ripNetwork[]" placeholder="192.168.1.0">
        <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
    `;
    ripSection.appendChild(newNetwork);
}
function getEIGRPData() {
    const isEnabled = document.getElementById('enable-EIGRP')?.checked || false;
    if (!isEnabled) {
        console.log('EIGRP n\'est pas activé.');
        return null;
    }

    console.log('Collecte des données EIGRP...');
    const networks = [];

    const networkAddress = document.getElementById('eigrp-network')?.value.trim();
    const wildcardMask = document.getElementById('eigrp-wildcard-mask')?.value.trim();

    if (networkAddress && wildcardMask) {
        networks.push({ address: networkAddress, mask: wildcardMask });
    }

    const passiveInterface = document.getElementById('eigrp-passive-interface')?.value.trim() || '';
    const autoSummaryDisabled = document.getElementById('disable-auto-summary')?.checked || false;

    const eigrpData = {
        asNumber: document.getElementById('eigrp-as-number')?.value.trim() || '',
        networks,
        passiveInterface,
        autoSummaryDisabled
    };

    console.log('Données EIGRP collectées :', eigrpData);
    return eigrpData;
}

function getRIPData() {
    console.log('Collecte des données RIP...'); // Débogage
    const networks = [];

    const networkAddress = document.getElementById('ripNetwork')?.value.trim();
    if (networkAddress) {
        networks.push({ address: networkAddress });
    }

    const ripData = {
        version: document.getElementById('ripVersion')?.value.trim() || '',
        networks
    };

    console.log('Données RIP collectées :', ripData); // Débogage
    return ripData;
}


function getOSPFData() {
    console.log('Collecte des données OSPF...'); // Débogage
    const networks = [];

    // Collecte des réseaux OSPF
    const networkAddress = document.getElementById('ospf-network')?.value;
    const wildcardMask = document.getElementById('ospf-wildcard-mask')?.value;
    const areaNumber = document.getElementById('ospf-area-number')?.value;

    if (networkAddress && wildcardMask && areaNumber) {
        networks.push({ address: networkAddress, mask: wildcardMask, area: areaNumber });
    }

    // Récupération des autres champs OSPF
    const ospfData = {
        asNumber: document.getElementById('ospf-as-number')?.value.trim() || '',
        routerId: document.getElementById('router-id')?.value.trim() || '',
        networks,
        defaultInformation: document.getElementById('default-information')?.checked || false
    };

    console.log('Données OSPF collectées :', ospfData); // Débogage
    return ospfData;
}



function getDHCPData() {
    console.log("Collecte des données DHCP...");
    const isEnabled = document.getElementById('enable-DHCP')?.checked || false;

    if (!isEnabled) {
        console.log("La section DHCP n'est pas activée.");
        return null;
    }

    const poolName = document.getElementById('dhcp-pool-name')?.value || '';
    const networkAddress = document.getElementById('network-address')?.value || '';
    const subnetMask = document.getElementById('subnet-mask-DHCP')?.value || '';
    const defaultRouter = document.getElementById('default-router')?.value || '';
    const dnsServer = document.getElementById('dns-server')?.value || '';
    const domainName = document.getElementById('domain-name')?.value || '';
    const excludedStart = document.getElementById('excluded-start')?.value || '';
    const excludedEnd = document.getElementById('excluded-end')?.value || '';

    const dhcpData = {
        poolName,
        networkAddress,
        subnetMask,
        defaultRouter,
        dnsServer,
        domainName,
        excludedRange: excludedStart && excludedEnd ? { start: excludedStart, end: excludedEnd } : null,
    };

    console.log("Données DHCP collectées :", dhcpData);
    return dhcpData;
}

function getSSHData() {
    console.log("Collecte des données SSH...");
    const isEnabled = document.getElementById('enable-ssh')?.checked || false;
    if (!isEnabled) {
        console.log("La section SSH n'est pas activée.");
        return null;
    }

    const domainName = document.getElementById('domain-name')?.value || '';
    const sshVersion = document.getElementById('ssh-version')?.value || '';
    const authRetries = document.getElementById('auth-retries')?.value || '';

    const sshData = {
        domainName,
        sshVersion,
        authRetries,
    };

    console.log("Données SSH collectées :", sshData);
    return sshData;
}

function getVTYData() {
    console.log("Collecte des données VTY...");
    const isEnabled = document.getElementById('enable-VTY')?.checked || false;
    if (!isEnabled) {
        console.log("La section VTY n'est pas activée.");
        return null;
    }

    const execTimeout = document.getElementById('exec-timeout')?.value || '';
    const transportInput = document.getElementById('transport-input')?.value || 'input';
    const protocol = document.getElementById('transport-input-protocol')?.value || '';
    const login = document.getElementById('enable-login')?.value || '';

    const vtyData = {
        execTimeout,
        transportInput,
        protocol,
        login,
    };

    console.log("Données VTY collectées :", vtyData);
    return vtyData;
}
function getLineConsoleData() {
    console.log("Collecte des données Line Console...");
    const isEnabled = document.getElementById('enable-lineConsole')?.checked || false;
    if (!isEnabled) {
        console.log("La section Line Console n'est pas activée.");
        return null;
    }

    const consoleLineEnabled = document.getElementById('set-console-line')?.checked || false;
    const loggingSyncEnabled = document.getElementById('logging-sync')?.checked || false;
    const enableLoginConsole = document.getElementById('enable-login-console')?.value || '';

    const lineConsoleData = {
        consoleLineEnabled,
        loggingSyncEnabled,
        enableLoginConsole,
    };

    console.log("Données Line Console collectées :", lineConsoleData);
    return lineConsoleData;
}
function getVLANData() {
    console.log("Collecte des données VLAN...");
    const isEnabled = document.getElementById('enable-VLANs')?.checked || false;

    if (!isEnabled) {
        console.log("La section VLANs n'est pas activée.");
        return null;
    }

    const vlanId = document.getElementById('vlan-id')?.value || '';
    const vlanName = document.getElementById('vlan-name')?.value || '';

    const vlanData = {
        vlanId,
        vlanName,
    };

    console.log("Données VLAN collectées :", vlanData);
    return vlanData;
}

function getInterfaceData() {
    console.log("Collecte des données Interfaces...");
    const isEnabled = document.getElementById('enable-Interfaces')?.checked || false;

    if (!isEnabled) {
        console.log("La section Interfaces n'est pas activée.");
        return null;
    }

    const interfaces = [];
    const interfaceType = document.getElementById('interface-type')?.value || 'FastEthernet';
    const interfaceNumber = document.getElementById('interface-number')?.value || '0/1';
    const ipAddress = document.getElementById('ip-address')?.value || '';
    const subnetMask = document.getElementById('subnet-mask')?.value || '';
    const description = document.getElementById('description')?.value || '';
    const speed = document.getElementById('speed')?.value || 'auto';
    const duplex = document.getElementById('duplex')?.value || 'auto';
    const portChannelNumber = document.getElementById('port-channel-number')?.value || '';
    const portChannelMode = document.getElementById('port-channel-mode')?.value || '';
    const interfaceMode = document.getElementById('interface-mode')?.value || 'access';
    const rangeStart = document.getElementById('interface-range-start')?.value || '';
    const rangeEnd = document.getElementById('interface-range-end')?.value || '';

    const interfaceData = {
        type: interfaceType,
        number: interfaceNumber,
        ip: ipAddress,
        mask: subnetMask,
        description,
        speed,
        duplex,
        portChannelNumber,
        portChannelMode,
        mode: interfaceMode,
        rangeStart,
        rangeEnd,
    };

    interfaces.push(interfaceData);
    console.log("Données Interfaces collectées :", interfaces);
    return interfaces;
}


function getOSPFData() {
    const isEnabled = document.getElementById('enable-OSPF')?.checked || false;
    if (!isEnabled) {
        console.log('OSPF n\'est pas activé.');
        return null;
    }

    console.log('Collecte des données OSPF...');
    const networks = [];

    const networkAddress = document.getElementById('ospf-network')?.value.trim();
    const wildcardMask = document.getElementById('ospf-wildcard-mask')?.value.trim();
    const areaNumber = document.getElementById('ospf-area-number')?.value.trim();

    if (networkAddress && wildcardMask && areaNumber) {
        networks.push({ address: networkAddress, mask: wildcardMask, area: areaNumber });
    }

    const ospfData = {
        asNumber: document.getElementById('ospf-as-number')?.value.trim() || '',
        routerId: document.getElementById('router-id')?.value.trim() || '',
        networks,
        defaultInformation: document.getElementById('default-information')?.checked || false
    };

    console.log('Données OSPF collectées :', ospfData);
    return ospfData;
}


function getRIPData() {
    const isEnabled = document.getElementById('enable-RIP')?.checked || false;
    if (!isEnabled) {
        console.log('RIP n\'est pas activé.');
        return null;
    }

    console.log('Collecte des données RIP...');
    const networks = [];

    const networkAddress = document.getElementById('ripNetwork')?.value.trim();
    if (networkAddress) {
        networks.push({ address: networkAddress });
    }

    const ripData = {
        version: document.getElementById('ripVersion')?.value.trim() || '',
        networks
    };

    console.log('Données RIP collectées :', ripData);
    return ripData;
}


function getEIGRPData() {
    const networks = [];
    const isEnabled = document.getElementById('enable-eigrp')?.checked || false;
    if (!isEnabled) {
        console.log('EIGRP n\'est pas activé.');
        return null;
    }
    document.querySelectorAll('.eigrp-network').forEach((networkEl, index) => {
        const address = networkEl.querySelector(`[id="eigrp-address-${index}"]`)?.value || '';
        const mask = networkEl.querySelector(`[id="eigrp-mask-${index}"]`)?.value || '';
        networks.push({ address, mask });
    });
    return {
        asNumber: document.getElementById('eigrpAsNumber')?.value || '',
        networks
    };
}

function getQoSSettings() {
    const qos = [];
    document.querySelectorAll('.qos-class').forEach((qosEl, index) => {
        const className = qosEl.querySelector(`[id="qosClass-${index}"]`)?.value || '';
        const bandwidth = qosEl.querySelector(`[id="qosBandwidth-${index}"]`)?.value || '';
        qos.push({ class: className, bandwidth });
    });
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
