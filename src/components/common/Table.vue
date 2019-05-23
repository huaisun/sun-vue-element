<template>
  <el-table :data="data" stripe>
    <el-table-column v-if="expand" type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="demo-table-expand" v-for="(item, index) in props.row.details"
                 :key="index">
          <el-form-item label="奶茶名">
            <span>{{ item.milkName }}</span>
          </el-form-item>
          <el-form-item label="种类">
            <span>{{ item.type }}</span>
          </el-form-item>
          <el-form-item label="数量">
            <span>{{ item.number }} 杯</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column v-if="columnIndex.show" type="index"
                     :label="columnIndex.name" :width="columnIndex.width"></el-table-column>
    <el-table-column v-for="(item, index) in label" show-overflow-tooltip :prop="item.prop" :key="index" :label="item.name"
                     :width="item.width" :formatter="item.formatter"></el-table-column>
    <el-table-column v-if="columnOperation.show" :width="columnOperation.width" :label="columnOperation.name">
      <template slot-scope="scope">
        <el-button v-if="columnOperation.buttonShow" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑
        </el-button>
        <el-button v-if="columnOperation.buttonShow" size="mini" type="danger"
                   @click="handleDelete(scope.$index, scope.row)">删除
        </el-button>
        <el-button v-if="!columnOperation.buttonShow" size="mini" circle icon="el-icon-plus"
                   @click="handlePlus(scope.$index, scope.row)"/>
        <el-button v-if="!columnOperation.buttonShow" size="mini" circle type="info" icon="el-icon-minus"
                   @click="handleMinus(scope.$index, scope.row)"/>
        <el-button v-if="!columnOperation.buttonShow" size="mini" circle type="danger" icon="el-icon-close"
                   @click="handleDelete(scope.$index, scope.row)"/>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: "Table",
    props: ['data', 'label', 'columnIndex', 'columnOperation', 'expand'],
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
  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
</style>
