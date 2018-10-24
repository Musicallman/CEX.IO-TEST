
var WebSocketClient = require('websocket').client,
    crypto = require('crypto'),
    calcAPI = require('./calculator'),
    coinAPI = require('./coinmarketcapAPI'),
    fs = require('fs');


var subscribe =  JSON.stringify({ "e": "subscribe", "rooms": [ "tickers" ] }),
    client = new WebSocketClient(),
    currencyCoin = 0,
    apiKey = 'SYPh3WCmRAuoa6xLwvOd2SG4Tc',
    apiSecret = 'FTBWEHYH8aOvZWjGOPgvZxSbuI',
    auth = createAuthRequest(apiKey, apiSecret),
    data = fs.readFileSync('./appConfig.json'),
    config = JSON.parse(data);


coinAPI.fetchBTC()
    .then((data) => { currencyCoin = data });

setInterval(
    function ()
    {
        coinAPI.fetchBTC()
            .then((data) => { currencyCoin = data });
    }, +config.reloadTime);


client.on('connectFailed', function(error) {
    console.log('Connect Error (WebSocket): ' + error.toString());
    process.exit(1);
});

client.on('connect', function(connection) {

    connection.send(auth);
    connection.send(subscribe);

    console.log('WebSocket Client Connected');



    connection.on('error', function(error) {
        console.log("Connection Error (WebSocket): " + error.toString());
        process.exit(1);
    });
    connection.on('close', function() {
        console.log('echo-protocol Connection Closed');
    });
    connection.on('message', function(message) {

        var data = JSON.parse(message.utf8Data);

        if (data.e === 'tick')
        {
            if (data.data.symbol1 === 'BTC' && data.data.symbol2 === 'USD')
            {
                var currencyCexio = +data.data.price;

                calcAPI.calculator(currencyCoin,currencyCexio, +config.decimals);

            }
        }


        if (data.e === "ping") {
            connection.send(JSON.stringify({"e": 'pong'}));

        }
    });

    function sendNumber() {

        if (connection.connected) {
            var number = Math.round(Math.random() * 0xFFFFFF);
            connection.sendUTF(number.toString());
            setTimeout(sendNumber, 1000);
        }
    }
    sendNumber();
});

client.connect('wss://ws.cex.io/ws/', 'echo-protocol');


function createSignature(timestamp, apiKey, apiSecret) {
    var hmac = crypto.createHmac('sha256', apiSecret);
    hmac.update(timestamp + apiKey);
    return hmac.digest('hex');
}

function createAuthRequest(apiKey, apiSecret) {
    var timestamp = Math.floor(Date.now() / 1000); // Note: java and javascript timestamp presented in miliseconds
    var args = { e: 'auth', auth: { key: apiKey, signature: createSignature(timestamp, apiKey, apiSecret), timestamp: timestamp } };
    var authMessage = JSON.stringify( args );
    return authMessage;
}