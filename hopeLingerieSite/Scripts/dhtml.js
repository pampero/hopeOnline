
/**************************************
 * UTIL FUNCTIONS
 **************************************/
//{
//{ TEMP INIT CLASS 
/**
	Init. Executes function(s) on the page load.
	
	@author Marcelo Miranda Carneiro
	@version 20:08 15/1/2008
	@example
		<code>
			FunctionUtil.getName(FUNCTION_NAME);
		</code>
*/
var Init = {
	_functionLoadLst: [],
	_functionOnLoadLst: [],
	add: function($fnc){
		if(typeof($fnc) != 'function')
			return false;
		this._functionLoadLst[this._functionLoadLst.length] = $fnc;
		return true;
	},
	addOnLoad: function($fnc){
		if(typeof($fnc) != 'function')
			return false;
		this._functionOnLoadLst[this._functionOnLoadLst.length] = $fnc;
		return true;
	},
	run: function(){
		var _this = this;
		EventUtil.add(window,'load',function(){
			for(var i=0; i<_this._functionOnLoadLst.length; i++)
				_this._functionOnLoadLst[i]();
		});
		for(var i=0; i<this._functionLoadLst.length; i++)
			this._functionLoadLst[i]();
	}
};
//}
/**
	FunctionUtil. Utilities involving functions.
	
	@author Marcelo Miranda Carneiro
	@version 10:02 8/1/2008
	@example
		<code>
			FunctionUtil.getName(FUNCTION_NAME);
		</code>
*/
//{
var FunctionUtil = {
	_fncName:'',
	/**
		FunctionUtil.getName. Get name of the function.
		
		@param $fnc:Function
		@return String or False in case of error.
	*/
	getName:function($fnc){
		if(typeof($fnc) != 'function'){
			return false;
		}else{
			this._fncName = $fnc.toString().replace(/\n/g,'');
			var slicePos = [];
			slicePos[0] = this._fncName.indexOf('function')+('function'.length);
			slicePos[1] = this._fncName.indexOf('()');
			this._fncName = this._fncName.slice(slicePos[0],slicePos[1]).replace(/ /,'');
			return this._fncName == '' ? false : this._fncName;
		}
	}
};
//}
/**
	EventUtil. Add, remove and list events to Node Objects.
	
	@author Marcelo Miranda Carneiro
	@version 10:02 8/1/2008
	@example
		<code>
			EventUtil.add(NODE, 'click', function(event){
				alert('hello carneiro!');
			})
		</code>
*/
//{
var EventUtil = {
	_listCounter: 0,
	_evtCounter: 0,
	_eventList:{},
	/**
		EventUtil.add. Add an event listener to a node object.
		
		@param $elm:Node - Node Object that will receive the event
		@param $evt:String - Name of the event without "on". Ex.: "click" instead of "onclick".
		@param $fnc:Function - Function that will be applied.
		@param $name:String - In case of anonym functions, a name for identification.
		@param $capture:Boolean - useCapture (don't affect Internet Explorer 6).
		@return Boolean
	*/
	add: function($elm, $evt, $fnc, $name, $capture){
		
		this.remove($elm, $evt, $fnc);
		
		if(!this._eventList[$elm])
			this._eventList[$elm] = {};
		if(!this._eventList[$elm][$evt])
			this._eventList[$elm][$evt] = {};
		
		if(!$name){
			if(FunctionUtil.getName($fnc)){
				$name = FunctionUtil.getName($fnc);
			}else{
				$name = 'anonymous_'+this._evtCounter;
				this._evtCounter++;
			}
		}
		
		this._eventList[$elm].node = $elm;
		this._eventList[$elm].className = $elm.className;
		this._eventList[$elm].id = $elm.id;
		this._eventList[$elm].nodeName = $elm.nodeName;

		var evt = this._eventList[$elm][$evt];
		evt[$name] = $fnc;
		
		if($elm.addEventListener){
			$elm.addEventListener($evt, evt[$name], $capture);
			return true;
		}else if($elm.attachEvent){
			$elm.attachEvent("on" + $evt, evt[$name]);
			return true;
		}
		return false;
	},
	/**
		EventUtil.remove. Remove an event listener previously added with EventUtil Class.
		
		@param $elm:Node - Node Object that will receive the event
		@param $evt:String - Name of the event without "on". Ex.: "click" instead of "onclick".
		@param $fnc:String - Name of the function.
		@return Boolean
	*/
	remove: function($elm, $evt, $fnc){
		var fnc = typeof($fnc) == 'function' ? $fnc : this._eventList[$elm][$evt][$fnc];
		if($elm.removeEventListener){
			$elm.removeEventListener($evt, fnc, false);
			return true;
		}else if($elm.detachEvent){
			$elm.detachEvent("on" + $evt, fnc);
			return true;
		}
		return false;
	},
	/**
		EventUtil.clear. Remove all event listeners previously added with EventUtil Class.
		
		@param $elm:Node - Node Object that will receive the event
		@param $evt:String - Name of the event without "on". Ex.: "click" instead of "onclick".
		@return Boolean
	*/
	clear: function($elm, $evt){
		if(this._eventList[$elm])
			for(var i in this._eventList[$elm][$evt]){
				this.remove($elm, $evt, this._eventList[$elm][$evt][i]);
			}
	},
	/**
		EventUtil.list. List and mark all the events added usind EventUtil Class.
		
		@param $elm:Node - Node Object that will receive the event
		@param $evt:String - Name of the event without "on". Ex.: "click" instead of "onclick".
		@return Boolean
		
		FIX THIS METHOD
	*/
	list: function($elm, $debugNode){
		if($elm){
			var msg = '';
			msg += '<b>--- Element ' + this._eventList[$elm].node + '(' + this._listCounter + ')' + ' Events ---</b> <br />';
			msg+= 'Node: ' + this._eventList[$elm].node + ' | id: ' + this._eventList[$elm].id + ' | class: ' + this._eventList[$elm].className + ' | nodeName: ' + this._eventList[$elm].nodeName + '<br />';
			msg += '--- <br />';
			for(var j in this._eventList[$elm]){
				if(j != 'className' && j != 'id' && j != 'nodeName' && j != 'node'){
					msg += " " + j + ": " + '<br />';
					for(var i in this._eventList[$elm][j])
						msg += " " + i + ": " + this._eventList[$elm][j][i] + '<br />';
					msg += '---<br />';
				}
			}
			if($debugNode)
				$debugNode.innerHTML += msg;

			this._eventList[$elm].node.style.backgroundColor = '#fefede';
			this._eventList[$elm].node.innerHTML += '<strong class="EventUtilMarkers" style="font-size:9px; color:#fff; background:red; padding:0 3px;">'+this._listCounter+'</strong>';
			this._listCounter++;
		}else{
			if($debugNode)
				$debugNode.innerHTML = '';
			for(var i=0; i<gClass('EventUtilMarkers').length; i++){
				delElm(gClass('EventUtilMarkers')[0]);
			}
			for(var i in this._eventList){
				EventUtil.list(i, $debugNode);
			}
			this._listCounter = 0;
		}
	}
};
//}
/**
	UrlUtil.
	@author Marcelo Miranda Carneiro
	@version 19:45 9/1/2008
	@example
		<code>
			UrlUtil.complete();
			UrlUtil.complete('http://www.mcarneiro.com.br/');
		</code>	
*/
//{
var UrlUtil = {
	_loc: document.location.href,
	/**
		UrlUtil.getObj. Get document.location object
		
		@param nothing.
		@return Object.
	*/
	getObj: function(){
		return document.location;
	},
	/**
		UrlUtil.complete. Get complete address.
		
		@param nothing.
		@return String.
	*/
	complete: function(){
		return this._loc;
	},
	/**
		UrlUtil.protocol. Get protocol: "http" in "http://www.mcarneiro.com.br/index.html"
		
		@param $url:String. Complete url.
		@return String.
	*/
	protocol: function($url){
		$url = $url || this._loc;
		return $url.slice(0,$url.indexOf('//')-1);
	},
	/**
		UrlUtil.host. Get host: "www.mcarneiro.com" in "http://www.mcarneiro.com.br/index.html"
		
		@param $url:String. Complete url.
		@return String.
	*/
	host: function($url){
		$url = $url || this._loc;
		var index1 = $url.indexOf('//')+2;
		$url = $url.slice(index1);
		return $url.slice(0,$url.indexOf('/'));
	},
	/**
		UrlUtil.completeHost. Get completeHost: "http://www.mcarneiro.com.br/" in "http://www.mcarneiro.com.br/index.html"
		
		@param $url:String. Complete url.
		@return String.
	*/
	completeHost: function($url){
		$url = $url || this._loc;
		return this.protocol($url)+'://'+this.host($url)+'/';
	},
	/**
		UrlUtil.folder. Get folder: "/folder1/folder2/" in "http://www.mcarneiro.com.br/folder1/folder2/index.html"
		
		@param $url:String. Complete url.
		@return String.
	*/
	folder: function($url){
		$url = $url || this._loc;
		$url = $url.split('/');
		var newUrl = '';
		for(var i=3; i<$url.length; i++){
			if(i!=$url.length-1){
				newUrl += $url[i]+'/';
			}
		}
		return '/'+newUrl;
	},
	/**
		UrlUtil.fileName. Get fileName: "/folder1/folder2/" in "http://www.mcarneiro.com.br/folder1/folder2/index.html"
		
		@param $url:String. Complete url.
		@return String.
	*/
	fileName: function($url){
		$url = $url || this._loc;
		var index1 = $url.indexOf('//')+2;
		$url = $url.slice(index1);
		$url = $url.slice($url.lastIndexOf('/')+1);
		if(this.query($url)){
			$url = $url.slice(0,$url.indexOf('?'));
		}else if(this.anchor($url)){
			$url = $url.slice(0,$url.indexOf('#'));
		}			
		return $url || '';
	},
	/**
		UrlUtil.query. Get querystring values: "value1=1&value2=2" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $url:String. Complete url.
		@return String. Returns false case there is no querystring.
	*/
	query: function($url){
		$url = $url || this._loc;
		$url = $url.split('?');
		return ($url.length > 1 ? $url[1].split('#')[0] : false);
	},
	/**
		UrlUtil.queryValue. Get an unique querystring value: "1" for "value1" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $name:String. Name of the querystring value.
		@param $url:String. Complete url.
		@return String. Returns false case there is no querystring value.
	*/
	queryValue: function($name,$url){
		$url = $url || this._loc;
		var query = this.query($url);
		var queries = query.split('&');
		for(var i=0; i<queries.length; i++){
			if(queries[i].split('=')[0].toLowerCase() == $name.toLowerCase()){
				return queries[i].split('=')[1];
				break;
			}
		}
		return false;
	},
	/**
		UrlUtil.anchor. Get the anchor value: "teste1" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $url:String. Complete url.
		@return String. Returns false case there is no anchor.
	*/
	anchor: function($url){
		$url = $url || this._loc;
		return ($url.split('#').length > 1) ? $url.split('#')[1] : false;
	},
	/**
		UrlUtil.noAnchor. Get full adress without anchor: "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $url:String. Complete url.
		@return String.
	*/
	noAnchor: function($url){
		$url = $url || this._loc;
		return $url.split('#')[0];
	},
	/**
		UrlUtil.noQuery. Get full adress without query: "http://www.mcarneiro.com.br/folder1/folder2/index.html#teste1" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $url:String. Complete url.
		@return String.
	*/
	noQuery: function($url){
		$url = $url || this._loc;
		return this.completeHost($url) + this.folder($url).slice(1) + this.fileName($url) + (this.anchor($url) ? '#'+this.anchor($url) : '');
	},
	/**
		UrlUtil.uri. Get full address without parameters: "http://www.mcarneiro.com.br/folder1/folder2/index.html" in "http://www.mcarneiro.com.br/folder1/folder2/index.html?value1=1&value2=2#teste1"
		
		@param $url:String. Complete url.
		@return String.
	*/
	uri: function($url){
		$url = $url || this._loc;
		return this.completeHost($url) + this.folder($url).slice(1) + this.fileName($url);
	}
};
//}
/**
	ObjectUtil.
	@author Marcelo Miranda Carneiro
	@version 18:09 18/3/2008
	@example
		<code>
			var deds = {deds:1, deds:2}
			ObjectUtil.list(deds);
		</code>	
*/
//{
var ObjectUtil = {
	list:function($obj){
		if(typeof($obj) != 'object')return false;
		for(var i in $obj)
			fb.info(i+': '+$obj[i]);
	}
};
//}
/**
	NodeUtil. Various functions for elementNodes.
	@author Marcelo Miranda Carneiro
	@version 19:53 15/1/2008
	@requires delElm, main.js v10+, trace, Type
*/
//{
var NodeUtil = {};
	NodeUtil.move = function($node,$toNode){
		var nodeToMove = null;
		var finalNode = null;
		nodeToMove = $node.cloneNode(true);
		delElm($node);
		try{
			return $toNode.appendChild(nodeToMove);
		}catch(e){
			return false;
		}
	};
	NodeUtil.getNode = function($elm){
		if(Type.node($elm)){
			return $elm;
		}else if(Type.string($elm)){
			return $($elm);
		}
		return null;
	};
//}
/**
	fb. firebug console function
	@author Marcelo Miranda Carneiro
	@version 18:10 18/3/2008
	@example
		<code>
			fb.info('deds');
		</code>	
*/
//{
var fb = {
	info:function(m){
		if(window['console']){
			console.info(m);
		}else{
			if(!$('debugWindow')){
				if(!$('debugList')){
					createElm(null,[
						'textarea',{
							id:'debugList',
							style:'position:absolute;top:0;left:0;width:20%;height:500px;overflow:auto;background:#fff;border-top:3px solid #665F53;z-index:1000;'
						}
					]);
					$('debugList').onkeypress = function($e){
						$e = $e || window.event;
						if($e.keyCode == 27)
							delElm('debugList');
					}
				}
				$('debugList').value = m+'\n__\n\n'+$('debugList').value;
			}
		}
	}
};
var trace = fb.info;
//}
/**
	String prototype functions.
	@author Marcelo Miranda Carneiro
	@version 18:11 18/3/2008
*/
//{ 
String.prototype.trim = function(){
	return this.replace(/\n/g,'').replace(/^\s+|\s+$/g,'');
};
String.prototype.justNumber = function(){
    var returnValue = '';
    for(var i = 0; i<this.length; i++)
        if(!isNaN(Number(this.slice(i,i+1))))
            returnValue+=this.slice(i,i+1);
    return Number(returnValue);
};
//}
//}

/**************************************
 * LAY OUT FUNCTIONS
 **************************************/
//{
//{ put on and off colors in the category (main) menu
function colorCatMenu(){
	if(!$('navMenu'))return false;
	var lst = gTag('ul',$('navMenu'))[0];
	var elm = lst.childNodes;
	var cnt = 0;
	for(var i=0; i<elm.length; i++){
		if(elm[i].nodeType == 1 && elm[i].className!='sep'){
			if(cnt%2!=0)
				elm[i].className += ' on';
			cnt++;
		}
	}
};
//}
//{ Set same height to 2 elements (get higher)
var SameHeight = {
	_maxHeight: 0,
	run: function($arr){
		for(var i=0;i<$arr.length;i++){
			if($arr[i].offsetHeight > this._maxHeight)
				this._maxHeight = $arr[i].offsetHeight;
			if($arr[i].offsetHeight > this._maxHeight && $arr[i].className.indexOf('iecb') < 0)
				$arr[i].style.height = (this._maxHeight - ($arr[i].offsetHeight - this._maxHeight)) + 'px';
		}
		for(var i=0;i<$arr.length;i++)
			if($arr[i].className.indexOf('iecb') < 0)
				$arr[i].style.height = this._maxHeight + 'px';
		this._maxHeight = 0;
	},
	batch: function($class,$tag){
		for(var i=0; i<gClass($class).length; i++)
			SameHeight.run(gTag($tag,gClass($class)[i]));
	}
};
//}
//{ Hide login box validation
function okLogin(){
	if($('feedLogin'))
		hDiv('feedLogin');
	return false;
}
//}
/**
	PositionUtil. Calculations about position of an object on the screen.
	@author Marcelo Miranda Carneiro
	@version 19:53 15/1/2008
	@requires nothing
*/
//{
var PositionUtil = {};
PositionUtil.getOverPosition = function($pos, $min, $max){
	if($pos <= $max && $pos >= $min){
		return $pos;
	}else{
		if($pos <= $min) return $min;
		if($pos >= $max) return $max;
	}
};
PositionUtil.isInsideArea = function($pos, $min, $max){
	if($pos <= $max && $pos >= $min)
		return true;
	return false;
};
//}
/**
	MouseOverOutDelay. Apply mouse over and out with delay to an element.
	@author Marcelo Miranda Carneiro
	@version 19:53 15/1/2008
	@requires main.js v10+
	@example
		<code>
			var deds = new MouseOverOutDelay({
				node:$('deds'),
				delay:.5,
				overFunction:function(EVENT,NODE){
					alert(123);
				},
				outFunction:function(EVENT,NODE){
					alert(456);
				}
			});
		</code>	
*/
//{
var MouseOverOutDelay = function($obj){
	var _this = this;
	try{
		var node = $obj.node;
		var overFunction = $obj.overFunction;
		var outFunction = $obj.outFunction;
		var delay = $obj.delay*1000;
	}catch(e){
		return false;
	};
	
	var _canOn = false;
	var _canOut = false;
	var overEventFunction = function($e){
		EventUtil.remove(node,'mouseover',overEventFunction);
		_canOn = true;
		setTimeout(function(){
			if(_canOn){
				_canOut = true;
				if(typeof(overFunction) == 'function')
					overFunction($e,node);
			}
		},delay);
	};
	var outEventFunction = function($e){
		EventUtil.add(node,'mouseover',overEventFunction);
		_canOn = false;
		if(_canOut){
			_canOut = false;
			setTimeout(function(){
				if(!_canOn){
					if(typeof(outFunction) == 'function')
						outFunction($e,node);
				}
			},delay);
		}
	};
	var init = function(){
		_this.removeEvents();
		_this.addEvents();
	};

	this.removeEvents = function(){
		if(typeof(overFunction) == 'function')
			EventUtil.remove(node,'mouseover',overEventFunction);
		if(typeof(outFunction) == 'function')
			EventUtil.remove(node,'mouseout',outEventFunction);
	};
	this.addEvents = function(){
		if(typeof(overFunction) == 'function')
			EventUtil.add(node,'mouseover',overEventFunction);
		if(typeof(outFunction) == 'function')
			EventUtil.add(node,'mouseout',outEventFunction);
	};
	
	/* get */
	this.getNode = function(){
		return node;
	};
	this.getOverFunction = function(){
		return overEventFunction;
	};
	this.getOutFunction = function(){
		return outEventFunction;
	};
	/* run */
	this.runOverFunction = function(){
		overEventFunction();
	};
	this.runOutFunction = function(){
		outEventFunction();
	};
	/* init */
	init();
};

/* Vai Corinthians, vai não pára de lutar! Vai torcida fiel, saravá São Jorge, ele vai nos ajudar! */

//}
/**
	Type. returns the object if typeof matches or null.
	@author Marcelo Miranda Carneiro
	@version 0.1
	@requires Nothing
	@example
		<code>
			var teste = {marcelo:1, miranda:2, carneiro:3};
			alert(Type.string(teste)); // "null"
			alert(Type.object(teste)); // "teste"
			alert(Type.node(teste)); // "null"
			alert(Type.number(teste)); // "null"
			alert(Type.number(teste.marcelo)); // "1"
		</code>	
*/
//{
var Type = {
	/**
		Type.string. returns String if typeof matches or null.
		@author Marcelo Miranda Carneiro
		@return String
	*/
	string:function($str, $defaultValue){
		$defaultValue = $defaultValue || null;
		return (typeof($str) == 'string') ? $str : $defaultValue;
	},
	/**
		Type.object. returns Object if typeof matches or null.
		@author Marcelo Miranda Carneiro
		@return Object
	*/
	object:function($obj, $defaultValue){
		$defaultValue = $defaultValue || null;
		return (typeof($obj) == 'object') ? $obj : $defaultValue;
	},
	/**
		Type.node. returns Node Object if typeof matches or null.
		@author Marcelo Miranda Carneiro
		@return Node
	*/
	node:function($node, $defaultValue){
		$defaultValue = $defaultValue || null;
		try{
			return ($node.nodeType == 1) ? $node : $defaultValue;
		}catch(e){
			return $defaultValue;
		}
	},
	/**
		Type.number. returns Number if typeof matches or null.
		@author Marcelo Miranda Carneiro
		@return Number
	*/
	number:function($num, $defaultValue){
		$defaultValue = $defaultValue || null;
		return (typeof($num) == 'number') ? $num : $defaultValue;
	},
	/**
		Type.number. returns Number if typeof matches or null.
		@author Marcelo Miranda Carneiro
		@return Number
	*/
	boolean:function($bool, $defaultValue){
		$defaultValue = $defaultValue || null;
		return (typeof($bool) == 'boolean') ? $bool : $defaultValue;
	}
};
//}
/**
	SubMenu. Create floated submenu itens.
	@author Marcelo Miranda Carneiro
	@version 19:53 15/1/2008
	@requires NodeUtil, MouseOverOutDelay, createElm
*/
//{
var SubMenu = function($obj){
	var _this = this;
	var delay = $obj.delay || .25;
	var zindex = $obj.zIndex || 5;
	var position = {};
	try{
		var linkNode = $obj.linkNode;
		var subMenuNode = $obj.subMenuNode;
		var onClassName = $obj.onClassName;
		position.reference = $obj.position ? $obj.position.reference : linkNode;
		if($obj.position){
			position.left = $obj.position.left || 0;
			position.top = $obj.position.top || 0;
		}
		var mouseOverFunction = $obj.mouseOverFunction;
		var mouseOutFunction = $obj.mouseOutFunction;
	}catch(e){
		return false;
	};
	var mouseEventDelay = null;
	var insideLink = {
		x:false,
		y:false
	};
	var insideSubMenu = {
		x:false,
		y:false,
		value:false,
		canGoOut:true
	};
	var pos = {
		mouseX:0,
		mouseY:0,
		linkNode:{
			minX:0,
			maxX:0,
			minY:0,
			maxY:0
		},
		subMenuNode:{
			minX:0,
			maxX:0,
			minY:0,
			maxY:0
		}
	};
	var noClickBg = null;
	
	var _isHidden = false;
	var hideCombos = function(){
		if(_isHidden)return;
		var combos = gTag('select',$('contMain'));
		if(is.ie6){
			for(var i=0; i<combos.length; i++){
				combos[i].style.visibility = 'hidden';
			}
		}
	};
	var showCombos = function(){
		if(!_isHidden)return;
		var combos = gTag('select',$('contMain'));
		if(is.ie6){
			for(var i=0; i<combos.length; i++){
				combos[i].style.visibility = 'visible';
			}
		}
	};
	
	// copy node to body
	var moveNodeToBody = function(){
		subMenuNode = NodeUtil.move(subMenuNode,document.body);
		subMenuNode.className = onClassName;
	};
	// over & out function
	var overLinkFunction = function(){
		
		hideCombos();
		
		var left = (position.reference ? (getPos(position.reference)[0]+position.left) : position.left);
		var top = (position.reference ? (getPos(position.reference)[1]+position.top) : position.top);

		if(!subMenuNode.style.visibility)
			subMenuNode.style.visibility = 'hidden';
		sDiv(subMenuNode);

		subMenuNode.style.position = 'absolute';
		subMenuNode.style.zIndex = zindex;
		subMenuNode.style.left = PositionUtil.getOverPosition(left,0,winW()-subMenuNode.offsetWidth-20)+'px';
		subMenuNode.style.top = PositionUtil.getOverPosition(top,0,winH()-subMenuNode.offsetHeight-20)+'px';
		subMenuNode.style.visibility = 'visible';
		
		if(typeof(mouseOverFunction) == 'function')
			mouseOverFunction();
		
		EventUtil.remove(document,'mousemove',subMenuFunction);
		EventUtil.add(document,'mousemove',subMenuFunction);
	};
	var subMenuFunction = function($e){
		pos.mouseX = $e.clientX+gTag('html')[0].scrollLeft;
		pos.mouseY = $e.clientY+gTag('html')[0].scrollTop;
		pos.linkNode.minX = getPos(linkNode)[0];
		pos.linkNode.minY = getPos(linkNode)[1];
		pos.linkNode.maxX = pos.linkNode.minX+position.reference.offsetWidth;
		pos.linkNode.maxY = pos.linkNode.minY+position.reference.offsetHeight;
		pos.subMenuNode.minX = getPos(subMenuNode)[0];
		pos.subMenuNode.minY = getPos(subMenuNode)[1];
		pos.subMenuNode.maxX = pos.subMenuNode.minX+subMenuNode.offsetWidth;
		pos.subMenuNode.maxY = pos.subMenuNode.minY+subMenuNode.offsetHeight;
		
		insideLink.x = PositionUtil.isInsideArea(pos.mouseX,pos.linkNode.minX,pos.linkNode.maxX);
		insideLink.y = PositionUtil.isInsideArea(pos.mouseY,pos.linkNode.minY,pos.linkNode.maxY);
		insideSubMenu.x = PositionUtil.isInsideArea(pos.mouseX,pos.subMenuNode.minX,pos.subMenuNode.maxX);
		insideSubMenu.y = PositionUtil.isInsideArea(pos.mouseY,pos.subMenuNode.minY,pos.subMenuNode.maxY);
		
		if((insideSubMenu.x && insideSubMenu.y) || (insideLink.x && insideLink.y)){
			insideSubMenu.value = true;
			hideCombos();
			_isHidden = true;
			if(!insideSubMenu.canGoOut){
				mouseEventDelay.runOverFunction();
				insideSubMenu.canGoOut = true;
			}
		}else{
			insideSubMenu.value = false;
			if(insideSubMenu.canGoOut){
				mouseEventDelay.runOutFunction();
				setTimeout(function(){
					if(!insideSubMenu.value){
						subMenuNode.style.visibility = 'hidden';
						showCombos();
						_isHidden = false;
						insideSubMenu.canGoOut = true;
						setTimeout(function(){
							deleteNoClickBg();
							EventUtil.remove(document,'mousemove',subMenuFunction);
						},150);
						if(typeof(mouseOutFunction) == 'function')
							mouseOutFunction();
					}
				},delay*1000);
				insideSubMenu.canGoOut = false;
			}
		}
	};
	var createNoClickBg = function(){
		if(!noClickBg){
			var div = document.createElement('div');
			div.style.position = 'absolute';
			div.style.backgroundColor = 'red';
			div.style.opacity = .5;
			div.style.visibility = 'hidden';
			div.style.top = div.style.left = 0;
			div.style.width = div.style.height = "100%";
			div.style.zIndex = zindex-1;
			noClickBg = document.body.appendChild(div);
		}else{
			sDiv(noClickBg);
		}
	};
	var deleteNoClickBg = function(){
		hDiv(noClickBg); //.parentNode.removeChild(noClickBg);
	};
	// init
	var init = function(){
		moveNodeToBody();
		mouseEventDelay = new MouseOverOutDelay({
			node:linkNode,
			delay:delay,
			overFunction:overLinkFunction,
			outFunction:function(){}
		});
		EventUtil.add(linkNode,'mouseover',createNoClickBg);
		//EventUtil.add(linkNode,'mouseout',mouseEventDelay.runOutFunction);
	};

	// get Sub-menu node
	this.getSubMenu = function(){
		return subMenuNode;
	};
	
	//init
	init();
};
//}
/**
	ChannelsSubMenu. batch SubMenu class for netshoes.
	@author Marcelo Miranda Carneiro
	@version 20:09 15/1/2008
	@requires main.js v10+, SubMenu
	@example
		<code>
			ChannelsSubMenu.init();
		</code>	
*/
//{
var ChannelsSubMenu = {
	_obj:{},
	_initClass:function($name,$elm){
		var div = gTag('div',$elm)[0] || null;
		var a = gTag('a',$elm)[0] || null;
		if(div && a){
			this._obj[$name] = new SubMenu({
				linkNode:a,
				subMenuNode:div,
				onClassName:div.className.replace(/_off/,'')+' lollyDefault',
				position:{
					reference:a,
					left:-10,
					top:a.offsetHeight-1
				},
				zIndex:20
			});
		}
	},
	init:function(){
		var li = gTag('li',$('menuCat'));
		for(var i=0; i<li.length; i++){
			this._initClass('subMenu_'+i,li[i]);
		}
	}
};
//}
/**
	AmplifyLinkArea. apply link to its parent node.
	@author Marcelo Miranda Carneiro
	@version 0.1
	@requires main.js v10+
	@example
		<code>
			var teste = new AmplifyLinkArea({
				node: $('container'),
				link: gTag('a',$('container'))
			});
		</code>	
*/
//{
var AmplifyLinkArea = function($obj){
	
	try{
		var node = $obj.node;
		var link = $obj.link;
		var href = link.href;
	}catch(e){
		return false;
	};
	var goUrl = function($loc){
		document.location.href = $loc;
	};
	var apply = function(){
		EventUtil.add(node,'click',function(){
			goUrl(href);
		});
		EventUtil.add(node,'mouseover',function(){
			node.className += ' on';
		});
		EventUtil.add(node,'mouseout',function(){
			node.className = node.className.replace(/on/,'');
		});
		node.style.cursor = 'pointer';
		//link.href = 'javascript:;';
	};
	apply();
};
//}
/**
	applyLinksToProductLists. apply links to all product lists of the site.
	@author Marcelo Miranda Carneiro
	@version 0.1
	@requires main.js v10+, AmplifyLinkArea Class
	@example
		<code>
			applyLinksToProductLists.init();
		</code>	
*/
//{
var applyLinksToProductLists = {
	obj: [],
	init: function(){
		var uls = gClass('lstProducts');
		var lis = null;
		for(var i=0; i<uls.length; i++){
			lis = gTag('li',uls[i]);
			for(var j=0; j<lis.length; j++){
				this.obj[this.obj.length] = new AmplifyLinkArea({
					node:lis[j],
					link:gTag('a',lis[j])[0]
				});
			}
		}
	}
};
//}
/**
	Box. opens default box.
	@author Marcelo Miranda Carneiro
	@version 0.1
	@requires main.js v10+, box.js, ajax.js
	@example
		<code>
			Box.open({
				content: content + _this.node.innerHTML,
				contClass:_this.node.className.split(' ')[0],
				callback:function($elm){
					_this.window = new DetailWindow(gTag('li',$('wdwCategoryLst'+$num)),gClass('lstContainer','*',$('wdwCategoryTxt'+$num)));
				}
			});
			Box.fetchHtml("http://www.google.com.br/",{
				content: content + _this.node.innerHTML,
				contClass:_this.node.className.split(' ')[0],
				callback:function($elm){
					_this.window = new DetailWindow(gTag('li',$('wdwCategoryLst'+$num)),gClass('lstContainer','*',$('wdwCategoryTxt'+$num)));
				}
			});
			Box.create(content + _this.node.innerHTML, _this.node.className.split(' ')[0],
				callback:function($elm){
					_this.window = new DetailWindow(gTag('li',$('wdwCategoryLst'+$num)),gClass('lstContainer','*',$('wdwCategoryTxt'+$num)));
				}
			});
		</code>	
*/
//{
var Box = {
	_node:null,
	create:function($content,$contClass,$contStyle,$id){
		var lollyId = $id || 'defaultLollyId';
		var cont = null;
		var contentCont = null;
		
		if($($id)){
			delElm($($id));
		}else if(this._node){
			delElm(this._node);
			this._node = null;			
		}

		this._node = createElm(null,[
			'div',{'class':'lollyDefault',id:lollyId},[
				'div',{'class':'cont'},[
					'a',{'class':'btFecharLolly',href:'javascript:;',onclick:function(){closeBox(lollyId);}},'fechar'
				]
			],[
			'div',{'class':'shadowLeft'},''
			],[
			'div',{'class':'shadowBottom'},''
			]
		]);
		cont = gClass('cont','*',this._node)[0];
		contentCont = createElm(cont,['div',{'class':(typeof($contClass) == 'string' ? ' '+$contClass : ''),style:(typeof($contStyle) == 'string' ? ' '+$contStyle : '')},'']);

		if($content)
			contentCont.innerHTML = $content;
		
		return {box:this._node,cont:contentCont};
	},
	open:function($obj){
		$obj = typeof($obj) == 'object' ? $obj : {};
		var content = $obj.content || null;
		var callback = typeof($obj.callback) == 'function' ? $obj.callback : null;
		var onOpen = typeof($obj.onOpen) == 'function' ? $obj.onOpen : null;
		var onClose = typeof($obj.onClose) == 'function' ? $obj.onClose : null;
		var contClass = typeof($obj.contClass) == 'string' ? $obj.contClass : null;
		var contStyle = typeof($obj.contStyle) == 'string' ? $obj.contStyle : null;
		var vAlign = $obj.vAlign ? $obj.vAlign : 'middle';
		var id = typeof($obj.id) == 'string' ? $obj.id : null;
		var elm = null;

		if(!id){
			elm = this.create(content,contClass,contStyle,id);
			id = elm.box.id;
		}else if($(id)){
			elm = {
				box:$(id),
				cont:gClass('cont','*',$(id))[0]
			};
		}
		openBox(id,{
			fix:true,
			vAlign: vAlign,
			onOpen:onOpen,
			onClose:onClose,
			config:{
				zIndex:20,
				bgColor:'ffffff'
			}
		});
		if(callback)callback(elm);
		return elm;
	},
	fetchHtml:function($url,$obj){
		$obj = typeof($obj) == 'object' ? $obj : {};
		var callback = typeof($obj.callback) == 'function' ? $obj.callback : null;
		var onOpen = typeof($obj.onOpen) == 'function' ? $obj.onOpen : null;
		var onClose = typeof($obj.onClose) == 'function' ? $obj.onClose : null;
		var contClass = typeof($obj.contClass) == 'string' ? $obj.contClass : null;
		var contStyle = typeof($obj.contStyle) == 'string' ? $obj.contStyle : null;
		var vAlign = $obj.vAlign ? $obj.vAlign : 'middle';
		var id = typeof($obj.id) == 'string' ? $obj.id : null;
		
		var _this = this;
		include($url,{
			onFinish:function($r){
				var box = _this.open({
					content:$r,
					contClass:contClass,
					contStyle:contStyle,
					id:id,
					callback:callback,
					onOpen:onOpen,
					onClose:onClose,
					vAlign: vAlign
				});
			}
		});
	}
};


function getInfoTable(stMarca,stGenero){
	$('contTableSize').innerHTML='';
	$('imgMarca').src= url_global+'/Imagens/px.gif';
	$('imgMarca').alt='';
	var marca;
	var genero;
	if(stMarca && stMarca!='0'){
		marca=stMarca;
	}
	else{
		marca='';
	}
	if(stGenero && stGenero!='0'){
		genero=stGenero;
	}
	else{
		genero='';
	}
	$('selGenero').options.length = 0;
	$('selGenero').options[$('selGenero').options.length] = new Option('Gênero','0');
	switch (marca)
	{
	case "nike":
		$('stNike').selected=true;					
		$('selGenero').options[$('selGenero').options.length] = new Option('Masculino','masculino');
		$('selGenero').options[$('selGenero').options.length] = new Option('Feminino','feminino');
		$('selGenero').options[$('selGenero').options.length] = new Option('Kids','kids');
		$('selGenero').options[$('selGenero').options.length] = new Option('Escolar','escolar');
		$('selGenero').options[$('selGenero').options.length] = new Option('Pré-escolar','preescolar');
		
		pImg(url_global+'/Imagens/tabela_tamanho/ico_'+marca+'.gif');
		$('imgMarca').src=url_global+'/Imagens/tabela_tamanho/ico_'+marca+'.gif';
		$('imgMarca').alt='Nike';
	break;
	default:
		$('imgMarca').src=url_global+'/Imagens/px.gif';				
		$('imgMarca').alt='';
	}
	if(genero!='' && marca!=''){

		include(url_global + '/tabelas/'+stMarca+'_'+stGenero+'.aspx',{
			onFinish:function($cont){
				$('contTableSize').innerHTML = $cont;
				zebra();
			}
		});
		for(var i=0;i<$('selGenero').options.length;i++){
			if($('selGenero').options[i].value==genero)
				$('selGenero').selectedIndex=i;
		}
	}
}


function openTableSize(stMarca,stGenero){
	Box.fetchHtml(url_global + '/tabelas/tabela_html.aspx',{
		vAlign:80,
		onOpen:function(){
			$('selMarca').selectedIndex=0;
			$('selGenero').selectedIndex=0;
			getInfoTable(stMarca,stGenero);				
		},
		onClose:function(){
			$('selMarca').selectedIndex=0;
			$('selGenero').selectedIndex=0;
			$('contTableSize').innerHTML='';
		}
	});
}

function zebra(){
	var arrTr = $('contTableSize').getElementsByTagName('tr');
	for(var i = 1; i<arrTr.length; i++) arrTr[i].style.backgroundColor = (i%2) ? '#f3f0ec' : '#ece7e1';
}


//}
/**
	DetailWindowCrossTrend. Especific detail window for cross trend page.
	@author Marcelo Miranda Carneiro
	@version 0.1
	@requires main.js v10+, box.js, Box Class, String.trim Prototype, DetailWindow Class
	@example
		<code>
			var detailWindow1 = new DetailWindowCrossTrend('1');
			var detailWindow2 = new DetailWindowCrossTrend('2');
		</code>	
*/
//{
var DetailWindowCrossTrend = function($num){
	var _this = this;
	_this.node = $('wdwCategoryLst'+$num).parentNode.cloneNode(true);
	delElm($('wdwCategoryLst'+$num).parentNode);
	_this.window = null;
	
	var content = '<h2 class="titProduct">'+gTag('h2',gClass('boxProductDetail')[Number($num)-1])[0].innerHTML.trim()+'</h2>';
	
	var infoContainer = gClass('lstContainerBorder','*',_this.node)[0].childNodes;
	var contNodes = 0;
	for(var i=0; i<infoContainer.length; i++)
		if(infoContainer[i].nodeType == 1){
			if(contNodes != 0)hDiv(infoContainer[i]);
			contNodes++;
		}
	
	$('descButton'+$num).href = 'javascript:;';
	$('descButton'+$num).onclick = function(){
		Box.open({
			content: content + _this.node.innerHTML,
			contClass:_this.node.className.split(' ')[0],
			callback:function($elm){
				_this.window = new DetailWindow(gTag('li',$('wdwCategoryLst'+$num)),gClass('lstContainer','*',$('wdwCategoryTxt'+$num)));
			}
		});
	};
};
//}
/**
	dhtml.
	@author Marcelo Miranda Carneiro
	@version 18:46 18/3/2008
	@requires main.js v10+ 
*/
//{
var dhtml = {
	flashObj_:null,
	flashContainer_:null,
	container_:null,
	timeout_:null,
	properties_:{
		top:320,
		left:'center',
		right:null,
		width:600,
		height:600,
		disableCache: false
	},
	open:function($timeout,$address, $properties, $variables, $disableCache, $container){
	
		try
		{
			this.container_ = Type.node(NodeUtil.getNode($container), NodeUtil.getNode('body_bg'));
			
			$properties = Type.object($properties, {});
			$variables = Type.object($variables);	
			
			// custom properties
			this.properties_.top = Type.number($properties.top, this.properties_.top);
			this.properties_.left = $properties.left || this.properties_.left;
			this.properties_.right = $properties.right || this.properties_.right;
			this.properties_.width = Type.number($properties.width, this.properties_.width);
			this.properties_.width = (this.properties_.width > this.container_.offsetWidth) ? this.container_.offsetWidth : this.properties_.width;
			this.properties_.height = Type.number($properties.height, this.properties_.height);
			
			this.timeout_ = Type.number($timeout,this.properties_.timeout);
			
			this.properties_.disableCache = Type.boolean($properties.disableCache, false);
			
			// create element
			var elmStyle = null;
			if(!this.flashContainer_){
				elmStyle = [
					'position:absolute',
					'z-index:1000',
					'display:none',
				].join(';');
				this.flashContainer_ = createElm(this.container_,[
					'div',{id:'bannerDhtml', style: elmStyle},''
				]);
				
			}else{
				sDiv(this.flashContainer_);
			}
			
			this.flashContainer_.style.width = this.properties_.width+'px';
			this.flashContainer_.style.height = this.properties_.height+'px';
			
			if(typeof(this.properties_.left) == 'string'){
				this.flashContainer_.style.left = '50%';
				this.flashContainer_.style.marginLeft = -(this.properties_.width/2)+'px';
			}else{
				this.flashContainer_.style.left = 0;
				this.flashContainer_.style.marginLeft = this.properties_.left+'px';
			}
			
			this.flashContainer_.style.top = 0;
			this.flashContainer_.style.marginTop = this.properties_.top+'px';
			
			//write flash
			flashObj_ = new FlashObject($address,'bannerDhtmlFlash',this.properties_.width, this.properties_.height, this.properties_.disableCache, 8);
			flashObj_.addParam('wmode','transparent');
			
			if($variables)
				for(var i in $variables)
					flashObj_.addVariable(i,$variables[i]);
			
			flashObj_.write(this.flashContainer_.id);
			
			this.show();

			var _this = this;
			
			setTimeout(function(){
				if(_this.flashContainer_){
					delElm(_this.flashContainer_.id);
					_this.flashContainer_ = null;
				}
			},this.timeout_);

		}
		catch(err)
		{
			alert("Erro: " + err.message);
		}
	},
	close:function(){
		var _this = this;
		this.hide();
		setTimeout(function(){
			if(_this.flashContainer_){
				delElm(_this.flashContainer_.id);
				_this.flashContainer_ = null;
			}
		},250);
	},
	show:function(){
		if(this.flashContainer_)
			sDiv(this.flashContainer_);
	},
	hide:function(){
		if(this.flashContainer_)
			hDiv(this.flashContainer_);
	}
};
//}

//}

/**************************************
 * VALIDATIONS
 **************************************/
//{
var validateRadio = function($array){
	try{
		for(var i=0; i<$array.length; i++){
			if($array[i].checked == true)
				return true;
		}
		return false;
	}catch(e){
		return false;
	}
};
var scrollToElm = function($elm){
	$elm = (typeof($elm) == 'string') ? ($($elm) || null) : ($elm || null);
	if(getPos($elm)[1] < (gTag('html')[0].scrollTop || gTag('body')[0].scrollTop))
		scrollTo(0,getPos($elm)[1]);
};
//}


function showTip(stTexto,elemAl,lft){
	var lft = (lft == 'undefined')? 10 : lft;
	sDiv('boxInfo');
	$('boxInfo').style.top=getPos(elemAl.id)[1]+'px';
	$('boxInfo').style.left=getPos(elemAl.id)[0]+elemAl.offsetWidth+lft+'px';
	$('pInfo').innerHTML=stTexto;
}


function abreJudaCartao(){
	var boxCode = [
		'<div class="w570">',
			'<h2 class="titSecao titCodSeg mb0">',
				'Código de segurança do cartão',
			'</h2>',
			'<br class="cb" />',
			'<p class="cartaoPadrao">',
				'Nos cartões <strong>Visa, MasterCard e Dinners</strong> este número se encontra na parte de trás, como <strong>indicado na imagem</strong>. Use os três útimos dígitos.',
			'</p>',
			'<p class="cartaoAmex">',
				'Nos cartões <strong>American Express</strong> este número está localizado na frente, logo acima do número do cartão de crédito, como <strong>indicado na imagem</strong>. São quatro dígitos.',
			'</p>',
		'</div>'
	];
	boxCode = boxCode.join('');
	Box.open({
		content:boxCode,
		onOpen:function(){			
		},
		onClose:function(){			
		}
	});
}

