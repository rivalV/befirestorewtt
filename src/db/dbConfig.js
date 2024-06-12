const Firestore = require('@google-cloud/firestore');
const path = require('path');

const pathKey = path.resolve('./keyFile.json');
const idProject = process.env.PROJECT_ID || 'boxwood-destiny-422503-q1';


const db = new Firestore({
    projectId: idProject,
    keyFilename: pathKey,
});


async function addUser(data) {
    try {
        const res = await db.collection('users').add(data);
        return res;
    } catch (error) {
        return error;
    }
}

async function readUser(data) {
    try {
        const snapshot = await db.collection('users').where('email', '==', data.email).limit(1).get();
        if(snapshot.empty){
            return false;
        }
        return snapshot;
    } catch (error) {
        return error;
    }
}

async function checkEmail(email) {
    try {
        let isUsed = false;
        const res = await db.collection('users').where('email', '==', email).get();
        if (!res.empty) {
            isUsed = true;
        }
        return isUsed;
    } catch (error) {
        return error;
    }
}

async function checkUser(id) {
    try {
        const result = await db.collection('users').doc(id).get();
        if (result.empty) {
            return res.status(404).json({
                error: true,
                message: 'User Not Found'
            });
        }
        return result;
    } catch (error) {
        return error;
    }
}

async function saveHistory(data) {
    try {
        const res = await db.collection('history').add(data);
        return res;
    } catch (error) {
        return error;
    }
}

async function getHistoryUpload(id) {
    try {
        const snapshot = await db.collection('history').doc(id).get();
        if (snapshot.exists) {
            const temp = snapshot.data();
            temp.id = snapshot.id;
            result = temp;
            return result;
        }
        return false;

    } catch (error) {
        return false;
    }
}

async function editName(id, name) {
    try {
        const res = await db.collection('users').doc(id).update(name);
        if (res.empty) {
            return res.status(400).json({
                error: true,
                message: 'Update failed, please try again'
            });
        }
        return res;
    } catch (error) {
        return error;
    }
}


module.exports = {
    addUser,
    readUser,
    checkEmail,
    checkUser,
    saveHistory,
    getHistoryUpload,
    editName,
}