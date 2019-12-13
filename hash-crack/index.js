const hash = require('hash.js');
const md5 = require('md5');
const inquirer = require('inquirer');
const fs = require('fs');
const signale = require('signale');

const text = 'Awesome!';


async function a() {
	funcType = await inquirer.prompt([{
		type: 'list',
		name: 'ans',
		message: 'Select type of operation:',
		choices: ['Hash', 'Reverse Hash']
	}]);
	if(funcType.ans === 'Hash') {
		hashFunction = await inquirer.prompt([{
			type: 'list',
			name: 'ans',
			message: 'Select type of operation:',
			choices: ['md5', 'sha1', 'sha224', 'sha256', 'sha384', 'sha512']
		}, {
			type: 'input',
			name: 'input',
			message: 'Input string:'
		}]);
		const text = hashFunction.input;
		var computedHash;
		if(hashFunction.ans === 'md5') { 
			computedHash = md5(text);
		} else {
			computedHash = hash[hashFunction.ans]().update(text).digest('hex');
		}
		const passList = JSON.parse(fs.readFileSync('pass.json'));
		passList[computedHash] = hashFunction.input;
		fs.writeFileSync('pass.json', JSON.stringify(passList));
		return signale.info(hashFunction.ans.toUpperCase() + ':', computedHash);
	} else {
		hashFunction = await inquirer.prompt([{
			type: 'input',
			name: 'input',
			message: 'Hash string:'
		}, {
			type: 'input',
			name: 'pass',
			message: 'Password list to use:',
			default: 'pass.json'
		}]);
		const exists = fs.existsSync(hashFunction.pass);
		if(!exists) return signale.error(new Error('Password list specified not present in current directory!'));
		const passList = JSON.parse(fs.readFileSync(hashFunction.pass));
		if(passList[hashFunction.input]) return signale.success('Found:', '"' + passList[hashFunction.input] + '"');
		signale.warn('Hash is not present in list!');
	}
	// signale.info(funcType.ans);
	// signale.info(text);
	// signale.info('MD5:', md5(text));
	// signale.info('SHA1:', hash.sha1().update(text).digest('hex'));
	// signale.info('SHA224:', hash.sha224().update(text).digest('hex'));
	// signale.info('SHA256:', hash.sha256().update(text).digest('hex'));
	// signale.info('SHA384:', hash.sha384().update(text).digest('hex'));
	// signale.info('SHA512:', hash.sha512().update(text).digest('hex'));
}

a();
