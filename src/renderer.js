const interfaceSelect = document.getElementById('interfaceSelect');
const randomMacCheckBox = document.getElementById('randomMacCheckBox');
const bandFieldSet = document.getElementById('bandFieldSet');
const startScanningBtn = document.getElementById('startScanningBtn');
const stopScanningBtn = document.getElementById('stopScanningBtn');


async function initializeUi() {
    initializeSelect();
    initializeBand();
    randomMacCheckBox.addEventListener('change', randomMacChangeHandler);
    startScanningBtn.addEventListener('click', startScanningHandler);
    stopScanningBtn.addEventListener('click', stopScanningBtn);
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
    interfaceSelect.addEventListener('change', interfaceSelectChangeHandler);
    interfaceSelectChangeHandler();
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

async function startScanningHandler() {
    accessPoints = [];
    selectedBandValues = getSelectedBandValues();
    console.log(selectedBandValues)
    if (selectedBandValues.length === 0) {
        await window.MSG.openMessageBox("No network band selected, you need to select at least one network band.");
        return
    }
    if (!interfaceSelect.value) {
        await window.MSG.openMessageBox("No network interface controller selected.");
        return
    }
    accessPoints = await window.API.getAccessPoints();
}

async function stopScanningHandler() {
}

initializeUi();