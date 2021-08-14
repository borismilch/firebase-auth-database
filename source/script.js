
import {Question} from "./questions.js";
import './style.scss'
import {getAuthForm, authWithEmailAndPassword, getRegForm, createUserWhithEmailAndPassword} from "./auth.js";
import {isValid, createModal} from './actions.js'

const firebaseConfig = {
    apiKey: "AIzaSyB2hzPSvajCxhXBnq6C8mov08qCdPSFo5M",
    authDomain: "podcast-58833.firebaseapp.com",
    databaseURL: "https://podcast-58833-default-rtdb.firebaseio.com",
    projectId: "podcast-58833",
    storageBucket: "podcast-58833.appspot.com",
    messagingSenderId: "599196409462",
    appId: "1:599196409462:web:1f59396ff1d9a305ec0957"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


const form = document.getElementById('form');
const input = form.querySelector('#question-input');
const submit = form.querySelector('#question-submit');
console.log(form, input, submit)
window.addEventListener('load', Question.renderlist)
form.addEventListener("submit", submitFormHandler)
document.getElementById('auth-btn').addEventListener('click',()=> openModal(1))

input.addEventListener('input', ()=>{
    submit.disabled = !isValid(input.value)
})
function submitFormHandler(e){
    e.preventDefault()

   if(isValid(input.value)){
       const question = {
           text : input.value,
           date : new Date().toJSON()
           
       }
    input.value = '';
   submit.disabled = true;
   console.log(Question.create(question))
   Question.create(question).then(()=>{
   input.value = '' 
   input.className = ''
   submit.disabled = false
   })
    }

}

function openModal(value){
 value === 1? createModal('AUTH', getAuthForm()) : createModal('REGISTER', getRegForm());
  const forma = document.getElementById('mui-overlay').querySelector('.mui-form')
  forma.addEventListener('submit', authFormHandler);
  forma.addEventListener('click', catchformClick)
}

function authFormHandler(event){

event.preventDefault()
event.target.querySelector('#auth-submit').disabled = true
const email = event.target.querySelector('#auth-e-input').value;
const password = event.target.querySelector('#auth-p-input').value;

authWithEmailAndPassword(email, password)
.then(token=>{
    return Question.fetch(token)})
.then(renderModalAfterAuth)

}
function renderModalAfterAuth(content){
    createModal('Питання до голови',Question.listToHTML(content))
    
}
function catchformClick(e){
    if(e.target.dataset.target == "auth"){
        authFormHandler();
        
    }
    console.log(e.target)
    e.preventDefault();
    let t = e.target
    if(t.dataset.change){
    document.querySelector('.mui-form').closest('#mui-overlay')
    console.log(t.dataset.change)
    t.dataset.change == 'true'? openModal(0) : openModal(1)}
    
    if(e.target.dataset.reg == 'register'){
       
      const regName =  t.parentNode.querySelector('[data-reg = name]').value
      const regSurname =  t.parentNode.querySelector('[data-reg = surname]').value
      const regEmail =  t.parentNode.querySelector('[data-reg = email]').value
      const regPassword =  t.parentNode.querySelector('[data-reg = password]').value
      createUserWhithEmailAndPassword(regEmail, regPassword, e.target)
    }
}

