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
        ref="cropper"
        :view-mode="1"
        :aspect-ratio="3/2"
        :img-style="imgStyle"
        src="">      
      </vue-cropper>
    </div>
  </div>
</template>
<script>
import VueCropper from 'vue-cropperjs';

export default {
  name: 'VUpload',
  componentName: 'VUpload',
  data(){
    return {
      imgStyle: {height: '300px'},
      initialUrl: ''
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
            this.$refs.cropper.replace(event.target.result);
          }
        };
        reader.readAsDataURL(file);
      } else {
        this.$error('FileReader API not supported')
      }
    },
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

</style>
