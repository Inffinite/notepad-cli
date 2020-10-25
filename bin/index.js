#!/usr/bin/env node
const tasks = require('../lib/tasks.js')
tasks.initializeDb()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('notes')

let args = process.argv.slice(2)


setTimeout(() => {
    switch (args[0]) {
        case '--add-task' || '-a':
            tasks.addNote(args[1])
            break;

        case '--all-tasks':
            tasks.getAllNotes()
            break;

        case '--done-task':
            tasks.markCompleted(args[1])
            break;

        case '--complete-tasks' || '-c':
            tasks.getCompleteNotes()
            break;

        case '--incomplete-tasks' || '-i':
            tasks.getIncompleteNotes()
            break;

        case '--purge-tasks' || '-p':
            tasks.purgeAllNotes()
            break;

        case '--delete-task' || '-d':
            tasks.deleteNote(args[1])
            break;

        default:
            break;
    }
}, 1000);

