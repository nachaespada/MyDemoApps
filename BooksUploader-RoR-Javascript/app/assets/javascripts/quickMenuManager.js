/**
 * Quick Menu Manager
 * @author Ezequiel Calvo <ezequeil.calvo@globant.com>
 *-----------------------------------------------------------------------------*/

var QuickMenuManager = function() {
	'use strict';
	var optionsMap = [];

	var showUploadMenu = function (path){
		$('.quickButtonsWrapper').css('visibility','hidden');
		$('.libraryTop').load(path, function(){ UploadManager.events();});
	};

	var showSearchMenu = function (path){
		$('.quickButtonsWrapper').css('backgroud','#FFF');
		$('.libraryTop').load(path, function(){SearchManager.events();});
	};

	var showProfileMenud = function (path){
		$('.quickButtonsWrapper').css('backgroud','black');
	};

	var showFavoritesMenu = function (path){
		$('.quickButtonsWrapper').css('backgroud','blue');
	};

	//Handlers
	var quickButtonClick = function(){
		$('.quickButton').on('click',function(){
			var id = $(this).attr('id');
			var path = $(this).attr('data-load');
			optionsMap[id](path);
		});
	};

	var init = function(){
		optionsMap.search = showSearchMenu;
		optionsMap.upload = showUploadMenu;
		optionsMap.favorites = showFavoritesMenu;

		quickButtonClick();
	};

	return {
		init:init
	};
}();

