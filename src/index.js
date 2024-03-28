import './style.css';
import { board, project, todoItem } from './todoLogic';
import { renderBoard, renderProjDisplay, renderSideBar } from './domLogic';

function getUpstreamID(event, className) {
    let curr = event.target;
    // todo err checking for climbing too high
    while (!curr.classList.contains(className)) {
        curr = curr.parentNode;
    }
    return curr.id;
}

let appBoard;

if (!localStorage.getItem("appboard")) {

    appBoard = new board();
    appBoard.projectList[0].title = "Example Project";
    appBoard.projectList[0].todoList.push(new todoItem("Practice Guitar", "Minor pentatonic exercise", 0));
} else {
    appBoard = JSON.parse(localStorage.getItem("appboard"));
}
  
const navDiv = document.querySelector("nav");
const projDisplay = document.querySelector("#projDisplay");
const contentDiv = document.querySelector("#content");

function renderDOM() {
    renderProjDisplay(projDisplay, appBoard);
    renderSideBar(navDiv, appBoard);
    renderBoard(contentDiv, appBoard);
    localStorage.setItem("appboard", JSON.stringify(appBoard));

}

contentDiv.addEventListener("change", (e) => {
    const projList = appBoard.projectList;
    if (e.target.tagName === "INPUT") {
        if (e.target.classList.contains("title")) {
            const pInd = getUpstreamID(e, "projectOuter");
            const tInd = getUpstreamID(e, "todo");
            projList[pInd].todoList[tInd].title = e.target.value;
        } else if (e.target.classList.contains("content")) {
            const pInd = getUpstreamID(e, "projectOuter");
            const tInd = getUpstreamID(e, "todo");
            projList[pInd].todoList[tInd].content = e.target.value;
        } else if (e.target.classList.contains("projTitle")) {
            const pInd = getUpstreamID(e, "projectOuter");
            projList[pInd].title = e.target.value;
        }
    }
    renderDOM();
});

contentDiv.addEventListener("click", (e) => {
    const projList = appBoard.projectList;
    if (e.target.tagName === "BUTTON") {
        if (e.target.classList.contains("addButton")) {
            const pInd = getUpstreamID(e, "projectOuter");
            projList[pInd].todoList.push(new todoItem());
            renderDOM();
        } else if (e.target.classList.contains("dueDate")) {
            const dateInput = document.createElement("input");
            dateInput.classList.add("dateInput");
            dateInput.setAttribute("type", "date");
            dateInput.onchange = (e) => {
                const pInd = getUpstreamID(e, "projectOuter");
                const tInd = getUpstreamID(e, "todo");
                projList[pInd].todoList[tInd].dueDate = e.target.value;
                renderDOM();
            }
            e.target.parentNode.appendChild(dateInput);
            e.target.parentNode.removeChild(e.target);
            dateInput.focus();
        }

    }
    if (e.target.tagName === "SPAN") {
        if (e.target.classList.contains("close")) {
            const pInd = getUpstreamID(e, "projectOuter");
            const tInd = getUpstreamID(e, "todo");
            projList[pInd].todoList.splice(tInd, 1);
        } else if (e.target.classList.contains("warning")) {
            const pInd = getUpstreamID(e, "projectOuter");
            const tInd = getUpstreamID(e, "todo");
            projList[pInd].todoList[tInd].priority = (projList[pInd].todoList[tInd].priority + 1) % 3;
        }

        renderDOM();
    }
});


navDiv.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
        if (e.target.classList.contains("addProj")) {
            appBoard.projectList.push(new project());
            appBoard.selected = "all";
        } else {
            appBoard.selected = e.target.id;
        }
        renderDOM();
    } else if (e.target.tagName === "SPAN") {
        appBoard.projectList.splice(e.target.parentNode.id, 1);
        appBoard.selected = "all";
        renderDOM();
    }
});

renderDOM();