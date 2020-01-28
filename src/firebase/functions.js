import { db, auth } from "./fireConfig";

export const getPosts = () => {
  db.collection("posts")
    .orderBy("createdAt", "desc")
    .get()
    .then(data => {
      let posts = [];
      data.forEach(post => {
        posts.push({
          postId: post.id,
          body: post.data().body,
          userName: post.data().userName,
          createdAt: post.data().createdAt
        });
      });
      console.log(posts);
      return posts;
    })
    .catch(err => console.error(err));
};

export const createPost = (body, userName) => {
  const newPost = {
    body,
    userName,
    createdAt: new Date().toISOString()
  };

  db.collection("posts")
    .add(newPost)
    .then(post => console.log(`Post ${post.id} created successfully.`))
    .catch(err => console.error(err));
};

export const signUp = (email, password, confirmedPassword, userName) => {
  const newUser = {
    email,
    password,
    confirmedPassword,
    userName
  };

  //Validate if userName is unique
  db.doc(`/users/${newUser.userName}`)
    .get()
    .then(doc => {
      if (doc.exists) {
        return;
      }
    });

  auth
    .createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => console.log(`User ${data.user.uid} signed up.`))
    .catch(err => console.error(err.message));
};

export const signIn = (email, password) => {
  auth
    .signInWithEmailAndPassword(email, password)
    .then(data => {
      return data.user.getIdToken();
    })
    .then(token => {
      console.log(token);
      return;
    })
    .catch(err => console.error(err));
};
