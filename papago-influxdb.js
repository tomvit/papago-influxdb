/**
 * Papago influx db proxy service, converts Papago GET requests to influx DB POST.
 * This service also converts counter values from papago to kwh assuming the values 
 * are impulses readings from electrometers.
 * 
 * (c) 2017 Tomas Vitvar, tomas@vitvar.com
 */

'use strict';

var express = require('express');
var url = require('url');
var request = require('request');

// proxy service config 
var PORT = 9980;
var VERSION = 'v0.1';

// electrometers data (the order of electrometers should be the same as the order used in Papago)
// The properties are:
// 	name    - name of the electrometer that is used as a tag in influxdb measurements records
//	kwhimp  - number of impulses for 1 kwh; this is defined by the electrometer
//	kwhbase - number of kwh that correspond to a value of 0 for papago counter
//		  when you reset the counter in papago, you should change this value
//		  to actual value of kwh in electrometer
var METERS = [
	{ name : "kotel",  kwhimp: 800,  kwhbase: 490.40 },
	{ name : "boiler", kwhimp: 1000, kwhbase: 190.01 },
	{ name : "rack",   kwhimp: 1000, kwhbase: 200.80 },
];

// influx db config where the data is stored
var INFLUXDBURL = 'http://localhost:8086'
var INFLUXDB = 'homeautom'

// converts impulses to KWh
function imp2kwh(n, imp) {
    return ((METERS[n-1].kwhbase*METERS[n-1].kwhimp)+parseFloat(imp))/METERS[n-1].kwhimp;
}

// Create Express App
var app = express();

// get endpoint; this should be configred in papago to send GET requests to
app.get('/papago/writedata', 
	function(req, res) {
		var query = url.parse(req.url, true).query;

		// parse the data and time; this is milliseconds
		var d = new Date(query.date_time);

		// create measurements in influxdb format
		// convert milliseconds to seconds
		var data = "papago_rzv,device=" + METERS[0].name + " value=" + imp2kwh(1, query.in1_raw) + " " + parseInt(d.getTime()/1000) + "\n" +
			   "papago_rzv,device=" + METERS[1].name + " value=" + imp2kwh(2, query.in2_raw) + " " + parseInt(d.getTime()/1000) + "\n" +
		 	   "papago_rzv,device=" + METERS[2].name + " value=" + imp2kwh(3, query.in3_raw) + " " + parseInt(d.getTime()/1000);

		// post the data; set precision to seconds
		request.post({
				url: INFLUXDBURL + "/write?db=" + INFLUXDB + "&precision=s", 
				body: data
			},  
			
    			function (error, res2, body) {
				// send OK back to papago when all record are successfully created in influxdb
        			if (!error && res2.statusCode === 204) {
            				res.sendStatus(200);
				} else {
					// log the error and send back internal server error
					// papago should retry this
					console.log("[" + new Date() + "]: Error: " + res2.statusCode + ", " + res2.body);
					res.sendStatus(500);
				}
        		}
    		);
	}); 

// start listening
app.listen(PORT);

console.log('Papago influxdb service %s', VERSION);
console.log('[' + new Date() + ']: Express.js running at http://localhost:%d', PORT);
