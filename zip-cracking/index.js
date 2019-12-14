const miniZip = require('minizip-asm.js');
const signale = require('signale');
const fs = require('fs');

const fileName = process.argv[2];
const passList = JSON.parse(fs.readFileSync('list.json'));
var filePassword, found;

if(!fileName) return signale.error('No zip file provided! Syntax: node index.js [Zip File Name]');
if(!fileName.endsWith('.zip')) return signale.error('Not a zip file!');
if(!fs.existsSync(fileName)) return signale.error('File doesn\'t exist!');

const zip = new miniZip(fs.readFileSync(fileName));
const list = zip.list();
// signale.info(list);

// Find password

passList.forEach((p, i) => {
	if(found) return;
	signale.info('Testing pass:', p);
	try {
		zip.extract(list[0].filepath, { password: p });
		// Will reach here if the password matches
		filePassword = p;
		signale.success('Found password:', p);
		found = true;
	} catch(e) {
		if(i == passList.length - 1) {
			signale.error('Password not found in list!');
			process.exit();
		}
		signale.warn('Not the password!');
	}
});

// Extract all files

list.forEach(e => {
	const file = zip.extract(e.filepath, { password: filePassword });
	fs.writeFileSync('./out/' + e.filepath, file);
});

signale.success('Thank you for using this!');
