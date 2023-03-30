var express = require("express")
const res = require("express/lib/response");
var app = express();

app.use(express.urlencoded({extends: false}));
app.use(express.json());
app.use(express.static(__dirname+'/public'))

/* function addNumbers(number1, number2){
    return number1 + number2;
}
 */
/* app.get('/', (req, res) =>{
    res.render('index.html');
}); */

/* app.get('/addTwoNumbers', (req, res) =>{
    var number1= req.query.number1;
    var number2= req.query.number2;
    var result= addNumbers(number1, number2);
    res.jason({statusCode:200, data:result, messgae:'Success'});
});
 */
var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: "+port);
})
