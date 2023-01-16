<template>
  <div>
    <b-table striped hover class="b-table" :items="items" :fields="fields" thead-class="hidden_header">
      <template v-for="(field, index) in fields" #[`cell(${field.key})`]="value">
        <b-checkbox v-if="field.key === 'selectRow'" :checked="items[value.index].done" :key="field.key"
                    @change="isDone($event,value.index)"></b-checkbox>
        <div :key="index" v-else-if="field.type === 'action'">
          <b-button @click="showEditModal(value.index)">修改</b-button>
          <b-button class="delete-button" variant="danger" @click="showRemoveModal(value.index)">刪除</b-button>

        </div>

        <span :key="index" v-else>{{ value.value }}</span>
      </template>
    </b-table>

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

    <b-modal ref="remove-modal" hide-footer title="確認刪除待辦事項">
      <div class="d-block text-center">
        <label>是否確認刪除？</label>
      </div>
      <div>
        <b-button
            class="mt-3"
            variant="outline-danger"
            block @click="removeComfirm()">確定
        </b-button>
        <b-button
            class="mt-2"
            variant="outline-warning"
            block
            @click="removeCancel">取消
        </b-button>
      </div>

    </b-modal>
  </div>
</template>

<script>
export default {
  name: "TodoList",
  data() {
    return {
      removeIndex: 0,
      editInput: {
        index: 0,
        value: ''
      }
    }
  },
  props: ['fields', 'items', 'editConfirm', 'removeTodo','isDone'],
  methods: {
    showEditModal(index) {
      this.editInput.index = index;
      this.editInput.value = this.items[index].todo;
      console.log(this.editInput.index = index)
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
      this.removeIndex = index;
      this.$refs['remove-modal'].show();

    },
    removeComfirm() {
      this.removeTodo(this.removeIndex);
      this.$refs['remove-modal'].hide();
    },
    removeCancel() {
      this.$refs['remove-modal'].hide();
    },
  }
}
</script>

<style scoped>

</style>