const express = require('express');
const app = express()
const port = 2000;

const peliculas=[{
    nombre: "pocahontas",
    portada:"https://static.wikia.nocookie.net/doblaje/images/6/6b/Pocahontas_1995.jpg/revision/latest?cb=20200731233311&path-prefix=es",
    acceso: "PRIVADO"
}]

const series=[{
    nombre: "Senior Reina",
    estado: "TERMINADO",
    portada: "https://mx.web.img3.acsta.net/pictures/23/02/20/22/12/3555184.jpg",
    genero: ["comedia", "romance", "historia"],
    acceso: "PUBLICO"
}]

const usuario=[] //pensando en dejar esta seccion en otro file.

app.get("/", (req,res)=>{
    res.send("HOME")
})

app.get("/api/v1/Biblioteca",(req,res)=>{
    // const todas_laspelis= peliculas
    const pelis_priv = peliculas.filter((peliculas)=> peliculas.acceso === "PRIVADO")
    const series_priv = series.filter((elemento)=> elemento.acceso === "PRIVADO")
    let mensaje=``
    let coleccion={}
    if (pelis_priv.length === 0 ){
        mensaje+=`Crea tu propia lista`
    }else{
        coleccion.peliculas=pelis_priv
    }
    
    if (series_priv.length === 0){
        mensaje+=`Crea tu propia lista`
    }else{
        coleccion.series=series_priv
    }
    res.send({
        mensaje,
        coleccion})

})

app.get("/api/v1/Peliculas", (req, res)=>{
    const peliculas_g = peliculas.filter((pelicula)=> pelicula.acceso === "PUBLICO")
    if(peliculas_g.length === 0){
        mensaje=`<h2>404</h2><h3>No se encontro ninguna pelicula</h3>`
        res.status(404).send(mensaje)
        return
    }
    res.send(peliculas_g)

})

app.get("/api/v1/Series", (req,res)=>{
    const series_g = series.filter ((series)=> series.acceso === "PUBLICO")
    if(series_g.length === 0){
        mensaje= `<h2>404</h2><h3>No se encontro ninguna lista de Series</h3>`  
        res.status(404).send(mensaje)
        return  
    }
    res.send(series_g)
})

app.listen(port,()=>{
    console.log(`Corriendo "Piratas del Cine" en puerto ${port}`)
})

