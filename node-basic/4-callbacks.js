const add = (a,b,cb) => {
    const sum = a + b;
    console.log('Calculating for 2 seconds');
    setTimeout(()=>{
        cb(sum);
    }, 2000);
    
    
}

add(1,4, sum=>{console.log(sum)});