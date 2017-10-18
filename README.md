# Papago InfluxDB Writer
Papago is a monitoring module that can be used to capture readings from devices with impulse outputs such as electrometers. 
Papago pushes the measurements by using HTTP GET to an external system. This serivce implements the interface to accept such GET requests 
and writes them to InfluxDB, a time-series database. 

The data from InfluxDB then can be displayed on a dashboard such as the one provided by InfluxDB or Grafana. The below screenshot shows 
the electrometer readings in Grafana. 


