function toggleDetails(checkbox) {
    const details = checkbox.closest('.config-section').querySelector('.details');
    details.style.display = checkbox.checked ? 'block' : 'none';
}

function sendData() {
    const data = {
        hostname: document.getElementById('hostname').value || 'ROUTER1',
        enableSecret: document.getElementById('enableSecret').value || 'cisco123',
        // Other fields...
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
