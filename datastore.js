const axios = require('axios').default;
const Datastore = require('nedb');
const { transforObj } = require('./utils')

const db = new Datastore({ inMemoryOnly: true });

const url = "https://run.mocky.io/v3/d7f02fdc-5591-4080-a163-95a08ce6895e";

exports.syncData = async function() {
    try {
        let { data } = await axios.get(url);
        data.forEach((book) => {
            db.insert(transforObj(book), function(err, newDoc) {
                if (err)
                    console.log(err)
            });
        })
    } catch (error) {
        console.error(error);
    }
}

exports.search = function(query) {
    return new Promise((resolve, reject) => {
        db.find(query, function(err, docs) {
            console.log("docs", docs)
            return resolve(docs);
        })
    });
}