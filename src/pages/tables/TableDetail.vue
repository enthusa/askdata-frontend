<template lang='pug'>
  section
    hot-table.hui-vskip(ref='rs' :settings='hotSettings')
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import { HotTable } from '@handsontable/vue';

  export default {
    data() {
      return {
        hotSettings: {
          data: [],
          height: 'auto',
          licenseKey: 'non-commercial-and-evaluation'
        },
        elapsed: 0,
        propList: [],
        dataList: []
      };
    },

    components: { HotTable },

    computed: {
      ...mapState(['tables'])
    },

    methods: {
      ...mapActions('tables', ['getInstanceById']),
      ...mapActions('venus', ['executeQuery']),

      initialize() {
        const { id } = this.$route.params;
        this.getInstanceById({
          id, cb: ({ catalog, name }) => {
            const sql = `select * from ${catalog}.${name} limit 10`;
            this.executeQuery({
              sql,
              cb: d => {
                const { elapsed, propList, data } = d || {};
                this.elapsed = elapsed || 0;
                this.propList = propList || [];
                this.dataList = data || [];
                this.$refs.rs.hotInstance.updateSettings({
                  colHeaders: propList || [],
                  data: data || []
                });
              }
            });
          }
        });
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
