Vue.component('header-component', {
    template: `
      <header>
        <h1 class="title">Kanban-board</h1>
      </header>
    `,
  });
  
  Vue.component('input-form', {
    props: ['currentNote'],
    template: `
      <div class="inputs">
        <input placeholder="title" class="input" type="text" v-model="currentNote.title" />
        <input placeholder="description" class="input" type="text" v-model="currentNote.description" />
        <input class="input" type="datetime-local" v-model="currentNote.deadline" />
        <button @click="addNote">Add Note</button>
      </div>
    `,
    methods: {
      addNote: function () {
        let currentDate = new Date();
        let formattedDate = currentDate.toISOString().slice(0, 16);
  
        let isDeadlineExpired = false;
        if (this.currentNote.isDone && new Date(this.currentNote.deadline) < currentDate) {
          isDeadlineExpired = true;
        }
  
        this.$emit('addNote', {
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
  
        this.clearCurrentNote();
      },
    },
  });
  
  Vue.component('columns', {
    props: ['notes'],
    template: `
      <main>
        <div class="all_columns">
          <column title="Planned" :notes="notes" status="isPlanned" />
          <column title="In process" :notes="notes" status="isProcess" />
          <column title="Testing" :notes="notes" status="isTested" />
          <column title="Done" :notes="notes" status="isDone" />
        </div>
      </main>
    `,
    components: {
      'column': {
        props: ['title', 'notes', 'status'],
        template: `
          <div class="column">
            <h4 class="column-title">{{ title }}</h4>
            <ul class="list" v-for="note in notes">
              <li class="cart" v-if="note[status] === true">
                <p>{{ note.title }} {{ note.creationDate }}</p>
                <p>{{ note.description }}</p>
                <p>Дедлайн: {{ note.deadline }}</p>
                <button @click="processNote">=></button>
                <button @click="deleteNote">x</button>
              </li>
            </ul>
          </div>
        `,
        methods: {
          processNote: function () {
            // Логика обработки заметки
          },
          deleteNote: function () {
            // Логика удаления заметки
          },
        },
      },
    },
  });
  
  new Vue({
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
        isDeadlineExpired: false,
      },
      editingIndex: -1,
      notes: [],
    },
    methods: {
      addNote: function (note) {
        if (this.editingIndex === -1) {
          this.notes.push(note);
        } else {
          this.notes.splice(this.editingIndex, 1, note);
          this.editingIndex = -1;
        }
        this.clearCurrentNote();
      },
      editNote: function (index) {
        this.currentNote = { ...this.notes[index] };
        this.editingIndex = index;
      },
      deleteNote: function (index) {
        this.notes.splice(index, 1);
        this.clearCurrentNote();
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
        this.editingIndex = -1;
      },
    },
  });