<template>
  <div class="message">
    <div class="message">
      <i :class="iconClass"></i>
      <span v-if="dangerouslyUseHTMLStringFlag" v-html="message"></span>
      <span v-else>{{message}}</span>
    </div>
    <i class="el-icon-close" v-show="showClose" @click="close"></i>
  </div>
</template>
<script>
export default {
  name: 'message',
  computed: {
    iconClass() {
      return this.type ? `el-icon-${this.type}`: 'el-icon-info'
    },
    dangerouslyUseHTMLStringFlag() {
      return this.dangerouslyUseHTMLString
    }
  },
  mounted() {
    setTimeout(() => {
      this.close()
    },this.duration || 3000)
  },
  methods: {
    close() {
      this.onClose.call(this)
    }
  }
}
</script>
<style scoped>
.message{
  min-width: 300px;
  padding:10px;
  height: 100px;
  position: fixed;
  top:20px;
  left:50%;
  margin-left: -150px;
  background: #fff;
}
.el-icon-close{
  font-size: 18px;
  position: absolute;
  top: 5px;
  right: 5px;
  color: #999;
  cursor: pointer;
} 
</style>