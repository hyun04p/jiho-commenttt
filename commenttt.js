// Firebase Config Begins =========
var firebaseConfig = {
  apiKey: "AIzaSyBo3PHArmbyLtaWRYSCNaN22W6HwaGbTy8",
  authDomain: "jiho-bcb72.firebaseapp.com",
  projectId: "jiho-bcb72",
  storageBucket: "jiho-bcb72.appspot.com",
  messagingSenderId: "757824469757",
  appId: "1:757824469757:web:f73d7098784c278e371c94"
};
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();
// Firebase Config Ends ===========


const root = document.getElementById("commenttt");
root.setAttribute("style", "width: 100%; box-sizing: border-box; padding: 20px; height: 600px; border: 1px #888 solid; display: flex; flex-direction: column; justify-content: space-between;")

root.innerHTML = `
  <h2>Comments</h2>
  <div id="commenttt-all-comments" style="flex: 1; overflow: scroll; background-color: #f7f7f7; margin-bottom: 20px;"></div>
  <div id="commenttt-form" style="display: flex; justify-content: space-between; align-items: center; height: 70px;">
    <input id="commenttt-name-field" type="text" placeholder="Who are you?" style="flex: 0.5; height: 75%; margin-right: 10px; font-size: 1.4rem">
    <input id="commenttt-content-field" type="text" placeholder="Leave your comment here!" style="flex: 4; height: 75%; margin-right: 10px; font-size: 1.4rem">
    <button id="commenttt-btn" style="flex: 2; height: 80%;">SEND</button>
  </div>
`;
const commentContainer = document.getElementById("commenttt-all-comments");



function renderSingleComment(author, content) {
  return `
<div style="display: flex; width: 100%; border-left: 5px #bbb solid; margin: 30px; padding-left: 10px; box-sizing: border-box">
  <div style="width: 150px; font-weight: bold;">${author}</div>
  <div style="color: #666; margin-left: 10px">${content}</div>
</div>
`
}

function renderComments(allComments) {
  let commentsDom = "";
  allComments.forEach(c => {
    commentsDom += renderSingleComment(c.author, c.content)
  })
  return commentsDom;
}

db.collection("comment").doc("comment").onSnapshot((doc) => {
  commentContainer.innerHTML = renderComments(doc.data().allComments);
  commentContainer.scrollTop = commentContainer.scrollHeight;
})

const submitBtn = document.getElementById("commenttt-btn");
const nameField = document.getElementById("commenttt-name-field")
const contentField = document.getElementById("commenttt-content-field")
function onSubmit() {
  var commentDoc = db.collection("comment").doc("comment");
  commentDoc.update({
    allComments: firebase.firestore.FieldValue.arrayUnion({
      author: nameField.value,
      content: contentField.value
    })
  });
  nameField.value = ""
  contentField.value = ""
}
submitBtn.onclick = onSubmit;