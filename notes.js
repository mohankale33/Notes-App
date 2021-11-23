const fs = require('fs');
const chalk = require('chalk');

const getNotes = (title) =>{
    let loadedNotes = loadNotes();
    let retrivedNote = loadedNotes.find((note)=>{
        return note.title === title;
    });
    if(retrivedNote){
        console.log(chalk.green.inverse('Note Title : ' , retrivedNote.title, ' Note Details : ', retrivedNote.body));
    }else{
        console.log(chalk.red.inverse('Note Matching Note Found'));
    }

}

const listNotes = () =>{
    let loadedNotes = loadNotes();
    console.log(chalk.inverse('Your Notes'));
    loadedNotes.forEach(element => {
        console.log('Title : '+element.title+', Item : '+element.body)
    });
}

const addNotes = (title,body) =>{
    let loadedNotes = loadNotes();
    
    // const duplicateNotes = loadedNotes.filter((note)=>{
    //     return note.title === title;
    // })

    const duplicateNote = loadedNotes.find((note)=>{
        return note.title === title;
    })

    if (!duplicateNote) {
        loadedNotes.push({
            title:title,
            body:body
        })
        saveNotes(loadedNotes);
        console.log(chalk.green.inverse('New Note Added'))   
    }else{
        console.log(chalk.red.inverse('Note Title Taken Already..!'))
    }
    
}

const removeNotes = (title) =>{
    let loadedNotes = loadNotes();
    let notesWithDifferentTitle = loadedNotes.filter((note)=>{
        return note.title !== title;
    })
    if (loadedNotes.length > notesWithDifferentTitle.length) {
        saveNotes(notesWithDifferentTitle);
        console.log(chalk.green.inverse('Note Remove'))
    } else {
        console.log(chalk.red.inverse('No Note Found'))
    }
}

const saveNotes = (notes) =>{
    let dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = () =>{
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)    
    } catch (error) {
        return []
    }
    
}

module.exports = {
    addNotes : addNotes,
    getNotes : getNotes,
    removeNotes : removeNotes,
    listNotes : listNotes
};