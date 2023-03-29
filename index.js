let form = document.querySelector('#contact-form')
let inpName = document.querySelector('#name')
let inpMail = document.querySelector('#email')
let inpContact = document.querySelector('#phone')
let inpPhoto = document.querySelector('#image')
let list = document.querySelector('.contact-list')

// ! ---------- TODO List ------ 
// ? read 
createTask(); 
function createTask() { 
  if (!localStorage.getItem("tasks-data")) { 
    localStorage.setItem("tasks-data", "[]"); 
  } 
  let data = JSON.parse(localStorage.getItem("tasks-data")); 
  list.innerHTML = "";  
  data.forEach((elem, index) => { 
    list.innerHTML += ` 
    <li style ="display: flex; align-items: center; margin-bottom: 10px;"> 
      <img src ="${elem.image}" width = "70" style="border-radius: 20px;">
      ${elem.name} 
      ${elem.email} 
      ${elem.phone} 
      <button id="btnDel" onclick="deleteTask(${index})">delete</button> 
      <button  onclick="editTask(${index})">Edit</button> 
    </li> 
    `;
  }); 
} 

// ! create-добавление 
form.addEventListener("submit", (event) => {
  event.preventDefault(); 
  if (!inpName.value.trim() || !inpMail.value.trim() || !inpContact.value.trim()) { 
    
    alert("Заполните поле!"); 
    return; 
  } 
  let obj = { image: inpPhoto.value, name: inpName.value, email: inpMail.value, phone: inpContact.value}; 
  let data = JSON.parse(localStorage.getItem("tasks-data")); 
  data.push(obj); 
  localStorage.setItem("tasks-data", JSON.stringify(data)); 
  inpName.value = ""; 
  inpMail.value = ""; 
  inpContact.value = ""; 
  inpPhoto.value = "";
  createTask(); 
}); 

//! Delete-удаление 
function deleteTask(index) { 
  let data = JSON.parse(localStorage.getItem("tasks-data")); 
  data.splice(index, 1); 
  localStorage.setItem("tasks-data", JSON.stringify(data)); 
  createTask(); 
} 

//!  Edit-изменение 
let modal = document.querySelector(".modal"); 
let inpEditName = document.querySelector("#edit-name"); 
let inpEditPhone = document.querySelector("#edit-phone"); 
let inpEditMail = document.querySelector("#edit-email"); 
let inpEditImg = document.querySelector('#edit-image')
let btnSave = document.querySelector("#add-edit"); 
let btnClose = document.querySelector(".close"); 
console.log(inpEditName  , inpEditPhone  , inpEditMail);

function editTask(index) { 
  modal.style.display = "block"; 
  let data = JSON.parse(localStorage.getItem('tasks-data')) 
  inpEditName.value = data[index].task1 
  inpEditPhone.value = data[index].task3
  inpEditMail.value = data[index].task2
  inpEditImg.value = data[index].task
  inpEditName.setAttribute('id',index) 

btnClose.addEventListener('click', () => { 
  modal.style.display='none' 
}) 
btnSave.addEventListener('click', () => { 
  let id = inpEditName.id 
  let data = JSON.parse(localStorage.getItem('tasks-data')) 
  let newObj = { 
    name:inpEditName.value, 
    email:inpEditMail.value,
    phone:inpEditPhone.value,
    image:inpEditImg.value
    
  } 
  data.splice(id,1,newObj) 
  localStorage.setItem('tasks-data', JSON.stringify(data)) 
  modal.style.display='none' 
  createTask() 
})}
