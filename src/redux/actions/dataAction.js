import { db } from "../../firebase/fireConfig";

const getPosts = () => dispatch => {
  db.collection("posts")
    .get()
    .then(querySnapshot => {
      const docs = [];
      querySnapshot.forEach(doc => {
        let docx = {};
        docx = doc.data();
        docx.id = doc.id;
        docs.push(docx);
      });
      return docs;
    })
    .then(docs => dispatch({ type: "GET_POSTS", docs }))
    .catch(err => console.error(err));
};

export default getPosts;
