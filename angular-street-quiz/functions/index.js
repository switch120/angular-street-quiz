const functions = require('firebase-functions');
const admin = require('firebase-admin');

// admin.initializeApp(functions.config().firebase);

// let cert = require("./accountKey.json");

// console.log(cert);

admin.initializeApp();

let express = require('express');

const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// zipCodeApi route
app.use('/mapdata', async (req, res) => {

    // admin.storage().bucket().getFiles().then(files => {
    //     let _files = files[0];
    //     _files.shift();
    //     res.json(_files.map(file => {
    //         file.url = await getDownloadUrl(file);
    //         return file;
    //     }));
    // });
    const parseFiles = async function () {

        try {
            let files = await admin.storage().bucket().getFiles();

            files = files[0];
            files.shift();

            return files;

            // return files.map( async file => {
            //     try {
            //         // const fileRef = admin.storage().ref();
            //         file.url = await file.getSignedUrl({
            //             action: "read",
            //             expires: `01-01-2192`
            //         })
            //     }
            //     catch (ex) { console.log(ex); }
                
            //     console.log(file);
            //     return file;
            // });
        }
        catch (exc){
            console.log(exc);
        }

        return [];
    }

    try {
        res.json(await parseFiles());
        // console.log(parseFiles());
        // Promise.all(parseFiles()).then(data => res.json(data));
    }
    catch (exc){
        console.log(exc);
    }

    // res.json(parseFiles());
});

// async function loadBucket(){
//     return await admin.storage().bucket().getFiles();
// }

// async function getDownloadUrl(file) {
//      return await file.getDownloadUrl();
// }

// pass the express app to the HTTPS Trigger
exports.api = functions.https.onRequest(app);

// app.listen(80);
