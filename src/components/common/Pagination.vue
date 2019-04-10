<template>
  <div class="block">
    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page="currentPage" :page-size="pageSize" layout="total, prev, pager, next"
                   :total="total">
    </el-pagination>
  </div>
</template>

<script>
  export default {
    name: "Pagination.vue",
    props: ['currentPage', 'total', 'pageSize'],
    methods: {
      sizeChange() {

      },
      currentChange() {

      }
    }
  }
</script>

<style>
  .block .el-pagination {
    margin-top: 20px;
    text-align: right;
  }

</style>
