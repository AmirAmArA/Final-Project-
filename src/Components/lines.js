import d3 from 'd3'
import {cross,checkCrossVerteses} from './Circles'

function aadrawLPline(svg,start,end,indexOfLevel,lineWidth,col){
    svg.append('svg:line')
        .attr('x1',`${start}`)
        .attr('y1',`${indexOfLevel*50}`)
        .attr('x2',`${end}`)
        .attr('y2',`${indexOfLevel*50}`)
        .attr('stroke',col)
        .attr('stroke-width',`${lineWidth}`)
}

function aadrawLPline2(svg,start,end,indexOfLevel,lineWidth,col,LPindex){
    svg.append('svg:line')
        .attr('x1',`${start}`)
        .attr('y1',`${indexOfLevel*3}`)
        .attr('x2',`${end}`)
        .attr('y2',`${indexOfLevel*3}`)
        .attr('stroke',col)
        .attr('stroke-width',`${lineWidth}`)
        // .attr('display',`none`)
        // .attr('class',`p${LPindex}`)
}

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
            aadrawLPline(svg,indexInLp*lineLenght,(indexInLp+1)*lineLenght,indexOfLevel,30,'red')
            aadrawLPline(svg,indexInLp*lineLenght,(indexInLp*lineLenght)+20,indexOfLevel,30,'black')
            aadrawLPline(svg,(indexInLp+1)*lineLenght,((indexInLp+1)*lineLenght)+20,indexOfLevel,30,'black')
        }
        
        
    });
}

// function drawVerteses(levels,svg,globalVertises){
//     circles.forEach((circle,index)=>{
//         circle.forEach(LP=>{
//             let start=30-((index+1)*3)
//             let radius=5+((index+1)*3)
//             let line=((2*radius*Math.PI))/(globalVertises)
            
//             drawedje2(svg,start,LP.startVertex*line,radius,0.5,3,'red',`${LP.index}999`)
//             drawedje2(svg,start,LP.endVertex*line,radius,0.5,3,'red',`${LP.index}999`)
//         })
//     });
// }

export function onlineLines(LParr,globalVerticies){
    let lineLenght=900/globalVerticies
    let svg = d3.select('.svgpainter2')
                .append('svg:svg')
                .attr('height', '1000')
                .attr('width', '1000');


    let levelsByPassingEdges=[]
    let levelsByLP=[]
    LParr.forEach((LP,LPindex)=>{
        let appended=false
        levelsByPassingEdges.forEach((level,index)=>{
            if(appended){
                return
            }
            if(!cross(level,LP.passing_edges) && checkCrossVerteses(LP,levelsByLP[index])){
                levelsByPassingEdges[index]=levelsByPassingEdges[index].concat(LP.passing_edges)
                levelsByLP[index].push(LP)

                LP.wavelength.r=levelsByLP[index][0].wavelength.r
                LP.wavelength.g=levelsByLP[index][0].wavelength.g
                LP.wavelength.b=levelsByLP[index][0].wavelength.b

                LP.passing_edges.forEach(partOfLP=>{
                    aadrawLPline2(svg,partOfLP*lineLenght,(partOfLP*lineLenght),index+1,100,'red',LPindex)
                    aadrawLPline2(svg,partOfLP*lineLenght,(partOfLP*lineLenght)+20,index+1,100,'black',LPindex)
                    aadrawLPline2(svg,(partOfLP+1)*lineLenght,((partOfLP+1)*lineLenght)+20,index+1,100,'black',LPindex)
                })
                
                appended=true

            }
        })

        if(!appended){
            levelsByPassingEdges.push(LP.passing_edges)
            levelsByLP.push([LP])
            LP.passing_edges.forEach(partOfLP=>{
                aadrawLPline2(svg,partOfLP*lineLenght,(partOfLP*lineLenght),levelsByPassingEdges.length,100,`rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`,LPindex)
                aadrawLPline2(svg,partOfLP*lineLenght,(partOfLP*lineLenght)+20,levelsByPassingEdges.length,100,'black',LPindex)
                aadrawLPline2(svg,(partOfLP+1)*lineLenght,((partOfLP+1)*lineLenght)+20,levelsByPassingEdges.length,100,'black',LPindex)
            })
            
        }
    })

    //drawVerteses(levels,svg,globalVertises)

}