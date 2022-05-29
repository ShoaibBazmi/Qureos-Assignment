const utils = require('./utils')
const moment = require('moment');

test('$date key in the object should be transformed to date', () => {
    expect(utils.transforObj({
        "published": {
            "$date": "2011-01-14T00:00:00.000-0800",
            "price": 50,
            "currency": "USD"
        }
    })).toStrictEqual({
        "published": {
            "date": new Date("2011-01-14T00:00:00.000-0800"),
            "price": 50,
            "currency": "USD"
        }
    });
});


test('$date key in the object should be transformed to date', () => {
    expect(utils.createQuery({
        "title": "Android in Action, Second Edition",
        "date": "2011",
        "price": "50",
        "category": "Java"
    })).toStrictEqual({
        'title': 'Android in Action, Second Edition',
        'published.date': {
            '$gte': moment("2011", "YYYY").startOf('year'),
            '$lte': moment("2011", "YYYY").endOf('year')
        },
        'published.price': 50,
        'categories': { "$in": ['Java'] }
    });
});