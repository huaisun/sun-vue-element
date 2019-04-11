<template>
  <div class="block">
    <el-pagination @size-change="sizeChange" @current-change="currentChange"
                   :current-page="currentPage" :page-size="pageSize" :page-sizes="[5,10,20]" layout="total, sizes, prev, pager, next"
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
      currentChange(val) {
        this.$emit('current-change', val);
      },
      sizeChange(val) {
        this.$emit('size-change', val);
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
