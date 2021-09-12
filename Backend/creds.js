const dotenv = require('dotenv').config()

let aws_keys = {

    s3: {
        region: 'us-west-2',
        accessKeyId: process.env.ACCESS_KEY,
        secretAccessKey: process.env.SECRET_ACCESS
    }
}

module.exports = aws_keys;
