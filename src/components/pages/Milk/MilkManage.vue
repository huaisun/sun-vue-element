<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.milkName" v-on:input="loadTableData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <div class="page-button-class">
        <el-button size="medium" plain>添加奶茶</el-button>
      </div>
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation" @handleEdit="handleEdit" @handleDelete="handleDelete"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @size-change="handleSizeChange" @current-change="handleCurrentChange"></sun-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "MilkManage",
    data: () => {
      return {
        searchForm: {
          milkName: ''
        },
        //表格数据
        tableData: [],
        //表头数据
        labelData: [{
          prop: 'milkName',
          name: '奶茶名',
        }, {
          prop: 'milkPrice',
          name: '奶茶价格',
        }, {
          prop: 'milkAddress',
          name: '奶茶照片',
        }, {
          prop: 'isShelf',
          name: '上架'
        }],

        //序号显示
        columnIndex: {
          show: true,
          width: 50,
          name: '#'
        },
        columnOperation: {
          show: true,
          width: 50,
          name: 'OPERATE'
        },

        pageSize: 5,
        currentPage: 1,
        total: 0,
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      loadTableData() {
        let self = this;
        let entity = {
          milkName: self.searchForm.milkName,
          pageSize: self.pageSize,
          currentPage: self.currentPage
        };
        self.$http.get('/sun/milk/searchMilkMenu', {params: entity}).then(response => {
          self.tableData = response.body.page.list;
          self.total = response.body.page.total;
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      },

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.loadTableData();
      },
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        this.loadTableData();
      },

      //编辑数据
      handleEdit(row) {
        this.$refs.UserDialog.editForm(row);
        this.dialogTitle = '编辑用户';
        this.dialogVisible = true;
      },

      //删除数据
      handleDelete(row) {
        this.$confirm('是否删除该条数据?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style>

</style>
