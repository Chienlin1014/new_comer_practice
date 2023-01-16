<template>
  <div>
    <b-table striped hover class="b-table" :items="items" :fields="fields" thead-class="hidden_header">
      <template v-for="(field, index) in fields" #[`cell(${field.key})`]="value">
        <b-checkbox v-if="field.key === 'selectRow'" :checked="items[value.index].done" :key="index"
                    @change="isDone(value.index)"></b-checkbox>
        <div :key="index" v-else-if="field.type === 'action'">
          <b-button @click="showEditModal(value.index)">修改</b-button>
          <b-button class="delete-button" variant="danger" @click="showRemoveModal(value.index)">刪除</b-button>

        </div>

        <span :key="index" v-else>{{ value.value }}</span>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "DoneList",
  props:['fields','items','isDone']
}
</script>

<style scoped>

</style>