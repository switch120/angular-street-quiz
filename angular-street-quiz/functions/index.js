const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

let express = require('express');

const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

app.use('/mapdata', async (req, res) => {

    const parseFiles = async function () {

        try {
            let files = await admin.storage().bucket().getFiles();

            files = files[0];
            files.shift();

            return files;
        }
        catch (exc){
            console.log(exc);
        }

        return [];
    }

    try {
        res.json(await parseFiles());
    }
    catch (exc){
        console.log(exc);
    }
});

// pass the express app to the HTTPS Trigger
exports.api = functions.https.onRequest(app);