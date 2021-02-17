const doWorkCallBack = callback =>{
    setTimeout(()=>{
        //callback('This is an error!', undefined)
        callback(undefined, [1,2,3]);
    }, 2000);
}

doWorkCallBack((err, res)=>{
    if(err) return console.log(err);
    console.log(res);
})