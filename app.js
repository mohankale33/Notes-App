const yargs = require('yargs');
const validator = require('validator');
const chalk = require('chalk');
const notes = require('./notes');
const { argv } = require('yargs');

// add command
yargs.command({
    command:'add',
    description:'adding a note',
    builder:{
        title:{
            describe: 'Note Title',
            demandOption:true,
            type:'string'
        },
        body:{
            description:'Body of Note',
            demandOption:true,
            type:'string'
        }
    },
    handler: (argv) =>{
        notes.addNotes(argv.title,argv.body)
    }
})

// remove command
yargs.command({
    command:'remove',
    description:'removing a note',
    builder:{
        title:{
            demandOption:true,
            description:'note Title',
            type:'string'
        }
    },
    handler: (argv) =>{
        notes.removeNotes(argv.title)
    }
})

// list command
yargs.command({
    command:'list',
    description:'listing a note',
    handler: () =>{
        notes.listNotes();
    }
})

// read command
yargs.command({
    command:'read',
    description:'reading a note',
    builder:{
        title:{
            demandOption:true,
            description:'note Title',
            type:'string'
        }
    },
    handler: (argv) =>{
        notes.getNotes(argv.title);
    }
})

yargs.parse();
// console.log(yargs.argv);