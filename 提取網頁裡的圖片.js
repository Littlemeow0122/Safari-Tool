var result = [];

var elements = document.getElementsByTagName('img');
for (let element of elements) {
  if (element.src && element.src.indexOf(".svg") != -1) {
    result.push({ type: "img", src: element.src });
  }
}

var svgs = document.getElementsByTagName('svg');
for (let svg of svgs) {
  result.push({ type: "inline", svg: svg.outerHTML });
}

var all = document.getElementsByTagName('*');
for (let el of all) {
  var style = window.getComputedStyle(el);
  var bg = style.backgroundImage;
  if (bg && bg.indexOf(".svg") != -1) {
    result.push({ type: "css", background: bg });
  }
}

completion(result);
