var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var x = 100;
var y = 10;
var current = new Image();
var images = ["s.png","l.png","line.png","t.png"]
current.src = images[Math.floor(Math.random()*images.length)];
var w = 600;
var h = 800;
var p = 10;

var blocks = [];
ctx.fillStyle = "#FF0000";
//test jenkins1
// ctx.fillRect(0,0, 100, 100);
// ctx.fillText("Hello", 10,10);
setInterval(refresh,1000);

function refresh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawboard();
    drawCurrent();
    drawBlocks();
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
    ctx.drawImage(current,x,y,p*2,p*2);
    // ctx.drawImage(l,x+20,y,l.width*0.1,l.height*0.1);
    // x++;
    let img = new Image();
    img.src = current.src;
    y= y<110 ? y+p : 110;
    if(y==110) {
        block = {image:img,
                    x:x,
                    y:y    
                };
        x=100;
        y=10;
        current.src= images[Math.floor(Math.random()*images.length)];
        blocks.push(block);
    }
    console.log(blocks[0]);
}

function drawBlocks() {
    for(let i=0;i<blocks.length;i++) {
        ctx.drawImage(blocks[i].image,blocks[i].x,blocks[i].y,p*2,p*2);
    
    }
}

window.onkeydown = function(event) {
    if(x>0 && event.keyCode == 37) {
        x-=p;
        refresh();
    }
    if(x>0 && event.keyCode == 39) {
        x+=p;
        refresh();
    }
    if(x>0 && event.keyCode == 40) {
        y+=p;
        refresh();
    }
}