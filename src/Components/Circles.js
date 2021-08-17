
import d3 from 'd3'


function drawedje2(svg, start, cnt, radius, line, lineWidth, col = 'purple', index) {
    svg.append('svg:path')
        .attr('d', `M50 ${start} a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 ${radius * (-2)}`)
        .attr('fill', 'none')
        .attr('stroke', col)
        .attr('stroke-width', `${lineWidth}`)
        .attr('stroke-dasharray', `0,${cnt},${line}, ${2 * radius * Math.PI - cnt - line < 0.00001 ? 0 : 2 * radius * Math.PI - cnt - line}`)
        .attr('display', `none`)
        .attr('class', `p${index}`)
}


function drawedje(svg, start, cnt, radius, line, lineWidth, col = 'purple') {
    svg.append('svg:path')
        .attr('d', `M50 ${start} a ${radius} ${radius} 0 0 1 0 ${radius * 2} a ${radius} ${radius} 0 0 1 0 ${radius * (-2)}`)
        .attr('fill', 'none')
        .attr('stroke', col)
        .attr('stroke-width', `${lineWidth}`)
        .attr('stroke-dasharray', `0,${cnt},${line}, ${2 * radius * Math.PI - cnt - line}`)
}


function drawcircles(arr, globalVertises, nodesWidth, className = '.svgpainter') {

    let svg = d3.select(className)
        .append('svg:svg')
        .attr('viewBox', '0 0 90 90');
    var length = arr.length

    for (let j = 0; j < length; j++) {
        let cnt = 0
        let radius = 5 + (j * 3)
        var line = ((2 * radius * Math.PI) - (globalVertises / 2)) / (globalVertises)
        let start = 30 - (j * 3)

        for (let i = 0; i < arr[j].length; i++) {
            line = ((2 * radius * Math.PI) - (globalVertises / 2)) / (globalVertises)
            let difference = arr[j][i].index
            if (i > 0) {
                difference = arr[j][i].index - arr[j][i - 1].index
                line = (line * difference) + (difference / 2) - 0.5
            } else {
                if (difference === 0)
                    line = 0
                else
                    line = (line * difference) + (difference / 2)
            }
            drawedje(svg, start, cnt, radius, line, 1)
            cnt += line

            drawedje(svg, start, cnt, radius, 0.5, nodesWidth)
            cnt += 0.5
        }
        line = ((2 * radius * Math.PI) - (globalVertises / 2)) / (globalVertises)

        drawedje(svg, start, cnt, radius, (2 * Math.PI * radius) - cnt, 1)


    }
    return svg
}


export function getSVG(circlesArr, globalVertises) {
    let svg = drawcircles(circlesArr, globalVertises, 3)
}


function cross(LPaths1, LPaths2) {
    for (var i = 0; i < LPaths1.length; i++)
        for (var j = 0; j < LPaths2.length; j++)
            if (LPaths1[i] == LPaths2[j]) {
                return true
            }

    return false
}


export function shuffle(a) {
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}

export function wait(ms) {
    var start = Date.now(),
        now = start;
    while (now - start < ms) {
        now = Date.now();
    }

}

const _ = require('lodash');
export function f(mainCircle, LParr, globalVertises) {
    let circles = []
    let svg = drawcircles(mainCircle, globalVertises, 3, '.svgpainter2')
    console.log(LParr)
    console.log('-------*****----------***--------------*****--------')
    console.log(circles)

    // get each light path one by one and put it in a circle
    LParr.forEach(LP => {
        let appended = false

        console.log(_.cloneDeep(circles))
        // for each circle check if there is room for current light path
        circles.forEach((circle, index) => {
            if (appended) {
                return
            }
            let newCircle = false
            circle.forEach(LPinCircle => {
                if (newCircle)
                    return
                if (cross(LP.passing_edges, LPinCircle.passing_edges))
                    newCircle = true
            })

            if (newCircle) {
                return
            }

            circle.forEach(LPinCircle => {
                if (appended) {
                    return
                }

                if (cross([LPinCircle.startVertex, LPinCircle.endVertex], [LP.startVertex, LP.endVertex])) {
                    // append the current light path to the current circle
                    appended = true
                    circles[index].push(LP)


                    let start = 30 - ((index + 1) * 3)
                    let radius = 5 + ((index + 1) * 3)
                    let line = ((2 * radius * Math.PI)) / (globalVertises)
                    LP.wavelength.r = LPinCircle.wavelength.r
                    LP.wavelength.g = LPinCircle.wavelength.g
                    LP.wavelength.b = LPinCircle.wavelength.b

                    LP.passing_edges.forEach(edge => {
                        //wait('2000')

                        drawedje(svg, start, edge * line, radius, line, 3, `rgb(${LPinCircle.wavelength.r},${LPinCircle.wavelength.g},${LPinCircle.wavelength.b})`)
                    })

                    return
                }
            })

        });

        if (!appended) {
            circles.push([LP])


            let start = 30 - ((circles.length) * 3)
            let radius = 5 + ((circles.length) * 3)
            let line = ((2 * radius * Math.PI)) / (globalVertises)
            LP.passing_edges.forEach(edge => {
                //wait('2000')

                drawedje(svg, start, edge * line, radius, line, 3, `rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`)
            })


        }


    });

    console.log('------------------------------------')
    //console.log(circles)
    drawVerteses(circles, svg, globalVertises)

}



function drawVerteses(circles, svg, globalVertises) {
    circles.forEach((circle, index) => {
        circle.forEach(LP => {
            let start = 30 - ((index + 1) * 3)
            let radius = 5 + ((index + 1) * 3)
            let line = ((2 * radius * Math.PI)) / (globalVertises)

            drawedje2(svg, start, LP.startVertex * line, radius, 0.5, 3, 'red', `${LP.index}999`)
            drawedje2(svg, start, LP.endVertex * line, radius, 0.5, 3, 'red', `${LP.index}999`)
        })
    });
}


function drawLP(LP, index, globalVertises, svg, LPindex) {
    let start = 30 - ((index) * 3)
    let radius = 5 + ((index) * 3)
    let line = ((2 * radius * Math.PI)) / (globalVertises)

    LP.passing_edges.forEach(edge => {
        drawedje2(svg, start, edge * line, radius, line, 3, `rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`, LPindex)
    })
}

function checkCrossVerteses(LP, circle) {
    for (var i = 0; i < circle.length; i++) {
        if (cross([circle[i].startVertex, circle[i].endVertex], [LP.startVertex, LP.endVertex])) {
            return true
        }
    }
    return false
}

export function f1(mainCircle, LParr, globalVertises, edgeCNT) {
    let circlesByLp = []
    let circlesByPassingEdges = []
    let svg = drawcircles(mainCircle, globalVertises, 3, '.svgpainter3')

    LParr.forEach((LP, LPindex) => {
        LP.index = LPindex
        let appended = false
        circlesByPassingEdges.forEach((circle, index) => {
            if (appended) {
                return
            }
            if ((!cross(LP.passing_edges, circle)) && checkCrossVerteses(LP, circlesByLp[index])) {

                circlesByPassingEdges[index] = circlesByPassingEdges[index].concat(LP.passing_edges)
                circlesByLp[index].push(LP)

                LP.wavelength.r = circlesByLp[index][0].wavelength.r
                LP.wavelength.g = circlesByLp[index][0].wavelength.g
                LP.wavelength.b = circlesByLp[index][0].wavelength.b
                drawLP(LP, index + 1, globalVertises, svg, LPindex)

                appended = true
            }
        })
        if (!appended) {
            circlesByPassingEdges.push(LP.passing_edges)
            circlesByLp.push([LP])
            drawLP(LP, circlesByLp.length, globalVertises, svg, LPindex)
        }
    })
    drawVerteses(circlesByLp, svg, globalVertises)
    return countADMsOnline(circlesByLp, edgeCNT)
}


const countADMsOnline = (circlesByLp, edgeCNT) => {
    let countADMs = 0;
    console.log('i am herre');
    console.log(circlesByLp);
    circlesByLp.forEach(circle => {
        let edgeCounter = 0
        circle.forEach(lightpath => edgeCounter = lightpath.passing_edges.length + edgeCounter)
        edgeCounter === edgeCNT ? countADMs = countADMs + circle.length : countADMs = countADMs + circle.length + 1
    })
    return countADMs;
}