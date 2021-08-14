export class Question{
    static create(question){
      return  fetch('https://podcast-58833-default-rtdb.firebaseio.com/questions.json', {
            method : 'POST',
            body : JSON.stringify(question),
            headers : {
                'Content-Type' : 'application.jon'
            }
        })
        .then(response => response.json())
        .then(response =>{
           question.id = response.name
           return question
        })
        .then(addToLocalStorage(question))
        .then(Question.renderlist())
    }
    static renderlist(){
      
    const questions  = getFromLc();
     console.log(questions)
    const html = questions.length? questions.map(toCard).join('') : `<h3> Вы пока ничего не спрашивали</h3>`
    const list = document.getElementById('list');
    list.innerHTML = html;
    }
    static fetch(token){
        if(!token){
            alert('Зареєструйся, чоловіче!')
            
            document.getElementById('auth-submit').disabled = false;
            return Promise.resolve('<p class="error">Зареєструйся чоловіче!<p>')
        }
       return fetch(`https://podcast-58833-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
        .then( response =>response.json())
        .then( response=>{
            if(response && response.error){
                return '<p class="error">Зареєструйся чоловіче!<p>'
            }
            return response? Object.keys(response).map(key=> ({
                ...response[key],
                id:key,
            })): []
        })
        
    }
    static listToHTML(questions){
        console.log(questions)
        return questions.length
        ? `<ol>${questions.map(q => `<li class="quests-list__item">${q.text}</li>`).join('')}</ol>`
        : `<h2 class=" mui--text-center">Голова може спати спокійно</h2>`
    
    }

}

function addToLocalStorage(question){
    const all = getFromLc()
    console.log(all)
    all.push(question);
    localStorage.setItem('questions', JSON.stringify(all))
}

function getFromLc(){
    return JSON.parse(localStorage.getItem('questions') || '[]')
}
function toCard(obj){

 return `<div class ="py-2"><h6 class="text-dark">
 ${new Date(obj.date).toLocaleDateString()}
  ${new Date(obj.date).toLocaleTimeString()}
  </h6>
  <div class="text-dark">${obj.text}</div></div>
  `
}
