/*jshint node:true*/

// app.js
// This file contains the server side JavaScript code for your application.
// This sample application uses express as web application framework (http://expressjs.com/),
// and jade as template engine (http://jade-lang.com/).

var express = require('express');

// setup middleware
var app = express();
var fs = require('fs');
app.use(app.router);
app.use(express.errorHandler());
app.use(express.static(__dirname + '/public')); //setup static public directory
app.set('view engine', 'jade');
app.set('views', __dirname + '/views'); //optional since express defaults to CWD/views

// render index page
app.get('/', function(req, res){
	res.render('index');
});

// There are many useful environment variables available in process.env.
// VCAP_APPLICATION contains useful information about a deployed application.
var appInfo = JSON.parse(process.env.VCAP_APPLICATION || "{}");
// TODO: Get application information and use it in your app.

// VCAP_SERVICES contains all the credentials of services bound to
// this application. For details of its content, please refer to
// the document or sample of each service.
var services = JSON.parse(process.env.VCAP_SERVICES || "{}");
// TODO: Get service credentials and communicate with bluemix services.

// The IP address of the Cloud Foundry DEA (Droplet Execution Agent) that hosts this application:
var host = (process.env.VCAP_APP_HOST || 'localhost');
// The port on the DEA for communication with the application:
var port = (process.env.VCAP_APP_PORT || 3000);

var create_datapoint = function(req, res) { 
    console.log("Recording a datapoint");
    require('mongodb').connect(services.timeseriesdatabase[0].credentials.json_url, function(err, conn) {

            if (err) { res.write(err.stack); }
            console.log("Extracting values");

            var collection = conn.collection('ts_data_v');
            var parsedUrl = require('url').parse(req.url, true);
            var queryObject = parsedUrl.query;
            var name = (queryObject["name"] || 'lounge');
            var temppoint = parseFloat((queryObject["temp"] || 0));

            var tsdate = new Date();

            var datestring = tsdate.getUTCFullYear() + '-';

            if (parseInt(tsdate.getUTCMonth() + 1) < 10) {
                datestring = datestring + '0' + (tsdate.getUTCMonth()+1) + '-';
            }
            else {
                datestring = datestring + (tsdate.getUTCMonth()+1) + '-';
            }

            if (parseInt(tsdate.getUTCDate()) < 10) {
                datestring = datestring + '0' + tsdate.getUTCDate() + ' ';
            }
            else {
                datestring = datestring + tsdate.getUTCDate() + ' ';
            }

            if (parseInt(tsdate.getUTCHours()) < 10) {
                datestring = datestring + '0' + tsdate.getUTCHours() + ':';
            }
            else {
                datestring = datestring + tsdate.getUTCHours() + ':';
            }
             
            if (parseInt(tsdate.getUTCMinutes()) < 10) {
                datestring = datestring + '0' + tsdate.getUTCMinutes() + ':';
            }
            else {
                datestring = datestring + tsdate.getUTCMinutes() + ':';
            }

            if (parseInt(tsdate.getUTCSeconds()) < 10) {
                datestring = datestring + '0' + tsdate.getUTCSeconds() + ':00000';
            }
            else {
                datestring = datestring + tsdate.getUTCSeconds() + ':00000';
            }
            
            console.log(datestring);

            var message = { 'loc_esi_id': name, 'measure_unit' : 'C', 'direction' : 'P', 'value': temppoint, 'tstamp': datestring};
            console.log("Constructed record");
            console.log(JSON.stringify(message));

            collection.insert(message, {safe:true}, function(err){
                    if (err) { console.log(err.stack); }
                    res.write(JSON.stringify(message));
                });
        });
    res.end();
};

var list_datapoint = function(req, res) { 
    var parsedUrl = require('url').parse(req.url, true);
    var queryObject = parsedUrl.query;
    var name = (queryObject["name"] || 'lounge');

    res.writeHead(200, {'Content-Type': 'text/plain'});

    require('mongodb').connect(services.timeseriesdatabase[0].credentials.json_url, function(err, conn) {
            var collection = conn.collection('ts_data_v');
            res.write("Reading from collection ts_data_v");
            collection.find({"loc_esi_id":"lounge"}, {limit:100, sort:[['loc_esi_id','ascending'],['tstamp','ascending']]}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                            if (err) { res.write(err.stack); }
                            for (i=0; i < items.length; i++) {
                                res.write(JSON.stringify(items[i]) + "\n");
                            }
                            res.end();
                        });
                });
        });
};

var list_time_datapoint = function(req, res) { 
    var parsedUrl = require('url').parse(req.url, true);
    var queryObject = parsedUrl.query;
    var name = (queryObject["name"] || 'lounge');

    res.writeHead(200, {'Content-Type': 'text/plain'});

    require('mongodb').connect(services.timeseriesdatabase[0].credentials.json_url, function(err, conn) {
            var collection = conn.collection('ts_data_v');
            collection.find({"loc_esi_id":"lounge"}, {limit:100, sort:[['tstamp','descending']]}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                            if (err) { res.write(err.stack); }
                            for (i=0; i < items.length; i++) {
                                res.write(JSON.stringify(items[i]) + "\n");
                            }
                            res.end();
                        });
                });
        });
};

var graph_datapoints = function(req, res) { 
    var parsedUrl = require('url').parse(req.url, true);
    var queryObject = parsedUrl.query;
    var name = (queryObject["name"] || 'lounge');

    res.writeHead(200, {'Content-Type': 'application/json'});

    require('mongodb').connect(services.timeseriesdatabase[0].credentials.json_url, function(err, conn) {
            var collection = conn.collection('ts_data_v');
            var dataseries = new Array();
            
            collection.find({"loc_esi_id": name}, {limit:100, sort:[['tstamp','descending']]}, function(err, cursor) {
                    cursor.toArray(function(err, items) {
                            if (err) { res.write(err.stack); }
                            for (i=0; i < items.length; i++) {
                                timeint = (new Date(items[i].tstamp).getTime())/1000;
                                dataseries.push([timeint,items[i].value]);
                                console.log(JSON.stringify(dataseries));
                            }
                            console.log("Final: " + JSON.stringify(dataseries));
                            res.write(JSON.stringify(dataseries));
                            res.end();
                        });
                });
        });
}

var delete_data = function(req, res) { 

    res.writeHead(200, {'Content-Type': 'text/plain'});

    require('mongodb').connect(services.timeseriesdatabase[0].credentials.json_url, function(err, conn) {
            var collection = conn.collection('ts_data_v');
            collection.remove({"measure_unit":"KWH"}, {}, function(err, results) {
                            if (err) { res.write(err.stack); }
                            res.write("Data reset");
                });
        });
    res.end();
};

var graph_view = function(req, res) { 
    fs.readFile('./public/graph.html', function(err, data) {
            res.end(data);
        });
}

var graph_view_old = function(req, res) { 
    fs.readFile('./public/graphold.html', function(err, data) {
            res.end(data);
        });
}

var show_speed = function(req, res) { 
    fs.readFile('./public/speedometer.html', function(err, data) {
            res.end(data);
        });
}

var my_dash = function(req, res) { 
    fs.readFile('./public/myEZdash.html', function(err, data) {
            res.end(data);
        });
}

app.get("/reading", function (req, res) { 
        create_datapoint(req,res);
    });

app.get("/dumplist", function (req, res) { 
        list_datapoint(req,res);
    });

app.get("/dumplisttime", function (req, res) { 
        list_time_datapoint(req,res);
    });

app.get("/reset", function (req, res) { 
        delete_data(req,res);
    });

app.get("/graphpoints", function (req, res) { 
        graph_datapoints(req,res);
    });

app.get("/graph", function (req, res) { 
        graph_view(req,res);
    });

app.get("/graphold", function (req, res) { 
        graph_view_old(req,res);
    });

app.get("/showspeed", function (req, res) { 
        show_speed(req,res);
    });

app.get("/showdash", function (req, res) { 
        my_dash(req,res);
    });

// Start server
app.listen(port, host);
console.log('App started on port ' + port);

