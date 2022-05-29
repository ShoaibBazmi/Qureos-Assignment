const express = require('express')
const controller = require('./controller');
const datastore = require('./datastore');

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    datastore.syncData()
        .then(() => {
            console.log("data synced")
        });
})

app.route('/search').get((req, res) => {
    controller.search(req, res);
})