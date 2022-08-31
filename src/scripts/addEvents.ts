const generatePasswordForm = document.getElementById(
	'generate-password'
) as HTMLFormElement;
const generatedPasswordInput = document.getElementById(
	'generated-password'
) as HTMLInputElement;
const lengthInput = document.getElementById('length') as HTMLInputElement;
const uppercaseCheckbox = document.getElementById(
	'uppercase'
) as HTMLInputElement;
const lowercaseCheckbox = document.getElementById(
	'lowercase'
) as HTMLInputElement;
const numbersCheckbox = document.getElementById('numbers') as HTMLInputElement;
const symbolsCheckbox = document.getElementById(
	'include-symbols'
) as HTMLInputElement;
const symbolsInput = document.getElementById('symbols') as HTMLInputElement;

addDefaultValues();
addEvents();

function addDefaultValues() {
	if (!lengthInput || !symbolsInput) return;
	lengthInput.value = '10';
	symbolsInput.value = '~`!@#$%^&*()_-+={[}]|:;"' + "'<,>.?/";
}

function addEvents() {
	addSymbolsCheckboxChangeEvent();
	addGeneratePasswordSubmitEvent();
}

function addSymbolsCheckboxChangeEvent() {
	symbolsCheckbox.addEventListener('change', () => {
		symbolsInput.disabled = !symbolsCheckbox.checked;
	});
}

function addGeneratePasswordSubmitEvent() {
	generatePasswordForm.addEventListener('submit', (event) => {
		event.preventDefault();
		generatedPasswordInput.value = generatePassword();
	});
}

function generatePassword() {
	const length = Number(lengthInput.value);
	const includeUppercase = uppercaseCheckbox.checked;
	const includeLowercase = lowercaseCheckbox.checked;
	const includeNumbers = numbersCheckbox.checked;
	const includeSymbols = symbolsCheckbox.checked;
	const symbolsToInclude = symbolsInput.value;
	let acceptedSymbols = '';
	if (includeUppercase) acceptedSymbols += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (includeLowercase) acceptedSymbols += 'abcdefghijklmnopqrstuvwxyz';
	if (includeNumbers) acceptedSymbols += '0123456789';
	if (includeSymbols) acceptedSymbols += symbolsToInclude;
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
