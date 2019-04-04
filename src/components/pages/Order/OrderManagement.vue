<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm" label-width="60px">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item label="会员名">
              <el-input v-model="searchForm.username"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="table-class">
      <el-table :data="tableData">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
      l
    </div>
  </div>
</template>

<script>
  export default {
    name: "orderManagement",
    data: () => {
      return {
        //表单搜索
        searchForm: {
          username: '',
          orderDate: new Date(),
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
        }]
      }
    }
  }
</script>

<style>
  .search-class {
    background: white;
    padding: 20px;
    border-radius: 3px;
  }

  .table-class {
    margin-top: 20px;
    padding: 20px;
    background: white;
    border-radius: 3px;
  }

</style>
