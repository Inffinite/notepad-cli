const notifier = require('node-notifier');
const path = require('path');
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('notepad')
const chalk = require('chalk')
const moment = require('moment')


// String
// notifier.notify('Go empty the dishwasher!');

// Object
// notifier.notify({
//   'title': 'notepad',
//   'subtitle': 'Daily Maintenance',
//   'message': 'Go approve comments in moderation!',
//   'icon': path.join(__dirname, 'bucket.png'),
//   'contentImage': path.join(__dirname, 'broom.png'),
//   'sound': true,
//   'wait': true
// });

initializeDb = async () => {
  await db.run("CREATE TABLE IF NOT EXISTS notes (message TEXT, time TEXT)");
}

addNote = async (message) => {
  await initializeDb()
  const time = moment().format()
  db.run("INSERT INTO notes VALUES (?, ?)", [message, time])
  db.close();
  console.log('[+] Note added successfully.\n')
}

getAllNotes = async () => {
  await initializeDb()
  db.each("SELECT rowid AS id, message, time FROM notes", (err, row) => {
      if(row == undefined || row == null) return console.log('[--] No Notes available');
      console.log(chalk.gray(row.id) + '\t' + chalk.green(row.message) + '\t\t' + moment(row.time).fromNow())
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
      console.log('[+] All Notes purged successfully\n')
  } catch (error) {
      console.log('[---] Failed to delete Notes\n')
  }
}

module.exports = {
  purgeAllNotes,
  deleteNote,
  getAllNotes,
  addNote,
  initializeDb
}