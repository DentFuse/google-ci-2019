const inquirer = require('inquirer');
const bruteforce = require('bruteforce');
const signale = require('signale');

const lower = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
const upper = [];
lower.forEach(s => upper.push(s.toUpperCase()));
const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const symbols = ['!','@','#','$','&','*','?'];

const questions = [{
	type: 'confirm',
	name: 'lalpha',
	message: 'Should it contain lowercase alphabets?'
}, {
	type: 'confirm',
	name: 'calpha',
	message: 'Should it contain uppercase alphabets?'
}, {
	type: 'confirm',
	name: 'number',
	message: 'Should it contain numbers?'
}, {
	type: 'confirm',
	name: 'symbol',
	message: 'Should it contain symbols?'
}, {
	type: 'confirm',
	name: 'leet',
	message: 'Convert to leetspeak?'
}, {
	type: 'number',
	name: 'amount',
	message: 'How many letters should it contain?'
}]

async function init() {
	const answers = await inquirer.prompt(questions);
	signale.info(answers);
	var chars = [];
	if(answers.lalpha) chars = mergeArr(chars, lower);
	if(answers.calpha) chars = mergeArr(chars, upper);
	if(answers.number) chars = mergeArr(chars, numbers);
	if(answers.symbol) chars = mergeArr(chars, symbols);
	// signale.info(chars);
	if(isNaN(answers.amount)) return signale.error('Invalid number...');
	var outArr = bruteforce({len: answers.amount, chars});
	if(answers.leet) {
		subArr = outArr;
		outArr = [];
		// signale.info(subArr, outArr);
		subArr.forEach(s => {
			s = s.toLowerCase();
			s = s.replace('a', '4');
			s = s.replace('b', '8');
			s = s.replace('e', '3');
			s = s.replace('i', '1');
			s = s.replace('o', '0');
			s = s.replace('s', '5');
			s = s.replace('t', '7');
			s = s.replace('z', '2');
			s = s.replace('f', 'Ph');
			// signale.info(s);
			outArr.push(s);
		});
		// signale.info(subArr, outArr);
	}
	signale.info(outArr);
}

function mergeArr(arr1, arr2) {
	arr1.forEach(e => arr2.push(e));
	return arr2;
}

init();
