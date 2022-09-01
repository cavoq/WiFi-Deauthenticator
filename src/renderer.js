const interfaceSelect = document.getElementById('interfaceSelect');
const randomMacCheckBox = document.getElementById('randomMacCheckBox');
const bandFieldSet = document.getElementById('bandFieldSet');


async function initializeUi() {
    initializeSelect();
    initializeBand();
    randomMacCheckBox.addEventListener('change', randomMacChangeHandler);
}

async function initializeBand() {
    const children = bandFieldSet.children;
    for (i = 1; i < children.length; i++) {
        const bandDiv = children[i];
        const band = bandDiv.children[0];
        band.addEventListener('change', bandSelectionChangeHandler);
    }
    await bandSelectionChangeHandler();
}

function getSelectedBandValues() {
    const bandArray = [];
    const children = bandFieldSet.children;
    for (i = 1; i < children.length; i++) {
        const bandDiv = children[i];
        const band = bandDiv.children[0];
        if (band.checked) {
            bandArray.push(band.defaultValue);
        }
    }
    return bandArray;
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

async function bandSelectionChangeHandler() {
    const bandValues = getSelectedBandValues();
    await window.API.updateBandSelection(bandValues);
}

initializeUi();