var express = require("express")
var app = express()
var cors = require ('cors')
let projectCollection;

app.use(express.static(__dirname+'/public'))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

//mongo db connection..
const Mongoclient = require ('mongodb').MongoClient;

//database conn
const uri = 'mongodb+srv://sajibmitra3:admin@sajibmitra.osjuz0u.mongodb.net/?retryWrites=true&w=majority'
const client = new Mongoclient (uri, {useNewUrlParser: true})


//insert project
const insertProjects = (project,callback) => {
    projectCollection.insert(project,callback);
}

const getProjects =(callback) =>{
    projectCollection.find({}).toArray(callback);
}

const createCollection = (collectionName) => {
    client.connect((err,db) => {
      projectCollection = client.db().collection(collectionName);
       if (!err){
      
        console.log('MongoDb Connected')
       }
       else {
        console.log("DB Error: ", err);
        process.getMaxListeners(1);

       }

    
        
    } )
}



const cardList = [
    {
        title: "M Block",
        image: "images/MGR.jpg",
        link: "About M Block",
        desciption: "Demo desciption about M Block"
    },
    {
        title: "L Block",
        image: "images/LBlock.jpg",
        link: "About L Block",
        desciption: "Demo desciption about L Block"
    }
]




app.get('/api/projects',(req,res) => {
    getProjects((err, result)=> {
    if (err){
        res.json({statusCode: 400,message: err})
    }
    else{
        res.json({statusCode: 200, message:"success", data: result})
    }
    })

})
//post api
app.post('/api/projects',(req,res) => {
    console.log("New Project added", req.body)
    var newproject = req.body;

    insertProjects(newproject,(err,result)=> {
        if (err){
            res.json({statusCode: 400,message: err})
        }
        else{
            res.json({statusCode: 200, message:"project successfully added", data: result})
        }
        })
    
    })


var port = process.env.port || 3000;

app.listen(port,()=>{
    console.log("App listening to: http://localhost: "+port)
    createCollection ("vit")
}
)