<template>
  <div class="aside-class">
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
      <div class="page-button-class">
        <el-button size="medium" plain @click="addEmploy">添加账号</el-button>
      </div>
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex" :column-operation="columnOperation"
                 @handleEdit="handleEdit" @handleDelete="handleDelete"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></sun-pagination>

    </div>
    <sign-up ref="SignUp" :dialog-visible="dialogVisible" :dialog-title="dialogTitle"
             @handleClose="handleClose"></sign-up>
  </div>
</template>

<script>
  import SignUp from "./SignUp";

  export default {
    name: "LoginManage",
    components: {SignUp},
    data: function () {
      return {
        dialogVisible: false,
        dialogTitle: '',
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

        columnOperation: {
          show: true,
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
        return valid === 0 ? '否' : '是'
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableData();
      },

      handleEdit(row) {
        this.$refs.SignUp.editForm(row);
        this.dialogVisible = true;
        this.dialogTitle = '编辑管理员';
      },
      handleDelete(row) {
        let self = this;
        self.$confirm('是否删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.delete('/sun/employ/deleteEmploy', {params: row}).then(response => {
            if (response.body.code === 1) {
              self.$message({
                type: 'success',
                message: response.body.msg
              });
            } else {
              self.$message.error(response.body.msg);
            }
            self.loadTableData();
          }, response => {
            self.$message.error('删除失败!');
          });

        }).catch(() => {
          self.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },

      //添加管理员
      addEmploy() {
        this.dialogTitle = '新增管理员';
        this.dialogVisible = true;
      },

      handleClose() {
        this.loadTableData();
        this.dialogVisible = false;
      }
    }
  }
</script>

<style scoped>
</style>
