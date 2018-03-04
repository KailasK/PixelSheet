const express = require('express');
const app = express();
var myParser = require("body-parser");
var getPixels = require("get-pixels");
var ndarray = require("ndarray");

var img;
var map = [];

app.use(myParser.json())

app.post('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    getPixels(req.body.url, function(err, pixels){
        if (err || req.body.width <= 1){
            console.log(err);
            res.send(JSON.stringify({error:err}))
            return;
        } else {
            console.log(pixels.shape.slice());
            img = pixels;
            map = [];
            var s = (img.shape[0]-(img.shape[0]%req.body.width))/req.body.width;
            var c = img.lo(img.shape[0]%req.body.width,img.shape[1]%s,img.shape[2]);
            genMap(s,c);
            res.send(JSON.stringify({data:map}))
        }
    });
})

function genMap(s,c) {
    var working;
    for (var i = 0; i < c.shape[0]; i+=s) {
        var arr = [];
        for (var j = 0; j < c.shape[1]; j+=s) {
            var p = {};
            for (var k = 0; k < img.shape[2]; k++) {
                working = c.lo(i,j,k).hi(s,s,1);
                var avg = 0;
                for (var a = 0; a < s-1; a++) {
                    for (var b = 0; b < s-1; b++) {
                        avg += working.get(a,b,0);
                    }
                }
                avg = parseInt(avg/((s-1)*(s-1)));
                switch (k) {
                    case 0:
                        p.r = avg;
                        break;
                    case 1:
                        p.g = avg;
                        break;
                    case 2:
                        p.b = avg;
                        break;
                    case 3:
                        p.a = avg;
                        break;
                    default:
                        break;
                }
            }
            arr.push(p);
        }
        map.push(arr);
    }
}

app.listen(8080, () => console.log('listening on port 8080'))
