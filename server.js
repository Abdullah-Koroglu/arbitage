const fetch = require('node-fetch');
const https = require('https')
const fs = require('fs');
const { log } = require('console');
var HTMLParser = require('node-html-parser');


// var responseHolder;


// // var _url =  'https://www.hepsiburada.com/samsung-galaxy-watch-42mm-android-ve-iphone-uyumlu-siyah-sm-r810nzkatur-samsung-turkiye-garantili-p-HBV00000DIQEP?magaza=Hepsiburada'
// var _url =  'https://www.hepsiburada.com/quechua-sirt-cantasi-10-litre-p-hbv00000o74rn'
// // var _url = 'https://www.trendyol.com/pull-bear/erkek-bej-iskelet-gorselli-ve-sloganli-sweatshirt-04591537-p-73413501?boutiqueId=548594&merchantId=112044&filterOverPriceListings=false'


var request = require('request');
var options = {
    'method': 'GET',
    // 'url': _url,
    'headers': {
        'Connection': 'keep-alive',
        'Cookie': 'isGlobalIp=0; HB_S_MR=1; bm_sz=3A839A302ADD02DA4344266B5A253E4F~YAAQ14YUAgW32dh2AQAAQabi4QqAOHcufy0MeuHOB6alPW2NnjP6C7o8BB5QYnKDdGTjAwwVbOmdktCe1ycqudYlyazHuboGoa3f4R/eGy1fpDzN69sPlh7ZrHRfSxHKvQodQGBgql82jiHl/Nq6jog7BHe6xUeSyHXdRR+9kfN6ZPSEITXXc3cLCUmdm/IgNZr5zSM=; _abck=3AA5AE7C7FBFDAD54037813A057ED96F~-1~YAAQ14YUAga32dh2AQAAQabi4QU6ChUD6mckhN0Q/Ks/lUKl4oAd15x1aIhF2JwFMJj+grBSFoQwahMC+wOLtizt7Rd0bBK1SGtzsUX0jSEF2/7vbBNisNyJKbwLzq/8GbRNQjQybEhomuNmvPm4Ogv5y5rNT4OqByw17P5ywcFrWWUfQVfHaOlzqk5OpUpfIE2TCppgo/sHB9tKE3obSydoHmlx0ky3+WtU4x6fxO72LbFDFkpmlxiRwpJuIlBgl2qETKArCi/b5REIAcmAKoRmoTF9hdkui7CTuIfzfOrxb2NhDguL3v90euyPwxY=~-1~-1~-1; ak_bmsc=66E8067D1F992C94440300F2CEBD94A2021486D7B8410000684AF85FAD28E278~pl1xT8xXQrOFSpYdNcdca7TaQN1fm00KWinujo4dgP3lQvOQQcfbD3v7UgtSP1rv+XhTSQSUYoIEDmkFMAL9qz4/VqocqtutWP6P1VvjLj8BLIAU0GnX5XY3zfhRYG4j+Fes8HwB/rF8SqtpFptD/9i9lJhw7FXZZMZNrd/1m7QH9Ej1n1e1uG6+xNp/pcvv5uq3FVdcwkSeQ/CX4871ApXlWMKB+Zwm5xGKGwnIs0VnQNIvGdd/VpaAjqdeibtmXV; SFSESSIONID=a10da91b-ae1c-4960-85c4-099deaba6d8f; bm_mi=D20F69736130998E0A5E54E5CE90958B~LRwGSDMEZK4B3Lo/yFWeg9sydzfnucNTU/hhLX/GABgnPoghz3xRvxAjkfty+XPPnOOpg2yfgsqKeh2el/NXICw0DlwNKQYBms1GgOQxv6IZFwQTutdhDpG0nFcIpdYZlDoa68EuybkgZ/GrnL1NA/6MgQ9xjVkAI5m9k1xrj16Syh28VdHvMeLaicuq9SquYuhaQ716sr8s26bE4NoFmqlbZlwxXOjunjtaplOWs3w=; bm_sv=42C41386EF00160E08FDE389E21F391E~ID+s/KjYv98CiQ63T745P9/FZfWtWkSlhskxaEkxHj+gOStqcy03FMa5Y6SjhwDEqZe1ZOFbWa/Ee8DyXNY1jwR1r4yaKLQlppTKHKECfg7TsKGthKBDVE1GDbzDDcO1f6wjdjRsgmJF5RtuOkkkri2PkllL3Fix+O0jJ3DSwLg='
    }
};

// if (_url.indexOf('hepsi') !== -1) {
//     request(options, function (error, response) {
//         if (error) throw new Error(error);
//         console.log(response.statusCode);
//         const naber = response.body.indexOf('"barcode":"')
//         const barcode = response.body.substring(naber + '"barcode":"'.length, naber + '0468551683336'.length + '"barcode":"'.length)
//         log(barcode)

//         const begin = response.body.indexOf('"sortPriceText":"')
//         const end = response.body.indexOf('","quantity')
//         const priceTL = response.body.substring(begin + '"sortPriceText":"'.length,end)
//         log(priceTL)
//     })
// }


// if (_url.indexOf('trendyol') !== -1) {
    
//     fetch(_url, options)
//         .then(j => j.text())
//         .then(t => {
//             const naber = t.indexOf('"barcode":"')
//             const barcode = t.substring(naber + '"barcode":"'.length, naber + '0468551683336'.length + '"barcode":"'.length)
//             log(barcode)
//         })
// }


// ------------------------------------------------


var barcode  = '3608439412813';
// var barcode  = '3608439412806';

// fetch('https://www.amazon.co.uk/s?k=3608439412806&ref=nb_sb_noss' , options)
fetch(`https://www.amazon.co.uk/s?k=${barcode}&ref=nb_sb_noss` , options)
.then(j => j.text())
        .then(t => {log(t)
            fs.writeFileSync('amazon.txt' , t)
        }).then(t => {
            fs.readFile('amazon.txt', 'utf8', function(err, html){
              if (!err){
                  var doc = HTMLParser.parse(html)
                  let bulundu = 0;
            
            
              var umumdiv = HTMLParser.parse(doc.querySelector('.s-main-slot').innerHTML)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
            //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
            
                  while(bulundu === 0){
                    var spansır = umumdiv.querySelector('.s-result-item').toString()
                    if(spansır.indexOf('Sponsored') !== -1 ){
                        // fs.appendFileSync('amazon2.txt' , spansır)
                        log('spansır')
                        var elementSpansırd = HTMLParser.parse(spansır)
                        umumdiv.removeChild(umumdiv.firstChild)
                        fs.writeFileSync('amazon2.html' , umumdiv.toString())
                    }
                    else{
                        log('alt')
                        fs.writeFileSync('amazon2.html' , spansır)
                        bulundu = 1
                    }
                  }
              }
            })}
            
        )




// fs.readFile('amazon.txt', 'utf8', function(err, html){
//   if (!err){
//       var doc = HTMLParser.parse(html)
//       let bulundu = 0;


//   var umumdiv = HTMLParser.parse(doc.querySelector('.s-main-slot').innerHTML)
// //   var zottik = umumdiv.removeChild(umumdiv.firstChild)
// //   var zottik = umumdiv.removeChild(umumdiv.firstChild)

//       while(bulundu === 0){
//         var spansır = umumdiv.querySelector('.s-result-item').toString()
//         if(spansır.indexOf('Sponsored') !== -1 ){
//             // fs.appendFileSync('amazon2.txt' , spansır)
//             log('spansır')
//             var elementSpansırd = HTMLParser.parse(spansır)
//             umumdiv.removeChild(umumdiv.firstChild)
//             fs.writeFileSync('amazon2.txt' , umumdiv.toString())
//         }
//         else{
//             log('alt')
//             fs.writeFileSync('amazon2.txt' , spansır)
//             bulundu = 1
//         }
//       }
//   }
// })