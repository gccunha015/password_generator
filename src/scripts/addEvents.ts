const generatePasswordForm = document.getElementById(
	'generate-password'
) as HTMLFormElement;
const generatedPasswordInput = document.getElementById(
	'generated-password'
) as HTMLInputElement;
const lengthInput = document.getElementById('length') as HTMLInputElement;

function addEvents() {
	addSubmitEvent();
}

function addSubmitEvent() {
	if (!generatePasswordForm) return;

	generatePasswordForm.addEventListener('submit', (event) => {
		event.preventDefault();
		if (!generatedPasswordInput || !lengthInput) return;
		const length = Number(lengthInput.value);
		generatedPasswordInput.value = generatePassword(length);
	});
}

function generatePassword(length: number, acceptedSymbols = '') {
	if (!length) return '';
	if (!acceptedSymbols)
		acceptedSymbols =
			'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let password = '';
	for (let c = 1; c <= length; c++)
		password += generateRandomChar(acceptedSymbols);
	return password;
}

function generateRandomChar(acceptedSymbols: string) {
	return acceptedSymbols.charAt(
		crypto.getRandomValues(new Uint32Array(1))[0] % acceptedSymbols.length
	);
}

addEvents();
