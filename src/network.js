//pintar los datos iniciales del usuario
const writeUserData = (userId, name, nickName, email, imageUrl) => {
  firebase.database().ref(`users/${userId}`).set({
    usersId: userId,
    userName: name,
    userNickName: nickName,
    email: email,
    profile_picture: imageUrl
  });
}
//pintar los post de los usuarios
const writeNewPost = (uid, body) => {
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
    key: newPostKey,
    like: 0,
    dislike: 0
  };
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/posts/${newPostKey}`] = postData;
  updates[`/user-posts/${uid}/${newPostKey}`] = postData;
  firebase.database().ref().update(updates);
  return newPostKey;
}
//llamar datos post privados
const returnData = (uid) => {
  console.log(uid);

  const userUbication = firebase.database().ref('users').child(uid);
  userUbication.on('value', snap => {

    const nameUserId = snap.val().userNickName;
    userName.innerHTML = `Bienvenid@  ${nameUserId}`;

    const postUbication = firebase.database().ref('user-posts').child(uid);
    postUbication.on('child_added', snap => {
      const key = snap.val().key;
      const listPost = snap.val().body;

      const numLike = snap.val().like;
      const numDisLike = snap.val().dislike;

      showData(uid, key, listPost, numLike, numDisLike, nameUserId);
    });
  })
}
//pintar datos post privados
const showData = (userId, keyPost, posts, likePost, dislikePost, nameUserId) => {

  const divDelete = document.createElement('div');
  divDelete.setAttribute('class', 'p-3 bg-white rounded');
  const nickUser = document.createElement('h6');
  nickUser.setAttribute('class', 'mb-3 border-bottom ')
  const tab = document.createElement('br')
  const changePost = document.createElement('textarea');
  changePost.setAttribute('disabled', 'disabled');
  changePost.setAttribute('class', 'form-control');
  const btnUpdateSave = document.createElement('input');
  btnUpdateSave.setAttribute('value', 'Guardar');
  btnUpdateSave.setAttribute('type', 'button');
  btnUpdateSave.setAttribute('class', 'hidden btn btn-success mr-2');
  const btnUpdate = document.createElement('input');
  btnUpdate.setAttribute('value', 'Editar');
  btnUpdate.setAttribute('type', 'button');
  btnUpdate.setAttribute('class', 'btn btn-success mr-2');
  const btnDelete = document.createElement('input');
  btnDelete.setAttribute('value', 'Borrar');
  btnDelete.setAttribute('type', 'button');
  btnDelete.setAttribute('class', 'btn btn-danger mr-2');
  const btnpublic = document.createElement('SELECT');
  const wantSee = document.createElement('option');
  wantSee.setAttribute('value', 'election');
  const wantSeeToday = document.createTextNode('Ver como:');
  wantSee.appendChild(wantSeeToday);
  const onlyMe = document.createElement('option');
  onlyMe.setAttribute('value', 'only me');
  const seeMe = document.createTextNode('Privado');
  onlyMe.appendChild(seeMe);
  const onlyWorld = document.createElement('option');
  onlyWorld.setAttribute('value', 'world');
  const seeWorld = document.createTextNode('Público');
  onlyWorld.appendChild(seeWorld);

  nickUser.innerText = nameUserId;
  let saveNumber = likePost;
  console.log('este es like post', likePost);

  let saveDisNumber = dislikePost;
  //el valor del like va ir cambiando en ambos lados segun corresponde :
  firebase.database().ref(`user-posts`).child(userId).child(keyPost).on('value', snap => {
    changePost.innerHTML = snap.val().body;

  })

  //editar  
  btnUpdate.addEventListener('click', () => {
    btnUpdate.classList.add('hidden');
    btnUpdateSave.classList.remove('hidden');
    changePost.removeAttribute('disabled');
  });

  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.classList.remove('hidden');
    btnUpdateSave.classList.add('hidden');
    changePost.setAttribute('disabled', 'disabled');
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,


    };
    firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).set(postData);
    firebase.database().ref().child(`posts/${keyPost}`).set(postData);
    firebase.database().ref(`user-posts-world`).child(keyPost).once('value', worldPost => {
      if (worldPost.val()) {
        firebase.database().ref().child(`user-posts-world/${keyPost}`).set(postData);
      }
    });


  });

  //borrar
  btnDelete.addEventListener('click', () => {
    const opcion = confirm('Deseaes eliminar este post');
    if (opcion == true) {
      firebase.database().ref().child(`/user-posts/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`posts/${keyPost}`).remove();
      firebase.database().ref().child(`/user-posts-world/${keyPost}`).remove();
      divDelete.remove();
    } else {
      alert(':)');
    }
  });

  //publicar 
  btnpublic.addEventListener('change', () => {
    if (btnpublic.value === 'world') {

      const postData = {
        uid: userId,
        body: changePost.value,
        key: keyPost,
        like: likePost,
        dislike: dislikePost,
        name: nameUserId,
      };
      firebase.database().ref().child(`/user-posts-world/${keyPost}`).update(postData);
    }
    if (btnpublic.value === 'only me') {

      const opcion = confirm('Deseaes eliminar este post');
      if (opcion == true) {
        firebase.database().ref().child(`/user-posts-world/${keyPost}`).remove();
        document.getElementById(keyPost).remove();

      } else {
        alert(':)');
      }
    }
  })

  divDelete.appendChild(nickUser);
  divDelete.appendChild(tab);
  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(btnUpdate);
  divDelete.appendChild(btnUpdateSave);
  divDelete.appendChild(btnDelete);
  btnpublic.appendChild(wantSee);
  btnpublic.appendChild(onlyMe);
  btnpublic.appendChild(onlyWorld);
  divDelete.appendChild(btnpublic);
  postL.appendChild(divDelete);
}

//llamar datos post publicos

const returnDataPublic = (uid) => {

  const postPublicWorld = firebase.database().ref().child('user-posts-world');
  postPublicWorld.on('child_added', snap => {
    const keyPost = snap.val().key;
    const likeGlobal = snap.val().like;
    const dislLikeGlobal = snap.val().dislike;
    const postGlobal = snap.val().body;
    const nameUserId = snap.val().name;
    const otherUid = snap.val().uid;

    showWorld(uid, otherUid, keyPost, postGlobal, likeGlobal, dislLikeGlobal, nameUserId);
  });
}

const showWorld = (userId, otherUid, keyPost, postGlobal, likeGlobal, dislLikeGlobal, nameUserId) => {

  const divDelete = document.createElement('div');
  divDelete.setAttribute('class', 'contents-post');
  divDelete.setAttribute('id', keyPost);
  const nickUser = document.createElement('span');
  const tabA = document.createElement('br')
  const tabB = document.createElement('br')
  const tab = document.createElement('br')
  const changePost = document.createElement('textarea');
  changePost.setAttribute('disabled', 'disabled');
  const tell = document.createElement('span');
  const like = document.createElement('input');
  like.setAttribute('value', 'Like');
  like.setAttribute('type', 'button');

  nickUser.innerHTML = nameUserId;

  //el valor del like va ir cambiando en ambos lados segun corresponde :

  firebase.database().ref(`user-posts-world`).child(keyPost).on('value', snap => {
    tell.innerHTML = snap.val().like;
    changePost.innerHTML = snap.val().body;

  })

  //like global
  like.addEventListener('click', () => {
    console.log(userId);
    console.log(otherUid);
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likeGlobal++,
      dislike: dislLikeGlobal,
      name: nameUserId,
    }
    firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);

  });

  divDelete.appendChild(nickUser);
  divDelete.appendChild(tabA);
  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(tell);
  divDelete.appendChild(like);
  postWorld.appendChild(divDelete);

};
