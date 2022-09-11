/* eslint-disable no-use-before-define */
/*
* Renderer that handles frontend functionality.
*/

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
  stopScanningBtn.addEventListener('click', stopScanningHandler);
}

async function initializeBand() {
  const { children } = bandFieldSet;
  for (let i = 1; i < children.length; i += 1) {
    const bandDiv = children[i];
    const band = bandDiv.children[0];
    band.addEventListener('change', bandSelectionChangeHandler);
  }
  await bandSelectionChangeHandler();
}

function getSelectedBandValues() {
  const bandArray = [];
  const { children } = bandFieldSet;
  for (let i = 1; i < children.length; i += 1) {
    const bandDiv = children[i];
    const band = bandDiv.children[0];
    if (band.checked) {
      bandArray.push(band.defaultValue);
    }
  }
  return bandArray;
}

async function initializeSelect() {
  const networkInterfaceControllers = await window.API.getNetworkInterfaceControllers();
  for (let i = 0; i < networkInterfaceControllers.length; i += 1) {
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
  const selectedBandValues = getSelectedBandValues();
  if (selectedBandValues.length === 0) {
    await window.MSG.openMessageBox('No network band selected, you need to select at least one network band.');
    return;
  }
  if (!interfaceSelect.value) {
    await window.MSG.openMessageBox('No network interface controller selected.');
    return;
  }
  await window.API.startScanning();
}

async function stopScanningHandler() {
  await window.API.getAccessPoints();
}

initializeUi();
