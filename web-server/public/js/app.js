// fetch('http://puzzle.mead.io/puzzle')
// .then(response=>{
//     response.json()
//     .then(data=>{
//         console.log(data);
//     })
// });
const base = "/weather?address=";

const weatherForm = document.querySelector('form');
const m1 = document.getElementById('location');
const m2 = document.getElementById('forecast');



weatherForm.addEventListener('submit', (e)=>{
    let search = document.querySelector('input').value
    const requrl= `${base}${search}`;
    e.preventDefault();
    console.log(requrl);
    m1.textContent = "";
    m2.textContent = "";    
    fetch(requrl)
    .then(response=>{
        response.json()
        .then(data=>{

            if(!data.error){
                m1.textContent = data.location;
                m2.textContent = data.temperature;
            } else {
                m1.textContent = data.error;
            }
        });
    });

});