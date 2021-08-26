import d3 from "d3";
import { cross, checkCrossVerteses } from "./Circles";

function aadrawLPline(svg, start, end, indexOfLevel, lineWidth, col) {
  svg
    .append("svg:line")
    .attr("x1", `${start}`)
    .attr("y1", `${indexOfLevel * 50 + 20}`)
    .attr("x2", `${end}`)
    .attr("y2", `${indexOfLevel * 50 + 20}`)
    .attr("stroke", col)
    .attr("stroke-width", `${lineWidth}`);
}

function aadrawLPline2(svg, start, end, indexOfLevel, lineWidth, col, LPindex) {
  svg
    .append("svg:line")
    .attr("x1", `${start}`)
    .attr("y1", `${indexOfLevel * 50 + 20}`)
    .attr("x2", `${end}`)
    .attr("y2", `${indexOfLevel * 50 + 20}`)
    .attr("stroke", col)
    .attr("stroke-width", `${lineWidth}`)
    .attr("display", `none`)
    .attr("class", `p${LPindex}`);
}

export function optimalLines(
  levels,
  globalVerticies,
  svgclassName = ".svgpainter",
  svgHeight = false
) {
  if (svgHeight === false) {
    svgHeight = levels.length * 70 + 20;
  }

  let svg = d3
    .select(svgclassName)
    .append("svg:svg")
    .attr("height", `${svgHeight}`)
    .attr("display", `none`)
    .attr("width", "250");

  let lineLenght = 250 / globalVerticies;

  levels.forEach((lightPaths, indexOfLevel) => {
    for (var i = 0; i < lightPaths.length - 1; i++) {
      var indexInLp = lightPaths[i].index;
      aadrawLPline(
        svg,
        indexInLp * lineLenght,
        lightPaths[i + 1].index * lineLenght,
        indexOfLevel,
        10,
        "purple"
      );
      aadrawLPline(
        svg,
        indexInLp * lineLenght,
        indexInLp * lineLenght + 5,
        indexOfLevel,
        20,
        "purple"
      );
      aadrawLPline(
        svg,
        lightPaths[i + 1].index * lineLenght,
        lightPaths[i + 1].index * lineLenght + 5,
        indexOfLevel,
        20,
        "purple"
      );
    }
  });

  return svg;
}

function drawVertesesForLines(levels, svg, globalVerticies) {
  let lineLenght = 250 / globalVerticies;

  levels.forEach((level, indexOfLevel) => {
    level.forEach((LP, LPindex) => {
      aadrawLPline2(
        svg,
        LP.passing_edges[0] * lineLenght,
        LP.passing_edges[0] * lineLenght + 5,
        indexOfLevel + 1,
        20,
        "purple",
        `${LP.index}999`
      );
      aadrawLPline2(
        svg,
        (LP.passing_edges[LP.passing_edges.length - 1] + 1) * lineLenght,
        (LP.passing_edges[LP.passing_edges.length - 1] + 1) * lineLenght + 5,
        indexOfLevel + 1,
        20,
        "purple",
        `${LP.index}999`
      );
    });
    // let LP=level[level.length-1]
    // let LPindex=level.length-1
    // aadrawLPline2(svg,(LP.passing_edges[LP.passing_edges.length-1]+1)*lineLenght,((LP.passing_edges[LP.passing_edges.length-1]+1)*lineLenght)+5,+1,20,'purple',LPindex)
  });
}

export function onlineLines(mainLine, LParr, globalVerticies) {
  let svg = optimalLines([mainLine], globalVerticies, ".svgpainter2");


  let lineLenght = 250 / globalVerticies;

  let levelsByPassingEdges = [];
  let levelsByLP = [];
  LParr.forEach((LP, LPindex) => {
    LP.index = LPindex;
    let appended = false;
    levelsByPassingEdges.forEach((level, index) => {
      if (appended) {
        return;
      }
      if (
        !cross(level, LP.passing_edges) &&
        checkCrossVerteses(LP, levelsByLP[index])
      ) {
        levelsByPassingEdges[index] = levelsByPassingEdges[index].concat(
          LP.passing_edges
        );
        levelsByLP[index].push(LP);

        LP.wavelength.r = levelsByLP[index][0].wavelength.r;
        LP.wavelength.g = levelsByLP[index][0].wavelength.g;
        LP.wavelength.b = levelsByLP[index][0].wavelength.b;

        LP.passing_edges.forEach((partOfLP) => {
          aadrawLPline2(
            svg,
            partOfLP * lineLenght,
            (partOfLP + 1) * lineLenght,
            index + 1,
            10,
            `rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`,
            LP.index
          );
        });

        appended = true;
      }
    });

    if (!appended) {
      levelsByPassingEdges.push(LP.passing_edges);
      levelsByLP.push([LP]);
      LP.passing_edges.forEach((partOfLP) => {
        aadrawLPline2(
          svg,
          partOfLP * lineLenght,
          (partOfLP + 1) * lineLenght,
          levelsByLP.length,
          10,
          `rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`,
          LP.index
        );
      });
    }
  });

  drawVertesesForLines(levelsByLP, svg, globalVerticies);
}

export function appendLP(mainLine, LParr, globalVerticies) {
  let levelsByPassingEdges = [];
  let levelsByLP = [];
  LParr.forEach((LP, LPindex) => {
    LP.index = LPindex;
    let appended = false;
    levelsByPassingEdges.forEach((level, index) => {
      if (appended) {
        return;
      }

      // check if we can append the current light path to the current level
      if (
        !cross(level, LP.passing_edges) &&
        checkCrossVerteses(LP, levelsByLP[index])
      ) {
        // append the light path   ----------------------
        levelsByPassingEdges[index] = levelsByPassingEdges[index].concat(
          LP.passing_edges
        );
        levelsByLP[index].push(LP);
        //------------------------------------------------

        // making the light paths color as his level   -----------------
        LP.wavelength.r = levelsByLP[index][0].wavelength.r;
        LP.wavelength.g = levelsByLP[index][0].wavelength.g;
        LP.wavelength.b = levelsByLP[index][0].wavelength.b;
        //------------------------------------------------

        appended = true;
      }
    });

    if (!appended) {
      levelsByPassingEdges.push(LP.passing_edges);
      levelsByLP.push([LP]);
    }
  });

  let svg = drawLPS(mainLine, levelsByLP, globalVerticies);
  drawVertesesForLines(levelsByLP, svg, globalVerticies);
  return levelsByLP.length;
}

export function appendLPAVG(mainLine, LParr, globalVerticies) {
  let levelsByPassingEdges = [];
  let levelsByLP = [];
  LParr.forEach((LP, LPindex) => {
    LP.index = LPindex;
    let appended = false;
    levelsByPassingEdges.forEach((level, index) => {
      if (appended) {
        return;
      }

      // check if we can append the current light path to the current level
      if (
        !cross(level, LP.passing_edges) &&
        checkCrossVerteses(LP, levelsByLP[index])
      ) {
        // append the light path   ----------------------
        levelsByPassingEdges[index] = levelsByPassingEdges[index].concat(
          LP.passing_edges
        );
        levelsByLP[index].push(LP);
        //------------------------------------------------

        // making the light paths color as his level   -----------------
        LP.wavelength.r = levelsByLP[index][0].wavelength.r;
        LP.wavelength.g = levelsByLP[index][0].wavelength.g;
        LP.wavelength.b = levelsByLP[index][0].wavelength.b;
        //------------------------------------------------

        appended = true;
      }
    });

    if (!appended) {
      levelsByPassingEdges.push(LP.passing_edges);
      levelsByLP.push([LP]);
    }
  });

  // let svg = drawLPS(mainLine, levelsByLP, globalVerticies);
  // drawVertesesForLines(levelsByLP, svg, globalVerticies);
  return levelsByLP.length;
}

function drawLPS(mainLine, levels, globalVerticies) {

  let svg = optimalLines(
    [mainLine],
    globalVerticies,
    ".svgpainter2",
    levels.length * 50 + 70
  );

  let lineLenght = 250 / globalVerticies;

  levels.forEach((level, levelIndex) => {
    level.forEach((LP, LPindex) => {
      LP.passing_edges.forEach((partOfLP) => {
        aadrawLPline2(
          svg,
          partOfLP * lineLenght,
          (partOfLP + 1) * lineLenght,
          levelIndex + 1,
          10,
          `rgb(${LP.wavelength.r},${LP.wavelength.g},${LP.wavelength.b})`,
          LP.index
        );
      });
    });
  });
  return svg;
}
