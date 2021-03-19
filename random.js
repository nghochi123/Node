let screen = [];
for(let i = 0; i < 20; i++){
    screen[i] = [];
    for(let j = 0; j < 20; j++){
        screen[i][j] = i == j ? 0 : 1;
    }
}
screen[0][0] = 1;

let text = '';
for(let i = 0; i < 20; i++){
    for(let j = 0; j < 20; j++){
        text = text.concat(screen[i][j]).concat(' ');
    }
    text = text.concat('\n');
}
console.log(text);

let floodfill = (arr, x, y, change) => {
    let tochange = arr[x][y];
    let time = 0;

    let floodfillhelper = (arr, x, y, change)=>{
        if(x >= arr.length || y >= arr.length || x < 0 || y < 0){
            return;
        } else if(arr[x][y] != tochange){
            return;
        } else if(arr[x][y] = tochange){
            arr[x][y] = change;
            let text = '';
            for(let i = 0; i < 20; i++){
                for(let j = 0; j < 20; j++){
                    text = text.concat(arr[i][j]).concat(' ');
                }
                text = text.concat('\n');
            }
            console.log(text);

        }
        floodfillhelper(arr, x+1, y, change);
        floodfillhelper(arr, x, y+1, change);
        floodfillhelper(arr, x-1, y, change);
        floodfillhelper(arr, x, y-1, change);
    }
    floodfillhelper(arr,x,y,change);
}

floodfill(screen, 6, 4, 8);