// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword ,signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDsMPLqXGQuJsyDZC9BmJtk7AGmyR5ctmM",
  authDomain: "orders-d51bc.firebaseapp.com",
  databaseURL: "https://orders-d51bc-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "orders-d51bc",
  storageBucket: "orders-d51bc.firebasestorage.app",
  messagingSenderId: "715473441745",
  appId: "1:715473441745:web:4ac741b7e7683da98386f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


const register=document.getElementById('submit');
const login=document.getElementById('loginId');

register.addEventListener('click',function (event){

  event.preventDefault();

  const email=document.getElementById('email').value;
  const password=document.getElementById('password').value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      alert('Account Created Successfully!');
      
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage,errorCode);
      // ..
    });

})
login.addEventListener('click',function(event){

  event.preventDefault();

  const email2=document.getElementById('email2').value;
  const password2=document.getElementById('password2').value;
  console.log(email)

  signInWithEmailAndPassword(auth, email2, password2)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    alert(`Welcome ${user.email}`);
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage,errorCode);

  });
})

