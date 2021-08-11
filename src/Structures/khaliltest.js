import Vertex from "../Structures/Vertex";
import Edge from "../Structures/Edge";

let vertexCount = 10;
let vertexArr = [];
let edgeArr = [];
let lightpathArr = [];

const produceGraph = () => {

    for (let i = 0; i < vertexCount; i++) {
        switch (i) {
            case 0:
                vertexArr.push(new Vertex.Vertex(vertexCount - 1, i, vertexCount - 1, i + 1, 0, i));
                edgeArr.push(new Edge.Edge(vertexCount - 1, i, i, i + 1));
                break;
            case vertexCount - 1:
                vertexArr.push(new Vertex.Vertex(i - 1, vertexCount - 1, i - 1, 0, 0, i));
                edgeArr.push(new Edge.Edge(vertexCount - 1 - 1, 0, vertexCount - 1, 0));
                break;
            default:
                vertexArr.push(new Vertex.Vertex(i - 1, i, i - 1, i + 1, 0, i));
                edgeArr.push(new Edge.Edge(i - 1, i + 1, i, i + 1));
                break;
        }
    }

    check_path(5, 8, vertexArr, 1);

};



function check_path(v1, v2, varr, toplogy) {

    console.log(varr[v1], varr[v2]);

    let start = new Vertex.Vertex();
    let target = new Vertex.Vertex();
    let current = new Vertex.Vertex();
    let edges_on_the_way = [];
    console.log("*******************");


    if (v1 < v2) {
        start = { ...varr[v1] };
        target = { ...varr[v2] };
    } else {
        start = { ...varr[v2] };
        target = { ...varr[v1] };
    }

    console.log(start);
    current = { ...start };

    console.log(current);

    while (!(JSON.stringify(target) === JSON.stringify(current))) {

        edges_on_the_way.push(current.edge2);
        current = { ...varr[current.neighbor_vertex2] };
    }

    console.log(edges_on_the_way);
    return edges_on_the_way;
}


// function check_confict(lp1, lp2) {
//     let i = 0,
//         j = 0;
//     for (i = 0; i < lp1.length; i++) {
//         for (j = 0; j < lp2.length; j++) {
//             if (lp1[i] == lp2[j]) return true;
//         }
//     }
//     return false;
// }

produceGraph();