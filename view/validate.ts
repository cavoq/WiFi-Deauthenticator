/*
* Module implementing authentication logic for application
*/

$('#password-form').on('submit', validatePassword);

async function validatePassword() {
    const passwordInput: JQuery<HTMLInputElement> = $('#password-input') as JQuery<HTMLInputElement>;
    const password: string = passwordInput.val() as string;
    if (password === "") {
        alert("You need to enter a password");
        return;
    }
    const isValid = await window.API.validatePassword(password);
    if (!isValid){
        alert("Invalid password")
        return;
    }
    await window.API.grantAccess(password);
}