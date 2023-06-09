const express = require('express');
const https = require('https');
const app = express();
const port = 3000;

const bodyParser = require('body-parser');
const { dirname } = require('path');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));


app.get('/', (req, res)=>{
    res.sendFile(__dirname + "/signup.html");
})


app.post("/", (req, res)=>{

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;
    
    const data ={
        members: [
            {
                email_address: email,
                status : "subscribed",
                merge_fields : {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);

    const url = "https://us21.api.mailchimp.com/3.0/lists/a89df2e04a"
    const option = {
        method: "POST",
        auth : "anurag:4a908efa89663dfd90757f3addf66d2f-us21"
    }
    const request = https.request(url, option, (response)=>{

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", (data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData);
    request.end();
})

app.post("/failure", (req, res)=>{
    res.redirect("/");
})

app.listen( port , ()=>{
    console.log("Listening on port " + port);
})



//mailchimp api
// 4a908efa89663dfd90757f3addf66d2f-us21

//list/ audience id
// a89df2e04a