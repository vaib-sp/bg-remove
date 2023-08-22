// window.addEventListener('load', InitThis)

var mousePressed = false;
var lastX, lastY;
var ctx;

export default function InitThis() {
    console.log("here");
    ctx = document.getElementById('myCanvas').getContext("2d");
    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        if (mousePressed) {
            mousePressed = false;
            cPush();
        }
    });

    $('#myCanvas').mouseleave(function (e) {
        if (mousePressed) {
            mousePressed = false;
            cPush();
        }
    });
    drawImage();
}

function drawImage() {
    var image = new Image();
    image.src = './public/2.webp';
    $(image).load(function () {
        ctx.drawImage(image, 0, 0, 600, 400);
        cPush();
    });    
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = $('#selWidth').val();
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

var cPushArray = new Array();
var cStep = -1;

function cPush() {
    cStep++;
    if (cStep < cPushArray.length) { cPushArray.length = cStep; }
    cPushArray.push(document.getElementById('myCanvas').toDataURL());
    document.title = cStep + ":" + cPushArray.length;
}
function cUndo() {
    if (cStep > 0) {
        cStep--;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
    }
}
function cRedo() {
    if (cStep < cPushArray.length-1) {
        cStep++;
        var canvasPic = new Image();
        canvasPic.src = cPushArray[cStep];
        canvasPic.onload = function () { ctx.drawImage(canvasPic, 0, 0); }
        document.title = cStep + ":" + cPushArray.length;
    }
}




























import "./style.css";

var url = "./public/1.jpg";
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var img = new Image();
var dwn = document.getElementById("dwn");


// img.setAttribute('crossorigin', 'anonymous');
img.src = url;
img.onload = function () {
  var width = Math.min(500, img.width);
  var height = img.height * (width / img.width);

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
};

var isPress = false;
var old = null;
canvas.addEventListener("mousedown", function (e) {
  isPress = true;
  old = { x: e.offsetX, y: e.offsetY };
});
canvas.addEventListener("mousemove", function (e) {
  if (isPress) {
    var img = canvas.toDataURL("image/png");
    dwn.href = img

    var x = e.offsetX;
    var y = e.offsetY;
    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fill();

    ctx.lineWidth = 20;
    ctx.beginPath();
    ctx.moveTo(old.x, old.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    old = { x: x, y: y };
  }
});
canvas.addEventListener("mouseup", function (e) {
  isPress = false;
});

dwn.addEventListener("click", function (e) {
  var img = canvas.toDataURL("image/png");
  document.write('<img src="' + img + '"/>');
});



