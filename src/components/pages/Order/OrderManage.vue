<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-class">
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"></sun-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderManage",
    data: () => {
      return {
        //表单搜索
        searchForm: {
          username: '',
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],

        labelData: [{
          prop: 'date',
          name: '日期',
        }, {
          prop: 'name',
          name: '姓名',
        }, {
          prop: 'address',
          name: '地址',
        }],

        columnIndex: {
          show: true,
          width: 50,
          name: '#'
        }
      }
    }
  }
</script>

<style>
</style>
