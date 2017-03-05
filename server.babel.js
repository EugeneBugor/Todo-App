const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

const TASKS_FILE = path.join(__dirname, 'tasks.json');

import {writeFile} from './middlewares/write-file'
import config from './config/index';

app.set('port', (process.env.PORT || config.port));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//initialization for webpack configuration
(function initWebpack() {
    const webpack = require('webpack');
    const webpackConfig = require('./webpack.config.js');
    const compiler = webpack(webpackConfig);

    app.use(require('webpack-dev-middleware')(compiler, {
        noInfo: true, publicPath: webpackConfig.output.path
    }));

    app.use(require('webpack-hot-middleware')(compiler, {
        log: console.log, path: '/__webpack_hmr', heartbeat: 10 * 1000
    }));

    app.use(express.static(__dirname + '/public'));
})();

//get all tasks
app.get('/tasks', function (req, res) {
    fs.readFile(TASKS_FILE, function (err, data) {
        if (err) console.error(err);
        res.json(JSON.parse(data));
    });
});

//get the task
app.get('/get/:taskId', function (req, res) {
    const _id = req.params.taskId;
    fs.readFile(TASKS_FILE, function (err, data) {
        if (err) console.error(err);

        let tasks = JSON.parse(data);
        const updating_task = tasks.filter(task => task.id == _id);
        res.json(updating_task);
    });
});

//add a new task
app.post('/create-task', function (req, res) {
    const { text } = req.body;
    const id = Date.now();
    const new_task = {
        id: id,
        text: text
    };

    fs.readFile(TASKS_FILE, function(err, data) {
        if (err) console.error(err);
        let tasks = JSON.parse(data);
        tasks.push(new_task);

        writeFile(TASKS_FILE, tasks, res);
    });
});

//update the task
app.put('/update/:taskId', function(req, res) {
    const _id = req.params.taskId;
    const new_text = req.body.text;

    fs.readFile(TASKS_FILE, function(err, data) {
        if (err) console.error(err);

        let tasks = JSON.parse(data);
        tasks = tasks.map(task => {
            if (task.id == _id) {
                task.text = new_text;
            }
            return task;
        });

        writeFile(TASKS_FILE, tasks, res);
    })
});

//delete the task
app.delete('/delete/:taskId', function(req, res) {
    const _id = req.params.taskId;
    fs.readFile(TASKS_FILE, function (err, data) {
        if (err) console.error(err);

        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => {
            return task.id != _id;
        });

        writeFile(TASKS_FILE, tasks, res);
    });
});

app.listen(app.get('port'), function () {
    console.log(`Server started on ${config.url}`);
});