<template>
  <div>
    <b-table striped hover class="b-table" :items="items" :fields="fields" :bordered="true" thead-class="hidden_header">
      <template v-for="(field, index) in fields" #[`cell(${field.key})`]="value">
        <b-checkbox v-if="field.key === 'selectRow'" :checked="items[value.index].status" :key="index"
                    @change="isDone($event,value.index)"></b-checkbox>
        <div :key="index" v-else-if="field.type === 'action'">
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
  props: ['fields', 'items', 'editConfirm', 'removeTodo','isDone'],
}
</script>

<style scoped>

</style>