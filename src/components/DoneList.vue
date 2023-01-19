<template>
  <div>
    <b-table striped hover class="b-table" :items="items" :fields="fields" thead-class="hidden_header">
      <template v-for="(field, index) in fields" #[`cell(${field.key})`]="value">
        <b-checkbox v-if="field.key === 'selectRow'" :checked="items[value.index].status" :key="index"
                    @change="isDone($event,value.index)"></b-checkbox>
        <div :key="index" v-else-if="field.type === 'action'">
<!--          <b-button @click="showEditModal(value.index)">修改</b-button>-->

<!--          <b-button class="delete-button" variant="danger" @click="showRemoveModal(value.index)">刪除</b-button>-->
          <EditModal       :value_index="value.index"
                           :items="items"
                           :editConfirm="editConfirm"
                           :removeTodo="removeTodo"
                           :isDone="isDone"></EditModal>
        </div>
        <span :key="index" v-else>{{ value.value }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
import EditModal from "@/components/EditModal.vue";
export default {
  name: "DoneList",
  components:{
    EditModal
  },
  data() {
    return {
      removeIndex: 0,
      index:0,
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
      this.index=index
      this.removeIndex = this.items[index].id;
      this.$refs['remove-modal'].show();

    },
    removeConfirm() {
      this.removeTodo(this.index, this.removeIndex);
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