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
			var instructions = "To save a bookmark:\\nRight-click and select &quot;Open link in new tab&quot;,\\nThen save that page to your bookmarks.\\n\\nTo download as a .swf file:\\nRight-click and select &quot;Save link as...&quot;"
			  , fadeId = setTimeout("document.getElementById('dlIcon').style.display='none';",4000);
			dl = '<a id="dlIcon" href="' +src +'" style="display:block;text-align:center;background-color:white" onclick="clearTimeout('+fadeId+'); alert(\''+instructions+'\'); return false;"><img src="https://raw.githubusercontent.com/efreed/maximize-flash/master/download.png" width="24" height="24"></a>';
		}
	}
	document.body.innerHTML = dl + outerHTML(obj);
	bigNode(document.body);
	bigNode(document.getElementsByTagName("html")[0]);
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