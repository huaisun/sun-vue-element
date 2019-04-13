<template>
  <el-table :data="data" stripe>
    <el-table-column v-if="columnIndex.show" type="index"
                     :label="columnIndex.name" :width="columnIndex.width"></el-table-column>
    <el-table-column v-for="(item, index) in label" :prop="item.prop" :key="index" :label="item.name"
                     :width="item.width" :formatter="item.formatter"></el-table-column>
    <el-table-column v-if="columnOperation.show" :label="columnOperation.name">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "Table",
    props: ['data', 'label', 'columnIndex', 'columnOperation'],
    methods: {
      handleEdit(index, row) {
        this.$emit('handleEdit', row);
      },

      handleDelete(index, row) {
        this.$emit('handleDelete', row);
      }
    }
  }
</script>

<style>

</style>
