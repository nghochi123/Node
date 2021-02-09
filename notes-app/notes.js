const fs = require('fs');
const chalk = require('chalk');

const getnotes = () => "Your notes...";

const addNote = function(title, body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(note=>note.title===title);
    duplicateNotes.length===0?notes.push({title:title,body:body}):console.log('Note Title Taken!');
    saveNotes(notes)
}

const removeNote = title => {
    const notes = loadNotes();
    const checkNotes = notes.filter(note=>note.title===title);
    if(checkNotes.length==0)console.log('No such note found');
    else{
        const newNotes = notes.filter(note=>note.title!==title);
        saveNotes(newNotes);
        console.log(`Note with title "${title}" removed`);
    }
}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.inverse.blue('Your Notes:'));
    notes.forEach((note, i)=>{
        console.log(`${i}: \tTitle: ${chalk.green(note.title)} \n\tBody: ${chalk.yellow(note.body)}`);
        console.log('\n');
    });
}

const readNote = title => {
    const notes = loadNotes();
    const checkNotes = notes.find(note=>note.title===title);
    if(checkNotes){
        console.log(chalk.green(`Title: ${checkNotes.title}`));
        console.log(chalk.yellow(`Body: ${checkNotes.body}`));
    }
    else{
        console.log(chalk.red(`No note with title ${title} found.`));
    }
}

const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return []
    }
    
}

const saveNotes = notes => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    getnotes: getnotes,
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}