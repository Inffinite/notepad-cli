const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('notes')
const chalk = require('chalk')
const moment = require('moment')

initializeDb = async () => {
    await db.run("CREATE TABLE IF NOT EXISTS notes (message TEXT, completed TEXT, time TEXT)");
}

addNote = async (message) => {
    await initializeDb()
    const time = moment().format()
    db.run("INSERT INTO notes VALUES (?, ?, ?)", [message, 'false', time])
    db.close();
    console.log('[+] Note added successfully.\n')
}

markCompleted = async (id) => {
    await initializeDb()
    db.run(`UPDATE notes SET completed = 'true' WHERE rowid = ?`, [id])
    
    db.get(`SELECT rowid AS id, message, completed, time FROM notes WHERE rowid = ${id}`, (err, row) => {
        console.log(chalk.gray(row.id) + '\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).startOf('hour').fromNow())
    })

    db.close();
}

checkCompleted = (status) => {
    if(status == 'false') return 'incomplete';
    if(status == 'true') return 'complete';
}

getAllNotes = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM notes", (err, row) => {
        if(row == undefined || row == null) return console.log('[--] No notes available');
        console.log(chalk.gray(row.id) + '\t' + chalk.green(row.message) + '\t\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close();
}

getCompleteNotes = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM notes WHERE completed = 'true'", (err, row) => {
        console.log(chalk.gray(row.id) + '\t\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close()
}

getIncompleteNotes = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM notes WHERE completed = 'false'", (err, row) => {
        console.log(chalk.gray(row.id) + '\t\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close();
}

deleteNote = async (note) => {
    await initializeDb()
    try {
        db.run(`DELETE FROM notes WHERE rowid = ${note}`)
        db.close();
        console.log('[+] Note deleted successfully\n')
    } catch (error) {
        console.log('[---] Failed to delete note\n')
    }
}

purgeAllNotes = async () => {
    await initializeDb()
    try {
        db.run(`DELETE FROM notes`)
        db.close()
        console.log('[+] All notes purged successfully\n')
    } catch (error) {
        console.log('[---] Failed to delete notes\n')
    }
    
}

module.exports = {
    initializeDb,
    getCompleteNotes,
    getIncompleteNotes,
    getAllNotes,
    addNote,
    deleteNote,
    purgeAllNotes,
    markCompleted
}
