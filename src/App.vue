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
import axios from "axios";

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
        undo:[],
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
  mounted() {
    axios.get('http://localhost:8081/getTodos',{
      params:{
        isDone:1
      }
    }).then((response)=>{
      this.items.done=response.data
        }
    );
    axios.get('http://localhost:8081/getTodos',{
      params:{
        isDone:0
      }
    }).then((response)=>{
          this.items.undo=response.data
        }
    );
  },
  methods: {
    addTodo(thing) {
      this.items.undo.push({todo: thing});
      axios.post('http://localhost:8081/addTodos',{
        todo:thing
      }).then(res=>{
        console.log(res.data)
      })
    },
    removeTodo(index) {
      this.items.undo.splice(index, 1);
      axios.post('http://localhost:8081/deleteTodos',{
        id:this.items.undo[index].id
      })
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
