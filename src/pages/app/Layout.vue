<template lang='pug'>
  el-container#app
    el-header#header
      el-menu(router mode='horizontal' :default-active='active' background-color='#545c64' text-color='#fff' active-text-color='#ffd04b')
        el-menu-item(index='/') 新建查询
        el-menu-item(index='/meta') 浏览数据
        el-menu-item(index='/about') 关于
    el-main#main-body: transition(name='el-fade-in-linear' mode='out-in')
      router-view
</template>

<script>
  export default {
    data() {
      return {
        active: '/' + this.$route.path.split('/')[1]
      };
    },

    methods: {
      initialize() {
        this.active = '/' + this.$route.path.split('/')[1];
      }
    },

    watch: {
      $route: {
        handler: 'initialize',
        immediate: true
      }
    }
  };
</script>

<style lang='less'>
  #header {
    background-color: #545c64;

    > .el-menu {
      border-bottom: none;
    }
  }
</style>
