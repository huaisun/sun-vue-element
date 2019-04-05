<template>
  <el-table :data="data" stripe>
    <el-table-column v-if="columnIndex.show" type="index"
                     :label="columnIndex.name" :width="columnIndex.width"></el-table-column>
    <el-table-column v-for="(item, index) in label" :prop="item.prop" :key="index" :label="item.name"
                     :width="item.width"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "Table",
    props: ['data', 'label', 'columnIndex']
  }
</script>

<style>

</style>
