//Initialize Paper JS on Window
paper.install(window);

//Drawing Tool (Object for Paper JS to function)
var tool1;

//Drawing Mode (0:Draw, 1:Erase)
var drawingMode = 0

//Current Color (Default is black)
var curColor = 'black';

//Keeping Drawing path on track for clear case
var allDrawingPath = [];

//Keeping Erase path on track to erase
var allErasePath = [];

//Erase Path contains array of mouse event point
var pathForErase;

//Drawing Path contains array of mouse event point
var currentPath;

//Current size of path, (Default is 5)
var curSize = 5;


$(document).ready(function(){
    $("#imgResult").hide();

    //Set up the paper JS on sheet div
    paper.setup('sheet');

    //Initialize Tool
    tool1 = new Tool();

    //Loading Paper JS and Spectrum configuration
    $.getScript("js/config-paper.js")
    $.getScript("js/config-spectrum.js")

    //Drawing
    $("#btnDraw").click(function(){
      drawingMode = 0;
      $("#sheet").css('cursor','auto');
      toogleButtonBackground($("#btnDraw"));
      // $("#btnDraw").css('background-color','#00BFFF');
      // $("#btnErase").css('background-color','buttonface');
    });

    //Clear drawing and erasing path, reset to Drawing
    $("#btnClear").click(function(){
      for(var i =0;i<allDrawingPath.length;i++){
        allDrawingPath[i].removeSegments();
      }
      for(var i =0;i<allErasePath.length;i++){
        allErasePath[i].removeSegments();
      }
      drawingMode = 0;
      $("#sheet").css('cursor','auto');
      toogleButtonBackground($("#btnDraw"));
    });

    //Erase
    $("#btnErase").click(function() {
          drawingMode = 1;
          $("#sheet").css('cursor','url(img/ic_eraser.png),auto');
          toogleButtonBackground($("#btnErase"));
    });

    //Background Name Array (Files are located /img)
    var backgroundNames = ["Blank","Sign","Tracing","Playing"];

    //Adding name and value to Dropdown list
    for(var i=0;i<backgroundNames.length;i++){
    $('#ddlSketchTemplate').append($("<option></option>")
                        .attr("value",backgroundNames[i])
                        .text(backgroundNames[i]));
    }


    $('#sheet').css("background-image", "url(img/blank.png)");
    $('#sheet').css("border-style", "solid double");


    //Set dropdown change event
    $("#ddlSketchTemplate").change(function() {
      //Clear background
      $( "#btnClear" ).trigger( "click" );
      //Selected background name
      var sketchName = $('#ddlSketchTemplate').val();

      //Set Background
      $('#sheet').css("background", "url(img/" +  sketchName + ".png)");
      $('#sheet').css("background-size", "cover");
      $('#sheet').css("background-repeat", "no-repeat");
      $('#sheet').css("background-position", "center center");

    });

    //Size
    for(var i=1;i<=50;i++){
     $('#ddlSize').append($("<option></option>")
                          .attr("value",i)
                          .text(i));
    }

    //Set Pen size to default
    $("#ddlSize").val(5);

    //Set dropdown change event
    $("#ddlSize").change(function() {
     curSize = $('#ddlSize').val();
    });

    //Save the current drawing to a result image
    $("#btnSave").click(function() {
      saveImage();
    });

    //Download image
    $("#imgResult").click(function(){
          var link = document.createElement('a');
          link.href = $("#imgResult").attr('src');
          link.download = 'Result.png';
          document.body.appendChild(link);
          link.click();
    });

    function toogleButtonBackground(btn){
      $("#btnDraw").css('background-color','buttonface');
      $("#btnErase").css('background-color','buttonface');
      btn.css('background-color','#00BFFF');

    }

    function saveImage(){
      $("#imgResult").show();
      //Reset drawing mode
      mode = 0;
      $("#sheet").css('cursor','auto');

      //Hidden canvas element to draw result image
      var c = document.getElementById("resultCanvas");
      ctx = c.getContext("2d");

      //Getting image data
      var dataURLSketch=c.toDataURL("image/png");;

      //Convert Background image to dataURL
      var background = new Image();

      //Loading Background, draw background, then draw sketch
      background.onload = function(){
          ctx.drawImage(background,0,0,$('#sheet').width(),$('#sheet').height());

          var canvasForDrawing = document.getElementById("sheet");
          var dataURLSketch = canvasForDrawing.toDataURL("image/png");

          var imgdrawing = new Image();
          imgdrawing.onload = function(){
            ctx.drawImage(imgdrawing,0,0,$('#sheet').width(),$('#sheet').height());
             var dataURL=c.toDataURL("image/png");
              $('#imgResult').attr('src' , dataURL);
          };
          imgdrawing.src = dataURLSketch;

      }
      background.src = $('#sheet').css("background-image").replace('url(','').replace(')','').replace(/\"/gi, "");
    }
});
