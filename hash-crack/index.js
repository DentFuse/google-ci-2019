const hash = require('hash.js');
const md5 = require('md5');
const inquirer = require('inquirer');
const signale = require('signale');
const siganle = signale; // Im stupid and often do this.

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
		if(hashFunction.ans === 'md5') return signale.info('MD5:', md5(text));
		const computedHash = hash[hashFunction.ans]().update(text).digest('hex');
		return siganle.info(hashFunction.ans.toUpperCase() + ':', computedHash);
	} else {

	}
	// siganle.info(funcType.ans);
	// siganle.info(text);
	// siganle.info('MD5:', md5(text));
	// siganle.info('SHA1:', hash.sha1().update(text).digest('hex'));
	// siganle.info('SHA224:', hash.sha224().update(text).digest('hex'));
	// siganle.info('SHA256:', hash.sha256().update(text).digest('hex'));
	// siganle.info('SHA384:', hash.sha384().update(text).digest('hex'));
	// siganle.info('SHA512:', hash.sha512().update(text).digest('hex'));
}

a();
