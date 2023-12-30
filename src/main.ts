
import p5 from "p5";


// const WebR=require("webr");

import { RFunction, WebR } from 'webr';

const element=document.querySelector("#app")
const loading=document.querySelector("#loading")

loading?.classList.remove("hidden")

const webR = new WebR();


// await webR.init();


// let rFunction=await fetch("/R/script.r");

// webR.evalR(await rFunction.text())

// let  prt=await webR.evalR('p') as RFunction;

// console.log(await prt("hello world"));

loading?.classList.add("hidden")


let p=new p5((p:p5) =>{
    let data: number[][]=[];
    const plane=[1,5,2]
    let planeI=0;
    let planeP=0;
    
    const scaleFactor=5;
    const dSquare=100;
    let square= 100
    const smallSquaresCount=5;
    let done=false;
    let originX=0;
    let originY=0;

    let endpoints: number[][]=[];
    let pg:p5.Graphics;
    let width=p.width;
    let height=p.height;
    let mouseX=-10;
    let mouseY=-10;
    let pmouseX=-10;
    let pmouseY=-10;
    let drawMode=false;
    let selectMode=false;
    let reDraw=false;


    function numberFormat(x:number,sp?:boolean){
        if (planeP<0 || sp){
            if (planeP<-5 || planeP>3){
                return x.toExponential(1);
            }else if (sp){  
                if (planeP){
                    return x.toFixed(2)  
                }else{
                    return x.toFixed(3)  
                }
            }else{
                return x.toFixed(p.abs(planeP));     
            }
        }else{
            if (planeP>=5){
                return x.toExponential(1);
            }else{
                return x.toString();
            }
        }
    }
    function draw(){
        pg.stroke(219,118,117)
        pg.strokeWeight(2)
        if (p.mouseIsPressed){
                if (mouseX===-10){
                    mouseX=p.mouseX
                    mouseY=p.mouseY
                    pmouseX=p.pmouseX;
                    pmouseY=p.pmouseY;
                }
                if (p.mouseX>p.pmouseX){
                    pmouseX=mouseX;
                    mouseX+=(p.mouseX-p.pmouseX)*0.8;
                    pmouseY=mouseY
                    mouseY+=(p.mouseY-p.pmouseY)*0.8;
                }
                let pI=plane[planeI];
                let power=p.pow(10,planeP)
                let sc=pI*power;
                if (data.length>=1){
                    if (mouseX!==(data[data.length-1][0]*square/sc+originX)|| mouseY!== (-(data[data.length-1][1]*square/sc)+originY)){
                        pg.line(mouseX,mouseY,pmouseX,pmouseY);          
                        data.push([(mouseX-originX)*sc/square,(originY-mouseY)*sc/square])
                    }
                }else{
                    pg.line(mouseX,mouseY,pmouseX,pmouseY);
                    data.push([(mouseX-originX)*sc/square,(originY-mouseY)*sc/square])
                }
                // console.log(data);
                
                // if (data.length>1){
                    // if (data[data.length-1][0]!==mouseX || data[data.length-1][1]!==mouseY){
                        // console.log("hello");
                        
                    // }
                // }
                

        }else{
            mouseX=p.mouseX
            pmouseX=p.pmouseX;
            pmouseY=p.pmouseY;
            mouseY=p.mouseY
        }

        // p.scale(2)
        p.circle(mouseX,mouseY,5)
        p.image(pg,0,0)
        p.fill(153,153,153)
    }
    function drawSmallSquares(pSquareX:number,pSquareY:number){
        let smallSquare=square/smallSquaresCount;
        p.stroke(50,51,52)
        for (let e=0;e<smallSquaresCount;e++){
            for (let d=0; d<smallSquaresCount;d++){
                p.square(pSquareX+d*smallSquare,pSquareY+e*smallSquare,smallSquare)
            }
        }
        
    }
    p.setup=()=>{
        p.createCanvas(element!.clientWidth,element!.clientHeight).parent(element!)
        p.background(24,26,27)
        pg=p.createGraphics(element!.clientWidth,element!.clientHeight);
        pg.clear()
        originX=p.width/2;
        originY=p.height/2
        width=p.width;
        height=p.height
    }
    function drawPlane(){

        if (p.mouseIsPressed&&!drawMode&&!selectMode){
            reDraw=true;
            originX+=(p.mouseX-p.pmouseX);
            originY+=(p.mouseY-p.pmouseY);
        }
        p.background(24,26,27)
        let squaresInWidth=p.ceil(width/square)
        let squaresInHeight=p.ceil(height/square)
        
        p.noFill()
        p.stroke(110,111,112)
        let numberOfLatestSquareW=p.ceil(originX/square);
        let numberOfLatestSquareH=p.ceil(originY/square);

        for (let j=0;j<=squaresInWidth;j++){
            for (let i=0 ; i<=squaresInHeight;i++){
                drawSmallSquares(originX-square*(numberOfLatestSquareW-j),originY-square*(numberOfLatestSquareH-i))   
                p.stroke(110,111,112)
                p.square(originX-square*(numberOfLatestSquareW-j),originY-square*(numberOfLatestSquareH-i),square)
                if (originX-square*(numberOfLatestSquareW-j)===originX || originY-square*(numberOfLatestSquareH-i)===originY){
                    p.fill(218,220,218)
                    p.stroke(0)
                    p.strokeWeight(3)
                    p.textSize(14)
                    p.textAlign("right")
                    
                    if (originX-square*(numberOfLatestSquareW-j)===originX && originY-square*(numberOfLatestSquareH-i)===originY){
                        p.text("0",originX-square*(numberOfLatestSquareW-j)-(square/(smallSquaresCount))/2,originY-square*(numberOfLatestSquareH-i)+(square/(smallSquaresCount)))
                    }else if (originX-square*(numberOfLatestSquareW-j)===originX ){                                
                        p.text(numberFormat((numberOfLatestSquareH-i)*(plane[planeI]*p.pow(10,planeP))),originX-square*(numberOfLatestSquareW-j)-(square/(smallSquaresCount))/2,originY-square*(numberOfLatestSquareH-i)+(square/(smallSquaresCount*4)))
                    } else{
                        p.textAlign("center")
                        p.text(numberFormat((j-numberOfLatestSquareW)*(plane[planeI]*p.pow(10,planeP))),originX-square*(numberOfLatestSquareW-j)-(square/(smallSquaresCount))*0,originY-square*(numberOfLatestSquareH-i)+(square/(smallSquaresCount)))

                    }
                    p.noFill()
                    p.strokeWeight(1)
                }
            }
        }
        p.stroke(218,220,218)
        if (originX<=width && originX>=0){
            p.line(originX,0,originX,height)
        }
        p.line(0,originY,width,originY)
    }
    p.draw = ()=>{

        drawPlane()

        if (done){
            if (reDraw){
                pg.clear()
                pg.stroke(219,118,117)
                pg.strokeWeight(4)
                let pI=plane[planeI]
                let power=p.pow(10,planeP);
                let sc=pI*power;
                for (let i=1;i<data.length;i++){
                    pg.line(data[i-1][0]*square/sc+originX,-data[i-1][1]/sc*square+originY,data[i][0]*square/sc+originX,-data[i][1]*square/sc+originY)
                }
                reDraw=false;
            }
            p.image(pg,0,0)
            if (pg.get(p.mouseX,p.mouseY)[0]!==0){
                let pI=plane[planeI];
                let power=p.pow(10,planeP)
                let sc=pI*power;
                p.fill(170,230)
                p.strokeCap("round")
                p.rect(p.mouseX-150,p.mouseY-15,140,40,10);
                p.fill(0,200)
                p.stroke(0,200)
                p.textSize(15)
                p.text(`(${numberFormat((p.mouseX-originX)*sc/square,true)} , ${numberFormat((originY-p.mouseY)*sc/square,true)})`,p.mouseX-80,p.mouseY+10)
                p.noFill()
            }
            if (selectMode){
                p.fill(84,140,140)
                // p.noStroke()
                p.circle(p.mouseX,p.mouseY,10);

            }
            
            
            endpoints.forEach((e)=>{
                let pI=plane[planeI];
                let power=p.pow(10,planeP)
                let sc=pI*power;
                p.fill(84,140,140)
                p.stroke(0,200)
                p.circle(e[0]*square/sc+originX,-e[1]*square/sc+originY,12)
                console.log("----------------------------------------");
                console.log(endpoints);
                
                
            })
            
        }else{
            if (drawMode){
                draw()
            }
            p.image(pg,0,0)
        }
        // }else{
            // }
        
    }
    p.mouseClicked=()=>{
        let pI=plane[planeI];
        let power=p.pow(10,planeP)
        let sc=pI*power;
        if (endpoints.length<2&&selectMode){
            endpoints.push([(p.mouseX-originX)*sc/square,(originY-p.mouseY)*sc/square])
        }        
    } 

    p.mouseReleased =()=>{
        if (drawMode){
            done=true;
            drawMode=false;
        }
    }
    p.mouseWheel=(e:any)=>{
    // let mouseWheel=(e:any)=>{
        reDraw=true;
        if (e.deltaY>0){
            
                originX-=scaleFactor*(p.mouseX-originX)/square
                originY-=scaleFactor*(p.mouseY-originY)/square
                square+=scaleFactor;
                
            }else if (e.deltaY<0){
                // if (square===dSquare){
                //     if (planeI===plane.length-1){
                //         originX+=((p.mouseX-originX)/4)
                //         originY+=((p.mouseY-originY)/4)
                //     }
                // }
                // 
                if (square===dSquare){
                    originX+=scaleFactor*((p.mouseX-originX)/(square*2))
                    originY+=scaleFactor*((p.mouseY-originY)/(square*2))
                }else{
                    originX+=scaleFactor*((p.mouseX-originX)/(square))
                    originY+=scaleFactor*((p.mouseY-originY)/(square))
                }
                square-=scaleFactor;
            }
            
            if (square===dSquare*2){
              
              if (planeI===1){
                  originX-=((p.mouseX-originX)/4)
                  originY-=((p.mouseY-originY)/4)

                }
                // else{
                  // originX-=scaleFactor*(p.mouseX-originX)/square
                // }
                square=dSquare

                // console.log("-------------------------------------");
                // console.log(p.mouseX);
                // console.log(originX);
                
                // console.log(scaleFactor*(p.mouseX-originX)/square);
                
                if (planeI===0){
                    planeP--;
                    // scale+=1;
                    
                }

                if (planeI===plane.length-1){
                    planeI=0;
                }else{
                    planeI++;
                }
            }
            if (square<dSquare){
                if(planeI===plane.length-1){
            //   //   //   console.log("hello");
                  
                  originX+=((p.mouseX-originX)/5)
                  originY+=((p.mouseY-originY)/5)
               }            
            

                square=dSquare*2-scaleFactor;
                
                if (planeI===0){
                    planeI=plane.length-1;
                }else{
                    planeI--;
                }

                if (planeI===0){
                    planeP++;
                    // if (scale<=1){
                    //     scale-=0.5;
                    // }else{
                    //     scale-=1
                    // }
                }
             }  
    } 
    p.keyPressed=(e:any)=>{
        
        if (e.key==="d"){
            if (!done){
                drawMode=!drawMode;
            }else{
                drawMode=false;
            }
        }else if(e.key==="s"&&done){
            selectMode=!selectMode;
        }
        
    }  
})



// export {};