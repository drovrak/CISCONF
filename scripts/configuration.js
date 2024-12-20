function toggleDetails(checkbox) {
    const details = checkbox.closest('.config-section').querySelector('.details');
    details.style.display = checkbox.checked ? 'block' : 'none';
}

function sendData() {
    const data = {
        interface: {
            type: document.getElementById('interfaceType').value || '',
            number: document.getElementById('interfaceNumber').value || '',
            ip: document.getElementById('interfaceIp').value || '',
            mask: document.getElementById('interfaceMask').value || ''
        },
        ospf: {
            asNumber: document.getElementById('ospfAsNumber').value || '',
            routerId: document.getElementById('ospfRouterId').value || '',
            network: document.getElementById('ospfNetwork').value || '',
            area: document.getElementById('ospfArea').value || ''
        },
        eigrp: {
            asNumber: document.getElementById('eigrpAsNumber').value || '',
            network: document.getElementById('eigrpNetwork').value || '',
            mask: document.getElementById('eigrpMask').value || ''
        },
        rip: {
            version: document.getElementById('ripVersion').value,
            network: document.getElementById('ripNetwork').value || ''
        },
        acl: {
            type: document.getElementById('aclType').value || '',
            name: document.getElementById('aclName').value || '',
            rule: document.getElementById('aclRule').value || ''
        },
        snmp: {
            community: document.getElementById('snmpCommunity').value || '',
            access: document.getElementById('snmpAccess').value || 'RO'
        },
        hsrp: {
            group: document.getElementById('hsrpGroup').value || '',
            ip: document.getElementById('hsrpIp').value || ''
        }
    };

    fetch("/generate_config", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        document.getElementById("outputConfig").value = result.config;
    })
    .catch(error => console.error("Erreur :", error));
}
