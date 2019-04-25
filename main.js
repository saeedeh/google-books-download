
var zipJSUTL='https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.5/jszip.js';
var fileSaverURL='https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/1.3.8/FileSaver.min.js';
function loadLibraries(srcURL) {
    var script = document.createElement("script"); // Make a script DOM node
    script.src = srcURL // Set it's src to the provided URL
    document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}


function addBlob(source,ind){
    var xhr = new XMLHttpRequest(); 
    xhr.open("GET", source); 
    xhr.responseType = "blob";//force the HTTP response, response-type header to be blob
    xhr.onload = function() 
    {
        if(blobs[ind]==undefined)
            blobs[ind] = xhr.response;//xhr.response is now a blob object
    }
    xhr.send();   
}
var res=[];
var blobs=[]
scrollBar=document.querySelector('.overflow-scrolling');
scrollBar.addEventListener('scroll', scrollFnc);
function scrollFnc(){
	imges=document.querySelectorAll('img')
	for(var i=1;i<imges.length;i++){
	//console.log(imges[i].width)
    if(imges[i].width >500){
       // console.log(imges[i].src);
		res.push(imges[i])
        var regex = new RegExp(/pg=\w\w\d+/i);
        str=imges[i].src;
        x=str.match(regex)
        if(x==null){
            console.log('!!!!!!!!!'+str);
            continue;
        }
        x=x[0];
        pageNo= x.substring(5)/1;
        console.log(pageNo);
        addBlob(str,pageNo);
    }
	}

}

loadLibraries(zipJSUTL);
loadLibraries(fileSaverURL);

function finish(){
    var zip= new JSZip();
    for(var i=0; i<blobs.length;i++){
        if(blobs[i]==undefined)
            continue;
        zip.file('images/'+i+'.png', blobs[i], {base64: true});
    }
    zip.generateAsync({type:"blob"})
    .then(function(content) {
    // see FileSaver.js
    saveAs(content, "book.zip");
});
    
}

