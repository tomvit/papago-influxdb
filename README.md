# Papago InfluxDB Writer
Papago[https://www.papouch.com/cz/shop/product/papago-th-2di-do-eth/] is a monitoring module that can be used to capture readings from devices with pulse outputs such as electrometers. 
Papago can be configured to push measurements by using HTTP GET to an external system. Papago-influxdb serivce implements the interface to accept such GET requests and writes the data to InfluxDB[https://www.influxdata.com/time-series-platform/], a time-series database. 

The data from InfluxDB then can be displayed on a dashboard such as the one provided by InfluxDB or Grafana[https://grafana.com/]. 
