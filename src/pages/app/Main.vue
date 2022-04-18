<template lang='pug'>
  section
    el-table(:data='posts.list')
      el-table-column(prop='id' label='ID')
      el-table-column(prop='name' label='Name')
      el-table-column(prop='description' label='Description')
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
      ...mapState(['posts'])
    },

    methods: {
      ...mapActions('posts', ['getListByPage', 'save']),

      initialize() {
        console.log('xx');
        this.getListByPage();
      }
    },

    mounted() {
      this.$nextTick(this.initialize);
    }
  };
</script>
