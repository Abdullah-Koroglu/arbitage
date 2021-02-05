var request = require('request');
const LFIC = require('./LinkFinderInCategory')
const PIFL = require('./ProductInfoFinderbyLink');
const SCFM = require('./SubCategoryFromMain.js')
const server = require('./serverFunctions.js')




// server.getProductNames().then((p) => {
//     p = JSON.parse(p)
//     for (let index = 0; index < p.length; index++) {
//         setTimeout(() => {
//             const element = p[index];
//             PIFL.getProductInfos("https://www.hepsiburada.com" + element.link)
//             // console.log(element.link);
//         }, 1000 * index);

//     }
// })


// categories[63].linksInSub.forEach(element => {
//     
// });





const func =async(number)=>{
    return new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(number);
    }, 2000 * number);
})
}

const dizi = [ 0 , 1 ,2 ,3, 4]

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }


// server.getCategories().then((p) => {
//     p = JSON.parse(p)
//     asyncForEach(p, async (element) => {
//         if (element.link[0] !== '/') {
//         ibu = await LFIC.getHBProductLinks('https://www.hepsiburada.com/' + element.link + '?sayfa=' , element.name);
//             console.log(element.link);
//         }else{
//         ibu = await LFIC.getHBProductLinks('https://www.hepsiburada.com' + element.link + '?sayfa=' , element.name);
//         }

//         // console.log('\x1b[33m%s\x1b[0m', ibu );
//       })
//       console.log('Done' + p.length);
// })

server.getProductNames().then(i =>{
  i = JSON.parse(i).splice(100 , 5)
  asyncForEach(i, async (element) => {
    console.log(element.link);
  })
})

