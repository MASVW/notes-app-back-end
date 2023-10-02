const { nanoid } = require("nanoid")
const notes = require("./notes")

const allNote = () => ({
    data: {
        notes
    }
})

const addNote = (request, h) => {
    const id = nanoid(16);
    const {title, tags, body} = request.payload;
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const note = {id, title, tags, body, createdAt, updatedAt};
    notes.push(note);
    const isSuccess = notes.filter((notes) => notes.id === id).length > 0;
    if (isSuccess) {
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil ditambahkan',
            data:{
                NoteID : id,
            },
        });
        response.code(202);
        return response;
    }
    const response = h.response({
        status: 'failed',
        message: 'Catatan gagal ditambahkan',
    });
    response.code(404);
    return response;
}

const getNotes = (request, h) => {
    const { id } = request.params;
    const note = notes.filter((note)=> note.id ===id)[0];

    if(note !== undefined){
        return {
            status: 'success',
            data : {
                note
            }
        }
    }
    const response = h.response({
        status: 'failed',
        message: 'terjadi kesalahan',
    });
    response.code(404);
    return response;
}

const editNote = (request, h) =>{
    const { id } = request.params;
    const {title, tags, body} = request.payload;

    const updatedAt = new Date().toISOString();
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes[index] = {
            ...notes[index],
            title, tags, body, updatedAt
        };
        const response = h.response({
            status: 'success',
            message: 'Perubahan berhasil ditetapkan',
            data:{
                NoteID : id,
            },
        });
        response.code(202);
        return response;
    }
    const response = h.response({
        status: 'failed',
        message: 'Perubahan gagal ditetapkan',
    });
    response.code(404);
    return response;
}

const deleteNote = (request, h) => {
    const { id } = request.params;
    const index = notes.findIndex((note) => note.id === id);
    if (index !== -1) {
        notes.splice(index, 1);
        const response = h.response({
            status: 'success',
            message: 'Catatan berhasil dihapus',
        });
        response.code(202);
        return response;
    }
    const response = h.response({
        status: 'failed',
        message: 'Catatan gagal hapus',
    });
    response.code(404);
    return response;
}

module.exports = {
    allNote,
    addNote,
    getNotes,
    editNote,
    deleteNote
}