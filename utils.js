const moment = require('moment');
module.exports = {
    createQuery: (params) => {
        let query = {}

        let nestedKeys = {
            "date": { parent: "published" },
            "price": { parent: "published" },
            "currency": { parent: "published" }
        }

        Object.keys(params).forEach((key, index) => {
            if (isParamIntType(key)) {
                params[key] = parseInt(params[key])
            }

            if (isParamArrayType(key)) {
                params[key] = { $in: [params[key]] }
            }

            if (key == 'date') {
                params[key] = parseDateParam(params[key]);
            }

            if (nestedKeys[key]) {
                query[nestedKeys[key]['parent'] + '.' + key] = params[key];
            } else {
                query[key] = params[key];
            }
        });

        return query;
    },

    transforObj: (obj) => {
        let date = obj.published.$date;
        delete obj.published.$date;
        obj.published.date = new Date(date);
        return obj
    }
}

function isParamIntType(param) {
    return ['price', 'pageCount'].includes(param);
}

function isParamArrayType(param) {
    return ['categories', 'authors'].includes(param);
}

function parseDateParam(param) {
    if (moment(param, "YYYY", true).isValid()) {
        return {
            $gte: moment(param, "YYYY").startOf('year'),
            $lte: moment(param, "YYYY").endOf('year')
        }

    }

    if (moment(param, "YYYY-MM", true).isValid()) {
        return {
            $gte: moment(param, "YYYY-MM").startOf('month'),
            $lte: moment(param, "YYYY-MM").endOf('month')
        }

    }

    return {
        $gte: moment(param, "YYYY-MM-DD").startOf('day'),
        $lte: moment(param, "YYYY-MM-DD").endOf('day')
    }

}