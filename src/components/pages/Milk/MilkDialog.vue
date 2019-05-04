<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="30%" :before-close="closeDialog">
    <span slot="title" class="dialog-title">
      {{dialogTitle}}
    </span>
      <el-form ref="form" :model="form" label-position="left" label-width="80px" class="milk-form">
        <el-form-item label="奶茶名">
          <el-input v-model="form.milkName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="奶茶详情">
          <el-input v-model="form.milkDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="12">
            <el-form-item label="奶茶价格">
              <el-input v-model="form.milkPrice" auto-complete="off">
                <i slot="prefix" class="">$</i>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" class="shelf-class">
            <el-form-item label="上架">
              <el-switch v-model="form.shelf"></el-switch>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="奶茶照片">
          <img :src="imgDataUrl" alt="当前图片" class="milk-photo-class" @click="selectPhoto">
          <my-upload field="img" :width="300" :height="300" :url="url" v-model="photoShow" img-format="png"
                     withCredentials :noCircle="true"
                     @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess"
                     @crop-upload-fail="cropUploadFail"></my-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="submitDialog">确 定</el-button>
    </span>
    </el-dialog>
  </div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload';

  export default {
    name: "milk-dialog",
    components: {'my-upload': myUpload},
    props: ['dialogVisible', 'dialogTitle'],
    data: function () {
      return {
        photoShow: false,
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        default_photo_address: '',
        current_photo: 'default.jpg',
        url: '/sun/file/uploadImg',
        cropVisible: false,
        cropTitle: '奶茶照片',
        form: {
          id: '',
          milkName: '',
          milkDetail: '',
          milkPrice: '',
          milkPhoto: '',
          shelf: false,
        },
        imgDataUrl: '/static/img/milk/default.jpg'
      }
    },
    methods: {
      cropUploadFail(status, field) {
        //todo
      },
      cropUploadSuccess(jsonData, field) {
        this.form.milkPhoto = jsonData.data;
      },
      cropSuccess(imgDataUrl, field) {
        this.imgDataUrl = imgDataUrl;
      },
      selectPhoto() {
        this.photoShow = !this.photoShow;
      },
      closeDialog(done) {
        this.$emit('handleClose', done);
        this.clearForm();
      },
      submitDialog() {
        let entity = this.form;
        entity.shelf = this.form.shelf ? 1 : 0;
        this.$http.post('/sun/milk/saveOrUpdateMilk', entity, {emulateJSON: true}).then(response => {
          this.$message({
            message: response.body.msg,
            type: 'success'
          });
          this.closeDialog();
        }, response => {
          this.$message.error('System Error,Call Administrator');
        })
      },
      clearForm() {
        this.$refs.form.resetFields();
        this.form = {
          id: '',
          milkName: '',
          milkDetail: '',
          milkPrice: '',
          milkPhoto: '',
          shelf: false,
        };
        this.imgDataUrl = '/static/img/milk/default.jpg';
      },
      editForm(row) {
        this.form.id = row.id;
        this.form.milkName = row.milkName;
        this.form.milkDetail = row.milkDetail;
        this.form.milkAddress = row.milkAddress;
        this.form.milkPrice = row.milkPrice;
        this.form.shelf = row.shelf === 1;
      },
    }
  }
</script>

<style scoped>
  .milk-form {
    padding: 20px;
    text-align: left;
  }

  .shelf-class {
    padding-left: 20px;
  }

  .selectPhoto {
    padding-left: 20px;
  }

  .milk-photo-class {
    width: 100px;
    height: 100px;
  }
</style>
