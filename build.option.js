/**
 * 
release mode
 * @type {number}
 * MODE=0：Development Mode/Packaging and Publishing to Server
 * MODE=1：Packaged as electron source files
 */
let MODE = 0;

module.exports = {
	//The interface domain name is a relative path or an absolute path (please set it to true when it is used to build electron）
	absoluteURL: MODE,
	// publicPath: MODE ? '' : 'http://119.29.148.154/Server/build/static/'
	publicPath: MODE ? "" : "",
};
