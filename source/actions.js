

export function isValid(str, less = 10, greater = 100){
 return str.length >= less &&  str.length <= greater }

 export function createModal(title, content){
    const modal =  document.createElement('div');
    modal.classList.add('modal')
    const html =`
    <h4>${title}</h4>
    <div class="modal__content">${content}</div>
    ` 
    modal.innerHTML = html
    mui.overlay('on', modal);
   
   
 }


