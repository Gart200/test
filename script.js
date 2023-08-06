let addNoteButton = document.querySelector(".add_note_button")
let notes = document.querySelector(".notes")
let addTextField = document.querySelector(".add_textfield")

window.onload = () => {
    let savedNotes = JSON.parse(localStorage.getItem("data"))
    savedNotes.forEach((note) => {
        notes.appendChild(createNote(note.checked, note.content))
    })
}


addNoteButton.addEventListener("click", () => {
    if (addTextField.value === "") {
        alert("Введите текст")
    }
    if (addTextField.value.length > 32){
        alert("Максимальная длина записи - 32")
    }
    else {
        let note = createNote(false, addTextField.value)
        notes.appendChild(note)
        saveData()
    }
})

notes.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") saveData()
    if (e.target.tagName === "BUTTON") {
        e.target.parentElement.remove()
        saveData();
    }
})

let createNote = (checked, content) => {
    let note = document.createElement("div");
    note.innerHTML =
        `<div class="note">
        <input class="note_checkbox" type="checkbox" ${checked? 'checked': ''} >
        <p class="note_text">${content}</p>
        <button class="delete_button">Удалить</button>
            </div>`
    return note
}
let saveData = () => {
    localStorage.clear()

    let data = [];

    let checked = '';
    let content = '';
    let notesArray = document.querySelectorAll(".note")
    notesArray.forEach(note => {
        let childes = note.children
        for (let child of childes) {
            if (child.tagName === 'INPUT') checked = child.checked
            if (child.tagName === 'P') content = child.textContent
        }
        data.push({checked: checked, content: content})
    })
    localStorage.setItem("data", JSON.stringify(data))
}



