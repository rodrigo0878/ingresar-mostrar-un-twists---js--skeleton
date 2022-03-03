//varibles
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')
let tweets = [];

//events listener
eventListeners();
function eventListeners(){
    //cuando el usuario agrega un nuevo tweets
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse( localStorage.getItem('tweets')) || [];
        console.log(tweets)
        crearHTML();
    })
}



//funciones

function agregarTweet(e){
    e.preventDefault();
    //console.log('agregando tweets')

    //text area donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;
    //console.log(tweet)

    //validacion
    if( tweet === ''){
        mostrarError('Mensaje No Puede ir Vacio');
        return; //para la ejecucion

    }

    const tweetOBJ = {
        id: Date.now(),
        tweet

    }

    //console.log('agregando tweets')
    //añadir al arreglo de tweets
    tweets = [...tweets, tweetOBJ];//usamos predoperation para agregar los tweets al arreglo
    //console.log(tweets)

    //una ves agregado creamos el html
    crearHTML();
    //reiniciamos el formulario
    formulario.reset()
   
    

}

function crearHTML(){
    limpiarHTML();
    
    
    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //añadir la funcion de eliminar


            btnEliminar.onclick= ()=>{
                borrarTweet(tweet.id);
            }
            //crear el html
            //console.log('agregando tweet'+tweet)

            const li = document.createElement('li');
            //console.log(tweet.tweet)

            //añadir el texto
            li.innerHTML = tweet.tweet;
           
           //asignar el boton
           li.appendChild(btnEliminar);
           
            //insertarlo en el html

            listaTweets.appendChild(li)
        })

    }
    //sicronizamos a localsrorage
    sincronizarLocalstorage();
}
function sincronizarLocalstorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets))
}



function limpiarHTML(){
   while(listaTweets.firstChild){
       listaTweets.removeChild(listaTweets.firstChild)
   }
}

function mostrarError(error){

    
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //inserta el contenido

    const contenido =document.querySelector('#contenido');
    contenido.appendChild(mensajeError)

    //elimina el mensaje de eeror a los 2 segundos

    setTimeout(()=>{
        mensajeError.remove();
    },2500);



}

//eliminar un tweets
function borrarTweet(id){
    console.log('borrando,,,,,', id)
    //. filter crea un nuevo arreglo
    tweets = tweets.filter( tweet => tweet.id !== id);
    crearHTML();
}