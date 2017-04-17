module.exports = function sendMail(dataObj, cb) {
    var config = require('../config');
    var sendpulse = require("sendpulse-api");

    var API_USER_ID = config.sendpulse.userId;
    var API_SECRET = config.sendpulse.secret;
    var TOKEN_STORAGE="file";

    sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE);

    /**
     * Function to process response data
     *
     * @param data
     */
    var answerGetter = function answerGetter(data){
        console.log(data);
    };

    var email = {
        "html" : dataObj.html,
        "text" : dataObj.text,
        "subject" : dataObj.subj,
        "from" : {
            "name" : config.sendpulse.senderName,
            "email" : config.sendpulse.emailFrom
        },
        "to" : [
            {
                "name" : dataObj.to,
                "email" : dataObj.to
            },
        ],
        "bcc" : []
    };

    cb(sendpulse.smtpSendMail(answerGetter,email));
};
