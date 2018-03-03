const express = require('express');
const app = express();
var myParser = require("body-parser");
var getPixels = require("get-pixels");
var ndarray = require("ndarray");

var img;
var cells = [];

app.use(myParser.json())

app.post('/', (req, res) => {

    res.setHeader('Content-Type', 'application/json');
    getPixels(req.body.url, function(err, pixels){
        if (err){
            console.log(err);
            return;
        } else {
            console.log(pixels.shape.slice());
            img = pixels;
            genMap(req.body.width);
            res.send(JSON.stringify({data:cells}))
        }
    });
})

function genMap(w) {
    var s = (img.shape[0]-(img.shape[0]%w))/w;
    var c = img.lo(img.shape[0]%w,img.shape[1]%s,4);
    var working;
    for (var i = 0; i < c.shape[0]; i+=s) {
        var arr = [];
        for (var j = 0; j < c.shape[1]; j+=s) {
            var obj = {};
            for (var k = 0; k < 4; k++) {
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
                        obj.r = avg;
                        break;
                    case 1:
                        obj.g = avg;
                        break;
                    case 2:
                        obj.b = avg;
                        break;
                    case 3:
                        obj.a = avg;
                        break;
                    default:
                        break;
                }
            }
            arr.push(obj);
        }
        cells.push(arr);
    }
    cells.x = c.shape[0];
    cells.y = c.shape[1];
}

app.listen(8080, () => console.log('listening on port 8080'))
