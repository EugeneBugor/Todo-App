var fs = require('fs'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express();

var TASKS_FILE = path.join(__dirname, 'tasks.json');

app.set('port', (process.env.PORT || 3000));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

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

app.get('/tasks', function (req, res) {
    fs.readFile(TASKS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        res.json(JSON.parse(data));
    });
});

app.post('/tasks', function (req, res) {
    fs.readFile(TASKS_FILE, function (err, data) {
        if (err) {
            console.error(err);
            process.exit(1);
        }
        var tasks = JSON.parse(data);
        if (!req.body.text && !req.body.closeAll) {
            tasks.forEach(function (item) {
                for (var key in item) {
                    if (item.id == req.body.id) {
                        item.close = true;
                    }
                }
            })
        } else if (req.body.closeAll) {
            tasks.forEach(function (item) {
                for (var key in item) {
                    item.close = true;
                }
            })
        } else if (req.body.redact) {
            tasks.forEach(function (item) {
                for (var key in item) {
                    if (item.id == req.body.id) {
                        item.text = req.body.text;
                    }
                }
            })
        } else {
            var newTask = {
                id: req.body.id,
                text: req.body.text,
                close: false
            };
            tasks.push(newTask);
        }
        fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 4), function (err) {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            res.json(tasks);
        });
    });
});

app.listen(app.get('port'), function () {
    console.log('Server started: http://localhost:' + app.get('port') + '/');
});