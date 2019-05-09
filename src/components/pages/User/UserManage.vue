<template>
  <div class="aside-class">
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="20" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.name" v-on:input="loadTableData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <div class="page-button-class">
        <el-button size="medium" plain @click="addUser">添加用户</el-button>
      </div>
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation" @handleEdit="handleEdit" @handleDelete="handleDelete"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @sizeChange="handleSizeChange" @currenChange="handleCurrentChange"></sun-pagination>
    </div>
    <user-dialog ref="UserDialog" :dialog-title="dialogTitle" :dialog-visible="dialogVisible"
                 @handleClose="handleClose"></user-dialog>
  </div>
</template>

<script>
  import UserDialog from "./UserDialog";

  export default {
    name: "UserManage",
    components: {UserDialog},
    data: function () {
      return {
        searchForm: {
          name: '',
        },
        //表格数据
        tableData: [],
        //表头数据
        labelData: [{
          prop: 'id',
          name: 'Number',
        }, {
          prop: 'name',
          name: '姓名',
        }, {
          prop: 'email',
          name: '邮箱',
        }, {
          prop: 'phone',
          name: '手机号',
        }, {
          prop: 'integral',
          name: '积分',
        }, {
          prop: 'cost',
          name: '总消费',
          formatter: this.priceFormat
        }, {
          prop: 'createDate',
          name: '创建日期',
          formatter: this.formatDate,
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
          name: 'OPERATE',
          buttonShow: true,
        },

        pageSize: 10,
        currentPage: 0,
        total: 0,

        //弹出框的数据
        dialogTitle: '',
        dialogVisible: false,

      }
    },

    created() {
      this.loadTableData();
    },

    methods: {
      priceFormat(row, column, cost) {
        cost = cost.toString();
        let length = cost.indexOf('.');
        if (length < 0) {
          length = cost.length;
          cost += '.';
        }
        while (cost.length <= length + 2) {
          cost += '0';
        }
        return '$' + cost;
      },
      //日期转换
      formatDate(row, column, executeTime) {
        return new Date(+new Date(new Date(executeTime).toJSON()) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
      },
      //处理分页
      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableData();
      },

      //加载表格
      loadTableData() {
        let self = this;
        let entity = {
          name: self.searchForm.name,
          phone: self.searchForm.name,
          email: self.searchForm.name,
          id: self.searchForm.id,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/sun/user/searchUser', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      },

      //处理管理弹出框
      handleClose() {
        this.loadTableData();
        this.dialogVisible = false;
      },

      //打开弹出框
      addUser() {
        this.dialogTitle = '添加用户';
        this.dialogVisible = true;
      },

      //编辑数据
      handleEdit(row) {
        this.$refs.UserDialog.editForm(row);
        this.dialogTitle = '编辑用户';
        this.dialogVisible = true;
      },

      //删除数据
      handleDelete(row) {
        let self = this;
        self.$confirm('是否删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.delete('/sun/user/deleteUser', {params: row}).then(response => {
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
      }
    }
  }
</script>

<style scoped>

</style>
