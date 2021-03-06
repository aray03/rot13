const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve('../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200).sendFile('index.html', {
        root: path.resolve('../public')
    });
});

app.get('/encrypt', (request, response)  => {
    //flip a coin, if heads return Marvel, if tails return  DC

    var plaintext = request.query.plaintext;
    //TODO: encrypt text
    plaintext = plaintext;
    var ciphertext = plaintext;

    
    var key = 13;
    var abc = "abcdefghijklmnopqrstuvwxyz";
    var abcCap = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var fulltemp = "";

    for(var n=0; n < plaintext.length; n++){
        for(var z=0; z < abc.length; z++){

            if(ciphertext[n] === (abc[z])){
                var temp = abc[(z+key)%26];
                var fulltemp = fulltemp + temp;
            }
            
            else if (ciphertext[n] === (abcCap[z])){
                var temp = abcCap[(z+key)%26];
                var fulltemp = fulltemp + temp;
            }
            
            else if(ciphertext[n] == (" ")){
                var fulltemp = fulltemp + " ";
            }

        }
      //  do something with plaintext[n] or plaintext.charAt(n);

      

    }
    ciphertext = fulltemp;
    console.log('Word Scrambled!');
    response.status(200).send( ciphertext )
});

app.listen(port, () => {
    console.log('Listening on port ${port}');
});

