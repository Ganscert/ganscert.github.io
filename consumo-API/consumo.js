let API_KEY="056f371d92750e3e17d3075f832d4021"
let pagina=1

const btnSiguiente=document.getElementById('btnSiguiente')
const btnAnterior=document.getElementById('btnAnterior')

btnSiguiente.addEventListener('click',()=>{
   pagina+=1
   peticionApi()
})
btnAnterior.addEventListener('click',()=>{
   pagina-=1
   peticionApi()
})


const peticionApi=async()=>{
   try{
      const respuesta= await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&languaje=es-MX&page=${pagina}`)
      console.log(respuesta)
      //si la respuesta es exitosa
      if(respuesta.status===200){
         const datos=await respuesta.json()

      let peliculas=''
      
      console.log(datos.results)
         datos.results.forEach(pelicula=>{
            peliculas+=`
            <div class="pelicula">
               <img class="poster" src="https://media.themoviedb.org/t/p/w220_and_h330_face/${pelicula.poster_path}/images">
               <h3 class="titul">${pelicula.title}</h3>
            </div>
            `
            
         })
         document.getElementById('contenedor').innerHTML=peliculas


      }//si la respuesta es fallida
      else if(respuesta.status===404){
         console.error("bobo, no existe la pelicula")
      }//cualquier cosa que desconocemos
      else
         console.log('no se sabe que paso')


   }
catch(error){
   console.error(error)
}
}

peticionApi()