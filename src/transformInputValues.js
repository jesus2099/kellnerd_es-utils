import { qsa } from './dom.js';

/**
 * Transforms the values of the selected input fields using the given substitution rules.
 * Highlights all updated input fields in order to allow the user to review the changes.
 * @param {string} inputSelector CSS selector of the input fields.
 * @param {(string|RegExp)[][]} substitutionRules Pairs of values for search & replace.
 */
export function transformInputValues(inputSelector, substitutionRules) {
	const highlightClass = 'content-changed';
	qsa(inputSelector).forEach((/** @type {HTMLInputElement} */ input) => {
		input.classList.remove(highlightClass); // disable possible previously highlighted changes
		let value = input.value;
		if (!value) {
			return; // skip empty inputs
		}
		substitutionRules.forEach(([searchValue, replaceValue]) => {
			value = value.replace(searchValue, replaceValue);
			console.debug(value);
		});
		if (value != input.value) { // update and highlight changed values
			input.value = value;
			input.dispatchEvent(new Event('change'));
			input.classList.add(highlightClass);
		}
	});
}

/**
 * Transforms the given value using the given substitution rules.
 * @param {string} value 
 * @param {(string|RegExp)[][]} substitutionRules Pairs of values for search & replace.
 * @returns {string}
 */
export function transform(value, substitutionRules) {
	substitutionRules.forEach(([searchValue, replaceValue]) => {
		value = value.replace(searchValue, replaceValue);
	});
	return value;
}
