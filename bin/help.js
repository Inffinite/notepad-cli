const chalk = require('chalk')

const help = () => {
    return `\nUsage: notepad [option]` + 
    `\n\nOptions:
    \t--help` + `\t` + chalk.blue(`Display help screen`) +
    `\n\t--add-task "task"` + `\t` + chalk.blue(`Add a new task`) +
    `\n\t--done-task task-id` + `\t` + chalk.blue(`Mark task as complete by id`) +
    `\n\t--all-tasks` + `\t` + chalk.blue(`List all tasks`) +
    `\n\t--complete-tasks` + `\t` + chalk.blue(`List all complete tasks`) +
    `\n\t--incomplete-tasks` + `\t` + chalk.blue(`List all incomplete tasks`) +
    `\n\t--purge-tasks` + `\t` + chalk.blue(`Delete all tasks`) +
    `\n\t--purge-complete-tasks` + `\t` + chalk.blue(`Delete all complete tasks`) +
    `\n\t--purge-incomplete-tasks` + `\t` + chalk.blue(`Delete all incomplete tasks`) +
    `\n\t--delete-task task-id` + `\t` + chalk.blue(`Delete task by id`) +
    `\n\n\t--add-note "note"` + `\t` + chalk.blue(`Add a new note`) +
    `\n\t--all-notes` + `\t` + chalk.blue(`List all notes`) +
    `\n\t--purge-notes` + `\t` + chalk.blue(`Delete all notes`) +
    `\n\t--delete-note note-id` + `\t` + chalk.blue(`Delete note by id\n`) 
    
}

module.exports = {
    help
}