<template>
  <div>
    <div class="search-class">
      <el-form ref="form" :model="searchForm">
        <el-row>
          <el-col :xs="20" :sm="18" :md="10" :lg="8" :xl="6">
            <el-form-item>
              <el-input prefix-icon="el-icon-search" v-model="searchForm.name" @change="loadTableDate"></el-input>
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
    name: "UserManage",
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
          prop: 'balance',
          name: '余额',
        }, {
          prop: 'cost',
          name: '总消费',
        }, {
          prop: 'createDate',
          name: '创建日期'
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
      this.loadTableDate();
    },

    methods: {
      //处理分页
      handleSizeChange() {

      },
      handleCurrentChange() {

      },

      //加载表格
      loadTableDate() {
        let self = this;
        let entity = {
          name: self.searchForm.name,
          phone: self.searchForm.name,
          email: self.searchForm.name,
          id: self.searchForm.id,
        };
        self.$http.get('/sun/user/searchUser', {params: entity}).then(response => {
          console.log(response);
          self.tableData = response.body.data;
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      }
    }
  }
</script>

<style scoped>

</style>
