const width = 500,
  height = 500;

const form = document.getElementById("form");

let ellipseToDraw = [];
let startingX, startingY, startingDiameter;
startingX = width / 2;
startingY = height / 2;
startingDiameter = height > width ? width : height;

let ammt = 100;
let inverseRatio = 1;

form["circles"].value = ammt;
form["inverseRatio"].value = inverseRatio;
form["circles"].onchange = ()=>form.onsubmit({preventDefault(){},target:form});
form["inverseRatio"].onchange = ()=>form.onsubmit({preventDefault(){},target:form});

form.onsubmit = (e)=>{
    e.preventDefault();
    let circles = parseInt(e.target["circles"].value);
    if(typeof circles == 'number'){
        ammt = circles;
    }

    let inverseRatioAux = parseFloat(e.target["inverseRatio"].value);
    if(typeof inverseRatioAux == 'number'){
        inverseRatio = inverseRatioAux
    }

}



function setup() {
  createCanvas(width, height);
}

function draw() {
    noFill();
    stroke(0);
    background(220);
    ellipse(startingX, startingY, startingDiameter);
    
    for (let i = 0; i < ammt; i++) {
        //angle at which the arc is placed
        let aux = ((2 * PI) / ammt) * i ;
        let e = new Ellipse();
        //set the center of the arc and diameter
        e.x = (Math.cos(aux) * startingDiameter) / 2 + startingX;
        e.y = (Math.sin(aux) * startingDiameter) / 2 + startingY;
        e.d = startingDiameter/inverseRatio;
        aux+=PI;

        let alfa = Math.acos(1/2 * e.d/startingDiameter)
        e.sa = aux - alfa;
        e.fa = aux + alfa;
        arc(e.x, e.y, e.d, e.d, e.sa, e.fa);
    }
}

class Ellipse {
  //center x
  x;
  //center y
  y;
  //diameter
  d;
  //starting angle
  sa;
  //finishing angle
  fa;
}

