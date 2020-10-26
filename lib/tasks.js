const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('Tasks')
const chalk = require('chalk')
const moment = require('moment')

initializeDb = async () => {
    await db.run("CREATE TABLE IF NOT EXISTS tasks (message TEXT, completed TEXT, time TEXT)");
}

addTask = async (message) => {
    await initializeDb()
    const time = moment().format()
    db.run("INSERT INTO tasks VALUES (?, ?, ?)", [message, 'false', time])
    db.close();
    console.log('[+] Task added successfully.\n')
}

markCompleted = async (id) => {
    await initializeDb()
    db.run(`UPDATE tasks SET completed = 'true' WHERE rowid = ?`, [id])
    
    db.get(`SELECT rowid AS id, message, completed, time FROM tasks WHERE rowid = ${id}`, (err, row) => {
        console.log(chalk.gray(row.id) + '\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })

    db.close();
}

checkCompleted = (status) => {
    if(status == 'false') return 'incomplete';
    if(status == 'true') return 'complete';
}

getAllTasks = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM tasks", (err, row) => {
        if(row == undefined || row == null) return console.log('[--] No Tasks available');
        console.log(chalk.gray(row.id) + '\t' + chalk.green(row.message) + '\t\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close();
}

getCompleteTasks = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM tasks WHERE completed = 'true'", (err, row) => {
        console.log(chalk.gray(row.id) + '\t\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close()
}

getIncompleteTasks = async () => {
    await initializeDb()
    db.each("SELECT rowid AS id, message, completed, time FROM tasks WHERE completed = 'false'", (err, row) => {
        console.log(chalk.gray(row.id) + '\t\t' + chalk.green(row.message) + '\t' + chalk.gray(checkCompleted(row.completed)) + '\t' + moment(row.time).fromNow())
    })
    db.close();
}

deleteTask = async (note) => {
    await initializeDb()
    try {
        db.run(`DELETE FROM tasks WHERE rowid = ${note}`)
        db.close();
        console.log('[+] Task deleted successfully\n')
    } catch (error) {
        console.log('[---] Failed to delete task\n')
    }
}

purgeAllTasks = async () => {
    await initializeDb()
    try {
        db.run(`DELETE FROM tasks`)
        db.close()
        console.log('[+] All Tasks purged successfully\n')
    } catch (error) {
        console.log('[---] Failed to delete Tasks\n')
    }
    
}

module.exports = {
    initializeDb,
    getCompleteTasks,
    getIncompleteTasks,
    getAllTasks,
    addTask,
    deleteTask,
    purgeAllTasks,
    markCompleted
}
