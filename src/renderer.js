const interfaceSelect = document.getElementById('interfaceSelect');

async function updateSelect() {
    networkInterfaceControllers = await window.API.getNetworkInterfaceControllers();
    for (i = 0; i < networkInterfaceControllers.length; i++) {
        const opt = document.createElement('option');
        opt.value = networkInterfaceControllers[i];
        opt.innerHTML = networkInterfaceControllers[i];
        interfaceSelect.appendChild(opt);
    }
}

updateSelect();