

export function getAuthForm(){
    return `
    <form class="mui-form" id="auth-form">
   
    <div class="mui-textfield mui-textfield--float-label">
      <input type="email" required minlength="10" maxlength="256" id="auth-e-input">
      <label >Email</label>
    </div>

  
    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" required minlength="6" maxlength="256" id="auth-p-input">
      <label >Password</label>
    </div>
    <button type="submit" id="auth-submit" data-target="auth"  class="mui-btn mui-btn--primary">Вхід</button>
    
    <button style="display:inline-block;" type="button" id="auth-change" data-change="true"  class="mui-btn mui-btn--primary">Реєстрація</button>
    </form>
    `
}

export function authWithEmailAndPassword(email, password){
  const apiKey = "AIzaSyB2hzPSvajCxhXBnq6C8mov08qCdPSFo5M";
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: "POST",
    body: JSON.stringify({
      email, password,
      returnSecureToken	:true,
    }),
    headers:{
      'Content-Type' : 'application/json'
    }
  })
  .then(response => response.json())
  .then(data=>data.idToken)
}
export function getRegForm(){
  return ` <form class="mui-form" id="reg-form">

  <div class="mui-textfield mui-textfield--float-label">
  <input type="name" required minlength="4" maxlength="256" data-reg="name">
  <label >Username</label>
</div>

<div class="mui-textfield mui-textfield--float-label">
<input type="name" required minlength="4" maxlength="256" data-reg="surname">
<label >Surname</label>
</div>

  <div class="mui-textfield mui-textfield--float-label">
   <input type="email" required minlength="10" maxlength="256"data-reg="email">
   <label >Email</label>
    </div>

    <div class="mui-textfield mui-textfield--float-label">
      <input type="password" required minlength="6" maxlength="256" data-reg="password">
      <label >Password</label>
    </div>

    <button  data-reg="register"  class="mui-btn mui-btn--primary">Реєстрація</button>

    <button type="button" data-reg="sing-in" data-change="false"  class="mui-btn mui-btn--primary">Вхід</button>
   

    </form>
    
  `
}

export function createUserWhithEmailAndPassword(email, password, button){
  button.disabled = true
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    console.log(userCredential, user)
  })
  .catch((error) => {
    button.disabled = false
   alert('Чоловіче, ви вже є в системі')
  });
}