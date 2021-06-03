const { spawn } = require('child_process')
const express = require('express');
var bodyParser = require('body-parser');

const app = express()
app.use(bodyParser.json());
app.use(express.json())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({     
    extended:true
}));
// express.use(this.upload.any());

const PORT = process.env.PORT || 3000

const multer = require('multer')
const upload = multer({
    dest : "upload"
})


app.get('/', upload.any(), (req, res)=>{
    return res.redirect("send.html");
})

app.post("/send", (req, res)=>{
    const msg = req.body.msg;

    // upload(req,res,function(err) {
  
    //     if(err) {

    //         res.send(err)
    //     }
    //     else {
    //         // SUCCESS, image successfully uploaded
    //         // res.send("Success, Image uploaded!")
    //         console.log("got image");
    //     }
    // })



    console.log(req.body);

    const childPython = spawn('python',['testwhatkit.py', msg])
    childPython.stdout.on('data',(data)=>{
        console.log("Stdout : ", data.toString() );
    })
    childPython.stderr.on('data',(data)=>{
        console.log("stderr : ", data.toString() );
    })
    
    childPython.on('close',(code)=>{
        // console.log("Child process exited with code: ", code);
        if(code == 0){
            return res.status(200).send("Successfully sent.")
        }
        res.status(400).send("Found some problems.")
    })
})


app.listen(PORT,()=>{
    console.log("Server listening at ", PORT);
})