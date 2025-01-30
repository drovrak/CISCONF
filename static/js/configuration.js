// Mise à jour complète de configuration.js pour inclure des vérifications, des fonctions nécessaires, et des points de débogage

function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    const checkbox = document.querySelector(`#enable-${sectionId}`);
    if (section && checkbox) {
        section.style.display = checkbox.checked ? 'block' : 'none';
    }
}
document.addEventListener("DOMContentLoaded", function () {
    toggleSection('qos');
    toggleSection('qos-voip');
    toggleSection('qos-http');

    function handleCustomSelection(selectId, customInputId) {
        const select = document.getElementById(selectId);
        const customInput = document.getElementById(customInputId);

        select.addEventListener("change", function () {
            customInput.style.display = (select.value === "custom") ? "inline-block" : "none";
            if (select.value !== "custom") customInput.value = "";
        });
    }

    handleCustomSelection("qos-dscp", "qos-dscp-custom");
    handleCustomSelection("qos-protocol", "qos-protocol-custom");
    handleCustomSelection("qos-http-protocol", "qos-http-protocol-custom");
    handleCustomSelection("qos-http-precedence", "qos-http-precedence-custom");
});
document.addEventListener("DOMContentLoaded", function () {
    toggleSection('snmp');

    function handleCustomSelection(selectId, customInputId) {
        const selectElement = document.getElementById(selectId);
        const customInputElement = document.getElementById(customInputId);

        selectElement.addEventListener("change", function () {
            if (selectElement.value === "custom") {
                customInputElement.style.display = "inline-block";
            } else {
                customInputElement.style.display = "none";
                customInputElement.value = "";
            }
        });
    }

    handleCustomSelection("snmp-trap-type", "snmp-trap-custom");
});
document.addEventListener("DOMContentLoaded", function () {
    toggleSection('telephony');

    document.getElementById("max-dn").addEventListener("change", updateDNButton);
    document.getElementById("max-ephone").addEventListener("change", updateEphoneButton);

    document.getElementById("add-dn-btn").addEventListener("click", addEphoneDN);
    document.getElementById("add-ephone-btn").addEventListener("click", addEphone);

    updateDNButton();
    updateEphoneButton();
});

function updateDNButton() {
    document.getElementById("add-dn-btn").disabled = countDN() >= getMaxDN();
}

function updateEphoneButton() {
    document.getElementById("add-ephone-btn").disabled = countEphone() >= getMaxEphone();
}

function getMaxDN() {
    return parseInt(document.getElementById("max-dn").value, 10);
}

function getMaxEphone() {
    return parseInt(document.getElementById("max-ephone").value, 10);
}

function countDN() {
    return document.querySelectorAll(".dn-entry").length;
}

function countEphone() {
    return document.querySelectorAll(".ephone-entry").length;
}

function updateButtonConfigOptions() {
    const dnCount = countDN();
    const dnOptions = Array.from({ length: dnCount }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');

    document.querySelectorAll(".button-dn").forEach(select => {
        select.innerHTML = dnOptions;
    });
}

function addEphoneDN() {
    const container = document.getElementById("dn-container");
    const index = countDN();

    if (index >= getMaxDN()) {
        alert("Nombre maximal de DN atteint !");
        return;
    }

    const newDN = document.createElement("div");
    newDN.classList.add("dn-entry");
    newDN.innerHTML = `
        <label for="dn-number-${index}">Numéro de DN :</label>
        <input type="number" id="dn-number-${index}" class="dn-number" value="${index + 1}" readonly>

        <label for="dn-phone-number-${index}">Numéro :</label>
        <input type="text" id="dn-phone-number-${index}" class="dn-phone-number" placeholder="100${index + 1}">

        <label for="dn-name-${index}">Nom :</label>
        <input type="text" id="dn-name-${index}" class="dn-name" placeholder="Utilisateur ${index + 1}">

        <button type="button" onclick="removeElement(this, 'dn-entry')">Supprimer</button>
    `;
    container.appendChild(newDN);
    updateDNButton();
    updateButtonConfigOptions();
}

function addEphone() {
    const container = document.getElementById("ephone-container");
    const index = countEphone();

    if (index >= getMaxEphone()) {
        alert("Nombre maximal de téléphones atteint !");
        return;
    }

    const dnCount = countDN();
    const dnOptions = Array.from({ length: dnCount }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');
    const buttonOptions = Array.from({ length: index + 1 }, (_, i) => `<option value="${i + 1}">${i + 1}</option>`).join('');

    const newEphone = document.createElement("div");
    newEphone.classList.add("ephone-entry");
    newEphone.innerHTML = `
        <label for="ephone-number-${index}">Numéro ephone :</label>
        <input type="number" id="ephone-number-${index}" class="ephone-number" value="${index + 1}" readonly>

        <label for="mac-address-${index}">Adresse MAC :</label>
        <input type="text" id="mac-address-${index}" class="mac-address" placeholder="0012.3456.789A">

        <label for="phone-type-${index}">Type de téléphone :</label>
        <input type="text" id="phone-type-${index}" class="phone-type" placeholder="7965">

        <label for="button-number-${index}">Numéro du bouton :</label>
        <select id="button-number-${index}" class="button-number">${buttonOptions}</select>

        <label for="button-dn-${index}">DN associé :</label>
        <select id="button-dn-${index}" class="button-dn">${dnOptions}</select>

        <button type="button" onclick="removeElement(this, 'ephone-entry')">Supprimer</button>
    `;
    container.appendChild(newEphone);
    updateEphoneButton();
}

function removeElement(button, className) {
    button.parentElement.remove();
    updateDNButton();
    updateEphoneButton();
    updateButtonConfigOptions();
}



function formatDataAsCommands(data) {
    // Formatage des données pour le serveur en appelant les fonctions Python
    const commands = [];

    try {
        // Configuration de base
        if(data.mainEnabled){
            if (data.hostname) commands.push(`MainCommonCommand.set_hostname("${data.hostname}")`);
            if (data.enableSecret) commands.push(`MainCommonCommand.set_enable_secret("${data.enableSecret}")`);
            if (data.banner) commands.push(`MainCommonCommand.set_banner("${data.banner}")`);
            if (data.disableDomainLookup) {
                commands.push('MainCommonCommand.disable_ip_domain_lookup()');
            }
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
        if (data.vlans && Array.isArray(data.vlans)) {
            data.vlans.forEach((vlan) => {
                if (vlan.vlanId && vlan.vlanName) {
                    commands.push(`Vlan.set_vlan_name(${vlan.vlanId}, "${vlan.vlanName}")`);
                }
            });
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

            data.rip.networks_RIP.forEach((network_RIP) => {
                if (network_RIP.address && network_RIP.mask) {
                    commands.push(`Rip.set_network("${network_RIP.address}", "${network_RIP.mask}")`);
                }
            });
        
            

             commands.push('Rip.exit()');
        }       
        // HSRP Configuration
        if (data.hsrp) {
            commands.push(`Hsrp.configure_hsrp_interface(${data.hsrp.group}, "${data.hsrp.virtualIp}")`);
            commands.push(`Hsrp.set_priority(${data.hsrp.group}, ${data.hsrp.priority})`);

            if (data.hsrp.preempt) {
                commands.push(`Hsrp.enable_preempt(${data.hsrp.group})`);
            }

            if (data.hsrp.authentication) {
                commands.push(`Hsrp.set_authentication(${data.hsrp.group}, "${data.hsrp.authentication}")`);
            }

            commands.push(`Hsrp.set_timers(${data.hsrp.group}, ${data.hsrp.helloTime}, ${data.hsrp.holdTime})`);

            if (data.hsrp.trackedInterface) {
                commands.push(`Hsrp.track_interface(${data.hsrp.group}, "${data.hsrp.trackedInterface}", ${data.hsrp.decrementValue})`);
            }

            commands.push(`Hsrp.exit()`);
        }

        // ACL Configuration
        if (data.acl) {
            if (data.acl.type === 'standard') {
                commands.push(`Acl.enter_acl("standard", "${data.acl.nameOrNumber}")`);
                commands.push(`Acl.config_standard_acl("${data.acl.action}", "${data.acl.source}${data.acl.source === 'host' ? ' ' + data.acl.sourceAddress : ''}")`);
            } else if (data.acl.type === 'extended') {
                commands.push(`Acl.enter_acl("extended", "${data.acl.nameOrNumber}")`);
                commands.push(`Acl.config_extended_acl(args=["${data.acl.action}", "${data.acl.source}", "${data.acl.sourceAddress}", "${data.acl.wildcardMask}", ${data.acl.extendedArgs ? `"${data.acl.extendedArgs}"` : '""'}])`);
            }

            commands.push('Acl.exit()');
        }
        // STP Configuration
        if (data.stp) {
            commands.push(`Stp.set_stp_mode("${data.stp.mode}")`);
            commands.push(`Stp.set_vlan_root("${data.stp.vlanRootNumber}", "${data.stp.vlanRootRole}")`);
            
            if (data.stp.enablePortFastBPDU) {
                commands.push(`StpInterfaceSwitch.enable_bpduguard_on_interface()`);
            }
            
            if (data.stp.stpInterfaceType && data.stp.stpInterfaceNumber) {
                commands.push(`StpInterfaceSwitch.configure_interface("${data.stp.stpInterfaceType}", "${data.stp.stpInterfaceNumber}")`);
                if (data.stp.enablePortfast) {
                    commands.push(`StpInterfaceSwitch.enable_porfast_on_interface()`);
                }
            }
        }
        if (data.nat) {
            // Configuration des interfaces NAT
            commands.push(`Nat.configure_interface("${data.nat.insideType}", "${data.nat.insideNumber}")`);
            commands.push(`Nat.configure_inside_interface()`);
            commands.push(`Nat.configure_interface("${data.nat.outsideType}", "${data.nat.outsideNumber}")`);
            commands.push(`Nat.configure_outside_interface()`);
            commands.push(`Nat.exit_interface()`);
        
            // Configuration du NAT statique si activé
            if (data.nat.enableStaticNat && data.nat.staticNatLocal && data.nat.staticNatGlobal) {
                commands.push(`Nat.configure_static_nat("${data.nat.staticNatLocal}", "${data.nat.staticNatGlobal}")`);
            }
        
            // Configuration du NAT dynamique si activé
            if (data.nat.enableDynamicNat && data.nat.poolName && data.nat.poolStart && data.nat.poolEnd && data.nat.subnetMask) {
                commands.push(`Nat.configure_nat_pool("${data.nat.poolName}", "${data.nat.poolStart}", "${data.nat.poolEnd}", "${data.nat.subnetMask}")`);
            }
            
            if (data.nat.enableDynamicNat && data.nat.accessList && data.nat.poolName) {
                commands.push(`Nat.configure_dynamic_nat("${data.nat.accessList}", "${data.nat.poolName}")`);
            }
        
            // Configuration du PAT (Port Address Translation) si activé
            if (data.nat.enablePat && data.nat.patInterface && data.nat.patAccessList) {
                commands.push(`Nat.configure_pat("${data.nat.patInterface}", "${data.nat.patAccessList}")`);
            }
        }
        if (data.qos) {
            commands.push(`Qos.create_policy_map("${data.qos.policyName}")`);
        
            if (data.qos.enableVoIP) {
                commands.push(`Qos.create_class_map("${data.qos.voipName}")`);
                commands.push(`Qos.match_dscp("${data.qos.dscp === "custom" ? data.qos.dscpCustom : data.qos.dscp}")`);
                commands.push(`Qos.match_protocol("${data.qos.protocol === "custom" ? data.qos.protocolCustom : data.qos.protocol}")`);
                commands.push(`Qos.create_class("${data.qos.voipName}")`);
                commands.push(`Qos.set_bandwidth(${data.qos.voipBandwidth})`);
                commands.push(`Qos.exit()`);
            }
        
            if (data.qos.enableHTTP) {
                commands.push(`Qos.create_class_map("${data.qos.httpName}", "${data.qos.httpMatchType}")`);
                commands.push(`Qos.match_protocol("${data.qos.httpProtocol === "custom" ? data.qos.httpProtocolCustom : data.qos.httpProtocol}")`);
                commands.push(`Qos.match_ip_precedence("${data.qos.httpPrecedence === "custom" ? data.qos.httpPrecedenceCustom : data.qos.httpPrecedence}")`);
                commands.push(`Qos.create_class("${data.qos.httpName}")`);
                commands.push(`Qos.set_bandwidth(${data.qos.httpBandwidth})`);
                commands.push(`Qos.exit()`);
            }
        
            commands.push(`Interface.configure_interface("${data.qos.interfaceType.toLowerCase()}", "${data.qos.interfaceNumber}")`);
            commands.push(`Qos.apply_policy_map("${data.qos.policyDirection}", "${data.qos.policyName}")`);
            commands.push(`Qos.exit()`);
        }
        
        if (data.snmp) {
            commands.push(`Snmp.set_community("${data.snmp.communityRO}", "RO")`);
            commands.push(`Snmp.set_community("${data.snmp.communityRW}", "RW")`);
            commands.push(`Snmp.set_location("${data.snmp.location}")`);
            commands.push(`Snmp.set_contact("${data.snmp.contact}")`);
            commands.push(`Snmp.enable_traps("${data.snmp.trapType}")`);
        }
        if (data.telephony) {
            commands.push(`Telephony.configure_telephony_service(${data.telephony.maxDN}, ${data.telephony.maxEphone}, "${data.telephony.sourceAddress}", ${data.telephony.port}, "${data.telephony.voicemail}")`);
        
            data.telephony.dns.forEach(dn => {
                commands.push(`Telephony.configure_ephone_dn(${dn.dnNumber}, "${dn.number}", "${dn.name}")`);
            });
        
            data.telephony.ephones.forEach(ephone => {
                commands.push(`Telephony.configure_ephone(${ephone.ephoneNumber}, "${ephone.macAddress}", "${ephone.phoneType}", "${ephone.buttonConfig}")`);
            });
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
        mainEnabled: document.getElementById('enable-main')?.checked || false,
        interfacesEnabled: document.getElementById('enable-interfaces')?.checked || false,
        //ospfEnabled: document.getElementById('enable-ospf')?.checked || false,
        ripEnabled: document.getElementById('enable-rip')?.checked || false,
        eigrpEnabled: document.getElementById('enable-eigrp')?.checked || false,
        eigrp: getEIGRPData(),
        qosEnabled: document.getElementById('enable-qos')?.checked || false,
        interfaces: getInterfaceData(),
        ospf: getOSPFData(),
        stp: getSTPConfiguration(),
        rip: getRIPData(),
        hsrp: getHSRPConfiguration(),
        acl: getACLConfiguration(),
        qos: getQoSConfiguration(),
        nat: getNATConfiguration(),
        snmp : getSNMPConfiguration(),
        telephony: getTelephonyConfiguration()
        
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


function getTelephonyConfiguration() {
    console.log("Collecte des données Téléphonie...");
    const enableTelephony = document.getElementById('enable-telephony').checked;
    if (!enableTelephony) {
        console.log("La section Téléphonie n'est pas activée.");
        return null;
    }

    const telephonyData = {
        maxDN: getMaxDN(),
        maxEphone: getMaxEphone(),
        sourceAddress: document.getElementById('source-address').value.trim() || '192.168.1.1',
        port: document.getElementById('port').value.trim() || '2000',
        voicemail: document.getElementById('voicemail').value.trim() || '6000',
        dns: [],
        ephones: []
    };

    // Vérifier s'il y a des DN avant d'essayer de les collecter
    const dnEntries = document.querySelectorAll(".dn-entry");
    if (dnEntries.length === 0) {
        console.warn("Aucun DN configuré.");
    } else {
        dnEntries.forEach((dn, index) => {
            const dnNumberElement = document.getElementById(`dn-number-${index}`);
            const dnPhoneElement = document.getElementById(`dn-phone-number-${index}`);
            const dnNameElement = document.getElementById(`dn-name-${index}`);

            if (dnNumberElement && dnPhoneElement && dnNameElement) {
                telephonyData.dns.push({
                    dnNumber: dnNumberElement.value,
                    number: dnPhoneElement.value.trim(),
                    name: dnNameElement.value.trim()
                });
            } else {
                console.warn(`DN ${index} est manquant ou mal configuré.`);
            }
        });
    }

    // Vérifier s'il y a des ephones avant d'essayer de les collecter
    const ephoneEntries = document.querySelectorAll(".ephone-entry");
    if (ephoneEntries.length === 0) {
        console.warn("Aucun ephone configuré.");
    } else {
        ephoneEntries.forEach((ephone, index) => {
            const ephoneNumberElement = document.getElementById(`ephone-number-${index}`);
            const macAddressElement = document.getElementById(`mac-address-${index}`);
            const phoneTypeElement = document.getElementById(`phone-type-${index}`);
            const buttonNumberElement = document.getElementById(`button-number-${index}`);
            const buttonDNElement = document.getElementById(`button-dn-${index}`);

            if (ephoneNumberElement && macAddressElement && phoneTypeElement && buttonNumberElement && buttonDNElement) {
                telephonyData.ephones.push({
                    ephoneNumber: ephoneNumberElement.value,
                    macAddress: macAddressElement.value.trim(),
                    phoneType: phoneTypeElement.value.trim(),
                    buttonConfig: `${buttonNumberElement.value}:${buttonDNElement.value}`
                });
            } else {
                console.warn(`Ephone ${index} est manquant ou mal configuré.`);
            }
        });
    }

    console.log("Données Téléphonie collectées :", telephonyData);
    return telephonyData;
}


function getSNMPConfiguration() {
    console.log("Collecte des données SNMP...");
    const enableSNMP = document.getElementById('enable-snmp').checked;
    if (!enableSNMP) {
        console.log("La section SNMP n'est pas activée.");
        return null;
    }

    function getCustomOrSelectedValue(selectId, customInputId, defaultValue) {
        const selectElement = document.getElementById(selectId);
        const customInputElement = document.getElementById(customInputId);

        if (selectElement.value === "custom") {
            return customInputElement.value.trim() || defaultValue;
        }
        return selectElement.value;
    }

    const SNMPData = {
        communityRO: document.getElementById('snmp-community-ro').value.trim() || 'PUBLIC',
        communityRW: document.getElementById('snmp-community-rw').value.trim() || 'PRIVATE',
        location: document.getElementById('snmp-location').value.trim() || 'Data Center - Paris',
        contact: document.getElementById('snmp-contact').value.trim() || 'Admin: admin@domain.com',
        trapType: getCustomOrSelectedValue('snmp-trap-type', 'snmp-trap-custom', 'environment')
    };

    console.log("Données SNMP collectées :", SNMPData);
    return SNMPData;
}

function getQoSConfiguration() {
    console.log("Collecte des données QoS...");
    const enableQoS = document.getElementById('enable-qos').checked;
    if (!enableQoS) {
        console.log("La section QoS n'est pas activée.");
        return null;
    }

    // Fonction pour récupérer une valeur personnalisée ou sélectionnée
    function getCustomOrSelectedValue(selectId, customInputId, defaultValue) {
        const selectElement = document.getElementById(selectId);
        const customInputElement = document.getElementById(customInputId);

        if (selectElement.value === "custom") {
            return customInputElement.value.trim() || defaultValue; // Si vide, prend la valeur par défaut
        }
        return selectElement.value; // Sinon, retourne la valeur sélectionnée
    }

    const QoSData = {
        enableVoIP: document.getElementById('enable-qos-voip').checked,
        voipName: document.getElementById('qos-voip-name').value.trim() || 'VOIP',
        dscp: getCustomOrSelectedValue('qos-dscp', 'qos-dscp-custom', 'ef'), // Valeur par défaut = 'ef'
        voipProtocol: getCustomOrSelectedValue('qos-protocol', 'qos-protocol-custom', 'rtp'), // Valeur par défaut = 'rtp'

        enableHTTP: document.getElementById('enable-qos-http').checked,
        httpName: document.getElementById('qos-http-name').value.trim() || 'HTTP',
        httpMatchType: document.getElementById('qos-http-match').value.trim() || 'match-all',
        httpProtocol: getCustomOrSelectedValue('qos-http-protocol', 'qos-http-protocol-custom', 'http'), // Valeur par défaut = 'http'
        httpPrecedence: getCustomOrSelectedValue('qos-http-precedence', 'qos-http-precedence-custom', '2'), // Valeur par défaut = '2'

        policyName: document.getElementById('qos-policy-name').value.trim() || 'QOS_POLICY',
        voipBandwidth: document.getElementById('qos-voip-bandwidth').value.trim() || '20',
        httpBandwidth: document.getElementById('qos-http-bandwidth').value.trim() || '10',

        interfaceType: document.getElementById('qos-interface-type').value.trim() || 'GigabitEthernet',
        interfaceNumber: document.getElementById('qos-interface-number').value.trim() || '0/1',
        policyDirection: document.getElementById('qos-policy-direction').value.trim() || 'output'
    };

    console.log("Données QoS collectées :", QoSData);
    return QoSData;
}




function getNATConfiguration() {
    console.log("Collecte des données NAT...");
    const enableNAT = document.getElementById('enable-NAT').checked;
    if (!enableNAT) {
        console.log("La section NAT n'est pas activée.");
        return null;
    }

    const NATData = {
        insideType: document.getElementById('nat-inside-type').value || 'FastEthernet',
        insideNumber: document.getElementById('nat-inside-number').value || '0/6',
        outsideType: document.getElementById('nat-outside-type').value || 'FastEthernet',
        outsideNumber: document.getElementById('nat-outside-number').value || '0/2',
        enableStaticNat: document.getElementById('enable-static-nat').checked,
        staticNatLocal: document.getElementById('nat-static-local').value || '',
        staticNatGlobal: document.getElementById('nat-static-global').value || '',
        enableDynamicNat: document.getElementById('enable-dynamic-nat').checked,
        poolName: document.getElementById('nat-pool-name').value || '',
        poolStart: document.getElementById('nat-pool-start').value || '',
        poolEnd: document.getElementById('nat-pool-end').value || '',
        subnetMask: document.getElementById('nat-mask').value || '',
        accessList: document.getElementById('nat-access-list').value || '',
        enablePat: document.getElementById('enable-pat').checked,
        patInterface: document.getElementById('nat-pat-interface').value || '',
        patAccessList: document.getElementById('nat-pat-access-list').value || ''
    };

    console.log("Données NAT collectées :", NATData);
    return NATData;
}



function getSTPConfiguration() {
    console.log("Collecte des données STP...");
    const enableSTP = document.getElementById('enable-STP').checked;
    if (!enableSTP) {
        console.log("La section STP n'est pas activée.");
        return null;
    }

    const STPData = {
        mode: document.getElementById('stp-mode').value || 'rapid-pvst',
        vlanRootNumber: document.getElementById('vlan-root-number').value || '10',
        vlanRootRole: document.getElementById('vlan-root-role').value || 'primary',
        enablePortFastBPDU: document.getElementById('portfast-bpduguard').checked || false,
        stpInterfaceType: document.getElementById('stp-interface-type').value || 'FastEthernet',
        stpInterfaceNumber: document.getElementById('stp-interface-number').value || '0/6',
        enablePortfast: document.getElementById('stp-portfast').checked || false
    };

    console.log("Données STP collectées :", STPData);
    return STPData;
}




function addEIGRPNetwork() {
    console.log("Ajout d'un réseau EIGRP...");
    const container = document.getElementById('eigrp-networks-container');
    const index = document.querySelectorAll('.eigrp-network-container').length;

    const newNetwork = document.createElement('div');
    newNetwork.classList.add('eigrp-network-container');
    newNetwork.innerHTML = `
        <label for="eigrp-network-${index}">Adresse réseau :</label>
        <input type="text" id="eigrp-network-${index}" class="eigrp-network" placeholder="192.168.1.0">

        <label for="eigrp-mask-${index}">Masque inversé :</label>
        <input type="text" id="eigrp-mask-${index}" class="eigrp-mask" placeholder="0.0.0.255">

        <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
    `;

    container.appendChild(newNetwork);
}


function getEIGRPData() {
    console.log("Collecte des données EIGRP...");
    const isEnabled = document.getElementById('enable-eigrp')?.checked || false;

    if (!isEnabled) {
        console.log("La section EIGRP n'est pas activée.");
        return null;
    }

    const asNumber = document.getElementById('eigrp-as-number')?.value.trim() || '';
    const networks = [];

    document.querySelectorAll('.eigrp-network-container').forEach((network, index) => {
        const address = document.getElementById(`eigrp-network-${index}`)?.value.trim() || '';
        const mask = document.getElementById(`eigrp-mask-${index}`)?.value.trim() || '';

        if (address && mask) {
            networks.push({ address, mask });
        }
    });

    const passiveInterface = document.getElementById('eigrp-passive-interface')?.value.trim() || '';
    const autoSummaryDisabled = document.getElementById('disable-auto-summary')?.checked || false;

    const eigrpData = {
        asNumber,
        networks,
        passiveInterface,
        autoSummaryDisabled,
    };

    console.log("Données EIGRP collectées :", eigrpData);
    return eigrpData;
}



function getHSRPConfiguration() {
    const enableHSRP = document.getElementById('enable-HSRP').checked;
    if (!enableHSRP) {
        return null; // Si HSRP n'est pas activé, ne rien retourner
    }

    return {
        group: document.getElementById('hsrp-group').value || '1',
        virtualIp: document.getElementById('hsrp-virtual-ip').value || '192.168.1.1',
        priority: document.getElementById('hsrp-priority').value || '100',
        preempt: document.getElementById('hsrp-preempt').checked || false,
        authentication: document.getElementById('hsrp-authentication').value || 'cisco123',
        helloTime: document.getElementById('hsrp-hello-time').value || '3',
        holdTime: document.getElementById('hsrp-hold-time').value || '10',
        trackedInterface: document.getElementById('tracked-interface').value || '',
        decrementValue: document.getElementById('decrement-value').value || '20'
    };
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
    const subnetMask = document.getElementById('subnet-mask')?.value || '';
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


function addVlan() {
    console.log("Ajout d'un VLAN..."); // Point de débogage
    const vlanSection = document.getElementById('vlans-container');
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
function getVLANData() {
    console.log("Collecte des données VLAN...");
    const isEnabled = document.getElementById('enable-VLANs')?.checked || false;

    if (!isEnabled) {
        console.log("La section VLANs n'est pas activée.");
        return null;
    }

    const vlanConfigs = document.querySelectorAll('.vlan-config');
    const vlans = [];

    vlanConfigs.forEach((config, index) => {
        const vlanId = config.querySelector(`#vlan-id-${index}`)?.value.trim();
        const vlanName = config.querySelector(`#vlan-name-${index}`)?.value.trim();

        if (vlanId && vlanName) {
            vlans.push({ vlanId, vlanName });
        } else {
            console.warn(`Le VLAN ${index + 1} n'est pas correctement rempli.`);
        }
    });

    console.log("Données VLAN collectées :", vlans);
    return vlans;
}



function togglePortChannelMode() {
    const portChannelModeSection = document.getElementById('port-channel-mode-section');
    const isChecked = document.getElementById('enable-port-channel-mode').checked;
    portChannelModeSection.style.display = isChecked ? 'block' : 'none';
}
function toggleInterfaceMode() {
    const interfaceModeSection = document.getElementById('interface-mode-section');
    const isChecked = document.getElementById('enable-interface-mode').checked;
    interfaceModeSection.style.display = isChecked ? 'block' : 'none';
}

function addInterface() {
    console.log("Ajout d'une interface..."); // Point de débogage
    const container = document.getElementById('interfaces-container');
    const index = document.querySelectorAll('.interface-config').length;

    const newInterface = document.createElement('div');
    newInterface.classList.add('interface-config');
    newInterface.innerHTML = `
        <label for="interface-type-${index}">Type :</label>
        <select id="interface-type-${index}" name="interfaceType[]">
            <option value="FastEthernet">FastEthernet</option>
            <option value="GigabitEthernet">GigabitEthernet</option>
            <option value="Serial" selected>Serial</option>
        </select>

        <label for="interface-number-${index}">Numéro d'interface :</label>
        <input type="text" id="interface-number-${index}" name="interfaceNumber[]" placeholder="0/1">

        <label for="interface-ip-${index}">Adresse IP :</label>
        <input type="text" id="interface-ip-${index}" name="interfaceIp[]" placeholder="192.168.1.1">

        <label for="interface-mask-${index}">Masque :</label>
        <input type="text" id="interface-mask-${index}" name="interfaceMask[]" placeholder="255.255.255.0">

        <label for="interface-description-${index}">Description :</label>
        <input type="text" id="interface-description-${index}" name="interfaceDescription[]" placeholder="Description de l'interface">

        <label for="interface-speed-${index}">Vitesse :</label>
        <select id="interface-speed-${index}" name="interfaceSpeed[]">
            <option value="auto" selected>Auto</option>
            <option value="10">10 Mbps</option>
            <option value="100">100 Mbps</option>
            <option value="1000">1000 Mbps</option>
        </select>

        <label for="interface-duplex-${index}">Duplex :</label>
        <select id="interface-duplex-${index}" name="interfaceDuplex[]">
            <option value="auto" selected>Auto</option>
            <option value="full">Full</option>
            <option value="half">Half</option>
        </select>

        <label for="interface-mode-${index}">Mode :</label>
        <select id="interface-mode-${index}" name="interfaceMode[]">
            <option value="access">Access</option>
            <option value="trunk">Trunk</option>
        </select>

        <label for="port-channel-number-${index}">Port Channel :</label>
        <input type="text" id="port-channel-number-${index}" name="portChannelNumber[]" placeholder="1">

        <label for="port-channel-mode-${index}">Mode Port Channel :</label>
        <select id="port-channel-mode-${index}" name="portChannelMode[]">
            <option value="active">Active</option>
            <option value="passive">Passive</option>
            <option value="on">On</option>
        </select>

        <button type="button" onclick="this.parentElement.remove()">Supprimer cette interface</button>
    `;

    container.appendChild(newInterface);
}


function getInterfaceData() {
    console.log("Collecte des données Interfaces...");
    const isEnabled = document.getElementById('enable-Interfaces')?.checked || false;

    if (!isEnabled) {
        console.log("La section Interfaces n'est pas activée.");
        return null;
    }

    const interfaces = [];
    const interfaceConfigs = document.querySelectorAll('.interface-config');

    interfaceConfigs.forEach((config, index) => {
        const interfaceType = config.querySelector(`#interface-type-${index}`)?.value || 'Serial';
        const interfaceNumber = config.querySelector(`#interface-number-${index}`)?.value || '0/1';
        const ipAddress = config.querySelector(`#interface-ip-${index}`)?.value || '';
        const subnetMask = config.querySelector(`#interface-mask-${index}`)?.value || '';
        const description = config.querySelector(`#interface-description-${index}`)?.value || '';
        const speed = config.querySelector(`#interface-speed-${index}`)?.value || 'auto';
        const duplex = config.querySelector(`#interface-duplex-${index}`)?.value || 'auto';
        const portChannelNumber = config.querySelector(`#port-channel-number-${index}`)?.value || '';
        const portChannelMode = config.querySelector(`#port-channel-mode-${index}`)?.value || '';
        const interfaceMode = config.querySelector(`#interface-mode-${index}`)?.value || 'access';

        interfaces.push({
            type: interfaceType,
            number: interfaceNumber,
            ip: ipAddress,
            mask: subnetMask,
            description: description,
            speed: speed,
            duplex: duplex,
            portChannelNumber: portChannelNumber,
            portChannelMode: portChannelMode,
            mode: interfaceMode,
        });
    });

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

function addRipNetwork() {
    console.log("Ajout d'un réseau RIP...");
    const ripSection = document.getElementById('RIP');
    const newNetwork = document.createElement('div');
    newNetwork.classList.add('rip-network-container');
    newNetwork.innerHTML = `
        <label for="ripNetwork">Network :</label>
        <input type="text" class="rip-network" placeholder="192.168.1.0">
        <label for="ripMask">Masque inversé :</label>
        <input type="text" class="rip-mask" placeholder="0.0.0.255">
        <button type="button" onclick="this.parentElement.remove()">Supprimer</button>
    `;
    ripSection.appendChild(newNetwork);
}

function getRIPData() {
    const isEnabled = document.getElementById('enable-RIP')?.checked || false;
    if (!isEnabled) {
        console.log('RIP n\'est pas activé.');
        return null;
    }

    console.log('Collecte des données RIP...');
    const networks_RIP = [];
    document.querySelectorAll('.rip-network-container').forEach((networkContainer) => {
        const address = networkContainer.querySelector('.rip-network')?.value.trim();
        const mask = networkContainer.querySelector('.rip-mask')?.value.trim();
        if (address && mask) {
            networks_RIP.push({ address, mask });
        }
    });

    const ripData = {
        version: document.getElementById('ripVersion')?.value.trim() || '',
        networks_RIP
    };

    console.log('Données RIP collectées :', ripData);
    return ripData;
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

function getACLConfiguration() {
    const enableACL = document.getElementById('enable-ACL').checked;
    if (!enableACL) {
        return null; // Si ACL n'est pas activé, ne rien retourner
    }

    return {
        type: document.getElementById('acl-type').value || 'standard',
        nameOrNumber: document.getElementById('acl-name-or-number').value || '100',
        action: document.getElementById('acl-action').value || 'permit',
        source: document.getElementById('acl-source').value || 'any',
        sourceAddress: document.getElementById('acl-source-address').value || '',
        wildcardMask: document.getElementById('acl-wildcard-mask').value || '',
        extendedArgs: document.getElementById('acl-extended-args').value || '' // Pour ACL étendues uniquement
    };
}




