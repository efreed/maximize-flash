if (window.foundFlashSrc) {
	document.location = window.foundFlashSrc;
}

function getLargest(tagname) {
	var largestObject = false
	  , largestArea = -1
	  , i = 0
	  , objects = document.getElementsByTagName(tagname)
	  , thisArea = 0;
	for (var l = objects.length; i < l; i++) {
		with (objects[i]) {
			thisArea = clientHeight * clientWidth;
			if (thisArea > largestArea) {
				largestArea = thisArea;
				largestObject = objects[i];
			}
		}
	}
	return largestObject;
}

function outerHTML(node) {
	if ("outerHTML" in document.createElementNS("http://www.w3.org/1999/xhtml", "_")) {
		return node.outerHTML;
	}
	if (document.xmlVersion) {
			var xml_serializer = new XMLSerializer;
			return xml_serializer.serializeToString(node);
	}
	var container = document.createElementNS("http://www.w3.org/1999/xhtml", "_")
	  , elem_proto = (view.HTMLElement || view.Element).prototype;
	container.appendChild(node.cloneNode(false));
	var html = container.innerHTML.replace("><", ">" + node.innerHTML + "<");
	container.innerHTML = "";
	return html;
}

function bigNode(node) {
	node.setAttribute("style","width:100%;height:100%;margin:0;padding:0");
	node.setAttribute("class","");
}

var obj = getLargest("object");
if (!obj) {
	obj = getLargest("iframe");
}
if (!obj) {
	alert("No Flash players found.");
} else {
	bigNode(obj);
	obj.focus();
	var alt = document.getElementsByTagName("embed")
	  , dl = "";
	if (alt.length) {
		bigNode(alt[0]);
		alt[0].focus();
		var src = alt[0].getAttribute("src");
		if (src.length && src.indexOf(".swf") > 0) {
			var instructions = "To save a bookmark:\nRight-click and select `Open link in new tab, then save that page to your bookmarks.\n\nTo download as a .swf file:\nRight-click and select `Save link as...`"
			  , fadeId = setTimeout("document.getElementsByTagName('a')[0].style('display','none');");
			dl = '<a href="' +src +'" style="position:absolute;top:0;left:0;background-color:white;color:blue" onclick="alert(\''+instructions+'\'); clearTimeout('+fadeId+'); return false;"><img src="download.png" width="24" height="24"></a>';
		}
	}
	document.body.innerHTML = dl + outerHTML(obj);
	bigNode(document.body);
	bigNode(document.getElementsByTagName("html")[0]);
}
