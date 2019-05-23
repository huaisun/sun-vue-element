<template>
  <div class="aside-class">
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.milkName"
                        v-on:input="loadTableData"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="table-class">
      <div class="page-button-class">
        <el-button size="medium" plain @click="addMilk">添加奶茶</el-button>
      </div>
      <sun-table :data="tableData" :label="labelData" :column-index="columnIndex"
                 :column-operation="columnOperation" @handleEdit="handleEdit" @handleDelete="handleDelete"></sun-table>
      <sun-pagination :total="total" :page-size="pageSize" :current-change="currentPage"
                      @size-change="handleSizeChange" @current-change="handleCurrentChange"></sun-pagination>
    </div>
    <milk-dialog ref="MilkDialog" :dialog-title="dialogTitle" :dialog-visible="dialogVisible"
                 @handleClose="handleClose"></milk-dialog>
  </div>
</template>

<script>
  import MilkDialog from "./MilkDialog";

  export default {
    name: "MilkManage",
    components: {MilkDialog},
    data: function () {
      return {
        dialogVisible: false,
        dialogTitle: '',
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
          prop: 'milkDetail',
          name: '奶茶详情',
        }, {
          prop: 'milkPrice',
          name: '价格',
          formatter: this.priceFormat,
        }, {
          prop: 'shelf',
          name: '上架',
          formatter: this.shelfFormat
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
        currentPage: 1,
        total: 0,
      }
    },
    created() {
      this.loadTableData();
    },
    methods: {
      shelfFormat(row, column, shelf) {
        return shelf === 1 ? '已上架': '未上架';
      },
      priceFormat(row, column, milkPrice) {
        milkPrice = milkPrice.toString();
        let length = milkPrice.indexOf('.');
        if (length < 0) {
          length = milkPrice.length;
          milkPrice += '.';
        }
        while (milkPrice.length <= length + 2) {
          milkPrice += '0';
        }
        return '$' + milkPrice;
      },
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
        this.$refs.MilkDialog.editForm(row);
        this.dialogTitle = '编辑奶茶';
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
          self.$http.delete('/sun/milk/deleteMilk', {params: row}).then(response => {
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

      addMilk() {
        this.dialogTitle = '新增奶茶';
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
