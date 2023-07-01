<template lang='pug'>
  section#page404
    h2 404
    p 您访问的页面没有找到!
    router-link(to='/'): el-button(type='primary') 返回首页
</template>

<style lang='less'>
  section#page404 {
    text-align: center;
    margin-top: 100px;
  }
</style>
