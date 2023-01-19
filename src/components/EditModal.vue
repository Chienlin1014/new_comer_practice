<template>
<div>
  <b-button @click="showEditModal(index)">修改</b-button>
  <b-button class="delete-button" variant="danger" @click="showRemoveModal(index)">刪除</b-button>
  <b-modal ref="remove-modal" hide-footer title="確認刪除待辦事項">
    <div class="d-block text-center">
      <label>是否確認刪除？</label>
    </div>
    <div>
      <b-button
          class="mt-3"
          variant="outline-danger"
          block @click="removeConfirm()">確定
      </b-button>
      <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="removeCancel">取消
      </b-button>
    </div>
  </b-modal>
  <b-modal ref="edit-modal" hide-footer title="修改待辦事項">
    <div class="d-block text-center">
      <label>請輸入修改後之待辦事項：</label>
      <input type="text" v-model="editInput.value">
    </div>
    <div>
      <b-button
          class="mt-3"
          variant="outline-danger"
          block @click="confirmEdit()">確定
      </b-button>
      <b-button
          class="mt-2"
          variant="outline-warning"
          block
          @click="editCancel">取消
      </b-button>
    </div>
  </b-modal>
</div>
</template>

<script>
export default {
  data() {
    return{
      index:this.value_index,
      removeIndex: 0,
      editInput: {
        index: 0,
        value: ''
      }
    }
  },
  name: "RemoveModal",
  props:['value_index','items','editConfirm', 'removeTodo', 'isDone'],
  methods:{
    showEditModal(index) {
      console.log('hi')
      this.editInput.index = index;
      this.editInput.value = this.items[index].todo;
      this.$refs["edit-modal"].show();
    },
    confirmEdit() {
      if (!this.editInput.value.trim()) {
        alert('修改事項不得為空白')
      } else {
        this.editConfirm(this.editInput.index, this.editInput.value);
        this.$refs['edit-modal'].hide();
      }
    },
    editCancel() {
      this.$refs['edit-modal'].hide();
    },
    showRemoveModal(index) {
      this.$refs['remove-modal'].show();
      // console.log(index)
      this.index=index;
      this.removeIndex = this.items[index].id;
      console.log(this.removeIndex)
    },
    removeConfirm() {
      this.removeTodo(this.index,this.removeIndex);
      this.$refs['remove-modal'].hide();
    },
    removeCancel() {
      this.$refs['remove-modal'].hide();
    }
  }
}
</script>

<style scoped>

</style>