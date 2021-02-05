const fs = require('fs');
var request = require('request');
var HTMLParser = require('node-html-parser');
const server = require('./serverFunctions')
var totalSayfa;


var _url = 'https://www.hepsiburada.com/yatak-odasi-bazalari-c-18021326?sayfa='

var options = {
    'method': 'GET',
    'url': 'https://www.hepsiburada.com/yatak-odasi-bazalari-c-18021326?sayfa=1',
    'headers': {
        'Connection': 'keep-alive',
        'Cookie': 'isGlobalIp=0; HB_S_MR=1; bm_sz=3A839A302ADD02DA4344266B5A253E4F~YAAQ14YUAgW32dh2AQAAQabi4QqAOHcufy0MeuHOB6alPW2NnjP6C7o8BB5QYnKDdGTjAwwVbOmdktCe1ycqudYlyazHuboGoa3f4R/eGy1fpDzN69sPlh7ZrHRfSxHKvQodQGBgql82jiHl/Nq6jog7BHe6xUeSyHXdRR+9kfN6ZPSEITXXc3cLCUmdm/IgNZr5zSM=; _abck=3AA5AE7C7FBFDAD54037813A057ED96F~-1~YAAQ14YUAga32dh2AQAAQabi4QU6ChUD6mckhN0Q/Ks/lUKl4oAd15x1aIhF2JwFMJj+grBSFoQwahMC+wOLtizt7Rd0bBK1SGtzsUX0jSEF2/7vbBNisNyJKbwLzq/8GbRNQjQybEhomuNmvPm4Ogv5y5rNT4OqByw17P5ywcFrWWUfQVfHaOlzqk5OpUpfIE2TCppgo/sHB9tKE3obSydoHmlx0ky3+WtU4x6fxO72LbFDFkpmlxiRwpJuIlBgl2qETKArCi/b5REIAcmAKoRmoTF9hdkui7CTuIfzfOrxb2NhDguL3v90euyPwxY=~-1~-1~-1; ak_bmsc=66E8067D1F992C94440300F2CEBD94A2021486D7B8410000684AF85FAD28E278~pl1xT8xXQrOFSpYdNcdca7TaQN1fm00KWinujo4dgP3lQvOQQcfbD3v7UgtSP1rv+XhTSQSUYoIEDmkFMAL9qz4/VqocqtutWP6P1VvjLj8BLIAU0GnX5XY3zfhRYG4j+Fes8HwB/rF8SqtpFptD/9i9lJhw7FXZZMZNrd/1m7QH9Ej1n1e1uG6+xNp/pcvv5uq3FVdcwkSeQ/CX4871ApXlWMKB+Zwm5xGKGwnIs0VnQNIvGdd/VpaAjqdeibtmXV; SFSESSIONID=a10da91b-ae1c-4960-85c4-099deaba6d8f; bm_mi=D20F69736130998E0A5E54E5CE90958B~LRwGSDMEZK4B3Lo/yFWeg9sydzfnucNTU/hhLX/GABgnPoghz3xRvxAjkfty+XPPnOOpg2yfgsqKeh2el/NXICw0DlwNKQYBms1GgOQxv6IZFwQTutdhDpG0nFcIpdYZlDoa68EuybkgZ/GrnL1NA/6MgQ9xjVkAI5m9k1xrj16Syh28VdHvMeLaicuq9SquYuhaQ716sr8s26bE4NoFmqlbZlwxXOjunjtaplOWs3w=; bm_sv=42C41386EF00160E08FDE389E21F391E~ID+s/KjYv98CiQ63T745P9/FZfWtWkSlhskxaEkxHj+gOStqcy03FMa5Y6SjhwDEqZe1ZOFbWa/Ee8DyXNY1jwR1r4yaKLQlppTKHKECfg7TsKGthKBDVE1GDbzDDcO1f6wjdjRsgmJF5RtuOkkkri2PkllL3Fix+O0jJ3DSwLg='
    }
};


getHBProductLinks = async (_url, name) => {
    console.log(name);
    return new Promise((resolve, reject) => {
        request(_url, options, function (error, response) {
            if (error) throw new Error(error);
            if (response.statusCode === 200) {
                var bodyParsed = HTMLParser.parse(response.body)
                var pagination = bodyParsed.querySelector('#pagination')
                if (pagination !== null) {
                    var pages = pagination.querySelectorAll('li')
                    totalSayfa = parseInt(pages[pages.length - 1].rawText.trim())
                    console.log(totalSayfa);
                    // fs.writeFileSync('kategory.html', '')
                    seachForLink(2, _url, () => { console.error("alt kategoride ürünlerin linkleri getirildi"), resolve(1) })
                }else{
                    resolve(1)
                }
            } else {
                console.log(response.statusCode + ' getHBProductLinks err');
            }
        })
    })
}

const seachForLink = async (totalSayfa, url, callback) => {
    sayfalar = []
    for (let sayfa = 1; sayfa < totalSayfa + 1; sayfa++) {
        request(url + sayfa, options, function (error, response) {
            if (error) throw new Error(error);
            if (response.statusCode === 200) {
                sayfalar.push(sayfa)
                var bodyParsed = HTMLParser.parse(response.body)
                var items = bodyParsed.querySelectorAll('.search-item')
                items.forEach(element => {
                    var a = element.querySelector('a')
                    var linkOfA = a.rawAttributes.href
                    var nameOfA = HTMLParser.parse(a.querySelectorAll('.product-title')).rawText.trim()
                    server.postProductName(nameOfA, linkOfA)

                    // links.push({link : linkOfA , name : nameOfA})
                    // links.push({link :linkOfA})
                });
                sayfalar.length === totalSayfa ?
                    callback() : null;
            } else {
                console.log(response.statusCode + ' seachForLink err');
            }
        })
    }
}

module.exports = {
    getHBProductLinks
}