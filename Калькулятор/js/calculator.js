const operatorsEnum = Object.freeze({
	"none":0, "plus":1, "minus":2, "multiply":3, "divide":4, "pow":5,"sqrt":6,"sign":7,"fact":8
})
let currentOperator = operatorsEnum.none;

const ValueOrder = Object.freeze({
	"first_value":1,"second_value":2
});
let current_value_order = ValueOrder.first_value;

// Get all the keys from document
let keys = document.querySelectorAll('#calculator span');
let decimalAdded = false;
let firstValue = 0;
let secondValue = 0;
let gotFirstValue = false;

let equationPressed = false;

let clearInputOnce = false;

let input = document.querySelector('.screen');
let logs = document.querySelector('.history');

// Add onclick event to all the keys and perform operations
for(let i = 0; i < keys.length; i++) {
	keys[i].onclick = function (e) {
		// Get the input and button values
		let btnVal = this.innerHTML;

		// Now, just append the key values (btnValue) to the input string and finally use javascript's eval function to get the result
		// Check if clear key is pressed
		if (btnVal !== 'C') {
			clearInputOnce = false;
		}

		//reset and symbol remove
		//'C' reset, if once - only current state and screen, if twice - total reset with history
		if (btnVal === 'C') {
			input.innerHTML = '';
			decimalAdded = false;
			gotFirstValue = false;
			firstValue = 0;
			secondValue = 0;
			current_value_order = ValueOrder.first_value;
			currentOperator = operatorsEnum.none;
			if (!clearInputOnce) {
				clearInputOnce = true;
			} else {
				logs.innerHTML = '';
				clearInputOnce = false;
			}
		}
		//clear last symbol
		else if (btnVal === 'CS') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (input.innerHTML.charAt(input.innerHTML.length - 1) === '.') {
					decimalAdded = false;
				}
				input.innerHTML = input.innerHTML.substring(0, input.innerHTML.length - 1);
			}
		}

		//checking other buttons
		// plus
		else if (btnVal === '+') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (current_value_order === ValueOrder.second_value) {
					equationPressed = true;
					CalcValues();
				}
				currentOperator = operatorsEnum.plus;
				firstValue = input.innerHTML;
			}
		}

		// minus
		else if (btnVal === '-') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (current_value_order === ValueOrder.second_value) {
					equationPressed = true;
					CalcValues();
				}
				currentOperator = operatorsEnum.minus;
				firstValue = input.innerHTML;
			}
		}

		// multiply
		else if (btnVal === 'x') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (current_value_order === ValueOrder.second_value) {
					equationPressed = true;
					CalcValues();
				}
				currentOperator = operatorsEnum.multiply;
				firstValue = input.innerHTML;
			}
		}

		// division
		else if (btnVal === '÷') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (current_value_order === ValueOrder.second_value) {
					equationPressed = true;
					CalcValues();
				}
				currentOperator = operatorsEnum.divide;
				firstValue = input.innerHTML;
			}
		}

		// To power
		else if (btnVal === 'pow') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				if (current_value_order === ValueOrder.second_value) {
					equationPressed = true;
					CalcValues();
				}
				currentOperator = operatorsEnum.pow;
				firstValue = input.innerHTML;
			}
		}

		// Invert sign
		else if (btnVal === 'sign') {
			equationPressed = true;
			currentOperator = operatorsEnum.sign;
			CalcValues();
		}

		// Square root
		else if (btnVal === 'sqrt') {
			equationPressed = true;
			currentOperator = operatorsEnum.sqrt;
			CalcValues();
		}

		// Factorial
		else if (btnVal === 'fact') {
			equationPressed = true;
			currentOperator = operatorsEnum.fact;
			CalcValues();
		}

		// If eval key is pressed, calculate and display the result
		else if (btnVal === '=') {
			if (input.innerHTML != null && input.innerHTML.length > 0) {
				equationPressed = true;
				CalcValues();
			}
		}

		// If entered dot
		else if (btnVal === '.') {
			if (!decimalAdded) {
				input.innerHTML += btnVal;
				decimalAdded = true;
			}
		}

		// if any other key is pressed (only digits left), just append it
		else {
			if(currentOperator !== operatorsEnum.none && current_value_order === ValueOrder.first_value)
			{
				input.innerHTML = '';
				decimalAdded = false;
				current_value_order = ValueOrder.second_value;
			}
			input.innerHTML += btnVal;
		}

		// prevent page jumps
		e.preventDefault();
	}
}

//eval function
function CalcValues() {
	let result;

	if (current_value_order === ValueOrder.first_value) {
		secondValue = firstValue;
		firstValue = input.innerHTML;
	}
	if (current_value_order === ValueOrder.second_value) {
		secondValue = input.innerHTML;
	}

	switch (currentOperator) {
		case operatorsEnum.plus: {
			if (equationPressed) {
				result = Number(firstValue) + Number(secondValue);
				input.innerHTML = result.toString();
				logs.innerHTML += firstValue + " + " + secondValue + " = " + result + "<br>";
				//firstValue = result;
			}
			break;
		}

		case operatorsEnum.minus: {
			if (equationPressed) {
				result = Number(firstValue) - Number(secondValue);
				input.innerHTML = result.toString();
				logs.innerHTML += firstValue + " - " + secondValue + " = " + result + "<br>";
				//firstValue = result;
			}
			break;
		}

		case operatorsEnum.multiply: {
			if (equationPressed) {
				result = Number(firstValue) * Number(secondValue);
				input.innerHTML = result.toString();
				logs.innerHTML += firstValue + " * " + secondValue + " = " + result + "<br>";
				//firstValue = result;
			}
			break;
		}

		case operatorsEnum.divide: {
			if (Number(secondValue) !== 0) {
				if (equationPressed) {
					result = Number(firstValue) / Number(secondValue);
					input.innerHTML = result.toString();
					logs.innerHTML += firstValue + " / " + secondValue + " = " + result + "<br>";
					//firstValue = result;
				}
			} else {
				if (equationPressed) {
					result = "Infinity";
					input.innerHTML = result.toString();
					logs.innerHTML += firstValue + " / " + secondValue + " = " + result + "<br>";
					//firstValue = result;
				}
			}
			break;
		}

		case operatorsEnum.pow: {
			if (equationPressed) {
				result = Math.pow(Number(firstValue), Number(secondValue));
				input.innerHTML = result.toString();
				logs.innerHTML += "pow(" + firstValue + ", " + secondValue + ") = " + result + "<br>";
				firstValue = result;
				currentOperator = operatorsEnum.none;
			}
			break;
		}

		case operatorsEnum.sign: {
			if (equationPressed) {
				if (input.innerHTML != null && input.innerHTML.length > 0) {
					logs.innerHTML += input.innerHTML;
					input.innerHTML = (-Number(input.innerHTML)).toString();
					logs.innerHTML += " -> " + (Number(input.innerHTML)).toString() + "<br>";
				}
			}
			break;
		}

		case operatorsEnum.sqrt: {
			if (equationPressed) {
				if (input.innerHTML != null && input.innerHTML.length > 0 && Number(input.innerHTML) >= 0) {
					logs.innerHTML += "sqrt(" + (Number(input.innerHTML)).toString() + ")";
					input.innerHTML = Math.sqrt(Number(input.innerHTML)).toString();
					logs.innerHTML += " = " + (Number(input.innerHTML)).toString() + "<br>";
				}
			}
			break;
		}

		case operatorsEnum.fact: {
			if (equationPressed) {
				if (input.innerHTML != null && input.innerHTML.length > 0 && Number(input.innerHTML) !== 0) {
					let n = Number(input.innerHTML);
					let result;
					n - Math.floor(n) > 0 ? decimalAdded = true : decimalAdded = false;
					if (!decimalAdded) {
						result = 1;
						for (let i = 0; i < n; i++) {
							result = Number(result) * (Number(n) - i);
						}
					} else {
						result = 0;
						let dx = 0.0000001; //add more zeros to enhance precision of result
						//calculating integral using precision above, which is interpreted as sum of squares function (-ln(x)^n) * dx , borders 0(dx as ln(0) = NaN) to 1
						//http://desyatbukv.blogspot.com/2012/10/faktorial-drobnyh-chisel.html
						for (let x = Number(dx); x < 1; x += dx) {
							result += Number(dx) * Number(Math.pow(-Math.log(Number(x)), n));
						}
					}
					input.innerHTML = result;
					logs.innerHTML += "fact(" + n + ") = " + result + "<br>";
				}
			}
			break;
		}
	}

	current_value_order = ValueOrder.first_value;
	firstValue = secondValue;

	//check whether result is decimal
	let temp_check = Number(input.innerHTML);
	temp_check - Math.floor(temp_check) > 0 ? decimalAdded = true : decimalAdded = false;
}
