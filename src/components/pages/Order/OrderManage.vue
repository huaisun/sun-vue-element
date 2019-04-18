<template>
  <div class="aside-class">
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
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation"></sun-table>
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
        tableData: [],

        labelData: [{
          prop: 'id',
          name: '订单编号',
        }, {
          prop: 'userName',
          name: '用户名'
        }, {
          prop: 'createDate',
          name: '创建日期'
        }, {
          prop: 'mode',
          name: '支付方式',
        }, {
          prop: 'valid',
          name: '订单是否有效',
        }, {
          prop: 'payment',
          name: '总消费'
        }],

        columnIndex: {
          show: true,
          width: 50,
          name: '#'
        },
        columnOperation: {
          show: false,
          width: 200,
          name: 'OPERATION',
        }
      }
    }
  }
</script>

<style>
</style>
