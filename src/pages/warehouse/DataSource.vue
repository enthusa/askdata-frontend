<template lang='pug'>
  section
    el-form(:model='datasources.params' inline label-suffix=':')
      el-form-item
        el-button(type='primary' icon='el-icon-plus' @click='createHandler') 新增
      el-form-item
        el-button(type='primary' icon='el-icon-refresh' @click='reload' :loading='datasources.loading') 刷新
    el-table.hui-vskipp(:data='datasources.list' v-loading='datasources.loading')
      el-table-column(prop='name' label='名称')
      el-table-column(prop='catalogs' label='数据库')
      el-table-column(label='操作')
        template(slot-scope='{row}')
          el-button(type='text' icon='el-icon-edit' @click='editHandler(row)')
    el-pagination(:total='datasources.total' :current-page='datasources.page' :page-size='datasources.pageSize' @current-change='handleCurrentChange' @size-change='handleSizeChange' background layout='total, sizes, prev, pager, next, jumper')
    el-dialog(:title='formTitle' :visible.sync='formVisible')
      p.small 数据库连接信息与 application-prod.yml 的配置保持一致; 更新记录时, 若不填写数据库连接信息, 则保持不变.
      el-form(:model='datasources.instance' :rules='datasources.rules' ref='modal'  label-width='95px' label-suffix=':')
        el-form-item(prop='name' label='名称')
          el-input(v-model='datasources.instance.name')
        el-form-item(prop='url' label='URL')
          el-input(v-model='datasources.instance.url')
        el-form-item(prop='user' label='用户')
          el-input(v-model='datasources.instance.user')
        el-form-item(prop='password' label='密码')
          el-input(v-model='datasources.instance.password')
        el-form-item(prop='catalogList' label='数据库')
          el-select(v-model='datasources.instance.catalogList' multiple)
            el-option(v-for='item in catalogs' :key='item' :label='item' :value='item')
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
        formVisible: false,
        catalogs: []
      };
    },

    mixins: [page],

    computed: {
      ...mapState(['datasources'])
    },

    methods: {
      ...mapMutations('datasources', ['newInstance']),
      ...mapActions('datasources', ['getListByPage', 'save', 'getInstanceById']),

      createHandler() {
        this.newInstance();
        this.formTitle = '新增记录';
        this.formVisible = true;
      },

      editHandler(row) {
        this.newInstance(row);
        this.formTitle = '更新记录';
        this.formVisible = true;
        this.getInstanceById({
          id: row.id,
          cb: d => {
            this.catalogs = d || [];
          }
        });
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
