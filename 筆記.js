//
// Sticky Note snippet


/** Generates a random string. From http://stackoverflow.com/a/1349462/1008736 */
function randomString(len, charSet) {
	len = len || 12;
    charSet = charSet || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var randomString = '';
    for (var i = 0; i < len; i++) {
    	var randomPoz = Math.floor(Math.random() * charSet.length);
    	randomString += charSet.substring(randomPoz,randomPoz+1);
    }
    return randomString;
}


/** Checks if this snippet has been run before */
function hasRun() {

	// Check if run before, if element exists
	var identifier = "sticky-notes-snippet";
	if (document.getElementById(identifier)) 
		return true;

	// Hasn't run before, create element
	var e = document.createElement("div");
	e.style.display = "none";
	e.id = identifier;
	document.body.appendChild(e);
	return false;
	
}






//
// Sticky note class
function StickyNote(data) {

	// Check data
	data = data || {};
	
	// Save info
	this.id					= data.id || randomString();
	this.text				= data.text || "";
	this.path				= data.path || "";
	this.x					= data.x || 20;
	this.y					= data.y || 20;

	// Create div
	this.div = document.createElement("div");
	this.div.id = "sticky-note-" + this.id;
	this.div.style.cssText = "display: block; position: absolute; top: 0px; left: 0px; z-index: 9999; background-color: #f7f6a3; border-radius: 3px; box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25); ";
	document.body.appendChild(this.div);

	// Add drag listeners
	this.div.addEventListener("mousedown", this.onDragStart.bind(this));
	this.div.addEventListener("touchstart", this.onDragStart.bind(this));
	this.div.addEventListener("mousemove", this.onDragMove.bind(this));
	this.div.addEventListener("touchmove", this.onDragMove.bind(this));
	this.div.addEventListener("mouseup", this.onDragEnd.bind(this));
	this.div.addEventListener("touchend", this.onDragEnd.bind(this));

	// Create close button
	var closeBtn = document.createElement("div");
	closeBtn.style.cssText = "position: absolute; top: 0px; right: 0px; width: 26px; height: 26px; background-size: 16px 16px; background-position: center; background-repeat: no-repeat; cursor: pointer; ";
	closeBtn.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHdpZHRoPSIyOHB4IiBoZWlnaHQ9IjI4cHgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMjggMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIGlkPSJfeDMzXzEtY2lyY2xlLXgucG5nIj4NCgk8Zz4NCgkJPHBhdGggc3R5bGU9ImZpbGw6IzIzMUYyMDsiIGQ9Ik0xNCwwQzYuMjY4LDAsMCw2LjI2OSwwLDE0YzAsNy43MzIsNi4yNjgsMTQsMTQsMTRzMTQtNi4yNjgsMTQtMTRDMjgsNi4yNjksMjEuNzMyLDAsMTQsMHoNCgkJCSBNMjAuNDE1LDIwLjQxNEMyMC4wMjQsMjAuODA1LDE5LjUxMiwyMSwxOSwyMXMtMS4wMjQtMC4xOTUtMS40MTQtMC41ODZMMTQsMTYuODI4bC0zLjU4NiwzLjU4N0MxMC4wMjQsMjAuODA2LDkuNTEyLDIxLDksMjENCgkJCXMtMS4wMjQtMC4xOTQtMS40MTQtMC41ODVjLTAuNzgxLTAuNzgxLTAuNzgxLTIuMDQ4LDAtMi44MjhMMTEuMTcyLDE0bC0zLjU4Ni0zLjU4NmMtMC43ODEtMC43OC0wLjc4MS0yLjA0NywwLTIuODI4DQoJCQljMC43OC0wLjc4MSwyLjA0OC0wLjc4MSwyLjgyOCwwTDE0LDExLjE3MmwzLjU4NS0zLjU4NWMwLjc4LTAuNzgyLDIuMDQ4LTAuNzgyLDIuODI4LDBjMC43ODEsMC43OCwwLjc4MSwyLjA0NywwLDIuODI3TDE2LjgyOSwxNA0KCQkJbDMuNTg2LDMuNTg2QzIxLjE5NiwxOC4zNjcsMjEuMTk2LDE5LjYzNCwyMC40MTUsMjAuNDE0eiIvPg0KCTwvZz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjwvc3ZnPg0K')";
	this.div.appendChild(closeBtn);

	// Add button handlers
	closeBtn.addEventListener("mousedown", this.onClose.bind(this));
	closeBtn.addEventListener("touchstart", this.onClose.bind(this));

	// Add drag icon
	var dragIcon = document.createElement("div");
	dragIcon.style.cssText = "position: absolute; top: 0px; left: 0px; width: 26px; height: 26px; background-size: 16px 16px; background-position: center; background-repeat: no-repeat; ";
	dragIcon.style.backgroundImage = "url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+Cjxzdmcgd2lkdGg9IjU4cHgiIGhlaWdodD0iNThweCIgdmlld0JveD0iMCAwIDU4IDU4IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnNrZXRjaD0iaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoL25zIj4KICAgIDwhLS0gR2VuZXJhdG9yOiBTa2V0Y2ggMy4wLjQgKDgwNTMpIC0gaHR0cDovL3d3dy5ib2hlbWlhbmNvZGluZy5jb20vc2tldGNoIC0tPgogICAgPHRpdGxlPjExMDUtZmluZ2VyLWRyYWdAMng8L3RpdGxlPgogICAgPGRlc2M+Q3JlYXRlZCB3aXRoIFNrZXRjaC48L2Rlc2M+CiAgICA8ZGVmcz48L2RlZnM+CiAgICA8ZyBpZD0iUGFnZS0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBza2V0Y2g6dHlwZT0iTVNQYWdlIj4KICAgICAgICA8ZyBpZD0iR2x5cGhpc2gtOC1JY29ucyIgc2tldGNoOnR5cGU9Ik1TQXJ0Ym9hcmRHcm91cCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQwNC4wMDAwMDAsIC0xOS4wMDAwMDApIiBmaWxsPSIjMDAwMDAwIj4KICAgICAgICAgICAgPGcgaWQ9IjExMDUtZmluZ2VyLWRyYWdAMngiIHNrZXRjaDp0eXBlPSJNU0xheWVyR3JvdXAiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwNC4wMzY5OTYsIDE5Ljg2MDQ5OSkiPgogICAgICAgICAgICAgICAgPGcgaWQ9Il94MzFfMTA1LWZpbmdlci1kcmFnX3g0MF8yeC5wbmciIHNrZXRjaDp0eXBlPSJNU1NoYXBlR3JvdXAiPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik04LDYgQzguMjc2LDYgOC41MjYsNS44ODggOC43MDcsNS43MDcgTDExLDMuNDE0IEwxMSw4IEMxMSw4LjU1MyAxMS40NDgsOSAxMiw5IEMxMi41NTIsOSAxMyw4LjU1MyAxMyw4IEwxMywzLjQxNCBMMTUuMjkzLDUuNzA3IEMxNS40NzQsNS44ODggMTUuNzI0LDYgMTYsNiBDMTYuNTUyLDYgMTcsNS41NTMgMTcsNSBDMTcsNC43MjQgMTYuODg4LDQuNDc0IDE2LjcwNyw0LjI5MyBMMTIuNzA3LDAuMjkzIEMxMi41MjYsMC4xMTIgMTIuMjc2LDAgMTIsMCBDMTEuNzI0LDAgMTEuNDc0LDAuMTEyIDExLjI5MywwLjI5MyBMNy4yOTMsNC4yOTMgQzcuMTEyLDQuNDc0IDcsNC43MjQgNyw1IEM3LDUuNTUzIDcuNDQ4LDYgOCw2IEw4LDYgWiBNMy40MTQsMTMgTDgsMTMgQzguNTUyLDEzIDksMTIuNTUzIDksMTIgQzksMTEuNDQ4IDguNTUyLDExIDgsMTEgTDMuNDE0LDExIEw1LjcwNyw4LjcwNyBDNS44ODgsOC41MjYgNiw4LjI3NiA2LDggQzYsNy40NDcgNS41NTIsNyA1LDcgQzQuNzI0LDcgNC40NzQsNy4xMTIgNC4yOTMsNy4yOTMgTDAuMjkzLDExLjI5MyBDMC4xMTIsMTEuNDc0IDAsMTEuNzI0IDAsMTIgQzAsMTIuMjc2IDAuMTEyLDEyLjUyNiAwLjI5MywxMi43MDcgTDQuMjkzLDE2LjcwNyBDNC40NzQsMTYuODg4IDQuNzI0LDE3IDUsMTcgQzUuNTUyLDE3IDYsMTYuNTUzIDYsMTYgQzYsMTUuNzI0IDUuODg4LDE1LjQ3NCA1LjcwNywxNS4yOTMgTDMuNDE0LDEzIEwzLjQxNCwxMyBaIE0xNiwxOCBDMTUuNzI0LDE4IDE1LjQ3NCwxOC4xMTIgMTUuMjkyLDE4LjI5MyBMMTMsMjAuNTg2IEwxMywxNiBDMTMsMTUuNDQ3IDEyLjU1MiwxNSAxMiwxNSBDMTEuNDQ4LDE1IDExLDE1LjQ0NyAxMSwxNiBMMTEsMjAuNTg2IEw4LjcwOCwxOC4yOTMgQzguNTI2LDE4LjExMiA4LjI3NiwxOCA4LDE4IEM3LjQ0OCwxOCA3LDE4LjQ0OCA3LDE5IEM3LDE5LjI3NiA3LjExMiwxOS41MjYgNy4yOTMsMTkuNzA3IEwxMS4yOTMsMjMuNzA3IEMxMS40NzQsMjMuODg5IDExLjcyNCwyNCAxMiwyNCBDMTIuMjc2LDI0IDEyLjUyNiwyMy44ODkgMTIuNzA3LDIzLjcwNyBMMTYuNzA3LDE5LjcwNyBDMTYuODg4LDE5LjUyNiAxNywxOS4yNzYgMTcsMTkgQzE3LDE4LjQ0OCAxNi41NTIsMTggMTYsMTggTDE2LDE4IFogTTI0LDEyIEMyNCwxMS43MjQgMjMuODg4LDExLjQ3NCAyMy43MDcsMTEuMjkzIEwxOS43MDcsNy4yOTMgQzE5LjUyNiw3LjExMiAxOS4yNzYsNyAxOSw3IEMxOC40NDgsNyAxOCw3LjQ0NyAxOCw4IEMxOCw4LjI3NiAxOC4xMTIsOC41MjYgMTguMjkzLDguNzA3IEwyMC41ODYsMTEgTDE2LDExIEMxNS40NDgsMTEgMTUsMTEuNDQ4IDE1LDEyIEMxNSwxMi41NTMgMTUuNDQ4LDEzIDE2LDEzIEwyMC41ODYsMTMgTDE4LjI5MywxNS4yOTMgQzE4LjExMiwxNS40NzQgMTgsMTUuNzI0IDE4LDE2IEMxOCwxNi41NTMgMTguNDQ4LDE3IDE5LDE3IEMxOS4yNzYsMTcgMTkuNTI2LDE2Ljg4OCAxOS43MDcsMTYuNzA3IEwyMy43MDcsMTIuNzA3IEMyMy44ODgsMTIuNTI2IDI0LDEyLjI3NiAyNCwxMiBMMjQsMTIgWiBNNTIsMjIgQzUxLjE3LDIyIDUwLjQsMjIuMjUzIDQ5Ljc2MSwyMi42ODYgQzQ5LjIxNSwyMS4xMjYgNDcuNzQ2LDIwIDQ2LDIwIEM0NS4xNywyMCA0NC40LDIwLjI1MyA0My43NjEsMjAuNjg2IEM0My4yMTUsMTkuMTI2IDQxLjc0NiwxOCA0MCwxOCBDMzkuMjY4LDE4IDM4LjU5LDE4LjIxMiAzOCwxOC41NTUgTDM4LDEwIEMzOCw3Ljc5MSAzNi4yMDksNiAzNCw2IEMzMS43OTEsNiAzMCw3Ljc5MSAzMCwxMCBMMzAsMzIuOTEzIEwyNy42ODgsMjguNDU2IEMyNi42NTUsMjYuMzg0IDI0LjUwMiwyNS40NDYgMjIuNDYxLDI2LjI5MSBDMjAuNDIsMjcuMTM3IDE5LjQ1MSwyOS40NzcgMjAuMjk2LDMxLjUxOCBMMjQuNiw0NC4yOTcgQzI2LjQ4LDUxLjA0NCAzMi42NTQsNTYgNDAsNTYgQzQ4LjgzNiw1NiA1Niw0OC44MzcgNTYsNDAgTDU2LDM5Ljk5OSBMNTYsMjYgQzU2LDIzLjc5MSA1NC4yMDksMjIgNTIsMjIgTDUyLDIyIFogTTU0LDQwIEM1NCw0Ny43MzIgNDcuNzMyLDU0IDQwLDU0IEMzNC4wODQsNTQgMjkuMDM2LDUwLjMyNSAyNi45ODYsNDUuMTM4IEwyNi45NjcsNDUuMTQgTDI2Ljk2Niw0NS4xMzcgTDI2Ljk4Nyw0NS4xMjggTDIyLjE0NSwzMC43NTIgQzIxLjcyMiwyOS43MzEgMjIuMjA3LDI4LjU2MiAyMy4yMjgsMjguMTM5IEMyNC4yNDksMjcuNzE2IDI1LjI2MSwyOC4xMTYgMjUuODQxLDI5LjIyMiBMMzAuMDg5LDM3LjQxIEwzMC4wOTIsMzcuNDA4IEMzMC4yNDgsMzcuNzU2IDMwLjU5NCwzOCAzMSwzOCBDMzEuNTUyLDM4IDMyLDM3LjU1MyAzMiwzNyBMMzIsMTAgQzMyLDguODk2IDMyLjg5Niw4IDM0LDggQzM1LjEwNCw4IDM2LDguODk2IDM2LDEwIEwzNiwyNyBDMzYsMjcuNTUzIDM2LjQ0OCwyOCAzNywyOCBDMzcuNTUyLDI4IDM4LDI3LjU1MyAzOCwyNyBMMzgsMjIgQzM4LDIwLjg5NiAzOC44OTYsMjAgNDAsMjAgQzQxLjEwNCwyMCA0MiwyMC44OTYgNDIsMjIgTDQyLDI5IEM0MiwyOS41NTMgNDIuNDQ4LDMwIDQzLDMwIEM0My41NTIsMzAgNDQsMjkuNTUzIDQ0LDI5IEw0NCwyNCBDNDQsMjIuODk2IDQ0Ljg5NiwyMiA0NiwyMiBDNDcuMTA0LDIyIDQ4LDIyLjg5NiA0OCwyNCBMNDgsMzEgQzQ4LDMxLjU1MyA0OC40NDgsMzIgNDksMzIgQzQ5LjU1MiwzMiA1MCwzMS41NTMgNTAsMzEgTDUwLDI2LjAwMSBDNTAsMjYuMDAxIDUwLDI2LjAwMSA1MCwyNiBDNTAsMjQuODk2IDUwLjg5NiwyNCA1MiwyNCBDNTMuMTA0LDI0IDU0LDI0Ljg5NiA1NCwyNiBMNTQsNDAgTDU0LDQwIFoiIGlkPSJTaGFwZSI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=')";
	this.div.appendChild(dragIcon);

	// Add input area
	this.input = document.createElement("div");
	this.input.style.cssText = "position: relative; top: 26px; left: 0px; width: 280px; height: auto; min-height: 60px; padding: 2px 10px; margin-bottom: 30px; font-family: Helvetica, Arial; font-size: 15px; color: #000; ";
	this.input.contentEditable = true;
	this.input.innerHTML = this.text;
	this.input.id = "sticky-note-input-area";
	this.div.appendChild(this.input);

	// Add input change listener
	this.input.addEventListener("input", this.onInputChanged.bind(this));

	// Move to stored position
	this.moveTo(this.x, this.y);
	
}

/** Move the sticky note position */
StickyNote.prototype.moveTo = function(x, y) {
	this.x = x;
	this.y = y;
	this.div.style.left = x + "px";
	this.div.style.top = y + "px";
}

/** Save the sticky note */
StickyNote.prototype.save = function() {

	// Save sticky note
	localStorage["sticky-note-" + this.id] = JSON.stringify({
		id: this.id,
		text: this.text,
		path: this.path,
		x: this.x,
		y: this.y
	});

}

/** Delete the sticky note */
StickyNote.prototype.delete = function() {

	// Remove it
	localStorage.removeItem("sticky-note-" + this.id);

}

/** When the close button is pressed */
StickyNote.prototype.onClose = function(e) {
	e && e.preventDefault();
	this.delete();
	this.div.parentNode && this.div.parentNode.removeChild(this.div);
}

/** When the drag starts */
StickyNote.prototype.onDragStart = function(e) {

	// Ignore if the user touched the text area and it's currently active
	if (e.target.id == "sticky-note-input-area" && e.target == document.activeElement)
		return;

	// Get offset position
	this.lastDragX = e.pageX || e.changedTouches && e.changedTouches[0].pageX || 0;
	this.lastDragY = e.pageY || e.changedTouches && e.changedTouches[0].pageY || 0;
	this.isDragging = true;

}

/** When drag moves */
StickyNote.prototype.onDragMove = function(e) {

	// Ignore if not dragging
	if (!this.isDragging)
		return;

	// Don't scroll the page or select text when dragging
	e.preventDefault();

	// Get offset position
	var x = e.pageX || e.changedTouches && e.changedTouches[0].pageX || 0;
	var y = e.pageY || e.changedTouches && e.changedTouches[0].pageY || 0;
	var diffX = x - this.lastDragX;
	var diffY = y - this.lastDragY;
	
	// Move sticky note
	this.moveTo(this.x + diffX, this.y + diffY);
		
	// Save offset position
	this.lastDragX = x;
	this.lastDragY = y;

}

/** When the drag ends */
StickyNote.prototype.onDragEnd = function(e) {

	// Ignore if not dragging
	if (!this.isDragging)
		return;

	// Stop dragging
	this.isDragging = false;

	// Save
	this.save();

}

/** Called when the content of the editor changes */
StickyNote.prototype.onInputChanged = function(e) {

	// Save changes
	this.text = this.input.innerHTML;
	this.save();

}












// Make sure our script has only run once
if (hasRun()) {

	// Already run. Create new sticky note
	var note = new StickyNote();
	note.path = window.location.href
	note.moveTo(window.scrollX + 20, window.scrollY + 20);
	note.save();

} else {

	// We have run
	document.stickyNotesHasRun = true;

	// Load existing sticky notes
	var notes = [];
	for (var key in localStorage) {

		// Check if it's a sticky note
		if (key.indexOf("sticky-note-") !== 0)
			continue;

		// Get note data
		var data = JSON.parse(localStorage[key]);

		// Check if we're on the right path
		if (window.location.href != data.path)
			continue;

		// Load sticky note
		var note = new StickyNote(data);
		notes.push(note);

	}

	// If none loaded, create a new sticky note
	if (notes.length == 0) {

		var note = new StickyNote();
		note.path = window.location.href
		note.moveTo(window.scrollX + 20, window.scrollY + 20);
		note.save();
		notes.push(note);

	}

}
;completion();
