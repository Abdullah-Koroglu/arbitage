const fetch = require('node-fetch');
const https = require('https')
const fs = require('fs');
const { log } = require('console');
var HTMLParser = require('node-html-parser');


// var responseHolder;

var _url = 'https://www.hepsiburada.com/gillette-mach3-8-li-yedek-tiras-bicagi-p-SGGIL243548'
// var _url = 'https://www.hepsiburada.com/vans-mn-ward-siyah-erkek-sneaker-ayakkabi-p-HBV00000JOZJ1'
// var _url =  'https://www.hepsiburada.com/quechua-sirt-cantasi-10-litre-p-HBV00000O74RL'
// // var _url = 'https://www.trendyol.com/pull-bear/erkek-bej-iskelet-gorselli-ve-sloganli-sweatshirt-04591537-p-73413501?boutiqueId=548594&merchantId=112044&filterOverPriceListings=false'


var request = require('request');
var options = {
    'method': 'GET',
    'url': _url,
    'headers': {
        'Connection': 'keep-alive',
        'Cookie': 'isGlobalIp=0; HB_S_MR=1; bm_sz=3A839A302ADD02DA4344266B5A253E4F~YAAQ14YUAgW32dh2AQAAQabi4QqAOHcufy0MeuHOB6alPW2NnjP6C7o8BB5QYnKDdGTjAwwVbOmdktCe1ycqudYlyazHuboGoa3f4R/eGy1fpDzN69sPlh7ZrHRfSxHKvQodQGBgql82jiHl/Nq6jog7BHe6xUeSyHXdRR+9kfN6ZPSEITXXc3cLCUmdm/IgNZr5zSM=; _abck=3AA5AE7C7FBFDAD54037813A057ED96F~-1~YAAQ14YUAga32dh2AQAAQabi4QU6ChUD6mckhN0Q/Ks/lUKl4oAd15x1aIhF2JwFMJj+grBSFoQwahMC+wOLtizt7Rd0bBK1SGtzsUX0jSEF2/7vbBNisNyJKbwLzq/8GbRNQjQybEhomuNmvPm4Ogv5y5rNT4OqByw17P5ywcFrWWUfQVfHaOlzqk5OpUpfIE2TCppgo/sHB9tKE3obSydoHmlx0ky3+WtU4x6fxO72LbFDFkpmlxiRwpJuIlBgl2qETKArCi/b5REIAcmAKoRmoTF9hdkui7CTuIfzfOrxb2NhDguL3v90euyPwxY=~-1~-1~-1; ak_bmsc=66E8067D1F992C94440300F2CEBD94A2021486D7B8410000684AF85FAD28E278~pl1xT8xXQrOFSpYdNcdca7TaQN1fm00KWinujo4dgP3lQvOQQcfbD3v7UgtSP1rv+XhTSQSUYoIEDmkFMAL9qz4/VqocqtutWP6P1VvjLj8BLIAU0GnX5XY3zfhRYG4j+Fes8HwB/rF8SqtpFptD/9i9lJhw7FXZZMZNrd/1m7QH9Ej1n1e1uG6+xNp/pcvv5uq3FVdcwkSeQ/CX4871ApXlWMKB+Zwm5xGKGwnIs0VnQNIvGdd/VpaAjqdeibtmXV; SFSESSIONID=a10da91b-ae1c-4960-85c4-099deaba6d8f; bm_mi=D20F69736130998E0A5E54E5CE90958B~LRwGSDMEZK4B3Lo/yFWeg9sydzfnucNTU/hhLX/GABgnPoghz3xRvxAjkfty+XPPnOOpg2yfgsqKeh2el/NXICw0DlwNKQYBms1GgOQxv6IZFwQTutdhDpG0nFcIpdYZlDoa68EuybkgZ/GrnL1NA/6MgQ9xjVkAI5m9k1xrj16Syh28VdHvMeLaicuq9SquYuhaQ716sr8s26bE4NoFmqlbZlwxXOjunjtaplOWs3w=; bm_sv=42C41386EF00160E08FDE389E21F391E~ID+s/KjYv98CiQ63T745P9/FZfWtWkSlhskxaEkxHj+gOStqcy03FMa5Y6SjhwDEqZe1ZOFbWa/Ee8DyXNY1jwR1r4yaKLQlppTKHKECfg7TsKGthKBDVE1GDbzDDcO1f6wjdjRsgmJF5RtuOkkkri2PkllL3Fix+O0jJ3DSwLg='
    }
};

if (_url.indexOf('hepsi') !== -1) {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        // console.log(response.statusCode);
        const naber = response.body.indexOf('"barcode":"')
        const barcode = response.body.substring(naber + '"barcode":"'.length, naber + '0468551683336'.length + '"barcode":"'.length)
        log(barcode)

        const begin = response.body.indexOf('"sortPriceText":"')
        const end = response.body.indexOf('","quantity')
        const priceTL = response.body.substring(begin + '"sortPriceText":"'.length, end)
        log(priceTL + '₺')
        getUkProduct(barcode)
        getUsProduct(barcode)
        getDeProduct(barcode)
    })
}


if (_url.indexOf('trendyol') !== -1) {

    fetch(_url, options)
        .then(j => j.text())
        .then(t => {
            const naber = t.indexOf('"barcode":"')
            const barcode = t.substring(naber + '"barcode":"'.length, naber + '0468551683336'.length + '"barcode":"'.length)
            log(barcode)
            log(priceTL)
            getUkProduct(barcode)
            getUsProduct(barcode)
            getDeProduct(barcode)

        })
}


// ------------------------------------------------


var barcode = '3608439412813'; //çanat
// var barcode  = '3608439412806'; //çant
// var barcode  = '0190543159072' //ayakkabı
// var barcode = '6925281932007'
// var barcode = '0191166396783'


getUkProduct = (barcode) => {

    var priceEnd
    var price

    fetch(`https://www.amazon.co.uk/s?k=${barcode}&ref=nb_sb_noss`, options)
        .then(j => j.text())
        .then(t => {
            var doc = HTMLParser.parse(t)
            let bulundu = 0;


            var umumdiv = HTMLParser.parse(doc.querySelector('.s-main-slot').innerHTML)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)

            while (bulundu === 0) {try{
                var spansir = umumdiv.querySelector('.s-result-item').toString()
                if (spansir.indexOf('Sponsored') !== -1 || spansir.indexOf('£') === -1) {
                    // fs.appendFileSync('amazon2.txt' , spansir)
                    // log('spansir')
                    var elementspansird = HTMLParser.parse(spansir)
                    umumdiv.removeChild(umumdiv.firstChild)
                    fs.writeFileSync('amazon2.html', umumdiv.toString())
                }
                else {
                    // log('alt')
                    fs.writeFileSync('amazon2.html', spansir)
                    var priceBeg = spansir.indexOf('>£')
                    if (priceBeg !== -1) {
                        priceEnd = spansir.substring(priceBeg).indexOf('</')
                        price = spansir.substring(priceBeg + 2, priceBeg + priceEnd)
                    }
                    log(price + '£')
                    bulundu = 1
                }}catch(err){
                    log('naber')
                    return
                }
            }
        }

        )

}

getUsProduct = (barcode) => {

    var priceEnd
    var price


    fetch(`https://www.amazon.com/s?k=${barcode}&ref=nb_sb_noss`, options)
        .then(j => j.text())
        .then(t => {
            var doc = HTMLParser.parse(t)
            let bulundu = 0;


            var umumdiv = HTMLParser.parse(doc.querySelector('.s-main-slot').innerHTML)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)

            while (bulundu === 0) {
                try {
                    var spansir = umumdiv.querySelector('.s-result-item').toString()
                    if (spansir.indexOf('Sponsored') !== -1 || spansir.indexOf('$') === -1) {
                        // fs.appendFileSync('amazon2.txt' , spansir)
                        // log('spansir')
                        var elementspansird = HTMLParser.parse(spansir)
                        umumdiv.removeChild(umumdiv.firstChild)
                        fs.writeFileSync('amazon2.html', umumdiv.toString())
                    }
                    else {
                        // log('alt')
                        fs.writeFileSync('amazon2.html', spansir)
                        var priceBeg = spansir.indexOf('>$')
                        if (priceBeg !== -1) {
                            priceEnd = spansir.substring(priceBeg).indexOf('</')
                            price = spansir.substring(priceBeg + 2, priceBeg + priceEnd)
                        }
                        log(price + '$')
                        bulundu = 1
                    }
                }
                catch (err) {
                    log('naber')
                    return
                }
            }
        }
        )

}



getDeProduct = (barcode) => {

    var priceEnd
    var price


    fetch(`https://www.amazon.de/s?k=${barcode}&__mk_de_DE=%C3%85M%C3%85%C5%BD%C3%95%C3%91&ref=nb_sb_noss`, options)
        .then(j => j.text())
        .then(t => {
            var doc = HTMLParser.parse(t)
            let bulundu = 0;


            var umumdiv = HTMLParser.parse(doc.querySelector('.s-main-slot').innerHTML)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)

            while (bulundu === 0) {
                try{
                var spansir = umumdiv.querySelector('.s-result-item').toString()
                // log(spansir)
                if (spansir.indexOf('Gesponsert') !== -1 || spansir.indexOf('€') === -1) {
                    // fs.appendFileSync('amazon2.txt' , spansir)
                    // log('spansir')
                    var elementspansird = HTMLParser.parse(spansir)
                    umumdiv.removeChild(umumdiv.firstChild)
                    fs.writeFileSync('amazon2.html', umumdiv.toString())
                }
                else {
                    // log('alt')
                    fs.writeFileSync('amazon2.html', spansir)
                    var priceEnd = spansir.indexOf('€</')
                    if (priceEnd !== -1) {
                        priceBeg = spansir.substring(0, priceEnd).lastIndexOf('>')
                        price = spansir.substring(priceBeg + 1, priceEnd - 1)
                    }
                    // log(price)
                    log(price + '€')
                    bulundu = 1
                }}catch(err){
                    log('naber')
                    return
                }
            }
        }

        )

}

// getUsProduct(barcode)
// getUkProduct(barcode)
// getDeProduct(barcode)

        // fetch('https://www.amazon.co.uk/s?k=3608439412806&ref=nb_sb_noss' , options)