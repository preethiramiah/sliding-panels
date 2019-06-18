var tooltips = document.querySelectorAll('.enlarge-tooltip');
var prevClickedDiv = null;
var clickedDiv = null;
var clickedImage = "";
var closeBtnClicked = false;
var selectedTabName = "";
var screenSmall = window.matchMedia("(max-width: 768px)");
var screenMedium = window.matchMedia("(min-device-width: 768px) and (max-device-width: 1024px)");
var mobileScrollPosition = {"info1": 150, "info2": 550, "info3": 850};
const smallDeviceInfoDivHeight = "100%";
const mediumDeviceInfoDivHeight = "620px";
const largeDeviceInfoDivHeight = "925px";
const mediumDeviceZoomInfoDivHeight = "2074px";
const largeDeviceZoomInfoDivHeight = "2500px";

/* Function to set the position of the "Click to Zoom" tooltip when hovering over the infographic thumbnail*/
window.onmousemove = function (e) {
    if(document.querySelectorAll('.enlarge-tooltip')){
        tooltips = document.querySelectorAll('.enlarge-tooltip');
        var x = e.clientX,
            y = e.clientY; 
        for (var i = 0; i < tooltips.length; i++) {
            tooltips[i].style.top = y+"px";
            tooltips[i].style.left = x+"px";
        }
    }
};

window.addEventListener('load', function(e){        
    if(screenSmall.matches && document.getElementById('container-sliding-panels') != null){
        var targetMarketTop = document.getElementById('container-sliding-panels').offsetTop;
        mobileScrollPosition["info1"] = targetMarketTop;
        mobileScrollPosition["info2"] = targetMarketTop + 330;
        mobileScrollPosition["info3"] = targetMarketTop + 660;
    }
})               
/* 1. This function is used to expand the infographic on being clicked. AddClass() and RemoveClass() are not used as they are not supported in browsers like IE 9 and below. Instead, string manipulation is used.         
2. In mobile devices, "container-sliding-panels" must have 100% height. 
3. Unlike the desktop screens, in mobile devices all the other infographic thumbnails are visible when one infographic is expanded. Hence a click over the other container must not expand them, before the previously opened one is closed. 
*/
function showImage(obj,e,imageName){
    clickedDiv = obj; 
    clickedImage = imageName;
    selectedTabName = 'btn-'+imageName;
}

function expandInfographic(obj,e,divName,btnName){
    clickedDiv = document.getElementById(divName);
    if (prevClickedDiv != null && prevClickedDiv != clickedDiv)
         removeExpandStyle(prevClickedDiv,prevClickedDiv.id); 
    removeButtonStyle(document.getElementById('top-menu-sliding-panel'));
    removeButtonStyle(document.getElementById('bottom-menu-sliding-panel'));
    addExpandStyle(document.getElementById('top-'+btnName),"tablink");
    addExpandStyle(document.getElementById('bottom-'+btnName),"tablink");
    addExpandStyle(clickedDiv,clickedDiv.id);
    if(screenMedium.matches)
        document.getElementById('container-sliding-panels').style.height = mediumDeviceZoomInfoDivHeight;
     else
        document.getElementById('container-sliding-panels').style.height = largeDeviceZoomInfoDivHeight;
    window.scrollTo({'behavior': 'smooth','left': 0,'top': document.getElementById('div-menu').offsetTop});
    prevClickedDiv = clickedDiv;
}

function removeButtonStyle(obj) {
    var listElements = obj.getElementsByTagName('li');
    for (var i=0;i<listElements.length;i++)
        removeExpandStyle(listElements[i],"tablink");
}

/*This function collapses the infographic on clicking the close button */

function closeInfographic(obj,e){
    closeBtnClicked = true;
    prevClickedDiv = null;
    removeExpandStyle(obj.parentElement,obj.parentElement.id);
    if(screenMedium.matches)
        document.getElementById('container-sliding-panels').style.height = mediumDeviceInfoDivHeight; 
    else
        document.getElementById('container-sliding-panels').style.height = largeDeviceInfoDivHeight; 
    removeButtonStyle(document.getElementById('top-menu-sliding-panel'));
    removeButtonStyle(document.getElementById('bottom-menu-sliding-panel'));
}

 window.addEventListener('click', function(e){             
     if(screenSmall.matches){ 
         document.getElementById('container-sliding-panels').style.height = "100%"; 
         if(clickedDiv != null){ 
             if(clickedDiv.contains(e.target)) {
                addExpandStyle(clickedDiv,clickedDiv.id);
                window.scrollTo({'behavior': 'smooth','left': 0,'top': mobileScrollPosition[clickedImage]});
             }
             else {
                 removeExpandStyle(clickedDiv,clickedDiv.id);                       
             }                     
         }
         if (prevClickedDiv != null && prevClickedDiv != clickedDiv){
             removeExpandStyle(prevClickedDiv,prevClickedDiv.id);
         }                                        
         prevClickedDiv = clickedDiv;                                 
     }else {
         if (!closeBtnClicked){
             if(clickedDiv!= null && clickedDiv.contains(e.target)) {  
                addExpandStyle(clickedDiv,clickedDiv.id);
                removeButtonStyle(document.getElementById('top-menu-sliding-panel'));
                removeButtonStyle(document.getElementById('bottom-menu-sliding-panel'));
                addExpandStyle(document.getElementById('top-'+selectedTabName),"tablink");
                addExpandStyle(document.getElementById('bottom-'+selectedTabName),"tablink");
                if(screenMedium.matches)
                    document.getElementById('container-sliding-panels').style.height = mediumDeviceZoomInfoDivHeight;
                 else
                    document.getElementById('container-sliding-panels').style.height = largeDeviceZoomInfoDivHeight;
                prevClickedDiv = clickedDiv;
             }                     
         }
         closeBtnClicked = false;  
     }             
})

function addExpandStyle(obj,styleName){
    var classArray = obj.className.split(" ");
    if (classArray.indexOf(styleName + '-hover') == -1) 
        obj.className += " " + styleName + '-hover';
}

function removeExpandStyle(obj,styleName){
    var re = new RegExp('\\b'+styleName+'-hover'+'\\b', "g");
    obj.className = obj.className.replace(re, "");  
}

function scrollToPanel(imageId){
    window.scrollTo({'behavior': 'smooth','left': 0,'top': mobileScrollPosition[imageId]});            
}