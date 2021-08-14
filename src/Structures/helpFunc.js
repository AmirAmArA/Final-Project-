import Lightpath from "./Lightpath";
import Vertex from "../Structures/Vertex";

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}


const randN = (array) => {
    let len = array.length;

    let n = Math.floor(Math.random() * len - 3) + 3

    let result = new Array(n);
    let taken = new Array(n);
    if (n > len) {
        throw new RangeError('ERROR in length')
    }
    while (n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = array[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result.length > 1 ? result.sort((a, b) => a.index > b.index ? 1 : -1) : randN(array);
}


const createLightpaths = (optimalCirclesArr, vertexArr, edgeArr) => {
    let lightpaths = [];
    let validChains = [[], []];
    for (let i = 0; i < optimalCirclesArr.length; i++) {
        const circle = optimalCirclesArr[i];
        for (let count = 0; count < circle.length - 1; count++) {
            lightpaths.push(new Lightpath({ r: (((i + 50) * 1853) % 256), g: (((i + 50) * 1853) % 256), b: (((i + 50) * 1853) % 256) }, circle[count].index, circle[count + 1].index, lightpaths.length))

        }
        lightpaths.push(new Lightpath({ r: (((i + 50) * 1853) % 256), g: (((i + 50) * 1853) % 256), b: (((i + 50) * 1853) % 256) }, circle[circle.length - 1].index, circle[0].index, lightpaths.length))


    }
    lightpaths.forEach(lightpath => {
        lightpath.passing_edges = check_path(lightpath.startVertex, lightpath.endVertex, vertexArr, edgeArr)
    })
    return lightpaths

}

function check_path(v1, v2, vertex) {

    console.log(vertex[v1], vertex[v2]);

    let start = new Vertex();
    let target = new Vertex();
    let current = new Vertex();
    let edges_on_the_way = [];
    console.log("*******************");


    start = { ...vertex[v1] };
    target = { ...vertex[v2] };
    current = { ...start };

    while (!(JSON.stringify(target) === JSON.stringify(current))) {

        edges_on_the_way.push(current.edge2);
        current = { ...vertex[current.neighbor_vertex2] };
    }

    console.log(edges_on_the_way);
    return edges_on_the_way;

    // let temp = edge;

    // for (let i = 0; i < edges_on_the_way.length; i++) {

    // }
    // console.log(edges_on_the_way.filter(edge=> edge));
    // return edges_on_the_way;
}





export { randN, rand, createLightpaths };