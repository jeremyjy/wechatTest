var express = require('express');
var router = express.Router();
var wechatApi = require('wechat-api')
var api = new wechatApi('wx302ca370b5b95750', 'ce440bc4efc9f6ebe37d3380440a8745')
var crypto = require('crypto')
var xml2Json = require('xml2json')



/* GET home page. */

router.get('/weixin', function (req, res, next) {
    var token = 'xxx'
    var tmpArr = [token,req.query.timestamp,req.query.nonce]
    tmpArr.sort()
    var sha1 = crypto.createHash ('sha1')
    sha1.update(tmpArr.join(''))
    var gen = sha1.digest('hex')
    console.log(gen)
    console.log(req.query.signature)
    if(gen!=req.query.signature){
        return false
        console.log(api)
    }
    else {
        res.send(req.query.echostr)
    }
})
router.post('/weixin', function (req, res, next) {
    console.log(req.body)
        api.sendText(req.body.fromusername, 'welcome!', function (err, result) {
            if(err)
            console.log(err)
            else
            console.log(result)
            next()
        })
})

module.exports = router;
