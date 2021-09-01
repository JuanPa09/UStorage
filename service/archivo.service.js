const dotenv = require('dotenv').config();
var AWS = require('aws-sdk');

const aws_keys = require('../creds');
const s3 = new AWS.S3(aws_keys.s3)

async function uploadFileToAws(file){
    var type;
    const fileName = `${new Date().getTime()}_${file.name}`;
    const mimetype = file.mimetype;
    const params = {
        Bucket: 'archivos-15-p1',
        Key: fileName,
        Body: file.data,
        ContentType: mimetype,
        ACL: 'public-read'
        };
        const res = await new Promise((resolve, reject) => {
            s3.upload(params, (err, data) => err == null ? resolve(data) : reject(err));
          });
        switch(mimetype.split('/')[1]){
            case 'pdf':
                type = 2;
                break;
            case 'plain':
                type = 3;
                break;
            default:
                type = 1;
                break;
        };
        return {fileUrl: res.Location, key: res.Key, type: type};
}



async function getFile(id){
    const getParams = {
        Bucket: 'archivos-15-p1',
        Key: id
    }
    const res = await new Promise((resolve,reject)=>{
        s3.getObject(getParams,(err,data) => err == null ? resolve(data) : reject(err))
    })
    var dataBase64 = res.ContentType.split('/')[0]=='image'?Buffer.from(res.Body).toString('base64'):'';
    return {ContentType: res.ContentType, image64:dataBase64}
}

async function deleteFile(id){
    const getParams = {
        Bucket: 'archivos-15-p1',
        Key: id
    }
    const res = await new Promise((resolve,reject)=>{
        s3.deleteObject(getParams,(err,data) => err == null ? resolve(data) : reject(err))
    })

    return {status: 200};
}

module.exports = {
    uploadFileToAws,
    getFile,
    deleteFile
}