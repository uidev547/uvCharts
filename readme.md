## uv
uv is a project inspired by [AuroraViz](https://github.com/Imaginea/AuroraViz "AuroraViz"), another Imaginea Open Source initiative. uv currently contains 2 modules which can be used independently of the other and will be a web application which forges the 2 modules together. 

The modules themselves are:

- uvCharts
- uvData

### uvCharts
uvCharts is a JavaScript charting library which uses [d3](http://mbostock.github.com/d3/ "d3") underneath to build most of the basic charts. uvCharts will itself be available with 2 options, with (planned, development yet to begin) or without the interface. Charts supported at the current moment are:

- Bar Charts
	+ Normal Bar Chart
	+ Stacked Bar Chart
	+ Step Up Bar Chart

- Area Charts
	+ Normal Area Chart
	+ Stacked Area Chart

- Donut Charts
	+ Pie Chart
	+ Normal Chart

- Line Chart

- Waterfall Chart

All charts can be shown either in horizontal or vertical orientation.

To learn more about uvCharts and how to use it, read the [wiki](http://www.github.com/hashd/uv/wiki/uvCharts) page.

#### Features
- Easy to learn and use
- Configurable
- Cool transitions and effects

### To be implemented
- uvCharts interface to configure and modify the chart in real time (under development)

### uvData
uvData is a JavaScript based data manipulation library which acts on a ist of JSON Object (A list of Tuples). It is still work in progress and can be used to do complex operations on data.

Together with uvCharts, it will provide enough options to play around with data and visualize it in whichever way you would like to have it.
