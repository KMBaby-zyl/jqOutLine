// jqOutLine
// Originall author: @KMBaby-zyl
// Licensed under the MIT license
;(function($,window,document,undefined){

var pluginName = "jqOutLine",
	defaults = {
		isOut: true,
		gapwidth:2,
		width: 0,
		height: 0,
		color: "red",
		offsetX: 0,
		offsetY: 0,
		times: 3
	};

function jqOutLine(element, options){
	this.element = element;
	this.options = $.extend({},defaults,options);

	this._defaults = defaults;
	this._name = pluginName;

	this.init();
};

jqOutLine.prototype.init = function(){
	// 初始化
	if(this.options.isOut){
		this.offsetX = $(this.element).offset().left-this.options.gapwidth;
		this.offsetY = $(this.element).offset().top-this.options.gapwidth;
		this.width = $(this.element).width();
		this.height = $(this.element).height();
	}else{
		this.offsetX = $(this.element).offset().left;
		this.offsetY = $(this.element).offset().top;
		this.width = $(this.element).width()-2*this.options.gapwidth;
		this.height = $(this.element).height()-2*this.options.gapwidth;
	}

	this.render();
};

jqOutLine.prototype.render = function(){
	var outlineEm = $('<div class="jqOutLine"></div>');

	outlineEm.css({
		position: "absolute",
		border: this.options.gapwidth+"px solid "+this.options.color,
		width: this.width,
		height: this.height,
		top: this.offsetY,
		left: this.offsetX
	});
	$("body").append(outlineEm);
	var times = this.options.times;
	var isShow = true;
	var blinkInterval = setInterval(function(){
		if(times == 0){
			clearTimeout(blinkInterval);
			outlineEm.remove();
			return;
		}
		if(isShow){
			outlineEm.hide();
			times--;
			isShow = !isShow;
		}else{
			outlineEm.show();
			isShow = !isShow;
		}
	},200);
};

$.fn[pluginName] = function (options){
	return new jqOutLine(this,options);
};

})(jQuery, window, document);

// example 
// $("#elem").jqOutLine({
// 	key: "value"
// });