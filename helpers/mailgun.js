const mailjet = require('node-mailjet')
  .connect('e6a6aee501159775afea42226ff4702b', '686be722726f7c5148cfab9b4a4738c2')

function sendMail(payload, password) {
  const request = mailjet
    .post("send", {
      'version': 'v3.1'
    })
    .request({
      "Messages": [{
        "From": {
          "Email": "arif05rachman@gmail.com",
          "Name": "Arif"
        },
        "To": [{
          "Email": payload.email,
          "Name": payload.name
        }],
        "Subject": "Succesfully Register.",
        "TextPart": "Weather App Registered",
        "HTMLPart": `<h3>Dear ${payload.name} , welcome to Weather App!</h3><br />You can login with password: ${password}!`,
        "CustomID": "AppGettingStartedTest"
      }]
    })
  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
}

module.exports = sendMail