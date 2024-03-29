let app = new Vue({
    el: '#app',
    data: {
        currentNote: {
            title: "",
            creationDate: "",
            lastEditDate: "",
            description: "",
            deadline: "",
            isPlanned: true,
            isProcess: false,
            isTested: false,
            isDone: false,
            isDeadlineExpired: false, // Добавлено поле для отслеживания просроченного дедлайна
        },
        editingIndex: -1,
        notes: [],
    },
    methods: {
        addNote: function () {
            let currentDate = new Date();
            let formattedDate = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')} ${currentDate.getHours().toString().padStart(2, '0')}:${currentDate.getMinutes().toString().padStart(2, '0')}:${currentDate.getSeconds().toString().padStart(2, '0')}`;

            if (this.editingIndex === -1) {
                let isDeadlineExpired = false;

                // Проверка просроченного дедлайна при перемещении в столбец "Done"
                if (this.currentNote.isDone && new Date(this.currentNote.deadline) < new Date()) {
                    isDeadlineExpired = true;
                }

                this.notes.push({
                    title: this.currentNote.title,
                    creationDate: formattedDate,
                    lastEditDate: "",
                    description: this.currentNote.description,
                    deadline: this.currentNote.deadline,
                    isPlanned: this.currentNote.isPlanned,
                    isProcess: this.currentNote.isProcess,
                    isTested: this.currentNote.isTested,
                    isDone: this.currentNote.isDone,
                    isDeadlineExpired: isDeadlineExpired,
                });
            } else {
                let editedNote = this.notes[this.editingIndex];
                editedNote.title = this.currentNote.title;
                editedNote.description = this.currentNote.description;
                editedNote.deadline = this.currentNote.deadline;
                editedNote.isDone = this.currentNote.isDone;

                // Обновление статуса просроченного дедлайна при редактировании
                if (editedNote.isDone && new Date(editedNote.deadline) < currentDate) {
                    editedNote.isDeadlineExpired = true;
                } else {
                    editedNote.isDeadlineExpired = false;
                }

                this.editingIndex = -1;
            }

            this.clearCurrentNote();
        },
        editNote: function (note) {
            this.editingIndex = this.notes.indexOf(note);
            this.currentNote = {
                title: note.title,
                creationDate: note.creationDate,
                lastEditDate: note.lastEditDate,
                description: note.description,
                deadline: note.deadline,
                isPlanned: note.isPlanned,
                isProcess: note.isProcess,
                isTested: note.isTested,
                isDone: note.isDone,
            };
        },
        saveEdit: function () {
            this.addNote();
        },
        cancelEdit: function () {
            this.editingIndex = -1;
            this.clearCurrentNote();
        },
        deleteNote: function (noteTitle) {
            this.notes = this.notes.filter(note => {
                return note.title !== noteTitle;
            });

            if (this.editingIndex !== -1 && this.notes.length <= this.editingIndex) {
                this.editingIndex = -1;
                this.clearCurrentNote();
            }
        },
        clearCurrentNote: function () {
            this.currentNote = {
                title: "",
                creationDate: "",
                lastEditDate: "",
                description: "",
                deadline: "",
                isPlanned: true,
                isProcess: false,
                isTested: false,
                isDone: false,
                isDeadlineExpired: false,
            };
        }
    }
});


