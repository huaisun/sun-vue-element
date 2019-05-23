<template>
  <div class="aside-class">
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.name" v-on:input="loadTable"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation" :expand="true"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @size-change="handleSizeChange" @current-change="handleCurrentChange"></sun-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "OrderManage",
    data() {
      return {
        expandForm:[],
        //表单搜索
        searchForm: {
          name: '',
        },
        tableData: [],

        labelData: [{
          prop: 'id',
          name: '订单编号',
        }, {
          prop: 'name',
          name: '用户名',
          formatter: this.nameFormat
        }, {
          prop: 'createDate',
          name: '创建日期',
          formatter: this.formatDate,
        }, {
          prop: 'valid',
          name: '订单是否有效',
          formatter: this.validFormat
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
          buttonShow: true,
        },
        pageSize: 10,
        currentPage: 0,
        total: 0,

      }
    },
    created() {
      this.loadTable();
    },
    methods: {
      //日期转换
      formatDate(row, column, executeTime) {
        return new Date(+new Date(new Date(executeTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      nameFormat(row, column, name) {
        return name == null ? '默认用户' : name;
      },
      validFormat(row, column, valid) {
        return valid === 1 ? '有效单' : '无效单';
      },
      loadTable() {
        let entity = {
          name: this.searchForm.name,
          pageSize: this.pageSize,
          currentPage: this.currentPage
        };
        this.$http.get('/sun/order/searchOrderAndUser', {params: entity}).then(reason => {
          this.tableData = reason.body.page.list;
          this.total = reason.body.page.total;
        });
      },
      //处理分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTable();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTable();
      },
    }
  }
</script>

<style>
</style>
