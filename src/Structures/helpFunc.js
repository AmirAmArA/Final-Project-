import Lightpath from "./Lightpath";
import Vertex from "../Structures/Vertex";

//a function to return a random number between min and max
const rand = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// a function that return a random number of elements inside an a given array
const randN = (array) => {
  let resultLen = rand(1, array.length - 1);
  let result = [];

  console.log(array);

  for (let i = 0; i < resultLen; i++) {
    let v = array[rand(1, array.length - 1)];
    if (result.indexOf(v) !== -1) {
      i--;
    } else {
      result.push(v);
    }
  }
  console.log(result);
  return result.sort((a, b) => (a.index > b.index ? 1 : -1));
};

//a function that creates lightpaths on a given graph in Ring topology
const createLightpaths = (optimalCirclesArr, vertexArr, edgeArr) => {
  let lightpaths = [];
  for (let i = 0; i < optimalCirclesArr.length; i++) {
    const circle = optimalCirclesArr[i];
    for (let count = 0; count < circle.length - 1; count++) {
      lightpaths.push(
        new Lightpath(
          { r: rand(0, 255), g: rand(0, 255), b: rand(0, 255) },
          circle[count].index,
          circle[count + 1].index,
          lightpaths.length
        )
      );
    }
    lightpaths.push(
      new Lightpath(
        { r: rand(0, 255), g: rand(0, 255), b: rand(0, 255) },
        circle[circle.length - 1].index,
        circle[0].index,
        lightpaths.length
      )
    );
  }
  lightpaths.forEach((lightpath) => {
    lightpath.passing_edges = check_path(
      lightpath.startVertex,
      lightpath.endVertex,
      vertexArr,
      edgeArr
    );
  });
  return lightpaths;
};

//a function that creates lightpaths on a given graph in line topology
const createLightpathsLine = (optimalLinesArr, vertexArr) => {
  let lightpaths = [];
  for (let i = 0; i < optimalLinesArr.length; i++) {
    const line = optimalLinesArr[i];
    for (let count = 0; count < line.length - 1; count++) {
      lightpaths.push(
        new Lightpath(
          { r: rand(0, 255), g: rand(0, 255), b: rand(0, 255) },
          line[count].index,
          line[count + 1].index,
          lightpaths.length
        )
      );
    }
  }
  lightpaths.forEach((lightpath) => {
    lightpath.passing_edges = checkPathL(
      lightpath.startVertex,
      lightpath.endVertex,
      vertexArr
    );
  });
  return lightpaths;
};

//a function that checks edges on the way of the lightpath in line topology 
const checkPathL = (v1, v2, vertex) => {
  let start = new Vertex();
  let target = new Vertex();
  let current = new Vertex();
  let edges_on_the_way = [];
  start = { ...vertex[v1] };
  target = { ...vertex[v2] };
  current = { ...start };

  while (!(JSON.stringify(target) === JSON.stringify(current))) {
    edges_on_the_way.push(current.edge2);
    current = { ...vertex[current.neighbor_vertex2] };
  }
  return edges_on_the_way;
};

//a function that checks edges on the way of the lightpath in Ring topology 
function check_path(v1, v2, vertex) {
  let start = new Vertex();
  let target = new Vertex();
  let current = new Vertex();
  let edges_on_the_way = [];

  start = { ...vertex[v1] };
  target = { ...vertex[v2] };
  current = { ...start };

  while (!(JSON.stringify(target) === JSON.stringify(current))) {
    edges_on_the_way.push(current.edge2);
    current = { ...vertex[current.neighbor_vertex2] };
  }

  return edges_on_the_way;
}

export { randN, rand, createLightpaths, createLightpathsLine };
