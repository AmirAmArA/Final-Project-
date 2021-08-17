import d3 from 'd3'

function aadrawLPline(svg,start,end,indexOfLevel,lineWidth,col){
    svg.append('svg:line')
        .attr('x1',`${start}`)
        .attr('y1',`${indexOfLevel*3}`)
        .attr('x2',`${end}`)
        .attr('y2',`${indexOfLevel*3}`)
        .attr('stroke',col)
        .attr('stroke-width',`${lineWidth}`)
}

// function drawLPline2(svg,indexInLevel,indexOfLevel,line,lineWidth){
//     svg.append('svg:line')
//         .attr('x0',`${indexInLevel*line}`)
//         .attr('y0',`${indexOfLevel}`)
//         .attr('x1',`${indexInLevel*(line+1)}`)
//         .attr('y1',`${indexOfLevel}`)
//         .attr('stroke-width',`${lineWidth}`)
//         .attr('display',`none`)
//         .attr('class',`p${index}`)
// }

function drawLPline(svg,start,end){
    
}

export function optimalLines(levels,globalVerticies){
    let svg = d3.select('.svgpainter')
            .append('svg:svg')
            .attr('height', '1000')
            .attr('width', '1000');

    let lineLenght=900/globalVerticies

    levels.forEach((lightPaths,indexOfLevel) => {
        for(var i=0;i<lightPaths.length-1;i++){
            var indexInLp=lightPaths[i].index
            aadrawLPline(svg,indexInLp*lineLenght,(indexInLp+1)*lineLenght,indexOfLevel,100,'red')
            aadrawLPline(svg,indexInLp*lineLenght,(indexInLp*lineLenght)+20,indexOfLevel,100,'black')
            aadrawLPline(svg,(indexInLp+1)*lineLenght,((indexInLp+1)*lineLenght)+20,indexOfLevel,100,'black')
        }
        
        
    });
}

// export function onlineCircles(LParr,globalVerticies){
//     let svg = d3.select('.svgpainter2')
//             .append('svg:svg')
//             .attr('height', '1000')
//             .attr('width', '1000');


//     let levelsByPassingEdges=[]
//     let levelsByLP=[]
//     LParr.forEach(LP=>{
//         levels.forEach(level=>{
//             if(level)
//         })
//     })



    

//     let lineLenght=900/globalVerticies

//     levels.forEach((lightPaths,indexOfLevel) => {
//         for(var i=0;i<lightPaths.length-1;i++){
//             var indexInLp=lightPaths[i].index
//             aadrawLPline(svg,indexInLp*lineLenght,(indexInLp+1)*lineLenght,indexOfLevel,100,'red')
//             aadrawLPline(svg,indexInLp*lineLenght,(indexInLp*lineLenght)+20,indexOfLevel,100,'black')
//             aadrawLPline(svg,(indexInLp+1)*lineLenght,((indexInLp+1)*lineLenght)+20,indexOfLevel,100,'black')
//         }
        
        
//     });
// }