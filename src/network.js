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
const writeNewPost = (uid, body, status) => {
  // Get a key for a new Post.
  const newPostKey = firebase.database().ref().child('posts').push().key;
  // A post entry.
  const postData = {
    uid: uid,
    body: body,
    key: newPostKey,
    like: 0,
    dislike: 0,
    status
  };
  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates[`/posts/${newPostKey}`] = postData;
  updates[`/user-posts/${uid}/${newPostKey}`] = postData;
  if (status === 'public') {
    updates[`/user-posts/${newPostKey}`] = postData;
  }
  firebase.database().ref().update(updates);
  return newPostKey;
}
//llamar datos post privados
const returnData = (uid) => {

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
      const status = snap.val().status

      showData(uid, key, listPost, numLike, numDisLike, nameUserId, status);
    });
  })
}
//pintar datos post privados
const showData = (userId, keyPost, post, likePost, dislikePost, nameUserId, status) => {

  const divDelete = document.createElement('div');
  divDelete.setAttribute('class', 'p-3 mb-3 bg-white rounded divDelete');
  const nickUser = document.createElement('h5');
  nickUser.setAttribute('class', 'mb-3 border-bottom ')
  const tab = document.createElement('br')
  const changePost = document.createElement('p');
  changePost.setAttribute('contenteditable', 'false');
  changePost.setAttribute('class', 'form-control h-auto mb-2 bg-grey');
  changePost.textContent = post;
  const btnUpdateSave = document.createElement('input');
  btnUpdateSave.setAttribute('value', 'Guardar');
  btnUpdateSave.setAttribute('type', 'button');
  btnUpdateSave.setAttribute('class', 'hidden btn btn-success mr-2');
  const btnUpdate = document.createElement('input');
  btnUpdate.setAttribute('value', 'Editar');
  btnUpdate.setAttribute('type', 'button');
  btnUpdate.setAttribute('class', 'btn btn-success mr-2');
  const btnDelete = document.createElement('i');
  btnDelete.setAttribute('class', 'btn btn-danger mr-2 p-2 fas fa-trash');
  const btnpublic = document.createElement('SELECT');
  btnpublic.setAttribute('class', 'form-control w-auto')
  const onlyMe = document.createElement('option');
  onlyMe.setAttribute('value', 'private');
  const seeMe = document.createTextNode('Privado');
  onlyMe.appendChild(seeMe);
  const onlyWorld = document.createElement('option');
  onlyWorld.setAttribute('value', 'public');
  const seeWorld = document.createTextNode('Público');
  onlyWorld.appendChild(seeWorld);

  nickUser.innerText = nameUserId;
  let saveNumber = likePost;
  let saveDisNumber = dislikePost;

  //editar  
  btnUpdate.addEventListener('click', () => {
    btnUpdate.classList.add('hidden');
    btnUpdateSave.classList.remove('hidden');
    changePost.setAttribute('contenteditable', 'true');
    changePost.classList.remove('bg-grey');
  });

  btnUpdateSave.addEventListener('click', () => {
    btnUpdate.classList.remove('hidden');
    btnUpdateSave.classList.add('hidden');
    changePost.setAttribute('contenteditable', 'false');
    changePost.classList.add('bg-grey')
    const postData = {
      uid: userId,
      body: changePost.textContent,
      key: keyPost,
      like: saveNumber,
      dislike: saveDisNumber,
      name: nameUserId,
    };

    firebase.database().ref().child(`user-posts/${userId}/${keyPost}`).set(postData);
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
    if (opcion === true) {
      firebase.database().ref().child(`user-posts/${userId}/${keyPost}`).remove();
      firebase.database().ref().child(`posts/${keyPost}`).remove();
      firebase.database().ref().child(`user-posts-world/${keyPost}`).remove();
      divDelete.remove();
    } else {
      alert(':)');
    }
  });

  //publicar 
  btnpublic.addEventListener('change', () => {
    const postData = {
      uid: userId,
      body: changePost.textContent,
      key: keyPost,
      like: likePost,
      dislike: dislikePost,
      name: nameUserId,
      status: btnpublic.value
    };
    if (btnpublic.value === 'public') {
      firebase.database().ref('user-posts-world/').child(keyPost).update(postData);
    }
    if (btnpublic.value === 'private') {
      const opcion = confirm('Deseaes eliminar este post');
      if (opcion == true) {
        firebase.database().ref('user-posts-world/').child(keyPost).update(postData);
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
  if (status === 'public') {
    btnpublic.appendChild(onlyMe);
    btnpublic.appendChild(onlyWorld);
  } else {
    btnpublic.appendChild(onlyWorld);
    btnpublic.appendChild(onlyMe);
  }
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
    const status = snap.val().status

    showWorld(uid, otherUid, keyPost, postGlobal, likeGlobal, dislLikeGlobal, nameUserId, status);
  });
}

const showWorld = (userId, otherUid, keyPost, postGlobal, likeGlobal, dislLikeGlobal, nameUserId, status) => {

  const divDelete = document.createElement('div');
  divDelete.setAttribute('class', 'p-3 mb-3 bg-white rounded divDelete');
  divDelete.setAttribute('id', keyPost);
  const nickUser = document.createElement('h5');
  nickUser.setAttribute('class', 'mb-3 border-bottom')
  const tab = document.createElement('br')
  const changePost = document.createElement('p');
  changePost.setAttribute('class', 'form-control mb-2 h-auto bg-grey');
  changePost.textContent = postGlobal;
  const tell = document.createElement('b');
  tell.setAttribute('class', 'm-2')
  tell.textContent = likeGlobal;
  const likePublic = document.createElement('i');
  likePublic.setAttribute('class', ' btn btn-primary p-2 far fa-thumbs-up')

  nickUser.innerHTML = nameUserId;
  let likeWorld = likeGlobal;

  //like global
  likePublic.addEventListener('click', () => {
    likeWorld++;
    const postData = {
      uid: userId,
      body: changePost.value,
      key: keyPost,
      like: likeWorld,
      dislike: dislLikeGlobal,
      name: nameUserId,
      status
    }
    firebase.database().ref().child(`/posts/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts/${otherUid}/${keyPost}`).set(postData);
    firebase.database().ref().child(`/user-posts-world/${keyPost}`).set(postData);
  });

  divDelete.appendChild(nickUser);
  divDelete.appendChild(tab);
  divDelete.appendChild(changePost);
  divDelete.appendChild(tab);
  divDelete.appendChild(tell);
  divDelete.appendChild(likePublic);
  postWorld.appendChild(divDelete);

};
