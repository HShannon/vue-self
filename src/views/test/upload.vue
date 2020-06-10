<template>
  <div>
    <div class="cropper-wrapper">
      <div class="cropper-upload">
        <label for="upload-pic">
          <span class="el-button el-button-background el-button--primary el-button--mini ">上传本地图片</span>
          <input style="display:none" id="upload-pic" type="file" accept="image/*" @change="setImage" />
        </label>
      </div>
      <vue-cropper
        v-show="cropperVisible"
        ref="cropper"
        :view-mode="1"
        :aspect-ratio="3/2"
        :img-style="imgStyle"
        src="">      
      </vue-cropper>
    </div>
    <div class="qrcode-wrapper">
      <div class="qrcode-box">
        <canvas class="qrcode-canvas" ref="qrcode"></canvas>
      </div>
      <div class="btn-wrapper">
        <el-input size="mini" v-model="bannerUrl"></el-input>
        <el-button size="mini" @click="createQrc">Click!!</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropperjs';
import QRCode from 'qrcode';
export default {
  name: 'VUpload',
  componentName: 'VUpload',
  data(){
    return {
      imgStyle: {height: '300px'},
      cropperVisible: false,
      bannerUrl: ''
    }
  },
  methods: {
    setImage(e){
      const file = e.target.files[0]
      if(!file.type.includes("image/")) {
          alert('请选择图片文件');
          return;    
      }
      if(typeof FileReader === 'function'){
        const reader = new FileReader();
        reader.onload = event => {
          this.uploadImgSrc = event.target.result;
          if(this.$refs.cropper){
            this.cropperVisible = true;
            this.$refs.cropper.replace(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        this.$error('FileReader API not supported')
      }
    },
    createQrc(){
      if(!this.bannerUrl){
        this.$message({
          message: 'url is needed!!',
          type: 'warning'
        });
        return false
      }
      QRCode.toCanvas(this.$refs.qrcode, this.bannerUrl, (error) => {
        if(error) {
          this.$message({
            message: error,
            type: 'warning'
          });
        } else {
          this.$message({
            message: 'success',
            type: 'success'
          })
        }
      })
    }
  },
  components: {
    VueCropper
  }
}
</script>
<style lang="scss">
.cropper-wrapper{
  width: 300px;
  .cropper-upload{
    margin-bottom: 10px;
  }
  .el-button-background{
    background: #234480;
    color: #ffffff;
    border: none;
  }
  .el-button--primary:hover{
    background: #234480;
  }
}
.qrcode-wrapper{
  .btn-wrapper .el-input{
    width: 180px !important;
  }
  .btn-wrapper button{
    display:inline-block
  }
}

</style>
