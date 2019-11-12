#!/usr/bin/node

const express = require('express'),
      app = express(),
      fs = require('fs'),
      cookieParser = require('cookie-parser'),
      bodyParser = require('body-parser');
var chapterList = JSON.parse(fs.readFileSync('./data.json','utf8'));
app.set('view engine','ejs');

app.use(express.static('public'));//给public目录下面的文件提供静态web服务
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/login',function(req,res){
    res.render('login')
})
app.post('/login',function(req,res){
    if(req.body.username === chapterList.users[0].username && req.body.pwd === chapterList.users[0].password){
        res.cookie('username','zhangsan',{maxAge:600000});
        res.cookie('password','123456',{maxAge:600000});
        res.statusCode=200;
        res.send('OK')
    }else{
        res.statusCode=404;
        res.send('NO')
    }
    
})
app.get('/listmanager',function(req,res){
    res.render('list',{data:chapterList.chapterList})
})

app.listen('8080')