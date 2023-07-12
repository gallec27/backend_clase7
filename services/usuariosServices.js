const fs = require("fs");

function saveUsuarios(nuevoUsuario) {
  const usuarios = readUsuarios();
  usuarios.push(nuevoUsuario);
  const stringifiedUsers = JSON.stringify(usuarios, null, 2);
  const result = fs.writeFileSync("usuarios.json", stringifiedUsers, "utf-8");
  return result;
}

function readUsuarios() {
  const usuariosParsed = JSON.parse(fs.readFileSync("usuarios.json", "utf-8"));
  return usuariosParsed;
}

function findUsuario(emailLogin) {  
  const usuarios = readUsuarios();
  console.log(usuarios);
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === emailLogin);
  
  return usuarioEncontrado;
}

function chequearUsuario(emailLogin) {  
  const usuarios = readUsuarios();  
  const usuarioEncontrado = usuarios.some((usuario) => usuario.email === emailLogin);
  console.log(usuarioEncontrado);
  return usuarioEncontrado;
}

module.exports = {
  saveUsuarios,
  readUsuarios,
  findUsuario,
  chequearUsuario
};
