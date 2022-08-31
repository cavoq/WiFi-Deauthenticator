const interfaceSelect = document.getElementById('interfaceSelect');
const randomMacCheckBox = document.getElementById('randomMacCheckBox');
const bandCheckBoxes = [];


async function initializeUi() {
    initializeSelect();
    randomMacCheckBox.addEventListener('change', randomMacChangeHandler);
}

async function initializeBand(){
    
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

async function randomMacChangeHandler() {
    await window.API.updateInterfaceMac(randomMacCheckBox.checked);
}

async function interfaceSelectChangeHandler() {
    await window.API.updateInterfaceSelection(interfaceSelect.value);
}

async function networkBandSelectionChanged() {

}
initializeUi();