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


let series = [
    {
        nombre: "Señor Reina",
        estado: "TERMINADO",
        portada: "https://i.pinimg.com/736x/67/0a/13/670a13e77c3819087f370ae86303a492.jpg",
        genero: ["Comedia", "Romance", "Historia", "Transmigración"],
        acceso: "PUBLICO"
    },
    {
        nombre: "La Casa de Papel",
        estado: "TERMINADO",
        portada: "https://tse3.mm.bing.net/th?id=OIP.9VqVkN3onE94I1C2NxRp-wHaJQ&rs=1&pid=ImgDetMain",
        genero: ["Crimen", "Drama", "Suspenso"],
        acceso: "PUBLICO"
    },
    {
        nombre: "Stranger Things",
        estado: "EN PRODUCCIÓN",
        portada: "https://tse4.mm.bing.net/th?id=OIP.614ZOmkVvcOLGAci76bp1gHaJQ&rs=1&pid=ImgDetMain",
        genero: ["Ciencia Ficción", "Horror", "Misterio"],
        acceso: "PUBLICO"
    },
    {
        nombre: "Game of Thrones",
        estado: "TERMINADO",
        portada: "https://tse3.mm.bing.net/th?id=OIP.gpoVFAyUAbnmDN33iBRRdgHaLH&rs=1&pid=ImgDetMain",
        genero: ["Fantasía", "Drama", "Aventura"],
        sinopsis: 'En un mundo donde la magia y la ciencia coexisten, la joven Eris Luminous se encuentra atrapada entre dos realidades: la de los humanos y la de los magos. Tras el misterioso asesinato de su padre, un renombrado científico, Eris descubre que su familia es portadora de un antiguo linaje de magos cuyo poder es codiciado por oscuros intereses. A medida que Eris navega por un mundo lleno de peligros y secretos, se une a un grupo de rebeldes conocidos como "La Orden del Alba". Con ellos, intenta desentrañar la verdad detrás de la muerte de su padre y evitar que una poderosa organización llamada "laSombra Eterna" desate una guerra entre magos y humanos. En su viaje, Eris descubre sus propios poderes mágicos latentes y debe aprender a controlarlos. Entre sus aliados se encuentran Kael, un mago de fuego con un pasado tormentoso; Liora, una experta en ilusiones y espionaje; y Thalos, un guerrero humano que busca venganza contra La Sombra Eterna por la destrucción de su aldea.',
        acceso: "PUBLICO"
    }
];

let usuario=[] //pensando en dejar esta seccion en otro file.

app.get("/", (req,res)=>{
    texto=`<div class="bienvenida">
                <h2>¡Bienvenido!</h2>
                <p>Esta es una pagina para guardar, buscar, puedes hasta reseñar y recomendar peliculas o series.</p>
                <p>Puedes tambien publicar o ver publicaciones de otros usuarios!</p>
                <p>Seremos tu lista de peliculas que quieras ver, te ayudaremos a guardar las direcciones de esta peliculas o mostrarte donde puedas verlas </p><br>
                <p>Registrate o Inicia Sesion y empieza a guardar la ubicacion de tus peliculas y series que quieras ver mas tarde o tener guardado el lugar donde ver nuevamente tu pelicula favorita!</p>
                <a href="registro.html" class="boton" >Iniciar Sesion/ Registrarse</a>
                </div>`
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
            mensaje:`<h2>Lo sentimos </h2><h3>No se encontro ninguna pelicula</h3>`
        }
        res.status(200).json(mensaje)
        return
    }
    res.json({ mensaje: peliculas_g })

})

app.get("/api/v1/Series", (req,res)=>{
    const series_g = series.filter ((series)=> series.acceso === "PUBLICO")
    if(series_g.length === 0){
        const mensaje={
            mensaje:`<h2>Lo sentimos!</h2><h3>No se encontro ninguna lista de Series</h3>`
        }
        res.status(200).json(mensaje)
        return  
    }
    res.json({ mensaje: series_g })
})

app.listen(port,()=>{
    console.log(`Corriendo "Piratas del Cine" en puerto ${port}`)
})

