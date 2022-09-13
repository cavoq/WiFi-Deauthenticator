/*
* Renderer that handles frontend functionality.
*/

const interfaceSelect: HTMLSelectElement = document.getElementById('interfaceSelect') as HTMLSelectElement;
const randomMacCheckBox: HTMLInputElement = document.getElementById('randomMacCheckBox') as HTMLInputElement;
const bandFieldSet: HTMLFieldSetElement = document.getElementById('bandFieldSet') as HTMLFieldSetElement;
const startScanningBtn: HTMLButtonElement = document.getElementById('startScanningBtn') as HTMLButtonElement;
const stopScanningBtn: HTMLButtonElement = document.getElementById('stopScanningBtn') as HTMLButtonElement;
const accessPointSelect: HTMLSelectElement = document.getElementById('accessPointSelect') as HTMLSelectElement;
const startScanningClisBtn: HTMLButtonElement = document.getElementById('startScanningClisBtn') as HTMLButtonElement;
const stopScanningClisBtn: HTMLButtonElement = document.getElementById('stopScanningClisBtn') as HTMLButtonElement;
document.addEventListener('DOMContentLoaded', initializeUi);

async function initializeUi() {
  await setInterfaceSelect();
  await initializeBand();
  randomMacCheckBox.addEventListener('change', randomMacChangeHandler);
  startScanningBtn.addEventListener('click', startScanningHandler);
  stopScanningBtn.addEventListener('click', stopScanningHandler);
  startScanningClisBtn.addEventListener('click', startScanningClientsHandler);
  stopScanningClisBtn.addEventListener('click', stopScanningClientsHandler);
}

async function initializeBand() {
  if (!bandFieldSet) {
    return;
  }
  const { children } = bandFieldSet;
  for (let i = 1; i < children.length; i += 1) {
    const bandDiv = children[i];
    const band = bandDiv.children[0];
    band.addEventListener('change', bandSelectionChangeHandler);
  }
  await bandSelectionChangeHandler();
}

function getSelectedBandValues() {
  const bandArray: string[] = [];
  if (!bandFieldSet) {
    return;
  }
  const { children } = bandFieldSet;
  for (let i = 1; i < children.length; i += 1) {
    const bandDiv: HTMLDivElement = children[i] as HTMLDivElement;
    const band: HTMLInputElement = bandDiv.children[0] as HTMLInputElement;
    if (band.checked) {
      bandArray.push(band.defaultValue);
    }
  }
  return bandArray;
}

async function setInterfaceSelect() {
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
  await window.API.setInterfaceMac(randomMacCheckBox.checked);
}

async function interfaceSelectChangeHandler() {
  await window.API.setInterfaceSelection(interfaceSelect.value);
}

async function bandSelectionChangeHandler() {
  const bandValues = getSelectedBandValues();
  await window.API.setBandSelection(bandValues);
}

async function startScanningHandler() {
  const selectedBandValues = getSelectedBandValues();
  if (!selectedBandValues) {
    return;
  }
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
  const accessPoints: string[] = await window.API.getAccessPoints();
  setAccessPointSelect(accessPoints);
}

function setAccessPointSelect(accessPoints: string[]) {
  for (let i = 0; i < accessPoints.length; i += 1) {
    const opt = document.createElement('option');
    opt.value = accessPoints[i];
    opt.innerHTML = accessPoints[i];
    accessPointSelect.appendChild(opt);
  }
  accessPointSelect.addEventListener('change', accessPointSelectChangeHandler);
  accessPointSelectChangeHandler();
}

async function accessPointSelectChangeHandler() {
  await window.API.setAccessPointSelection(accessPointSelect.value);
}

async function startScanningClientsHandler() {
  await window.API.startScanningClients();
}

async function stopScanningClientsHandler() {
  const clients: string [] = await window.API.getClients();
  setClientCheckBoxList(clients); 
}

function setClientCheckBoxList(clients: string []){
  console.log(clients);
}
