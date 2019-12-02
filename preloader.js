var images = document.images;
var images_total_count = images.length;
var images_loader_count = 0;
var perc_display = document.getElementById('load_perc');
var preloader = document.getElementById('page-preloader');

console.log(images_total_count);

for (let i = 0; i < images_total_count; i++) {
    image_clone     = new Image();    
    image_clone_onload  = image_loaded();
    image_clone_onerror = image_loaded();
    image_clone.srs     = images[i].src;
}

let image_loaded = () =>{
    images_loader_count++;
    perc_display.innerHTML = (((100 /images_total_count)*images_loader_count) << 0 ) + '%';
    if(images_loader_count>= images_total_count){
        setTimeout(() => {

            if(!preloader.classList.contains('done')){
                preloader.classList.add('done')
            }
        }, 1000);
    }

}

{/* <div id="page-preloader" class="preloader">
        <div class="loader_wraper">
            <div class="logoIMG">
                <img src="LogoBarberShop.png" alt="">
            </div>
            <div class="loader">
                <p id="load_perc"></p>
            </div>
        </div>
    </div> */}


// var QueryLoader = {


//     overlay: "",
//     loadBar: "",
//     preloader: "",
//     items: new Array(),
//     doneStatus: 0,
//     doneNow: 0,
//     selectorPreload: "body",
//     ieLoadFixTime: 2000,
//     ieTimeout: "",

//     init: function () {
//         if (navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/) == "MSIE 6.0,6.0") {
//             // IE6          
//             return false;
//         }
//         if (QueryLoader.selectorPreload == "body") {
//             QueryLoader.spawnLoader();
//             QueryLoader.getImages(QueryLoader.selectorPreload);
//             QueryLoader.createPreloading();
//         } else {
//             $(document).ready(function () {
//                 QueryLoader.spawnLoader();
//                 QueryLoader.getImages(QueryLoader.selectorPreload);
//                 QueryLoader.createPreloading();
//             });
//         }

//         // IE  :)
//         QueryLoader.ieTimeout = setTimeout("QueryLoader.ieLoadFix()", QueryLoader.ieLoadFixTime);
//     },

//     ieLoadFix: function () {
//         var ie = navigator.userAgent.match(/MSIE (\d+(?:\.\d+)+(?:b\d*)?)/);
//         if (ie[0].match("MSIE")) {
//             while ((100 / QueryLoader.doneStatus) * QueryLoader.doneNow < 100) {
//                 QueryLoader.imgCallback();
//             }
//         }
//     },

//     imgCallback: function () {
//         QueryLoader.doneNow++;
//         QueryLoader.animateLoader();
//     },

//     getImages: function (selector) {
//         var everything = $(selector).find("*:not(script)").each(function () {
//             var url = "";

//             if ($(this).css("background-image") != "none") {
//                 var url = $(this).css("background-image");
//             } else if (typeof ($(this).attr("src")) != "undefined" && $(this).attr("tagName").toLowerCase() == "img") {
//                 var url = $(this).attr("src");
//             }

//             url = url.replace("url(\"", "");
//             url = url.replace("url(", "");
//             url = url.replace("\")", "");
//             url = url.replace(")", "");

//             if (url.length > 0) {
//                 QueryLoader.items.push(url);
//             }
//         });
//     },

//     createPreloading: function () {
//         QueryLoader.preloader = $("<div></div>").appendTo(QueryLoader.selectorPreload);
//         $(QueryLoader.preloader).css({
//             height: "0px",
//             width: "0px",
//             overflow: "hidden"
//         });

//         var length = QueryLoader.items.length;
//         QueryLoader.doneStatus = length;

//         for (var i = 0; i < length; i++) {
//             var imgLoad = $("<img></img>");
//             $(imgLoad).attr("src", QueryLoader.items[i]);
//             $(imgLoad).unbind("load");
//             $(imgLoad).bind("load", function () {
//                 QueryLoader.imgCallback();
//             });
//             $(imgLoad).appendTo($(QueryLoader.preloader));
//         }
//     },

//     spawnLoader: function () {
//         if (QueryLoader.selectorPreload == "body") {
//             var height = $(window).height();
//             var width = $(window).width();
//             var position = "fixed";
//         } else {
//             var height = $(QueryLoader.selectorPreload).outerHeight();
//             var width = $(QueryLoader.selectorPreload).outerWidth();
//             var position = "absolute";
//         }
//         var left = $(QueryLoader.selectorPreload).offset()['left'];
//         var top = $(QueryLoader.selectorPreload).offset()['top'];

//         QueryLoader.overlay = $("<div></div>").appendTo($(QueryLoader.selectorPreload));
//         $(QueryLoader.overlay).addClass("QOverlay");
//         $(QueryLoader.overlay).css({
//             position: position,
//             top: top,
//             left: left,
//             width: width + "px",
//             height: height + "px"
//         });

//         QueryLoader.loadBar = $("<div></div>").appendTo($(QueryLoader.overlay));
//         $(QueryLoader.loadBar).addClass("QLoader");

//         $(QueryLoader.loadBar).css({
//             position: "relative",
//             top: "50%",
//             width: "0%"
//         });

//         QueryLoader.loadAmt = $("<div>0%</div>").appendTo($(QueryLoader.overlay));
//         $(QueryLoader.loadAmt).addClass("QAmt");

//         $(QueryLoader.loadAmt).css({
//             position: "relative",
//             top: "50%",
//             left: "50%"
//         });
//     },

//     animateLoader: function () {
//         var perc = (100 / QueryLoader.doneStatus) * QueryLoader.doneNow;
//         if (perc > 99) {
//             $(QueryLoader.loadAmt).html("100%");
//             $(QueryLoader.loadBar).stop().animate({
//                 width: perc + "%"
//             }, 500, "linear", function () {
//                 QueryLoader.doneLoad();
//             });
//         } else {
//             $(QueryLoader.loadBar).stop().animate({
//                 width: perc + "%"
//             }, 500, "linear", function () { });
//             $(QueryLoader.loadAmt).html(Math.floor(perc) + "%");
//         }
//     },

//     doneLoad: function () {
//         // IE
//         clearTimeout(QueryLoader.ieTimeout);


//         if (QueryLoader.selectorPreload == "body") {
//             var height = $(window).height();
//         } else {
//             var height = $(QueryLoader.selectorPreload).outerHeight();
//         }


//         $(QueryLoader.loadAmt).hide();
//         $(QueryLoader.loadBar).animate({
//             height: height + "px",
//             top: 0
//         }, 500, "linear", function () {
//             $(QueryLoader.overlay).fadeOut(800);
//             $(QueryLoader.preloader).remove();
//         });
//     }
// }