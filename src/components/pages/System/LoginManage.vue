<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.name" v-on:input="loadTableData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></sun-pagination>

    </div>
  </div>
</template>

<script>
  export default {
    name: "LoginManage",
    data: function () {
      return {
        searchForm: {
          name: ''
        },
        //表格数据
        tableData: [],
        //表头数据
        labelData: [{
          prop: 'name',
          name: '姓名',
        }, {
          prop: 'phone',
          name: '手机号',
        }, {
          prop: 'email',
          name: '邮箱',
        }, {
          prop: 'address',
          name: '地址',
        }, {
          prop: 'createDate',
          name: '创建日期',
          formatter: this.formatDate
        }, {
          prop: 'valid',
          name: '是否启用',
          formatter: this.formatValid
        }],

        //序号显示
        columnIndex: {
          show: true,
          width: 50,
          name: '#'
        },

        pageSize: 10,
        currentPage: 0,
        total: 0,
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      //日期转换
      formatDate(row, column, executeTime) {
        return new Date(+new Date(new Date(executeTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      loadTableData() {
        let self = this;
        let entity = {
          name: self.searchForm.name,
          pageSize: self.pageSize,
          currentPage: self.currentPage,
        };
        self.$http.get('/sun/employ/searchEmploy', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total;
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      },

      formatValid(row, column, valid) {
        console.log(valid);
        return valid === 0 ? '否' : '是'
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableData();
      }
    }
  }
</script>

<style scoped>

</style>
