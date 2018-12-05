//secion con anonymus
const anonymus = document.getElementById('anonimo');

//botones de iniciar sesion;registro y salida
const btnSignIn = document.getElementById('SignIn');
const btnRegister = document.getElementById('register-user');
const btnLogout = document.getElementById('Logout');
//inputs email y pasword de iniciar sesión
const email = document.getElementById('email');
const password = document.getElementById('password');
//inputs Nombre, Apellido, email y pasword del registro
const nameRegister = document.getElementById('name-register');
const nickNameRegister = document.getElementById('nickName-register');
const emailRegister = document.getElementById('email-register');
const passwordRregister = document.getElementById('password-register');
//botones de iniciar secion con google y facebook(aun si uso)
const btnGoogle = document.getElementById('google-SignIn');
// const btnFacebook = document.getElementById('facebook-SignIn');
//botones de ocutar y aparecer (iniciar secion  registrarse)
const btnNewAccount = document.getElementById('newAccount-register');
const btnReturn = document.getElementById('return');
//botones para ocultar y aparecer los post publicos y privados
const visualOnlyMe = document.getElementById('Only Me');
const visualWorld = document.getElementById('WORLD');
//varibles creadas para la visualizacion usando el css en html
const login = document.getElementById('menu');
const logout = document.getElementById('singIn-register');
const userName = document.getElementById('user_name');
const register = document.getElementById('register');
const singIn = document.getElementById('singIn');
const title = document.getElementById('title');

const postL = document.getElementById('post-list');
const postWorld = document.getElementById('post-list-public');

const wall = document.getElementById('wall')
const dataBase = document.getElementById('dataBase');
const btnSave = document.getElementById('btnSave');
const post = document.getElementById('post');
const posts = document.getElementById('publications');

const navbar = document.querySelector('#navbarNavAltMarkup');
const btnHamburger = document.querySelector('#btnHamburger');

// const 

navbar.addEventListener('click', () => {
  if (window.innerWidth < '768') btnHamburger.click()
})

//ocultando y apareciondo el area de inciar sesion y registro
btnNewAccount.addEventListener('click', () => {
  register.classList.remove('hidden')
  singIn.classList.add('hidden')
})

btnReturn.addEventListener('click', () => {
  register.classList.add('hidden')
  singIn.classList.remove('hidden')
})

visualOnlyMe.addEventListener('click', () => {
  postWorld.classList.add('hidden');
  postL.classList.remove('hidden');
})

visualWorld.addEventListener('click', () => {
  postL.classList.add('hidden')
  postWorld.classList.remove('hidden')
})

//mostrando y ocultando contraseña
const visualPaswordSI = document.getElementById('password-show');
const visualPaswordRE = document.getElementById('password-register-show');

visualPaswordSI.addEventListener('click', () => {
  if (password.type === 'password') {
    password.type = 'text';
  } else {
    password.type = 'password';
  }
});

visualPaswordRE.addEventListener('click', () => {
  if (passwordRregister.type === 'password') {
    passwordRregister.type = 'text';
  } else {
    passwordRregister.type = 'password';
  }
})

// condicionales de validacion
/*constante para escribir el mensaje de validacion en iniciar sesion*/
const validationMessageSI = document.getElementById('validation-message');
/*mensajes de validacion de Iniciar sesion
1.- input para introduccion de correo*/
email.addEventListener('keyup', () => {
  if (email.value.length <= 1) {
    validationMessageSI.innerHTML = '<span class="text-danger">Completa el cuadro <strong>Email</strong></span>';
    email.classList.add('bg-danger');
  } else {
    validationMessageSI.innerHTML = '<span></span>';
    email.classList.remove('bg-danger');
  }
})

/*2.- input para introduccion de contraseña*/
password.addEventListener('keyup', () => {
  if (password.value.length <= 1) {
    validationMessageSI.innerHTML = '<span class="text-danger">Completa el cuadro <strong>Contraseña</strong></span>';
    password.classList.add('bg-danger');
  } else {
    validationMessageSI.innerHTML = '<span></span>';
    password.classList.remove('bg-danger');
  }
})

/*constante para escribir el mensaje de validacion en registro*/
const validationMessage = document.getElementById('validation-messageR');
/*mensajes de validacion del registro
1.- input para introduccion de nombre completo*/
nameRegister.addEventListener('mousemove', () => {
  validationMessage.innerHTML = '<span class="">Completa Nombre completo</span>';
})

nameRegister.addEventListener('keyup', () => {
  if (nameRegister.value.length <= 0) {
    validationMessage.innerHTML = '<span class="text-danger">Completa el cuadro de registro <br><strong>Nombre Completo</strong></span>';
    nameRegister.classList.add('bg-danger');
  } else {
    validationMessage.innerHTML = '<span></span>';
    nameRegister.classList.remove('bg-danger');
  }
})

/*2.- input para introduccion de nombre de usuario*/
nickNameRegister.addEventListener('mousemove', () => {
  validationMessage.innerHTML = '<span class="">Completa Nombre usuario </span>';
})
nickNameRegister.addEventListener('keyup', () => {
  if (nickNameRegister.value.length <= 0) {
    validationMessage.innerHTML = '<span class="text-danger">Completa el cuadro de registro <br><strong>Nombre de Usuario</strong></span>';
    nickNameRegister.classList.add('bg-danger');
  } else {
    validationMessage.innerHTML = '<span></span>';
    nickNameRegister.classList.remove('bg-danger');
  }
})

/*3.- input para introduccion de email*/
emailRegister.addEventListener('mousemove', () => {
  validationMessage.innerHTML = '<span class="">Completa Email, ejemplo:<br> <strong>miusuario@dominio.algo</strong> </span>';
})

emailRegister.addEventListener('keyup', () => {
  if (emailRegister.value.length <= 0) {
    validationMessage.innerHTML = '<span class="text-danger">Completa el cuadro de registro<br> <strong>Email</strong></span>';
    emailRegister.classList.add('bg-danger');
  } else {
    validationMessage.innerHTML = '<span></span>';
    emailRegister.classList.remove('bg-danger');
  }
})

/*4.- input para introduccion de contraseña*/
passwordRregister.addEventListener('mousemove', () => {
  validationMessage.innerHTML = '<span class="">Completa Contraseña </span>';
})

passwordRregister.addEventListener('keyup', () => {
  if (passwordRregister.value.length === 0) {
    validationMessage.innerHTML = '<span class="text-danger">Completa el cuadro de registro <br><strong>Contraseña</strong></span>';
    passwordRregister.classList.add('bg-danger');
  } else if (passwordRregister.value.length <= 5) {
    validationMessage.innerHTML = '<span class="text-danger">Completa <strong>Contraseña</strong><br>  mínimo 6 digitos</span>';
    passwordRregister.classList.add('bg-danger');
  } else {
    validationMessage.innerHTML = '<span></span>';
    passwordRregister.classList.remove('bg-danger');
  }
})
