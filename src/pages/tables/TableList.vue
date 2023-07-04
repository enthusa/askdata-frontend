<template lang='pug'>
  section
    el-form(:model='tables.params' inline label-suffix=':')
      el-form-item
        el-button(type='primary' icon='el-icon-plus' @click="$router.push('/ds')") 数据源
      el-form-item
        el-button(type='primary' icon='el-icon-refresh' @click='reload' :loading='tables.loading') 刷新
    el-table.hui-vskipp(:data='tables.list' v-loading='tables.loading')
      el-table-column(prop='id' label='ID')
      el-table-column(prop='catalog' label='数据库')
      el-table-column(prop='name' label='表名')
      el-table-column(prop='brief' label='简介')
      el-table-column(prop='remarks' label='详细介绍')
      el-table-column(label='操作')
        template(slot-scope='{row}')
          el-button(type='text' @click='$router.push(`/meta/${row.id}`)') 查看
    el-pagination(:total='tables.total' :current-page='tables.page' :page-size='tables.pageSize' @current-change='handleCurrentChange' @size-change='handleSizeChange' background layout='total, sizes, prev, pager, next, jumper')
    el-dialog(:title='formTitle' :visible.sync='formVisible')
      el-form(:model='tables.instance' :rules='tables.rules' ref='modal'  label-width='95px' label-suffix=':')
        el-form-item(prop='name' label='品牌名')
          el-input(v-model='tables.instance.name')
      div(slot='footer')
        el-button(@click='formVisible=false') 取消
        el-button(@click='saveHandler' type='primary') 确定
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex';
  import { page } from 'hui-vue';

  export default {
    data() {
      return {
        formTitle: null,
        formVisible: false
      };
    },

    mixins: [page],

    computed: {
      ...mapState(['tables'])
    },

    methods: {
      ...mapMutations('tables', ['newInstance']),
      ...mapActions('tables', ['getListByPage', 'save']),

      createHandler() {
        this.newInstance();
        this.formTitle = '新增记录';
        this.formVisible = true;
      },

      editHandler(row) {
        this.newInstance(row);
        this.formTitle = '更新记录';
        this.formVisible = true;
      },

      saveHandler() {
        this.$refs.modal.validate(valid => {
          if (!valid) {
            return;
          }
          this.save({
            cb: ({ id }) => {
              id > 0 && this.$message({
                message: '保存成功!',
                type: 'success'
              });
              this.$refs.modal.resetFields();
              this.formVisible = false;
              this.getListByPage();
            }
          });
        });
      }
    }
  };
</script>
