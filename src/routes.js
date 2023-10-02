const { allNote, addNote, getNotes, editNote, deleteNote } = require("./handlers");

const routes = [
    {
        method: 'GET',
        path: '/notes',
        handler: allNote,
    },
    {
        method: 'POST',
        path: '/notes',
        handler: addNote,
    },
    {
        method: 'GET',
        path: '/notes/{id*}',
        handler: getNotes,
    },
    {
        method: 'PUT',
        path: '/notes/{id*}',
        handler: editNote,
    },
    {
        method: 'DELETE',
        path: '/notes/{id*}',
        handler: deleteNote,
    }
]

module.exports = routes;