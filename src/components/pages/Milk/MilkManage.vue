<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="22" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.milkName" @change="loadTableData"></el-input>
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

        pageSize: 5,
        currentPage: 0,
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

      handleSizeChange() {

      },
      handleCurrentChange() {

      }
    }
  }
</script>

<style scoped>

</style>
