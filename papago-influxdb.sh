#!/bin/bash
# papago inlfuxdb proxy service startup script

# the script directory
CUR_DIR="/home/tomas/develop/homeautom/papago-influxdb"

# get the proxy's pid 
pid=$(ps ax | grep -v "grep" | grep "papago-influxdb.js" | head -1 | awk '{print $1}')

# kill if running and if the restart was requested
if [ "$1" = "restart" ]; then
	if [ "$pid" != "" ]; then 
		echo "The pid is $pid, the service will be restarted."
		kill $pid 
		pid="" 
	fi
fi

# start the proxy service if not running
if [ "$pid" = "" ]; then
	/usr/bin/nodejs $CUR_DIR/papago-influxdb.js >$CUR_DIR/papago-influxdb.out 2>&1 &
fi
