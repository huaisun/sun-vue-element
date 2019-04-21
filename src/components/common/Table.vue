<template>
  <el-table :data="data" stripe>
    <el-table-column v-if="columnIndex.show" type="index"
                     :label="columnIndex.name" :width="columnIndex.width"></el-table-column>
    <el-table-column v-for="(item, index) in label" :prop="item.prop" :key="index" :label="item.name"
                     :width="item.width" :formatter="item.formatter"></el-table-column>
    <el-table-column :width="columnOperation.width" :label="columnOperation.name">
      <template slot-scope="scope">
        <el-button v-if="columnOperation.show" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button v-if="columnOperation.show" size="mini" type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        <el-button v-if="!columnOperation.show" size="mini" circle icon="el-icon-plus"
                   @click="handlePlus(scope.$index, scope.row)"/>
        <el-button v-if="!columnOperation.show" size="mini" circle type="info" icon="el-icon-minus"
                   @click="handleMinus(scope.$index, scope.row)"/>
        <el-button v-if="!columnOperation.show" size="mini" circle type="danger" icon="el-icon-close"
                   @click="handleDelete(scope.$index, scope.row)"/>
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
      },
      handlePlus(index, row) {
        this.$emit('handlePlus', row);
      },
      handleMinus(index, row) {
        this.$emit('handleMinus', row);
      }
    }
  }
</script>

<style>

</style>
