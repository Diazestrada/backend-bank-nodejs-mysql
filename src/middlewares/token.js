'use strict'
const jwt = require('jwt-simple');
const moment = require('moment');
const tokenSecret = require('./secret');

exports.Authentication = function (req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No estas logueado' });
    } else {
        var token = req.headers.authorization.replace(/[""]+/g, '');
        try {
            var payload = jwt.decode(token, tokenSecret);
            if (payload.exp <= moment().unix()) {
                return res.status(401).send({ message: "El token ha caducado" })
            }
        } catch (error) {
            return res.status(401).send({ message: "El token no es valido" })
        }
        req.user = payload;
        next();
    }
}

exports.CreateToken = function(user){
    const payload = {
        id: user._id,
        iat: moment().unix(),
        exp: moment().add(14,'years').unix()
    }

    return jwt.encode(payload,token_secret);

}