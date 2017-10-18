# Papago InfluxDB Writer
[Papago](https://www.papouch.com/cz/shop/product/papago-th-2di-do-eth/) is a monitoring module that can be used to capture readings from devices with pulse outputs such as electrometers. Papago can be configured to push measurements by using HTTP GET to an external system. 

Papago-influxdb serivce implements the interface to accept such GET requests and writes the data to [InfluxDB](https://www.influxdata.com/time-series-platform/), an open-source time-series database. The data from InfluxDB can then be displayed on a dashboard such as [Grafana](https://grafana.com/). 

The below is a sample chart from Grafana displaying measurements from InfluxDB. 

![Grafana Papago Chart](https://github.com/tomvit/papago-influxdb/raw/master/bin/Grafana-chart-sample.png "Grafana Chart Sample")
