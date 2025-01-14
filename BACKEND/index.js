const express = require('express')
var cors = require('cors')
const app = express()
const port = 3000

app.use(express.json())
app.use(cors())

let peliculas = [
    {
        id: 1,
        nombre: "Pocahontas",
        fecha_de_lanzamiento: "1995-06-23",
        portada: "https://th.bing.com/th/id/OIP.K_KVUQxiny5KzR4cxO55lAHaLH?rs=1&pid=ImgDetMain",
        genero: "Animación", sinopsis: "Aventura de una joven nativa americana.",
        link: "https://example.com/pocahontas",
        plataforma:"Disney+ plus",
        acceso: "PUBLICO"
    },
    {
        id: 2,
        nombre: "El Rey León",
        portada: "https://images.cdn3.buscalibre.com/fit-in/360x360/5c/bb/5cbb7b71610a87b7be93b2f2cb5f849e.jpg",
        genero: "Animación", sinopsis: "La historia de un joven león llamado Simba.",
        link: "https://example.com/elreyleon",
        plataforma: "Disney+",
        acceso: "PUBLICO"
    },{
        id: 3,
        nombre: "Toy Story",
        portada: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIOhvcYCWjLIFFHwrY7OVi0LWFs683s7ljS8SoIUw9HnFanQiC_reqxrMGoROP0l8tJFjAUGzJ6hkG7-og9y0dMz9NuGJBUgPJllxSnRLrAPjVaml6AM2xGbHByEPpt-I76_i0KjKQtj31/s1600/Toy_Story-Caratula.jpg",
        genero: "Animación", 
        sinopsis: "Sin Descripción", 
        link: "https://example.com/toystory", 
        plataforma: "Disney+", 
        acceso: "PRIVADO"
    },{
        id: 4,
        nombre: "Mulan",
        portada: "https://th.bing.com/th/id/OIP.idqPNOvZ2an06MVV5up2VgHaKX?rs=1&pid=ImgDetMain",
        acceso: "PUBLICO"
    },
    {
        id:5,
        nombre: "Coco",
        portada: "https://th.bing.com/th/id/R.b01aeadb49d429e32be99429216f92e8?rik=ZPNc2BVLfkK5LA&pid=ImgRaw&r=0",
        acceso: "PUBLICO"
    },
    {
        id:6,
        nombre: "Frozen",
        portada: "https://th.bing.com/th/id/OIP.jo_GlG7W-l2MRnaUY7KwtAAAAA?rs=1&pid=ImgDetMain",
        acceso: "PRIVADO"
    }
];


let series=[{
    nombre: "Senior Reina",
    estado: "TERMINADO",
    portada: "https://mx.web.img3.acsta.net/pictures/23/02/20/22/12/3555184.jpg",
    genero: ["comedia", "romance", "historia"],
    acceso: "PUBLICO"
}]

let usuario=[] //pensando en dejar esta seccion en otro file.

app.get("/", (req,res)=>{
    texto=`<h2>Bienvenido</h2>
            <h3>Esta es una pagina para guardar, buscar, puedes hasta reseñar y recomendar peliculas o series.<br>
                Puedes tambien publicar o ver publicaciones de otros usuarios!<br>
                Seremos tu lista de peliculas que quieras ver! <br><br>
                Registrate y comiensa a guardar la ubicacion de tus peliculas y series favoritas o que quieras ver mas tarde </h3>`
    res.json({ mensaje: texto })

})

app.get("/api/v1/Biblioteca/:tipo",(req,res)=>{
    const tipo = req.params.tipo
    let coleccion=[]
    if(tipo== "Peliculas"){
        coleccion=peliculas
    }else if(tipo == "Series"){
        coleccion=series
    }else{
        res.status(404).send("Pagina no encontrada xC")
        return 
    }
    const privado = coleccion.filter((elemento)=> elemento.acceso === "PRIVADO")
    if (privado.length === 0 ){
        res.send(`Crea tu propia lista!`)
    }else{
        res.json(privado)
    }
    
})

app.get("/api/v1/Peliculas", (req, res)=>{
    const peliculas_g = peliculas.filter((pelicula)=> pelicula.acceso === "PUBLICO")
    if(peliculas_g.length === 0){
        const mensaje={
            mensaje:`<h2>404</h2><h3>No se encontro ninguna pelicula</h3>`
        }
        res.status(200).json(mensaje)
        return
    }
    res.json({ mensaje: peliculas_g })

})

app.get("/api/v1/Series/api/v1/Series", (req,res)=>{
    const series_g = series.filter ((series)=> series.acceso === "PUBLICO")
    if(series_g.length === 0){
        const mensaje={
            mensaje:`<h2>404</h2><h3>No se encontro ninguna lista de Series</h3>`
        }
        res.status(200).json(mensaje)
        return  
    }
    res.json({ mensaje: series_g })
})

app.listen(port,()=>{
    console.log(`Corriendo "Piratas del Cine" en puerto ${port}`)
})

