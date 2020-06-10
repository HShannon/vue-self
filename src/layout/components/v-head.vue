<template>
  <div class="sys-header">
    <el-row>
      <el-col :span="12" :offset="6">
        <div class="title-size">
          Vue Try
        </div>
      </el-col>
      <el-col :span="6">
        <div class="user-info">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'VHead',
  componentName: 'VHead',
  data () {
    return {
    }
  },
  computed: {
  
  },
  methods: {
  
  }
}
</script>
<style lang="scss" scoped>
.sys-header {
  height: 60px;
  background: #234480;
  color: #fff;
  line-height: 60px;
  border-bottom: 1px solid lighten(#234480, 50%);
  box-sizing: border-box;
}
.title-size {
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
.user-info {
  text-align: right;
  margin-right: 10px;
}
</style>
