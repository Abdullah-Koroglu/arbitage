const request = require('request');

const postProductName = ((name, link) => {
    var options = {
        'method': 'POST',
        'url': 'http://localhost/productname',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "link": link })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.body);
    });
})

const getCategories = () => {
    var options = {
        'method': 'GET',
        'url': 'http://localhost/category',
        'headers': {
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resolve(response.body);
        });
    })
}

getProductNames = () => {
    var options = {
        'method': 'GET',
        'url': 'http://localhost/productname',
        'headers': {
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            resolve(response.body);
        })
    });

}

const postCategories = (name, link, main) => {
    var options = {
        'method': 'POST',
        'url': 'http://localhost/category',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "name": name, "link": link, "main": main })

    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

const postProduct = (Barcode, HBPrice) => {
    var options = {
        'method': 'POST',
        'url': 'http://localhost/product',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "Barcode": Barcode, "HBPrice": HBPrice })
    };

    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}


module.exports = {
    getCategories,
    postProductName,
    postCategories,
    postProduct
    ,getProductNames
}