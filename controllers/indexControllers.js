const bcrypt = require("bcrypt");
const fs = require("fs");
const {
  saveUsuarios,
  findUsuario,
  readUsuarios,
  chequearUsuario
} = require("../services/usuariosServices");

const renderIndex = (req, res) => {
  res.render("index");
};

const renderLogin = (req, res) => {
  res.render("login");
};

const renderRegister = (req, res) => {
  res.render("register", { errors: [] });
};

const registrarNuevo = (req, res) => {
  //res.send("Nuevo usuario");
  //Destructuring
  const { email, password } = req.body;

  // buscar en el array de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  
  if (!chequearUsuario(email)) {
    // Generar un salt (valor aleatorio) para fortalecer el hashing
    const saltRounds = 10;
    // Aplicar el hashing de la contraseña utilizando bcrypt
    bcrypt.hash(password, saltRounds, (error, hashedPassword) => {
      if (error) {
        console.error(error);
        res.status(500).send("Error al hashear la contraseña.");
        return;
      }
      // Crear un objeto con el email y la contraseña hasheada
      const nuevoUsuario = {
        email,
        password: hashedPassword, // Guardar la contraseña hasheada en lugar de la original
      };

      saveUsuarios(nuevoUsuario);

      // Guardar el valor del usuario recién registrado en la sesión
      req.session.usuario = nuevoUsuario;
      console.log(req.session.usuario);

      // Redireccionar al endpoint /admin/perfil
      res.redirect("/admin/profile");
    });
  }

  else {
    res.send("Ya existe ese usuario.");
  }
};

const login = (req, res) => {
  const { email, password } = req.body;
  //const usuarios = fs.readFileSync("usuarios.json", "utf-8");
  const usuariosParsed = readUsuarios();

  // buscar en el array de usuarios el que coincida con el email, si ninguno coincide, enviar un error
  const usuarioOk = findUsuario(email);
  if (usuarioOk) {
    bcrypt.compare(password, usuarioOk.password, (error, result) => {
      if (error) {
        console.log(error);
        return res.status(400).send("Error al compara la contraseña.");
      }
      // result solo va a ser TRUE o FALSE
      if (result) {
        console.log("Usuario logueado.");
        // redireccionar al perfil
        res.redirect("/admin/profile");
      } else {
        //  renderizar una vista con el error
        res.status(500).send("Contraseña incorrecta.");
      }
    });
  } else {
    return res.status(500).send("El usuario no existe.");
  }
};

module.exports = {
  renderIndex,
  renderLogin,
  renderRegister,
  registrarNuevo,
  login,
};
