let dragElement = null

const todo = document.querySelector("#todo");
const progress = document.querySelector("#progress");
const done = document.querySelector("#done");
const tasks = document.querySelectorAll(".task");
let taskdata = {}

function addtaskElement(title, desc, column){
       const div = document.createElement("div");

             div.classList.add("task");
             div.setAttribute("draggable", true);

             div.innerHTML = `
             <h2>${title}</h2>
             <p>${desc}</p>
             <button>Delete</button>
             `
             
             column.appendChild(div);
             
             div.addEventListener("drag", ()=> {
                 dragElement = div;
                })
                const DeleteButton = div.querySelector("button")
                DeleteButton.addEventListener("click", ()=>{
                   div.remove();
                   updatetaskCount();
                })
                
              return div;
}


function updatetaskCount(){
        [todo, progress, done]. forEach(col=>{
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        taskdata[ col.id ] = Array.from(tasks).map(t => {
            return {
                title: t.querySelector("h2").innerText,
                desc: t.querySelector("p").innerText
            }
        })

        localStorage.setItem("tasks", JSON.stringify(taskdata));
        count.innerText = tasks.length; 
    })
}

if(localStorage.getItem("tasks")){
    const data = JSON.parse(localStorage.getItem("tasks"));
    
    for (const col in data){
        const column = document.querySelector(`#${col}`);
        data[col].forEach(task => {
            addtaskElement(task.title,task.desc,column);
        })
    }
    
    }

tasks.forEach(task => {

    task.addEventListener("dragstart", () => {
        dragElement = task;
    });

});


function addDragEffect(column) {

    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("hover-over");
    });

    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });

    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");
    });

    column.addEventListener("drop", (e) => {
        e.preventDefault();
        column.classList.remove("hover-over");


        if(dragElement){
            column.appendChild(dragElement);
        }

       updatetaskCount();


    });

    updatetaskCount();

}


addDragEffect(todo);
addDragEffect(progress);
addDragEffect(done);

            
const toggleModal = document.querySelector("#toggle-modal")
const Modal = document.querySelector(".modal")
const ModalBg = document.querySelector(".bg")

toggleModal.addEventListener("click", () =>{
    Modal.classList.toggle("active");

})

ModalBg.addEventListener("click", ()=> {
    Modal.classList.remove("active");
})


const addtaskbtn = document.querySelector("#addtskbtn");
addtaskbtn.addEventListener("click", ()=>{
    const inputVal = document.querySelector("#taskInput").value;
    const descVal = document.querySelector("#taskDesc").value;

    addtaskElement(inputVal, descVal, todo)


    updatetaskCount();
    
    document.querySelector("#taskInput").value = ""
    document.querySelector("#taskDesc").value = ""


    Modal.classList.remove("active")
})