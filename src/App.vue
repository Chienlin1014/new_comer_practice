<template>
  <div id="app">
    <TodoList
        :fields="fields"
        :items="items.undo"
        :editConfirm="editConfirm"
        :removeTodo="removeTodo"
        :isDone="isDone">
    </TodoList>
    <DoneList :fields="fields"
              :items="items.done"
              :isDone="isDone">
    </DoneList>


    <AdditionTodo :addTodo="addTodo"></AdditionTodo>

  </div>
</template>

<script>
import AdditionTodo from "@/components/AdditionTodo.vue";
import TodoList from "@/components/TodoList.vue";
import DoneList from "@/components/DoneList.vue";

export default {
  name: 'App',
  data() {
    return {
      editInput: {
        index: 0,
        value: ''
      },
      fields: [
        {key: "selectRow", label: ""},
        {key: "todo", label: "事項", type: "text"},
        {key: "action", label: "action", type: "action"}
      ],
      items:{
        undo:[{todo: '吃飯', done: false},
          {todo: '睡覺', done: false},
          {todo: '打掃', done: false}
        ],
        done:[]
      },
      // items: [
      //   {todo: '吃飯', done: false},
      //   {todo: '睡覺', done: false},
      //   {todo: '打掃', done: false}
      // ],
      // doneFields: [
      //   {key: "selectRow", label: ""},
      //   {key: "todo", label: "已完成", type: "text"},
      //   {key: "edit", label: "edit", type: "edit"},
      // ],
      // doneList: []
    }
  },
  components: {
    DoneList,
    AdditionTodo,
    TodoList
  },
  methods: {
    addTodo(thing) {
      this.items.undo.push({todo: thing});
    },
    removeTodo(index) {
      this.items.undo.splice(index, 1);
    },
    editConfirm(index, data) {
      this.items.undo.splice(index, 1);
      this.items.undo.push({todo: data, done: false});
    },
    isDone(event, index) {
      if(event){
      this.items.undo[index].done=event;
      this.items.done.push(this.items.undo[index]);
      this.items.undo.splice(index,1);
      }else {

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
