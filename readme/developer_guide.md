### uvCharts Developer Guide
We're glad that you have an interest to contribute to this growing library. Let us guide you through setting up the work environment, understanding the code base, coding standards and steps to raise pull requests.

#### Setting Up the Development Environment
Before you begin development you'll need to setup the following requirements:

- node.js
- grunt
- d3.js
- a JavaScript IDE (any text editor should do)
- (not yet) bower

------
+ Ensure that you have node.js > 0.10.0 installed along with grunt > 0.4.
+ Fork the repository at http://www.github.com/imaginea/uvCharts to your github account
+ Download the codebase of uvCharts onto your local system by using the following command
	```git clone your_fork local_path```
+ Once the codebase is downloaded, on your terminal at local_path_to_code execute the following commands 
	``` npm install ``` to install all dependencies.
+ Execute ```grunt && grunt watch``` to see uvCharts.js and uvCharts.min.js being built from raw sources present in the ```src``` folder.

#### Understanding the code base
We have quite a few first level folders inside the code base each serving a specific purpose.

- **dist** : distribution ready files are present here, these are not committed until deemed release ready
- **build** : interim library files are built and place here to be tested by the developer, these files are referenced in the test files
- **src** : all src files are present within this folder
- **test** : all test related stuff goes in this folder
- **readme** : any intra code documentation are committed here
- **lib** : any dependencies for the library are committed here

#### Going knee deep in ```src```

#### Coding Standards
We try to follow the coding conventions mentioned by Douglas Crockford [here](http://javascript.crockford.com/code.html)

#### Pull Requests
Feel free to raise a pull request when you think your changes/commits are good enough to be merged with the main library at Imaginea repo. The code will be reviewed by at least 2 of us here before being merged and we'll get back to you if your pull request needs any further changes.

Once merged we'll list you in the list of contributors to our library.
 
