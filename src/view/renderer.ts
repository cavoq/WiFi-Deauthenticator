/*
* Renderer that handles frontend functionality.
*/

const interfaceSelect: HTMLSelectElement = document.getElementById('interface-select') as HTMLSelectElement;
const refreshBtn: HTMLButtonElement = document.getElementById('refresh-btn') as HTMLButtonElement;
const randomMacCheckBox: HTMLInputElement = document.getElementById('random-mac-checkbox') as HTMLInputElement;
const startScanningBtn: HTMLButtonElement = document.getElementById('start-scanning-btn') as HTMLButtonElement;
const stopScanningBtn: HTMLButtonElement = document.getElementById('stop-scanning-btn') as HTMLButtonElement;
const accessPointSelect: HTMLSelectElement = document.getElementById('access-point-select') as HTMLSelectElement;
const startScanningClisBtn: HTMLButtonElement = document.getElementById('start-scanning-clis-btn') as HTMLButtonElement;
const stopScanningClisBtn: HTMLButtonElement = document.getElementById('stop-scanning-clis-btn') as HTMLButtonElement;
const clientDiv: HTMLDivElement = document.getElementById('client-div') as HTMLDivElement;
document.addEventListener('DOMContentLoaded', initializeUi);

async function initializeUi() {
  await setInterfaceSelect();
  await initializeBand();
  randomMacCheckBox.addEventListener('change', randomMacChangeHandler);
  refreshBtn.addEventListener('click', setInterfaceSelect);
  startScanningBtn.addEventListener('click', startScanningHandler);
  stopScanningBtn.addEventListener('click', stopScanningHandler);
  startScanningClisBtn.addEventListener('click', startScanningClientsHandler);
  stopScanningClisBtn.addEventListener('click', stopScanningClientsHandler);
}

async function initializeBand() {
  const bands = $('band-field-set').children('input[name="network-band"]');
  console.log(bands);
  bands.on('change', bandSelectionChangeHandler);
}


function getSelectedBandValues() {
  const bandValues: string[] = [];
  const bands: JQuery<HTMLInputElement> = $('band-field-set').
    children('input[name="network-band"]') as JQuery<HTMLInputElement>;
  bands.each(function () {
    if (this.checked) {
      bandValues.push(this.value);
    }
  });
  console.log(bandValues);
  return bandValues;
}

async function setInterfaceSelect() {
  interfaceSelect.innerHTML = "";
  const networkInterfaceControllers = await window.API.getNetworkInterfaceControllers();
  for (let i = 0; i < networkInterfaceControllers.length; i += 1) {
    const opt = document.createElement('option');
    opt.value = networkInterfaceControllers[i];
    opt.innerHTML = networkInterfaceControllers[i];
    interfaceSelect.appendChild(opt);
  }
  interfaceSelect.addEventListener('change', interfaceSelectChangeHandler);
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
  accessPointSelect.innerHTML = "";
  for (let i = 0; i < accessPoints.length; i += 1) {
    const opt = document.createElement('option');
    opt.value = accessPoints[i];
    opt.innerHTML = accessPoints[i];
    accessPointSelect.appendChild(opt);
  }
  accessPointSelect.addEventListener('change', accessPointSelectChangeHandler);
}

async function accessPointSelectChangeHandler() {
  await window.API.setAccessPointSelection(accessPointSelect.value);
}

async function startScanningClientsHandler() {
  if (!accessPointSelect.value) {
    await window.MSG.openMessageBox('No access point selected, you need to select a target.');
    return;
  }
  await window.API.startScanningClients();
}

async function stopScanningClientsHandler() {
  const clients: string[] = await window.API.getClients();
  setClientCheckBoxList(clients);
}

function setClientCheckBoxList(clients: string[]) {
  for (let i = 0; i < clients.length; i += 1) {
    const inp: HTMLInputElement = document.createElement('input');
    const br: HTMLBRElement = document.createElement('br');
    inp.type = 'checkbox';
    inp.value = clients[i];
    inp.innerHTML = clients[i];
    clientDiv.appendChild(inp);
    clientDiv.appendChild(br);
  }
}
