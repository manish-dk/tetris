var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 100;
var y = 10;
var s = new Image();
var w = 600;
var h = 800;
var p = 10;
s.src = "s.png";
var l = new Image();
s.src = "s.png";
ctx.fillStyle = "#FF0000";
//test jenkins1
// ctx.fillRect(0,0, 100, 100);
// ctx.fillText("Hello", 10,10);
setInterval(refresh,1000);

function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawboard();
    drawCurrent();
    // ctx.clearRect(0,0,800,800);
    
}

function drawboard() {
    ctx.beginPath();
    ctx.lineWidth=0.01;
    for(let start = 0; start < w; start+=p ) {
        ctx.moveTo(start+0.5,0.5);
        ctx.lineTo(start,h);
        ctx.strokeStyle = "grey";
        
        ctx.stroke();
    }
    for(let start = 0; start < h; start+=p ) {
        ctx.moveTo(0.5,start+0.5);
        ctx.lineTo(w,start);
        ctx.strokeStyle = "grey";
        ctx.stroke();
    }

}

function drawCurrent() {
    ctx.drawImage(s,x,y,p*2,p*2);
    // ctx.drawImage(l,x+20,y,l.width*0.1,l.height*0.1);
    // x++;
    y= y<110 ? y+p : 110;
    console.log(y);
}