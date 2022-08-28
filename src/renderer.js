const nicSelect = document.getElementById('nicSelect')

async function updateSelect() {
    networkInterfaceControllers = await window.electronAPI.getNic()
    console.log(networkInterfaceControllers);
}

updateSelect();