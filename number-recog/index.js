const tesseract = require('node-tesseract-ocr');
const jimp = require('jimp');
const fs = require('fs');

const file = process.argv[2];


async function a() {
	if(!fs.existsSync(file)) process.exit();
	const newFile = file.split('.')[0] + '_g.' + file.split('.')[1];
	(await jimp.read(file)).greyscale().write(newFile);
	const config = {
		lang: "eng",
		oem: 1,
		psm: 10,
	}

	tesseract.recognize(newFile, config)
		.then(text => {
			console.log("Result:", text);
		})
		.catch(error => {
			console.log(error.message);
		})	
}

a();
