var result = [];var elements =document.getElementsByTagName('img');
for (let element of elements) {
   if(element.src.indexOf("http")!=-1&&element.src.indexOf("svg")==-1){
	 result.push(element.src);}
}
completion(result);
