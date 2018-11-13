//confirma que el usuario esta logueando para que no tenga que volver a ingresar sus datos
window.onload = () => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      title.classList.add('hidden');
      wall.classList.remove('hidden')
      if (user.emailVerified === true) {
        returnData(user.uid);
        returnDataPublic(user.uid);
        login.classList.remove('hidden');
        logout.classList.add('hidden');
        wall.classList.remove('hidden');
        title.classList.add('hidden');
      }
      if (user.isAnonymous === true) {
        login.classList.remove('hidden');
        logout.classList.add('hidden');
        dataBase.classList.add('hidden');
        wall.classList.remove('hidden');
        postL.classList.add('hidden');
        postWorld.classList.remove('hidden');
        returnDataPublic(user.uid);
        title.classList.add('hidden');
      }
    }
    else {
      login.classList.add('hidden');
      logout.classList.remove('hidden');
      register.classList.add('hidden');
      singIn.classList.remove('hidden');
      wall.classList.add('hidden');
      title.classList.remove('hidden');
    }
  });
}

//Registrando usuarios nuevos
btnRegister.addEventListener('click', () => {
  firebase.auth().createUserWithEmailAndPassword(emailRegister.value, passwordRregister.value)
    .then((result) => {

      const user = result.user;
      writeUserData(user.uid, nameRegister.value, nickNameRegister.value, user.email, user.photoURL);
      checkEmail();
      register.classList.add('hidden');
      singIn.classList.remove('hidden');
      //url  aun no funciona

    })
    .catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})

btnSignIn.addEventListener('click', () => {
  firebase.auth().signInWithEmailAndPassword(email.value, password.value)
    .then(() => {

      onload();
    })
    .catch((error) => {
      email.addEventListener('mousemove', () => {
        validationMessageSI.innerHTML = '<span>Ingresa un email y/o contaseña valido</span>';
      })
      password.addEventListener('mousemove', () => {
        validationMessageSI.innerHTML = '<span>Ingresa un email y/o contaseña valido</span>';
      })
      validationMessageSI.innerHTML = '<span>Ingresa un email y/o contaseña valido</span>';
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      // ...
    });
})

//confirmando Email
const checkEmail = () => {
  const user = firebase.auth().currentUser;

  user.sendEmailVerification()
    .then(() => {
      // Email sent.
      alert('se envio un correo de confirmacion a tu email')
    })
    .catch((err) => {
      console.error('Email error', err);

      // An error happened.
    });
}

//iniciando con google en iniciar secion:
btnGoogle.addEventListener('click', () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      title.classList.add('hidden');
      writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
    })
    .catch((err) => {
      console.error(`Error code: ${err.code}`, `Error message: ${err.message}`, `Error email: ${err.email}`, `Error message: ${err.credential}`);
    });
})

// //iniciar con facebook en iniciar sesion
// btnFacebook.addEventListener('click', () => {
//   const provider = new firebase.auth.FacebookAuthProvider();
//   firebase.auth().signInWithPopup(provider)
//     .then((result) => {
//       console.log('ingrese con facebook');
//       const user = result.user;
//       writeUserData(user.uid, user.displayName, user.displayName, user.email, user.photoURL);
//     })
//     .catch((error) => {
//       console.log(error.code);
//       console.log(error.message);
//       console.log(error.email);
//       console.log(error.credential);
//     });
// })
//enrar como anonimo
anonymus.addEventListener('click', () => {
  firebase.auth().signInAnonymously()
    .catch(err => {
      console.error(`Error code: ${err.code}`, `Error message: ${err.message}`)
    })

});

btnSave.addEventListener('click', () => {

  if (post.value.length !== 0 && post.value.trim() !== '') {
    const userId = firebase.auth().currentUser.uid;
    writeNewPost(userId, post.value);
    post.value = '';
  }
  else {
    alert('Escribe un comentario')
  }
})

//salir de la cuenta del usuario
btnLogout.addEventListener('click', () => {
  firebase.auth().signOut()
    .then(() => {
      login.classList.remove('hidden');
      logout.classList.add('hidden');
      register.classList.add('hidden');
      singIn.classList.remove('hidden');
      wall.classList.add('hidden');
      title.classList.remove('hidden');
    })
    .catch((err) => {
      console.error('Error al cerrar Sesión', `Error: ${err}`);
    });
})