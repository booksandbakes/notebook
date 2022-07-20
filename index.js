
const http = require('http');
var express = require('express');
var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }))
const ejs = require("ejs")
app.set('view engine', 'ejs');
const Str = require('@supercharge/strings')

const { db } = require("./util/admin");
let a = db.collection('users');
FieldValue = require('firebase-admin').firestore.FieldValue;
//const random = Str.random(5);

const { books } = require('./handler/books');
const { application } = require('express');
app.get('/books', books);

app.use(express.static(__dirname+'/views'));

app.get('/',function(req, res){
  console.log("Start");
  const random = Str.random(5);
  res.redirect(random);
 
});

app.post('/create',async(req,res) => {
    var data = req.body.description;
    //console.log(`${data} ${check}`);
    const re_url = req.app.get('url');
    let ref_doc = a.doc(re_url);
    var retrive_data = await a.doc(re_url).get();     // for only .get() we can check 'exists' , if u add .get().data() exists wont work
    var check = data.trim().length

    if (check != 0){
      if (!retrive_data.exists) {
          //await ref_doc.set({data: data,}); #only dictionary type
          await ref_doc.set({data:[data]});   //array type
          console.log('New user added!');

        } 
      else {
          await ref_doc.update("data", FieldValue.arrayUnion(data));
          console.log('New row added!');
          
        }
    }
    res.redirect(re_url);
});


app.post("/upload", async (req, res) => { 
    const data = req.body.description;
    await User.add({ data });
    res.send({ msg: "User Added" });
});

app.get('*',async(req,res)=>{   
  //console.log(req.url);
  app.set('url',req.url);    
  if(req.url == '/'){
    res.send('Enter proper URL');
  }    
  else{
    re_url = req.app.get('url');
    var retrive_data = await (await a.doc(re_url).get()).data();
    if (!retrive_data) {  
      res.render('sample');       
  }
  else{
    res.render('sample_home',retrive_data);
    
  }  
}   
});

app.post("*",async(req,res)=>{
  const del_data = req.body.custId;
  const re_url = req.app.get('url');
  try{
    await a.doc(re_url).update("data", FieldValue.arrayRemove(del_data));
    res.redirect(re_url);
  }
  catch(e) {
    console.log(e.message);
  }
});

//app.listen(3000, '127.0.0.1');
//console.log('Server listening on http://localhost:3000');
const PORT = process.env.PORT ||3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));