//botones de iniciar sesion;registro y salida
const btnSignIn = document.getElementById("SignIn");
const btnRegister = document.getElementById("register");
const btnLogout = document.getElementById("Logout");
//inputs email y pasword de iniciar sesión
const email = document.getElementById("email");
const password = document.getElementById("password");
//inputs Nombre, Apellido, email y pasword del registro
const nameRegister = document.getElementById("name-register");
const nickNameRegister = document.getElementById("nickName-register");
const emailRegister = document.getElementById("email-register");
const passwordRregister = document.getElementById("password-register");
//botones de iniciar secion con google y facebook(aun si uso)
const btnGoogle = document.getElementById("google-SignIn");
/* aun no se pone en uso const btnFacebook = document.getElementById("facebook-SignIn");*/
//botones de ocutar y aparecer (iniciar secion  registrarse)
const btnNewAccount = document.getElementById("newAccount-register");
const btnReturn = document.getElementById("return");
//varibles creadas para la visualizacion usando el css en html
const login = document.getElementById("menu");
const logout = document.getElementById("singIn-register");
const userName = document.getElementById("user_name");
const register = document.getElementById("register");
const singIn = document.getElementById("singIn");
const visualImgFont = document.getElementById("imagen");
const wall = document.getElementById('wall')
const dataBase = document.getElementById('dataBase');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('publications');

//ocultando y apareciondo el area de inciar sesion y registro
btnNewAccount.addEventListener("click", () => {
  register.removeAttribute("class");
  singIn.setAttribute("class", "hidden");
})

btnReturn.addEventListener("click", () => {
  register.setAttribute("class", "hidden");
  singIn.removeAttribute("class");
})

// condicionales de validacion
/*constante para escribir el mensaje de validacion en iniciar sesion*/
let validationMessageSI = document.getElementById("validation-message");
/*mensajes de validacion de Iniciar sesion
1.- input para introduccion de correo*/
email.addEventListener("keyup", () => {
  if (email.value.length <= 0) {
    validationMessageSI.innerHTML = "<span>Completa el cuadro <strong>Email</strong></span>";
    email.setAttribute("class", "warning");
  } else {
    validationMessageSI.innerHTML = "<span></span>";
    email.removeAttribute("class");
  }
})

/*2.- input para introduccion de contraseña*/
password.addEventListener("keyup", () => {
  if (password.value.length <= 0) {
    validationMessageSI.innerHTML = "<span>Completa el cuadro <strong>Pasword</strong></span>";
    password.setAttribute("class", "warning");
  } else {
    validationMessageSI.innerHTML = "<span></span>";
    password.removeAttribute("class");

  }
})

/*constante para escribir el mensaje de validacion en registro*/
let validationMessage = document.getElementById("validation-message");
/*mensajes de validacion del registro
1.- input para introduccion de nombre completo*/
nameRegister.addEventListener("mousemove", () => {
  validationMessage.innerHTML = "<span>Completa este cuadro con tu nombre completo</span>";
})
nameRegister.addEventListener("keyup", () => {
  if (nameRegister.value.length <= 0) {
    validationMessage.innerHTML = "<span>Completa el cuadros de registro <strong>Nombre Completo</strong></span>";
    nameRegister.setAttribute("class", "warning");
  } else {
    validationMessage.innerHTML = "<span></span>";
    nameRegister.removeAttribute("class");

  }
})
/*2.- input para introduccion de nombre de usuario*/
nickNameRegister.addEventListener("mousemove", () => {
  validationMessage.innerHTML = "<span>Completa este cuadro con un nombre de usuario a eleccion </span>";
})
nickNameRegister.addEventListener("keyup", () => {
  if (nickNameRegister.value.length <= 0) {
    validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Nombre de Usuario</strong></span>";
    nickNameRegister.setAttribute("class", "warning");
  } else {
    validationMessage.innerHTML = "<span></span>";
    nickNameRegister.removeAttribute("class");
  }
})
/*3.- input para introduccion de email*/
emailRegister.addEventListener("mousemove", () => {
  validationMessage.innerHTML = "<span>Completa este cuadro con un email </span>";
})
emailRegister.addEventListener("keyup", () => {
  if (emailRegister.value.length <= 0) {
    validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Email</strong></span>";
    emailRegister.setAttribute("class", "warning");
  } else {
    validationMessage.innerHTML = "<span></span>";
    emailRegister.removeAttribute("class");
  }
})
/*4.- input para introduccion de contraseña*/
passwordRregister.addEventListener("mousemove", () => {
  validationMessage.innerHTML = "<span>Completa este cuadro con una contraseña a elección </span>";
})
passwordRregister.addEventListener("keyup", () => {
  if (passwordRregister.value.length === 0) {
    validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Password</strong></span>";
    passwordRregister.setAttribute("class", "warning");
  } else if (passwordRregister.value.length <= 5) {
    validationMessage.innerHTML = "<span>Completa el cuadro de registro <strong>Password</strong> con una contraseña de minimo 6 digitos</span>";
    passwordRregister.setAttribute("class", "warning");
  } else {
    validationMessage.innerHTML = "<span></span>";
    passwordRregister.removeAttribute("class");
  }
})



