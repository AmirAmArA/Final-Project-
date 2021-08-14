
import d3 from 'd3'


function drawedje(svg,start,cnt,radius,line,lineWidth,col='purple'){
    svg.append('svg:path')
        .attr('d',`M50 ${start} a ${radius} ${radius} 0 0 1 0 ${radius*2} a ${radius} ${radius} 0 0 1 0 ${radius*(-2)}`)
        .attr('fill','none')
        .attr('stroke',col)
        .attr('stroke-width',`${lineWidth}`)
        .attr('stroke-dasharray',`0,${cnt},${line}, ${2*radius*Math.PI-cnt-line}`)
}


function drawcircles(arr,globalVertises,nodesWidth,className='.svgpainter'){

    let svg = d3.select(className)
            .append('svg:svg')
            .attr('viewBox', '0 0 90 90');
    var length=arr.length
    var cnt=0

    for(let j = 0; j < length; j++){
        cnt=0
        let radius=5+(j*3)
        var line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
        let start=30-(j*3)

        for(let i = 0; i < arr[j].length; i++){
            line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
            let difference=arr[j][i].index
            if(i>0){
                difference=arr[j][i].index-arr[j][i-1].index
                line=(line*difference)+(difference/2)-0.5
            }else{
                if(difference==0)
                    line=0
                else
                    line=(line*difference)+(difference/2)
            }
            drawedje(svg,start,cnt,radius,line,1)
            cnt+=line
            
            drawedje(svg,start,cnt,radius,0.5,nodesWidth)
            cnt+=0.5
        }
        line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
        
        drawedje(svg,start,cnt,radius,(2*Math.PI*radius)-cnt,1)
        
        
    }
    return svg
}


export function getSVG(circlesArr,globalVertises){
    drawcircles(circlesArr,globalVertises,3)
}


function cross(LPaths1,LPaths2){
    for(var i=0;i<LPaths1;i++)
        for(var j=0;j<LPaths2;j++)
            if(LPaths1[i]==LPaths2[j]){
                return true
            } 

    return false
}

  

export function f(mainCircle,LParr,globalVertises){
    let circles=[]
    let svg=drawcircles(mainCircle,globalVertises,100,'.svgpainter2')
    
    
    LParr.forEach(LP => {
        let appended=false
        circles.forEach((circle,index)=>{
            let newCircle=false
            circle.forEach(LPinCircle=>{
                if(newCircle){
                    return
                }
                if(cross(LP.passing_edges,LPinCircle.passing_edges)){
                    newCircle=true
                }
            })
            if(newCircle){
                return
            }
            circle.forEach(LPinCircle=>{
                if(cross([LPinCircle.startVertex,LPinCircle.endVertex],[LP.startVertex,LP.endVertex])){
                    appended=true
                    circle.push(LP)




                    let start=30-((index+1)*3)
                    let radius=5+((index+1)*3)
                    
                    let line=((2*radius*Math.PI))/(globalVertises)
                    line=line*(LP.endVertex-LP.startVertex)
                    let cnt=line*LP.startVertex
                    drawedje(svg,start,cnt,radius,line,1,`rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`)
                    return
                }
            })
        });
        if(!appended){
            circles.push([LP])
            let start=30-((circles.length)*3)
            let radius=5+((circles.length)*3)
            
            let line=((2*radius*Math.PI))/(globalVertises)
            line=line*(LP.endVertex-LP.startVertex)
            let cnt=line*LP.startVertex
            drawedje(svg,start,cnt,radius,line,1,`rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`)
        }
    });
}