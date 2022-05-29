const datastore = require('./datastore');
const { createQuery } = require('./utils')

exports.search = async function(req, res) {

    let data = await datastore.search(createQuery(req.query));
    res.json(data);
};