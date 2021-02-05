const fetch = require('node-fetch');
const https = require('https')
const fs = require('fs');
const { log } = require('console');
var HTMLParser = require('node-html-parser');
var request = require('request');
const server = require('./serverFunctions.js');
const { parse } = require('path');


var options = {
    "Connection": "keep-alive",
    'method': 'GET',
    'headers': {
        'Cookie': 'isGlobalIp=0; HB_S_MR=1; bm_sz=3A839A302ADD02DA4344266B5A253E4F~YAAQ14YUAgW32dh2AQAAQabi4QqAOHcufy0MeuHOB6alPW2NnjP6C7o8BB5QYnKDdGTjAwwVbOmdktCe1ycqudYlyazHuboGoa3f4R/eGy1fpDzN69sPlh7ZrHRfSxHKvQodQGBgql82jiHl/Nq6jog7BHe6xUeSyHXdRR+9kfN6ZPSEITXXc3cLCUmdm/IgNZr5zSM=; _abck=3AA5AE7C7FBFDAD54037813A057ED96F~-1~YAAQ14YUAga32dh2AQAAQabi4QU6ChUD6mckhN0Q/Ks/lUKl4oAd15x1aIhF2JwFMJj+grBSFoQwahMC+wOLtizt7Rd0bBK1SGtzsUX0jSEF2/7vbBNisNyJKbwLzq/8GbRNQjQybEhomuNmvPm4Ogv5y5rNT4OqByw17P5ywcFrWWUfQVfHaOlzqk5OpUpfIE2TCppgo/sHB9tKE3obSydoHmlx0ky3+WtU4x6fxO72LbFDFkpmlxiRwpJuIlBgl2qETKArCi/b5REIAcmAKoRmoTF9hdkui7CTuIfzfOrxb2NhDguL3v90euyPwxY=~-1~-1~-1; ak_bmsc=66E8067D1F992C94440300F2CEBD94A2021486D7B8410000684AF85FAD28E278~pl1xT8xXQrOFSpYdNcdca7TaQN1fm00KWinujo4dgP3lQvOQQcfbD3v7UgtSP1rv+XhTSQSUYoIEDmkFMAL9qz4/VqocqtutWP6P1VvjLj8BLIAU0GnX5XY3zfhRYG4j+Fes8HwB/rF8SqtpFptD/9i9lJhw7FXZZMZNrd/1m7QH9Ej1n1e1uG6+xNp/pcvv5uq3FVdcwkSeQ/CX4871ApXlWMKB+Zwm5xGKGwnIs0VnQNIvGdd/VpaAjqdeibtmXV; SFSESSIONID=a10da91b-ae1c-4960-85c4-099deaba6d8f; bm_mi=D20F69736130998E0A5E54E5CE90958B~LRwGSDMEZK4B3Lo/yFWeg9sydzfnucNTU/hhLX/GABgnPoghz3xRvxAjkfty+XPPnOOpg2yfgsqKeh2el/NXICw0DlwNKQYBms1GgOQxv6IZFwQTutdhDpG0nFcIpdYZlDoa68EuybkgZ/GrnL1NA/6MgQ9xjVkAI5m9k1xrj16Syh28VdHvMeLaicuq9SquYuhaQ716sr8s26bE4NoFmqlbZlwxXOjunjtaplOWs3w=; bm_sv=42C41386EF00160E08FDE389E21F391E~ID+s/KjYv98CiQ63T745P9/FZfWtWkSlhskxaEkxHj+gOStqcy03FMa5Y6SjhwDEqZe1ZOFbWa/Ee8DyXNY1jwR1r4yaKLQlppTKHKECfg7TsKGthKBDVE1GDbzDDcO1f6wjdjRsgmJF5RtuOkkkri2PkllL3Fix+O0jJ3DSwLg=; isGlobalIp=0; HB_S_MR=1'
    }
};

const productStatusCheck = (price) => {
    if (price === 'no product' ) {
        return { price: null, exist: false }
    } if (price === 'no price') {
        return { price: null, exist: true }
    } else {
        return {price : price , exist : true}
    }
}

const postProduct = (Barcode, HBPrice, Uk , Us , De) => {
    var UK = productStatusCheck(Uk)
    var US = productStatusCheck(Us)
    var DE = productStatusCheck(De)
    var options = {
        'method': 'POST',
        'url': 'http://localhost/product',
        'headers': {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "barcode": Barcode, "HBPrice": HBPrice  , UK : UK , US : US, DE : DE })
    };

    // console.log({ "barcode": Barcode, "HBPrice": HBPrice  , UK : UK , US : US, DE : DE })
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}


const getProductInfos = (_url) => {
    return new Promise((resolve, reject) => {
        request(_url, options, function async(error, response) {
    console.log(1);
            if (error) throw new Error(error);
            if (response.statusCode === 200) {
                const naber = response.body.indexOf('"barcode":"')
                const barcode = response.body.substring(naber + '"barcode":"'.length, naber + '0468551683336'.length + '"barcode":"'.length)

                const begin = response.body.indexOf('"sortPriceText":"')
                const end = response.body.indexOf('","quantity')
                const priceTL = response.body.substring(begin + '"sortPriceText":"'.length, end)

                // postProduct(barcode , parseFloat(checkMoney(priceTL)))
                Promise.all([getUkProduct(barcode), getUsProduct(barcode), getDeProduct(barcode)]).then(([Uk, Us, De]) => {
                    // console.log(barcode, parseFloat(checkMoney(priceTL)), checkMoney(Uk) , checkMoney(Us) , checkMoney(De))
                    // console.log({Uk: checkMoney(Uk), Us : checkMoney(Us), De : checkMoney(De), Hb : checkMoney(priceTL), barcode: barcode , link : _url});
                    postProduct(barcode, parseFloat(checkMoney(priceTL)), checkMoney(Uk) , checkMoney(Us) , checkMoney(De))
                    // resolve([Uk, Us, De, priceTL, barcode]);
                }).catch((e) => {
                    console.log(e);
                })
            }
        })
    })

}

getUkProduct = async (barcode) => {
    return new Promise((resolve, reject) => {
        fetch(`https://www.amazon.co.uk/s?k=${barcode}&ref=nb_sb_noss`, options)
            .then(j => j.text())
            .then(t => {
                var doc = HTMLParser.parse(t)
                let products = doc.querySelectorAll('.s-include-content-margin')
                if (products.length !== 0) {
                    products.map((i) => {
                        if (i.innerHTML.indexOf('Sponsored') === -1) {
                            if (HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText === '')
                                resolve('no price')
                            else resolve(HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText)
                        } else {
                            resolve('no price')
                        }
                    })
                } else {
                    resolve('no product')
                }
            }
            )
    })
}




getUsProduct = async (barcode) => {
    return new Promise((resolve, reject) => {
        fetch(`https://www.amazon.com/s?k=${barcode}&ref=nb_sb_noss`, options)
            .then(j => j.text())
            .then(t => {
                var doc = HTMLParser.parse(t)
                let products = doc.querySelectorAll('.s-include-content-margin')
                if (products.length !== 0) {
                    products.map((i) => {
                        if (i.innerHTML.indexOf('Sponsored') === -1) {
                            if (HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText === '')
                                resolve('no price')
                            else resolve(HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText)
                        } else {
                            resolve('no price')
                        }
                    })
                } else {
                    resolve('no product')
                }
            }
            )
    })
}

getDeProduct = async (barcode) => {
    return new Promise((resolve, reject) => {
        fetch(`https://www.amazon.de/s?k=${barcode}&ref=nb_sb_noss`, options)
            .then(j => j.text())
            .then(t => {
                var doc = HTMLParser.parse(t)
                let products = doc.querySelectorAll('.s-include-content-margin')
                if (products.length !== 0) {
                    products.map((i) => {
                        if (i.innerHTML.indexOf('Sponsored') === -1) {
                            if (HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText === '')
                                resolve('no price')
                            else resolve(HTMLParser.parse(i.querySelectorAll('.a-offscreen')).rawText)
                        } else {
                            resolve('no price')
                        }
                    })
                } else {
                    resolve('no product')
                }
            }
            )
    })
}

const checkMoney = (money) => {
    money1 = money.replace(/[$€£]/g, '').replace(/,/, '.')
    money1 = parseFloat(money1)
    if (isNaN(money1)) {
        return money
    } else {
        return money1
    }
}

module.exports = {
    getProductInfos
}
