import { lengthRange, lengthValueSpan, symbolsInput } from './htmlElements.js';

setDefaultValues();

function setDefaultValues() {
	lengthRange.value = '15';
	lengthValueSpan.textContent = lengthRange.value;
	symbolsInput.value = '~`!@#$%^&*()_-+={[}]|:;"' + "'<,>.?/";
}
