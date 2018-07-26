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
const validationMessageSI = document.getElementById("validation-message");
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
const validationMessage = document.getElementById("validation-message");
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

//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      userName.innerHTML = `Bienvenid@  ${user.displayName}`;
      console.log('Inicio Logueado ')
      login.classList.remove("hidden");
      logout.classList.add("hidden");
      visualImgFont.setAttribute("class", "hidden");
      wall.classList.remove("hidden");

    } else {
      console.log('No esta logueado');
      login.classList.add("hidden");
      logout.classList.remove("hidden");
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");
      visualImgFont.removeAttribute("class");
      wall.classList.add("hidden");
    }
  });
}

const writeUserData = (userId, name, nickName, email, imageUrl) => {
  firebase.database().ref('users/' + userId).set({
    usersId: userId,
    userName: name,
    userNickName: nickName,
    email: email,
    profile_picture: imageUrl
  });
}

const writeNewPost = (uid, body) => {
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
  };

  // Obtener un identificador(key) para el post
  const newPostKey = firebase.database().ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/posts/' + newPostKey] = postData;
  updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  firebase.database().ref().update(updates);
  return newPostKey;
}

//Registrando usuarios nuevos
btnRegister.addEventListener("click", () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
    .then((result) => {
      console.log("me registro");
      const user = result.user;
      user.displayName = nickNameRegister.value;
      user.name = nameRegister.value;
      console.log(nickNameRegister.value);
      writeUserData(user.uid, nameRegister.value, nickNameRegister.value, user.email, user.photoURL);
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})

//Acceso de usuarios existentes
btnSignIn.addEventListener("click", () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {
      console.log("entre");
      console.log(passwordRregister.value);
      console.log(emailRegister.value);
    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})

//iniciando con google 
btnGoogle.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      console.log("ingrese con google");
      const user = result.user;
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(error.credential);
    });
})

//Creando post
btnSave.addEventListener('click', () => {
  const userId = firebase.auth().currentUser.uid;
  const newPost = writeNewPost(userId, post.value);
  
  const btnUpdate = document.createElement("input");
  btnUpdate.setAttribute("value", "Editar");
  btnUpdate.setAttribute("type", "button");
  const btnDelete = document.createElement("input");
  btnDelete.setAttribute("value", "Borrar");
  btnDelete.setAttribute("type", "button");
  const contPost = document.createElement('div');
  const textPost = document.createElement('textarea')
  textPost.setAttribute("id", newPost);

  userUbication.on('child_added', snap => {

    let listUserId = Object.keys(snap.val());
    console.log(listUserId);


    showPostSaved.on("child_added", snap => {
      let listPost = Object.keys(snap.val());
      console.log(listPost);


      let output = '';
      output += ``;

    });

  })
  textPost.innerHTML = post.value;
  post.value = '';
  btnDelete.addEventListener('click', () => {

    firebase.database().ref().child('/user-posts/' + userId + '/' + newPost).remove();
    firebase.database().ref().child('posts/' + newPost).remove();


    contPost.remove();

    alert('The user is deleted successfully!');

  });

  btnUpdate.addEventListener('click', () => {
    const newUpdate = document.getElementById(newPost);
    const newPostUser = {
      body: newUpdate.value,
    };

    const updatesUser = {};
    const updatesPost = {};

    updatesUser['/user-posts/' + userId + '/' + newPost] = newPostUser;
    updatesPost['/posts/' + newPost] = newPostUser;

    firebase.database().ref().update(updatesUser);
    firebase.database().ref().update(updatesPost);

  });

  contPost.appendChild(textPost);
  contPost.appendChild(btnUpdate);
  contPost.appendChild(btnDelete);
  posts.appendChild(contPost);
})

//salir de la cuenta del usuario
btnLogout.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      console.log('Cerro Sesión');
      login.classList.remove("hidden");
      logout.classList.add("hidden");
      register.setAttribute("class", "hidden");
      singIn.removeAttribute("class");

    })
    .catch((error) => {
      console.log('Error al cerrar Sesión');
    });
})
