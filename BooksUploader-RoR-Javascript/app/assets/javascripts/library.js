/**
 * Library Module
 * @author Ignacio Leitao <ignacio.leitao@globant.com>
 *-----------------------------------------------------------------------------*/

(function() {
  //'use strict';
  // the cached instance
  var instance;
  // wrap the constructor and the instance in an immediate function
  Library = function Library() {
  	if (instance) {
  		return instance;
  	}
  	instance = this;
  	// functionality here
    this.uploadBook();

    //this.downloadBook();
	};

  uploadBook = function() {
    alert("library will upload a book");
  }

})();
