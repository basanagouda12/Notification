const express = require('express');


const app =express();
app.use(express.json());
app.use(express.urlencoded({
    extended:'true'
}));

const date = require('./router/router')
app.use('/',date);

const Rdate =require('./modules/datemodel');


app.listen(process.env.PORT || 9000, function() {
    console.log("server started at port 9000");
});