<template lang='pug'>
  el-container#app
    h2 xx
    el-main#main-body: transition(name='el-fade-in-linear' mode='out-in')
      router-view
</template>
