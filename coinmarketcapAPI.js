var fetch = require('node-fetch');
var url = 'https://api.coinmarketcap.com/v2/ticker/1/';


exports.fetchBTC = function () {

    return fetch(url)
        .then(data => data.json())
        .then((data) => data.data.quotes.USD.price)
        .catch((err) =>{console.log("connecting Error (coinmarketcap):" + err.toString()); process.exit(1)});
};