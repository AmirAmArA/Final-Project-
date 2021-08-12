import Lightpath from "./Lightpath";

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


const createLightpaths = (optimalCirclesArr, vertexArr) => {
    let lightpaths = [];
    let validChains = [[], []];
    for (let i = 0; i < optimalCirclesArr.length; i++) {
        const circle = optimalCirclesArr[i];
        for (let count = 0; count < circle.length - 1; count++) {
            lightpaths.push(new Lightpath({ r: (((i + 50) * 1853) % 256), g: (((i + 50) * 1853) % 256), b: (((i + 50) * 1853) % 256) }, circle[count].index, circle[count + 1].index, lightpaths.length))

        }
        lightpaths.push(new Lightpath({ r: (((i + 50) * 1853) % 256), g: (((i + 50) * 1853) % 256), b: (((i + 50) * 1853) % 256) }, circle[circle.length - 1].index, circle[0].index, lightpaths.length))


    }
    return lightpaths

}


export { randN, rand, createLightpaths };