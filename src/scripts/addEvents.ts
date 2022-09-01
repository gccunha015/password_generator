import {
	lengthRange,
	lengthValueSpan,
	symbolsInput,
	symbolsCheckbox,
	generatePasswordForm,
	copyToClipboardButton,
	generatedPasswordInput,
	uppercaseCheckbox,
	lowercaseCheckbox,
	numbersCheckbox,
	decreaseLengthButton,
	increaseLengthButton,
} from './htmlElements.js';

addEvents();

function addEvents() {
	addLenghtRangeEvents();
	addDecreaseLengthButtonEvents();
	addIncreaseLengthButtonEvents();
	addSymbolsCheckboxEvents();
	addGeneratePasswordFormEvents();
	addCopyToClipboardButtonEvents();
}

function addLenghtRangeEvents() {
	lengthRange.addEventListener('input', () => {
		const length = lengthRange.value;
		lengthValueSpan.textContent = length;
		decreaseLengthButton.disabled = length == lengthRange.min;
		increaseLengthButton.disabled = length == lengthRange.max;
	});
}

function addDecreaseLengthButtonEvents() {
	decreaseLengthButton.addEventListener('click', () => {
		lengthRange.value = String(Number(lengthRange.value) - 1);
		lengthRange.dispatchEvent(new Event('input'));
	});
}

function addIncreaseLengthButtonEvents() {
	increaseLengthButton.addEventListener('click', () => {
		lengthRange.value = String(Number(lengthRange.value) + 1);
		lengthRange.dispatchEvent(new Event('input'));
	});
}

function addSymbolsCheckboxEvents() {
	symbolsCheckbox.addEventListener('change', () => {
		symbolsInput.disabled = !symbolsCheckbox.checked;
	});
}

function addGeneratePasswordFormEvents() {
	generatePasswordForm.addEventListener('submit', (event) => {
		event.preventDefault();
		generatePassword();
	});
}

function addCopyToClipboardButtonEvents() {
	copyToClipboardButton.addEventListener('click', (event) => {
		event.preventDefault();
		navigator.clipboard.writeText(generatedPasswordInput.value);
	});
}

function generatePassword() {
	const includeUppercase = uppercaseCheckbox.checked;
	const includeLowercase = lowercaseCheckbox.checked;
	const includeNumbers = numbersCheckbox.checked;
	const includeSymbols = symbolsCheckbox.checked;
	if (
		![includeUppercase, includeLowercase, includeNumbers, includeSymbols].find(
			(value) => value
		)
	)
		return alert("Can't generate new password.");
	let acceptedSymbols = '';
	if (includeUppercase) acceptedSymbols += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (includeLowercase) acceptedSymbols += 'abcdefghijklmnopqrstuvwxyz';
	if (includeNumbers) acceptedSymbols += '0123456789';
	if (includeSymbols) acceptedSymbols += symbolsInput.value;
	const length = Number(lengthRange.value);
	let password = '';
	for (let c = 1; c <= length; c++)
		password += generateRandomChar(acceptedSymbols);
	generatedPasswordInput.value = password;
}

function generateRandomChar(acceptedSymbols: string) {
	return acceptedSymbols.charAt(
		crypto.getRandomValues(new Uint32Array(1))[0] % acceptedSymbols.length
	);
}
