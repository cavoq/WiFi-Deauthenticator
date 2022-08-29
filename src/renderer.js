const interfaceSelect = document.getElementById('interfaceSelect');

async function interfaceSelectChangeHandler(){
    console.log(interfaceSelect.value)
    await window.API.updateInterfaceSelection(interfaceSelect.value);
}

async function initializeSelect() {
    networkInterfaceControllers = await window.API.getNetworkInterfaceControllers();
    for (i = 0; i < networkInterfaceControllers.length; i++) {
        const opt = document.createElement('option');
        opt.value = networkInterfaceControllers[i];
        opt.innerHTML = networkInterfaceControllers[i];
        interfaceSelect.appendChild(opt);
    }
    interfaceSelect.addEventListener('change', interfaceSelectChangeHandler)
}

initializeSelect();