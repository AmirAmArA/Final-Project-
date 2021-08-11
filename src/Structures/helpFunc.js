

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min) ) + min;
}


const randN = (array) => {
    let len = array.length;

        let n = Math.floor(Math.random() * len - 3 ) + 3

    let result = new Array(n);
    let taken = new Array(n);
    if(n>len) {
        throw new RangeError('ERROR in length')
    }
    while(n--) {
        let x = Math.floor(Math.random() * len);
        result[n] = array[x in taken ? taken[x] : x];
        taken[x] = --len in taken ? taken[len] : len;
    }
    return result.length > 1 ? result.sort((a,b) => a.index > b.index ? 1 : -1) : randN(array);
}




export {randN, rand};