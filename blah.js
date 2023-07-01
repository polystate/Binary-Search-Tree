

const fiboIteration = (num) => {
    if(num <= 1){
        return [0]
    } 
    if(num === 2){
        return [0, 1]
    }
    let arr = [0, 1];
    for(let i = 0; i < num ; i++){
        arr.push(arr[i] + arr[i + 1]);
    }
    return arr;
}

// console.log(fiboIteration(23));


const fiboRecursion = (count) => {
    if(count <= 0){
        return [];
    }
    if(count === 1){
        return [0];
    }
    if(count === 2){
        return [0, 1];
    }

    const sequence = fiboRecursion(count - 1);
    const nextNumber = sequence[sequence.length - 1] + sequence[sequence.length-2];
    sequence.push(nextNumber);
    return sequence;
}   

// console.log(fiboRecursion(7));




const factorial = (num) => {
    if(num <= 1) return 1;

    return num * factorial(num - 1);
}


// console.log(factorial(7));