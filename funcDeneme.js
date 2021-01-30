const linkFinder = require('./LinkFinderInCategory')
const fs = require('fs');
const LFIC = require('./LinkFinderInCategory')
var HTMLParser = require('node-html-parser');
const PIFL = require('./ProductInfoFinderbyLink');
const fetch = require('node-fetch');
var request = require('request');
const SCFM = require('./SubCategoryFromMain.js')


const postProduct = (Barcode, HBPrice) => {
    var options = {
        'method': 'POST',
        'url': 'http://localhost/product/add',
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


// const preCategories = fs.readFileSync('gezer.html', "utf-8")
// const categories = JSON.parse(preCategories).Links


// categories[63].linksInSub.forEach(element => {
//     LFIC.getHBProductLinks('https://www.hepsiburada.com' + element + '?sayfa=');
// });

// ------------------------------------------------------------


// const preLinks = fs.readFileSync('kategory.html' , "utf-8")
// const links = JSON.parse(preLinks)

//  links.splice(0,10).map(async(i) =>{
//      console.log(i.link);

//     const res = await PIFL.getProductInfos("https://www.hepsiburada.com" + i.link)
//     postProduct(res.barcode , res.Hb)
//      console.log(res.Hb , res.barcode)
//  })

// request('http://127.0.0.1/product' , options , (err , item)=>{
//     console.log(JSON.parse(item.body)[0].name);
// })

SCFM.getCategories()