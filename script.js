var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 100;
var y = 10;
var s = new Image();
s.src = "s.png";
var l = new Image();
s.src = "l.png";
ctx.fillStyle = "#FF0000";
//test jenkins1
// ctx.fillRect(0,0, 100, 100);
// ctx.fillText("Hello", 10,10);
setInterval(refresh,1000);

function refresh() {
    // ctx.clearRect(0,0,800,800);
    ctx.drawImage(s,x,y,s.width*0.1,s.height*0.1);
    ctx.drawImage(l,x+20,y,l.width*0.1,l.height*0.1);
    // x++;
    y++;
}