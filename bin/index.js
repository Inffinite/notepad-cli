#!/usr/bin/env node
const tasks = require('../lib/tasks.js')
const notes = require('../lib/notes.js')
tasks.initializeDb()
notes.initializeDb()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('notes')
const chalk = require('chalk')
const Help = require('./help')

let args = process.argv.slice(2)


setTimeout(() => {
    switch (args[0]) {
        case '--add-task':
            if(!args[1])return console.log(Help.help())
            tasks.addTask(args[1])
            break;

        case '--add-note':
            if(!args[1])return console.log(Help.help())
            notes.addNote(args[1])
            break;

        case '--all-tasks':
            tasks.getAllTasks()
            break;

        case '--all-notes':
            notes.getAllNotes()
            break;

        case '--done-task':
            if(!args[1])return console.log(Help.help())
            tasks.markCompleted(args[1])
            break;

        case '--complete-tasks':
            tasks.getCompleteTasks()
            break;

        case '--incomplete-tasks':
            tasks.getIncompleteTasks()
            break;

        case '--purge-tasks':
            tasks.purgeAllTasks()
            break;
        
        case '--purge-complete-tasks':
            tasks.purgeCompleteTasks()
            break;

        case '--purge-incomplete-tasks':
            tasks.purgeInCompleteTasks()
            break;

        case '--purge-notes':
            notes.purgeAllNotes()
            break;

        case '--delete-task':
            if(!args[1])return console.log(Help.help())
            tasks.deleteTask(args[1])
            break;

        case '--delete-note':
            if(!args[1])return console.log(Help.help())
            notes.deleteNote(args[1])
            break;

        case '--help':
            console.log(Help.help())
            break;

        default:
            console.log(Help.help())
            break;
    }
}, 1000);

