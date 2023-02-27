/*
* Renderer that handles frontend functionality.
*/

const interfaceSelect: JQuery<HTMLSelectElement> = $('#interface-select') as JQuery<HTMLSelectElement>;
const randomMacCheckBox: JQuery<HTMLInputElement> = $('#random-mac-checkbox') as JQuery<HTMLInputElement>;
const startScanningBtn: JQuery<HTMLButtonElement> = $('#start-scanning-btn') as JQuery<HTMLButtonElement>;
const refreshBtn: JQuery<HTMLButtonElement> = $('#refresh-btn') as JQuery<HTMLButtonElement>;
const stopScanningBtn: JQuery<HTMLButtonElement> = $('#stop-scanning-btn') as JQuery<HTMLButtonElement>;
const accessPointSelect: JQuery<HTMLSelectElement> = $('#access-point-select') as JQuery<HTMLSelectElement>;
const startScanningClisBtn: JQuery<HTMLButtonElement> = $('#start-scanning-clis-btn') as JQuery<HTMLButtonElement>;
const stopScanningClisBtn: JQuery<HTMLButtonElement> = $('#stop-scanning-clis-btn') as JQuery<HTMLButtonElement>;
const startAttackBtn: JQuery<HTMLButtonElement> = $('#start-attack-btn') as JQuery<HTMLButtonElement>;
const stopAttackBtn: JQuery<HTMLButtonElement> = $('#stop-attack-btn') as JQuery<HTMLButtonElement>;
const clientDiv: JQuery<HTMLDivElement> = $('#client-div') as JQuery<HTMLDivElement>;
const terminalContainer: JQuery<HTMLDivElement> = $('#terminal-container') as JQuery<HTMLDivElement>;
document.addEventListener('DOMContentLoaded', initializeUi);

async function initializeUi() {
  await setInterfaceSelect();
  initializeBand();
  randomMacCheckBox.on('change', async function () {
    await window.API.setInterfaceMac(this.checked);
  });
  refreshBtn.on('click', setInterfaceSelect);
  startScanningBtn.on('click', startScanningHandler);
  stopScanningBtn.on('click', stopScanningHandler);
  startScanningClisBtn.on('click', startScanningClientsHandler);
  stopScanningClisBtn.on('click', stopScanningClientsHandler);
  startAttackBtn.on('click', startAttackHandler);
  stopAttackBtn.on('click', stopAttackHandler);
}

async function setInterfaceSelect() {
  interfaceSelect.html('<option value="" selected disabled hidden>Choose LAN Adapter</option>');
  const networkInterfaceControllers: string[] = await window.API.getNetworkInterfaceControllers();
  for (let i = 0; i < networkInterfaceControllers.length; i += 1) {
    interfaceSelect.append($('<option>', {
      value: networkInterfaceControllers[i],
      text: networkInterfaceControllers[i],
    }));
  }
  interfaceSelect.on('change', async function () {
    await window.API.setInterfaceSelection(this.value);
  });
}

function initializeBand() {
  const bands: JQuery<HTMLInputElement> = $('#band-field-set').
    children('input[name="network-band"]') as JQuery<HTMLInputElement>;
  bands.on('change', bandSelectionChangeHandler);
  const all: JQuery<HTMLInputElement> = $('#band-field-set').
    children('#all-bands') as JQuery<HTMLInputElement>;
  all.on('change', function () {
    bands.prop('checked', this.checked);
    bandSelectionChangeHandler();
  });
}

function getSelectedBandValues() {
  const bandValues: string[] = [];
  const bands: JQuery<HTMLInputElement> = $('#band-field-set').
    children('input[name="network-band"]') as JQuery<HTMLInputElement>;
  bands.each(function () {
    if (this.checked) {
      bandValues.push(this.value);
    }
  });
  return bandValues;
}

async function bandSelectionChangeHandler() {
  const bandValues = getSelectedBandValues();
  const all: JQuery<HTMLInputElement> = $('#band-field-set').
    children('#all-bands') as JQuery<HTMLInputElement>;
  if (bandValues.length === 3) {
    all.prop('checked', true);
  } else {
    all.prop('checked', false);
  }
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
  if (!interfaceSelect.val()) {
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
  accessPointSelect.html('<option value="" selected disabled hidden>Select Accesspoint</option>');
  for (let i = 0; i < accessPoints.length; i += 1) {
    accessPointSelect.append($('<option>', {
      value: accessPoints[i],
      text: accessPoints[i],
    }));
  }
  accessPointSelect.on('change', async function () {
    await window.API.setAccessPointSelection(this.value);
  });
}

async function startScanningClientsHandler() {
  if (!accessPointSelect.val()) {
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
    clientDiv.append($('<input>', {
      type: 'checkbox',
      value: clients[i],
      name: 'client'
    })).append($('<label>', {
      for: clients[i],
      text: clients[i],
    })).append($('<br>'));
  }
  const clientInpts: JQuery<HTMLInputElement> = clientDiv.
    children('input[name="client"]') as JQuery<HTMLInputElement>;
  clientInpts.on('change', clientSelectionChangeHandler);
  const all: JQuery<HTMLInputElement> = $('#select-all-checkbox') as JQuery<HTMLInputElement>;
  all.on('change', function () {
    clientInpts.prop('checked', this.checked);
    clientSelectionChangeHandler();
  });
}

function getSelectedClientValues() {
  const clientValues: string[] = [];
  const clients: JQuery<HTMLInputElement> = clientDiv.
    children('input[name="client"]') as JQuery<HTMLInputElement>;
  clients.each(function () {
    if (this.checked) {
      clientValues.push(this.value);
    }
  });
  return clientValues;
}

async function clientSelectionChangeHandler() {
  const clientValues = getSelectedClientValues();
  const all: JQuery<HTMLInputElement> = $('#select-all-checkbox') as JQuery<HTMLInputElement>;
  if (clientValues.length === clientDiv.children('input[name="client"]').length) {
    all.prop('checked', true);
  } else {
    all.prop('checked', false);
  }
  await window.API.setTargetSelection(clientValues);
}

async function startAttackHandler() {
  const clientValues = getSelectedClientValues();
  if (clientValues.length === 0) {
    await window.MSG.openMessageBox('No clients selected, you need to select a targets.');
    return;
  }
  await window.API.startAttack();
}

async function stopAttackHandler() {
  await window.API.stopAttack();
}

window.API.handleTerminalStream((_event: Event, data: string) => {
  terminalContainer.html('');
  terminalContainer.append(data);
})  