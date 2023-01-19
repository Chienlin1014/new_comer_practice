<template>
  <div id="app">
    <TodoList
        :fields="fields"
        :items="items.undo"
        :editConfirm="editConfirmUndo"
        :removeTodo="removeTodoUndo"
        :isDone="isDone"
        :key="componentsKey">
    </TodoList>
    <DoneList
        :fields="fields"
        :items="items.done"
        :editConfirm="editConfirmDone"
        :removeTodo="removeTodoDone"
        :isDone="isDone"
        :key="componentsKey">
    </DoneList>
    <AdditionTodo :addTodo="addTodo"></AdditionTodo>
  </div>
</template>

<script>
import AdditionTodo from "@/components/AdditionTodo.vue";
import TodoList from "@/components/TodoList.vue";
import DoneList from "@/components/DoneList.vue";
import axios from "axios";

export default {
  name: 'App',
  data() {
    return {
      fields: [
        {key: "selectRow", label: ""},
        {key: "todo", label: "事項", type: "text"},
        {key: "action", label: "action", type: "action"}
      ],
      items: {
        undo: [],
        done: []
      },
    }
  },
  components: {
    DoneList,
    AdditionTodo,
    TodoList
  },
  mounted() {
    axios.get('http://localhost:8081/getTodos', {
      params: {
        isDone: 0
      }
    }).then((response) => {
          this.items.undo = response.data
        }
    );
    axios.get('http://localhost:8081/getTodos', {
      params: {
        isDone: 1
      }
    }).then((response) => {
          this.items.done = response.data
        }
    );

  },
  methods: {
    forceRender() {
      this.componentsKey++;
    },
    addTodo(thing) {
      this.items.undo.push({
        todo: thing,
        status:false,
        id:(this.items.undo.length+this.items.done.length+1)
      });
      axios.post('http://localhost:8081/addTodos', {
        todo: thing
      }).then(res => {
        console.log(res.data)
      })
    },
    removeTodoUndo(index, removeIndex) {
      axios.post('http://localhost:8081/deleteTodos', {
        id: removeIndex
      })
      // this.forceRender()
      this.items.undo.splice(index, 1);
    },
    removeTodoDone(index, removeIndex) {
      axios.post('http://localhost:8081/deleteTodos', {
        id: removeIndex
      })
      // this.forceRender()
      this.items.done.splice(index, 1);
    },
    editConfirmDone(index, data) {
      axios.post('http://localhost:8081/updateTodos',
          {
            id: this.items.done[index].id,
            todo: data,
            status: this.items.done[index].status,
            // updateTime:this.items.undo[index].updateTime
          });
      this.items.done.push({todo: data, status: true,id:this.items.done[index].id});
      this.items.done.splice(index, 1);
      this.forceRender()
    },
    editConfirmUndo(index, data) {
      axios.post('http://localhost:8081/updateTodos',
          {
            id: this.items.undo[index].id,
            todo: data,
            status: this.items.undo[index].status,
            // updateTime:this.items.undo[index].updateTime
          });
      this.items.undo.push({todo: data, status: false,id: this.items.undo[index].id});
      this.items.undo.splice(index, 1);
      this.forceRender()

    },
    isDone(event, index) {
      if (event) {
        this.items.undo[index].status = event;
        axios.post('http://localhost:8081/updateTodos', {
          id: this.items.undo[index].id,
          todo: this.items.undo[index].todo,
          status: this.items.undo[index].status
        })
        this.items.done.push(this.items.undo[index]);
        this.items.undo.splice(index, 1);
        this.forceRender()
      } else {
        this.items.done[index].status = event;
        axios.post('http://localhost:8081/updateTodos', {
          id: this.items.done[index].id,
          todo: this.items.done[index].todo,
          status: this.items.done[index].status
        })
        // this.getTodo();
        this.items.undo.push(this.items.done[index]);
        this.items.done.splice(index, 1);
        this.forceRender()

      }
    },
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.action-container {
  margin-bottom: 10px;
}

.action-container button {
  margin-right: 5px;
}

.delete-button {
  margin-left: 5px;
}

.hidden_header {
  display: none;
}
</style>
