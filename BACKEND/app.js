const express = require('express');
var cors = require('cors');
const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())

//Son datos temporales de prueba hasta tener un db
let peliculas = [
    {
        ID_UNICO: 1,
        NOMBRE_COMPLETO_COMPLETO: "Pocahontas",
        FECHA_ESTRENO: "1995-06-23",
        URL_POSTER: "https://th.bing.com/th/id/OIP.K_KVUQxiny5KzR4cxO55lAHaLH?rs=1&pid=ImgDetMain",
        GENERO: "Animación", 
        SINOPSIS: "Aventura de una joven nativa americana.",
        link: "https://example.com/pocahontas",
        PLATAFORMA:"Disney+ plus",
        ACCESO: "PRIVADO"
    },
    {
        ID_UNICO: 2,
        NOMBRE_COMPLETO: "El Rey León",
        URL_POSTER: "https://images.cdn3.buscalibre.com/fit-in/360x360/5c/bb/5cbb7b71610a87b7be93b2f2cb5f849e.jpg",
        GENERO: "Animación", 
        SINOPSIS: "La historia de un joven león llamado Simba.",
        link: "https://example.com/elreyleon",
        PLATAFORMA: "Disney+",
        ACCESO: "PRIVADO"
    },{
        ID_UNICO: 3,
        NOMBRE_COMPLETO: "Toy Story",
        URL_POSTER: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIOhvcYCWjLIFFHwrY7OVi0LWFs683s7ljS8SoIUw9HnFanQiC_reqxrMGoROP0l8tJFjAUGzJ6hkG7-og9y0dMz9NuGJBUgPJllxSnRLrAPjVaml6AM2xGbHByEPpt-I76_i0KjKQtj31/s1600/Toy_Story-Caratula.jpg",
        GENERO: "Animación", 
        SINOPSIS: "Sin Descripción", 
        link: "https://example.com/toystory", 
        PLATAFORMA: "Disney+", 
        ACCESO: "PUBLICO"
    },{
        ID_UNICO: 4,
        NOMBRE_COMPLETO: "Mulan",
        URL_POSTER: "https://th.bing.com/th/id/OIP.idqPNOvZ2an06MVV5up2VgHaKX?rs=1&pid=ImgDetMain",
        ACCESO: "PRIVADO"
    },
    {
        ID_UNICO:5,
        NOMBRE_COMPLETO: "Coco",
        URL_POSTER: "https://th.bing.com/th/id/R.b01aeadb49d429e32be99429216f92e8?rik=ZPNc2BVLfkK5LA&pid=ImgRaw&r=0",
        ACCESO: "PRIVADO"
    },
    {
        ID_UNICO:6,
        NOMBRE_COMPLETO: "Frozen",
        URL_POSTER: "https://th.bing.com/th/id/OIP.jo_GlG7W-l2MRnaUY7KwtAAAAA?rs=1&pid=ImgDetMain",
        ACCESO: "PRIVADO"
    }
];


let series = [
    {
        NOMBRE_COMPLETO: "Señor Reina",
        ESTADO: "TERMINADO",
        URL_POSTER: "https://i.pinimg.com/736x/67/0a/13/670a13e77c3819087f370ae86303a492.jpg",
        GENERO: ["Comedia"," Romance", " Historia"," Transmigración"],
        ACCESO: "PRIVADO"
    },
    {
        NOMBRE_COMPLETO: "La Casa de Papel",
        ESTADO: "TERMINADO",
        URL_POSTER: "https://tse3.mm.bing.net/th?id=OIP.9VqVkN3onE94I1C2NxRp-wHaJQ&rs=1&pid=ImgDetMain",
        GENERO: ["Crimen", " Drama", " Suspenso"],
        SINOPSIS: "Ocho ladrones toman rehenes en la Fábrica Nacional de Moneda y Timbre de España, mientras el líder de la banda manipula a la policía para cumplir con su plan.",
        ACCESO: "PUBLICO"
    },
    {
        NOMBRE_COMPLETO: "Stranger Things",
        ESTADO: "EN PRODUCCIÓN",
        URL_POSTER: "https://tse4.mm.bing.net/th?id=OIP.614ZOmkVvcOLGAci76bp1gHaJQ&rs=1&pid=ImgDetMain",
        GENERO: ["Ciencia Ficción", " Horror", " Misterio"],
        ACCESO: "PUBLICO"
    },
    {
        NOMBRE_COMPLETO: "Game of Thrones",
        ESTADO: "TERMINADO",
        URL_POSTER: "https://tse3.mm.bing.net/th?id=OIP.gpoVFAyUAbnmDN33iBRRdgHaLH&rs=1&pid=ImgDetMain",
        GENERO: ["Fantasía", " Drama", " Aventura"],
        SINOPSIS: `En un mundo donde la magia y la ciencia coexisten, la joven Eris Luminous se encuentra atrapada entre dos realidades: la de los humanos y la de los magos.
        Tras el misterioso asesinato de su padre, un renombrado científico, Eris descubre que su familia es portadora de un antiguo linaje de magos cuyo poder es codiciado por oscuros intereses.
        A medida que Eris navega por un mundo lleno de peligros y secretos, se une a un grupo de rebeldes conocidos como "La Orden del Alba". Con ellos, intenta desentrañar la verdad detrás de la muerte de su padre y evitar que una poderosa organización llamada "laSombra Eterna" desate una guerra entre magos y humanos.
        En su viaje, Eris descubre sus propios poderes mágicos latentes y debe aprender a controlarlos. Entre sus aliados se encuentran Kael, un mago de fuego con un pasado tormentoso; Liora, una experta en ilusiones y espionaje; y Thalos, un guerrero humano que busca venganza contra La Sombra Eterna por la destrucción de su aldea.`,
        ACCESO: "PUBLICO"
    }
];

let Usuarios=[] //pensando en dejar esta seccion en otro file.

app.get("/", (req,res)=>{
    texto=`<div class="css_mensaje">
                <h2>¡Bienvenido!</h2>
                <p>Esta es una pagina para guardar, buscar, puedes hasta reseñar y recomendar peliculas o series.</p>
                <p>Puedes tambien publicar o ver publicaciones de otros usuarios!</p>
                <p>Seremos tu lista de peliculas que quieras ver, te ayudaremos a guardar las direcciones de esta peliculas o mostrarte donde puedas verlas </p><br>
                <p>Registrate o Inicia Sesion y empieza a guardar la ubicacion de tus peliculas y series que quieras ver mas tarde o tener guardado el lugar donde ver nuevamente tu pelicula favorita!</p>
                <a href="inicio_registro.html" class="boton" >Iniciar Sesion/ Registrarse</a>
                </div>`;
    res.json({ mensaje: texto });

})

app.get("/api/v1/Biblioteca/:tipo",(req,res)=>{
    const tipo = req.params.tipo
    let coleccion=[]
    if(tipo == "Peliculas"){
        coleccion = peliculas;
    }else if(tipo == "Series"){
        coleccion= series;
    }else{
        res.sendStatus(400);
        return;
    }
    const privado = coleccion.filter((elemento)=> elemento.ACCESO === "PRIVADO")
    if (privado.length === 0 ){
        res.send(`Crea tu propia lista!`);
    }else{
        res.json(privado);
    }
    
})

app.get("/api/v1/Peliculas", (req, res)=>{
    const peliculas_g = peliculas.filter((pelicula)=> pelicula.ACCESO === "PUBLICO")
    if(peliculas_g.length === 0){
        const mensaje={
            mensaje:`<p>Lo sentimos </p><p>No se encontro ninguna pelicula</p>`
        };
        res.status(200).send(mensaje);
        return;
    }
    res.status(201).json({ respuesta: peliculas_g });
})

app.get("/api/v1/Peliculas/:nombre",(req,res)=>{
    // descodificacion de los espacios
    const nombre = decodeURIComponent(req.params.nombre);
    const pelicula = peliculas.find((peli)=> peli.NOMBRE_COMPLETO === nombre);
    if(pelicula.SINOPSIS==undefined){
        pelicula.SINOPSIS='Sin Descripcion';
    }
    if(!pelicula){
        res.status(404);
        return;
    }
    res.status(200).json(pelicula);
})

app.get("/api/v1/Series", (req,res)=>{
    const series_g = series.filter ((series)=> series.ACCESO === "PUBLICO");
    if(series_g.length === 0){
        const mensaje={
            mensaje:`<p>Lo sentimos!</p><p>No se encontro ninguna lista de Series</p>`
        };
        res.status(200).json(mensaje);
        return;
    }
    res.status(201).json({ respuesta: series_g });
})
app.get("/api/v1/Series/:nombre",(req,res)=>{
    // descodificacion de los espacios
    const nombre = decodeURIComponent(req.params.nombre);
    const serie = series.find((s)=> s.NOMBRE_COMPLETO === nombre);
    if(serie.SINOPSIS==undefined){
        serie.SINOPSIS='Sin Descripcion';
    }
    if(!serie){
        res.status(404);
        return;
    }
    res.status(200).send(serie);
})

//obtendra los datos de una cuenta
app.get("/api/v1/cuentas/:usuario",(req,res)=>{
    const cuenta = Usuarios.find(user => user.NOMBRE == req.params.usuario);
    //sino existe la cuenta
    if(!cuenta){
        res.status(400).json(req, res);
        return;
    }    
    res.status(200).json({cuenta});
})

app.post("/api/v1/registro", (req,res)=>{
    const datos = {
        NOMBRE: req.body.nombre,
        APELLIDO: req.body.apellido,
        FECHA_NACIMIENTO: req.body.nacimiento,
        GENERO: req.body.genero ?? "Otro",
        EMAIL: req.body.email ?? undefined,
        TEL: req.body.contacto ?? undefined
    };
    const usuario={
        ID_UNICO: Usuarios.length +1,
        DATOS: datos,
        NOMBRE_USUARIO: req.body.nombre,
        CLAVE: req.body.clave
    };
    Usuarios.push(usuario);
    res.status(201).json(usuario);
})

app.post("/api/v1/inicio", (req,res)=> {
    const usuario = {
        NOMBRE_USUARIO : req.body.us,
        CLAVE: req.body.clave
    };

    const cuenta = Usuarios.find(u => u.NOMBRE_USUARIO === usuario.NOMBRE_USUARIO);
    if(!cuenta){
        res.status(400).json(usuario);
        return;
    }
    res.status(200).json(usuario);
})

app.listen(port,()=>{
    console.log(`Corriendo "Piratas del Cine" en puerto ${port}`);
})
