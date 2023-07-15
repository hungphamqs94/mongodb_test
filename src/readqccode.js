// // __ Importing jimp __ \\
// import Jimp from "jimp";

// // __ Importing filesystem = __ \\
// import * as fs from 'fs';

// // __ Importing qrcode-reader __ \\
// import qrCodeReader from 'qrcode-reader';
 
// // __ Read the image and create a buffer __ \\
// const buffer = fs.readFileSync('nini.png');
// console.log(buffer)
 
// // __ Parse the image using Jimp.read() __ \\
// Jimp.read(buffer, function(err, image) {
//     if (err) {
//         console.error(err);
//     }
// // __ Creating an instance of qrcode-reader __ \\

//     const qrCodeInstance = new qrCodeReader();

//     qrCodeInstance.callback = function(err, value) {
//         if (err) {
//             console.error(err);
//         }
// // __ Printing the decrypted value __ \\
//         console.log('gia tri cua value:', value)
//         console.log(value.result);
//     };

// // __ Decoding the QR code __ \\
//     qrCodeInstance.decode(image.bitmap);
// });

//Importing jimp module
import Jimp from "jimp";
// Importing filesystem module
import * as fs from 'fs';
// Importing qrcode-reader module
import qrCode from 'qrcode-reader';
import path from 'path';

// Read the image and create a buffer
// (Here image.png is our QR code)
// const __dirname = path.dirname('nini.png');
// const buffer = fs.readFileSync(path.resolve(__dirname, "nini.png"));
// console.log(buffer)
// Parse the image using Jimp.read() method
// Jimp.read(buffer, function (err, image) {
// 	if (err) {
// 		console.error(err);
// 	}
// 	// Creating an instance of qrcode-reader module
// 	let qrcode = new qrCode();
// 	qrcode.callback = function (err, value) {
// 		if (err) {
// 			console.error(err);
// 		}
// 		// Printing the decrypted value
// 		console.log(value.result);
// 	};
// 	// Decoding the QR code
// 	qrcode.decode(image.bitmap);
// });

// const scanQR = (source) => {
//     // Wrap all logic inside a promise, which you return
//     return new Promise((resolve, reject) => {
//         const buffer = fs.readFileSync(source);

//         Jimp.read(buffer, (err, image) => {
//             try {
//                 console.log(image)
//                 const qr = new qrCode();
//                 // qr.callback = (error, value) => {
//                 //     try {
//                 //         // Resolve promise here
//                 //         resolve(value.result);
//                 //     } catch(error) {
//                 //         // Reject promise
//                 //         reject(error);
//                 //     }
//                 // }
//                 // qr.decode(image.bitmap);
//                 const value = await new Promise((resolve, reject) => {
//                     qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
//                     qr.decode(img.bitmap);
//                 });
//             } catch (error) {
//                 reject(error);
//             }
//         });
//     });
// }

async function run() {
    try{
        const img = await Jimp.read(fs.readFileSync('nini.png'));
  
        const qr = new qrCode();
    
        // qrcode-reader's API doesn't support promises, so wrap it
        const value = await new Promise((resolve, reject) => {
        qr.callback = (err, v) => err != null ? reject(err) : resolve(v);
        qr.decode(img.bitmap);
        });
    
        // { result: 'http://asyncawait.net',
        //   points:
        //     [ FinderPattern {
        //         x: 68.5,
        //         y: 252,
        //         count: 10,
        // ...
        //console.log(value);
    
        // http://asyncawait.net
        return value.result;
    }catch (err) {
        console.log(err)
    }
  }

  run()
  .then((data) => { console.log(data)})
  .then(() => { console.log('2')});
