const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const PORT = 3000;

const app = express();

//middlewares
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Configurar cookie-parser
app.use(cookieParser());

// Configurar express-session
app.use(
  session({
    secret: "mi_secreto", // Cambia esto por una cadena secreta única para tu aplicación
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // Configura a true si estás utilizando HTTPS
      httpOnly: true,
      maxAge: 3600000, // Tiempo de expiración de la cookie en milisegundos (aquí se establece a 1 hora)
    },
  })
);

app.use("/", require("./routes/indexRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

//app.use("/usuario", require("./routes/userRoutes"));

app.listen(PORT, () =>{
    console.log(`Server running on url http://localhost:${PORT}`);
})