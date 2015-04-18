var express = require('express');
var router = express.Router();
var wechatApi = require('wechat-api')
var api = new wechatApi('wx302ca370b5b95750', 'ce440bc4efc9f6ebe37d3380440a8745')
var crypto = require('crypto')
var xml2Json = require('xml2js')
var builder = new xml2Json.Builder()
var wechat = require('wechat')

/* GET home page. */

router.get('/weixin', function (req, res, next) {
    var token = 'xxx'
    var tmpArr = [token, req.query.timestamp, req.query.nonce]
    tmpArr.sort()
    var sha1 = crypto.createHash('sha1')
    sha1.update(tmpArr.join(''))
    var gen = sha1.digest('hex')
    console.log(gen)
    console.log(req.query.signature)
    if (gen != req.query.signature) {
        return false
        console.log(api)
    }
    else {
        res.send(req.query.echostr)
    }
})
router.post('/weixin', function (req, res, next) {
    console.log(req.body)
    var mess = {
        xml: {
            tousername:res.body.xml.fromusername,
            fromeusername:res.body.xml.tousername,
            msgtype:'text',
            content:'welcome',
            createtime:12345678
        }
    }
    var messXml = builder.buildObject(mess)
    console.log(messXml)
    res.send(messXml)
})

module.exports = router;
