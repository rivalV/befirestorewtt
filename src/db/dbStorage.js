'use strict'
const { Storage } = require('@google-cloud/storage')
const fs = require('fs');
const { get } = require('http');
const path = require('path');

const pathKey = path.resolve('./keyFile.json');
const idProject = process.env.PROJECT_ID || 'boxwood-destiny-422503-q1';


// TODO: Sesuaikan konfigurasi Storage
const gcs = new Storage({
    projectId: idProject,
    keyFilename: pathKey,
})

// TODO: Tambahkan nama bucket yang digunakan
const bucketName = 'wtt-bucket'
const bucket = gcs.bucket(bucketName)

let ImgUpload = {}

ImgUpload.uploadToGcs = (req) =>{
    
    if (!req.file) return false;


    const date = new Date()
    const gcsname = date.getTime();
    const file = bucket.file(gcsname)

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    })

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        return false;
    })

    stream.end(req.file.buffer)
    {
        return 'https://storage.googleapis.com/wttdev-bucket/'+gcsname;
    }
}

module.exports = ImgUpload