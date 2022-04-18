<template lang='pug'>
  el-container#app
    el-header#header
      el-menu(mode='horizontal' background-color='rgb(80, 158, 227)' text-color='#fff')
        el-menu-item 新建查询
        el-menu-item 浏览数据
    el-main#main-body: transition(name='el-fade-in-linear' mode='out-in')
      router-view
</template>

<style lang='less'>
  #header {
    background-color: rgb(80, 158, 227);
  }
</style>
