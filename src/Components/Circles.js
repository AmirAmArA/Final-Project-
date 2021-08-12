
import d3, { difference } from 'd3'


function drawedje(svg,start,cnt,radius,line,lineWidth){
    svg.append('svg:path')
        .attr('d',`M50 ${start} a ${radius} ${radius} 0 0 1 0 ${radius*2} a ${radius} ${radius} 0 0 1 0 ${radius*(-2)}`)
        .attr('fill','none')
        .attr('stroke','purple')
        .attr('stroke-width',`${lineWidth}`)
        .attr('stroke-dasharray',`0,${cnt},${line}, ${2*radius*Math.PI-cnt-line}`)
}


function circles(arr,globalVertises){

    let svg = d3.select('.svgpainter')
            .append('svg:svg')
            .attr('viewBox', '0 0 90 90');
    var length=arr.length
    var cnt=0

    for(let j = 0; j < length; j++){
        cnt=0
        let radius=20+(j*3)
        var line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
        let start=15-(j*3)

        for(let i = 0; i < arr[j].length; i++){
            line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
            let difference=arr[j][i].index
            if(i>0){
                difference=arr[j][i].index-arr[j][i-1].index
            }
            line=(line*difference)+difference
            drawedje(svg,start,cnt,radius,line,1)
            cnt+=line
            
            drawedje(svg,start,cnt,radius,0.5,3)
            cnt+=0.5
        }
        line=((2*radius*Math.PI)-(globalVertises/2))/(globalVertises)
        
        drawedje(svg,start,cnt,radius,(2*Math.PI*radius)-cnt,1)
        
        
    }
}


export function getSVG(circlesArr,globalVertises){
    circles(circlesArr,globalVertises)
}
