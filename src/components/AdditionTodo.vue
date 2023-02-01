<template>
  <div>
    <label>新增待辦事項：</label><input type="text" v-model="todoInput">
    <b-button class="add-button" variant="success" @click="showAddComfirmModal">新增</b-button>
    <b-modal ref="addition-modal" hide-footer title="確認是否新增事項">
      <div class="d-block text-center">
        <h3>請問是否確定新增【{{ todoInput }}】</h3>
      </div>
      <div>
        <b-button
            class="mt-3"
            variant="outline-danger"
            block @click="comfirmAdd(todoInput)">確定
        </b-button>
        <b-button
            class="mt-2"
            variant="outline-warning"
            block
            @click="addCancel">取消
        </b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "AdditionTodo",
  data() {
    return {
      todoInput: ''
    }
  },
  props: ['addTodo'],
  methods: {
    showAddComfirmModal() {
      if (!this.todoInput.trim()) {
        /*
          /todos <-- resource
          POST     /todos
          GET      /todos/${todoId}  查單一 todo
          GET      /todos?queryCond1=value1&queryCond2=value2  查多個 todo
          PUT      /todos/${todoId}  完整的 update
          PATCH    /todos/${todoId}  partial update
          DELETE   /todos/${todoId}

          GET /todos/${todoId}/todoDetails

          @GetMapping
          @PostMapping
          @PutMapping
         */        alert('待辦事項不得為空白');
        
      } else {
        this.$refs["addition-modal"].show();
      }
    },
    comfirmAdd(data) {
      this.addTodo(data);
      this.todoInput = '';
      this.$refs["addition-modal"].hide();
    },
    addCancel() {
      this.$refs["addition-modal"].hide();
    },
  }
}
</script>

<style scoped>

</style>