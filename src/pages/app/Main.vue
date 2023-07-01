<template lang='pug'>
  section
    el-input.hui-vskip(v-model='question' type='textarea' :rows=3 placeholder='请输入您的问题')
    ul.list-inline.toolbar
      li: el-button(type='primary' icon='el-icon-s-promotion' @click='translateHandler' :loading='translating' :disabled='!hex.validString(question)') 提交
      li: el-button(icon='el-icon-refresh' @click='resetHandler') 重置
      li: el-tag(v-if='requestDuration') {{requestDuration}}s
    el-row(:gutter=16)
      el-col(:span=12)
        hot-table.hui-vskip(ref='rs' :settings='hotSettings')
        el-pagination(v-if='total>pageSize' small :total='total' :current-page='page' :page-size='pageSize' @current-change='handleCurrentChange' @size-change='handleSizeChange' background layout='total, prev, pager, next')
      el-col(:span=12)
        ace-editor.hui-vspace(v-if='sql' v-model='sql' mode='mysql' :style="{height: '300px'}")
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { HotTable } from '@handsontable/vue';
  import AceEditor from 'hui-vue/src/components/AceEditor';

  export default {
    data() {
      return {
        hotSettings: {
          data: [],
          height: 'auto',
          licenseKey: 'non-commercial-and-evaluation'
        },
        translating: false,
        requestDuration: null,
        sql: null,
        question: null,
        elapsed: 0,
        propList: [],
        dataList: [],
        page: 1,
        pageSize: 20,
        total: 0,
        data: [],
        loading: false
      };
    },

    components: { AceEditor, HotTable },

    computed: {
      ...mapState(['posts'])
    },

    methods: {
      ...mapActions('venus', ['sqlTranslate', 'executeQuery']),

      resetHandler() {
        this.question = null;
        this.requestDuration = null;
        this.sql = null;
        this.$refs.rs.hotInstance.updateSettings({
          colHeaders: [],
          data: []
        });
      },

      queryHandler() {
        this.loading = true;
        this.executeQuery({
          sql: this.sql,
          cb: d => {
            const { elapsed, propList, data } = d || {};
            this.elapsed = elapsed || 0;
            this.propList = propList || [];
            this.dataList = data || [];
            this.total = this.dataList.length;
            this.page = 1;
            this.sliceData();
            this.loading = false;
          }
        });
      },

      handleCurrentChange(page) {
        this.page = page;
        this.sliceData();
      },

      handleSizeChange(pageSize) {
        this.pageSize = pageSize;
        this.sliceData();
      },

      sliceData() {
        const start = Math.min(this.total, (this.page - 1) * this.pageSize);
        const end = Math.min(this.total, this.page * this.pageSize);
        this.data = this.dataList.slice(start, end);
        this.$refs.rs.hotInstance.updateSettings({
          colHeaders: this.propList,
          data: this.data
        });
      },

      translateHandler() {
        const currentTime = new Date().getTime();
        this.translating = true;
        this.sqlTranslate({
          question: this.question,
          cb: d => {
            this.sql = d.sql;
            this.translating = false;
            this.requestDuration = ((new Date().getTime() - currentTime) / 1000).toFixed(2);
            this.queryHandler();
          }
        });
      }
    }
  };
</script>
