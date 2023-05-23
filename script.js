const addBtn = document.querySelector('.addbtn'),
popup = document.querySelector('.popup-box'),
closePopup = popup.querySelector('.fa-xmark'),
addNote = document.querySelector('.addNote'),
desc = document.querySelector('#formDesc'),
date = document.querySelector('.date'),
panel = document.querySelector('.panel'),
noteTitle = document.querySelector('.popup--head h2'),
formTitle = document.querySelector('.formTitle');

//This is to convert the months to words
const months = ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

//This is to get the notes from the localstorage
//Then convert them to JavaScript Objects
const notes = JSON.parse(localStorage.getItem("notes") || '[]');

//This is an update function, Two variables are declared
// isUpdate is false, updateId is undefined
//next we goto the edit function and set the isUpdate to true
//and we make the updateId = noteId
//we goto the addnewNote section and put a condition that if isUpdate is false, we add a newly created note to the array of notes, else, that particular selected note will be equal to the newly created note.
let isUpdate = false, updateId;

//This is display the edit and delete buttons
const showMenu = (elem) => {
    elem.parentElement.classList.add('show');
    //To remove the edit and delete buttons
    document.addEventListener('click', (event) => {
        if (event.target.tagName != 'I' || event.target != elem) {
            elem.parentElement.classList.remove('show');
        }
    });
}

//This function helps to display the notes
const showNotes = () => {
    document.querySelectorAll('.note-pad').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let liTag = `
            <li class="note-pad">
                <div>
                    <h2 class="title">${note.titleNote}</h2>
                    <p class="desc">${note.descriptionNote}</p>
                    <div class="note-pad-bottom">
                        <p class="date">${note.dateNote} <br/> ${note.time}</p>
                        <div class="settings">
                            <i class="fa fa-ellipsis" onclick="showMenu(this)"></i>
                            <div class="panel">
                                <div onclick="editFunc(${index}, '${note.titleNote}', '${note.descriptionNote}')">
                                    <i class="fa-solid fa-pen"></i><span>Edit</span>
                                </div>
                                <div onclick="deleteFunc(${index})">
                                    <i class="fa-solid fa-trash"></i><span>Delete</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        `;
        addBtn.insertAdjacentHTML('afterend', liTag);
    });
}
showNotes();

//This is to open the form section
addBtn.addEventListener('click', () => {
    formTitle.focus();
    popup.classList.add('show');
    formTitle.value = "";
    desc.value = "";
})

//This is to close the form section
closePopup.addEventListener('click', () => {
    isUpdate = false;
    formTitle.value = "";
    desc.value = "";
    noteTitle.innerHTML = "Add a new Note";
    addNote.innerHTML = "Add Note";
    popup.classList.remove('show');
})


//This is to edit an already existing note
function editFunc(noteId, title, descTag) {
    isUpdate = true;
    updateId = noteId;
    addBtn.click();
    noteTitle.innerHTML = "Update a Note";
    addNote.innerHTML = "Update Note";
    formTitle.value = title;
    desc.value = descTag;
}


//This is to delete an existing note
const deleteFunc = (noteId) => {
    let confirmDel = confirm('Sure you want to delete this note?');
    if (!confirmDel) return;
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
};

//This is to add a new note
addNote.addEventListener('click', (e) => {
    e.preventDefault();
    let titleTag = formTitle.value,
    descTag = desc.value,
    date = new Date(),
    month = months[date.getMonth()],
    day = date.getDate(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    amOrPm = (hours < 12) ? 'am' : 'pm',
    time = `${hours}:${minutes} ${amOrPm}`;
    
    if (titleTag.trim() || descTag.trim()) {
        //putting it in an object format
        let noteObject = {
            titleNote: titleTag,
            descriptionNote: descTag,
            dateNote: `${month}, ${day} ${year}`,
            time: time
        }
        console.log(noteObject)

        if (!isUpdate) {
            notes.push(noteObject); //adding new notes
        } else {
            isUpdate = false;
            notes[updateId] = noteObject; //updating specified note
        }
        
        localStorage.setItem('notes', JSON.stringify(notes));
        closePopup.click();
        showNotes();
    }
});

