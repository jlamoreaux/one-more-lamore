const app = require('app');

const googleAPI = 'https://photoslibrary.googleapis.com/v1/albums'

const make_API_call = async function () {
    app.get('/albums', (req, res) => {
        api_helper.make_API_call(googleAPI)
            .then(response => {
                res.json(response)
            })
            .catch(error => {
                res.send(error)
            })
    })
 }

module.exports = make_API_call;