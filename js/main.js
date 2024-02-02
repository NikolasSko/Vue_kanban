let app = new Vue({
    el: '#app',
    data: {
        currentNote: "",
        notes: [

        ],

    },
    methods:{
        addNote: function(){
            this.notes.push({
                text: this.currentNote,
                isPlanned: true,
                isProcess: false,
                isTested: false,
                isDone: false,
            });
            this.currentNote = "";
        },
        deleteNote: function(noteText){
            this.notes = this.notes.filter(note =>{
                return note.text !== noteText;
            })
        }
    }
})