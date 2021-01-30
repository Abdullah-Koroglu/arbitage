var request = require('request');
var HTMLParser = require('node-html-parser');

var options = {
    'method': 'GET',
    'url': 'https://www.hepsiburada.com/tum-kategoriler',
    'headers': {
        'User-Agent': 'PostmanRuntime/7.26.8',
        'Connection': 'keep-alive',
        'Cookie': '_abck=3AA5AE7C7FBFDAD54037813A057ED96F~-1~YAAQ14YUAga32dh2AQAAQabi4QU6ChUD6mckhN0Q/Ks/lUKl4oAd15x1aIhF2JwFMJj+grBSFoQwahMC+wOLtizt7Rd0bBK1SGtzsUX0jSEF2/7vbBNisNyJKbwLzq/8GbRNQjQybEhomuNmvPm4Ogv5y5rNT4OqByw17P5ywcFrWWUfQVfHaOlzqk5OpUpfIE2TCppgo/sHB9tKE3obSydoHmlx0ky3+WtU4x6fxO72LbFDFkpmlxiRwpJuIlBgl2qETKArCi/b5REIAcmAKoRmoTF9hdkui7CTuIfzfOrxb2NhDguL3v90euyPwxY=~-1~-1~-1; SFSESSIONID=a10da91b-ae1c-4960-85c4-099deaba6d8f; isGlobalIp=0; HB_S_MR=1; ak_bmsc=1BA8BF81BAD3C39D71CD611BC7C5B34D02148687DE1000006B4C0C60CCE4FB5D~plplc9gb0a9+lNIpziMGxmjCCy3kLZXMiORtteGiPyqXp9jkAn0XlSAaI7Nuk1FeHOKzWci0gvPCH8eRroDHZ/TQwXsrLjXvXFgmdFruHhg99cHP6FpmHXqQtxd8Hwlyd2/Hxilg/sMkxYpdhmQMT2ueXm0f9TtObJxFTOi77BRxQULQ3j/CZEFmJ9129S/9PX4ErjaXtfLhMTEZrNO1itjptYMQ0fR1kdkGQOoyZry34=; bm_sz=67CA56F8D714E7252D369472B3C52382~YAAQh4YUAiyJpiR3AQAAZ4QKMApChxNfcADNQcRgRCh3jfkN/nKG9jSFS3duDyVbtWpIvTlXHxIPWehj/lEdOIuow9nt0LF1kcL5VfCvDTyTD61yrHepeGDCtgtfz3PMxwbv/2wgL8OBHgA9reayoj49dhB6LUK+48iFCCiCwGLhrDV+0+Y0MAdR6WPUv204fkc66Q=='
    }
};

getCategories = () => {
    request(options, function (error, response) {
        if (error) throw new Error(error);
        if (response.statusCode === 200) {
            console.log(response.statusCode);
            var bodyParsed = HTMLParser.parse(response.body)
            var baslik;
            var groups = bodyParsed.querySelectorAll('.group')
            groups.forEach(element => {
                var baslikelementi = element.querySelectorAll('a')
                try { baslik = baslikelementi[0].innerText }
                catch (err) { console.log('err'); }
                var a = element.querySelectorAll('a')
                a.forEach(element => {
                    var linkOfA = element.rawAttributes.href
                    postCategories(element.innerText, linkOfA, baslik);
                    // console.log
                });
            });
        }
    })
}

const postCategories =(name , link , main)=>{
    var options = {
        'method': 'POST',
        'url': 'http://localhost/category',
        'headers': {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"name": name ,"link": link ,"main":main })

      };
      request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
      });

}

module.exports = {
    getCategories
}
