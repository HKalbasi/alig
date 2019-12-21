import { getFromApi } from "../api.mjs";

export const FilePage = {
  props: ['commit'],
  data: function() {
    return {
      loading: true,
      data: [],
    };
  },
  mounted: async function () {
    console.log('salam');
    const res = await getFromApi('byPath/master');
    console.log(res);
    this.loading = false;
    this.data = res.data;
  },
  template:
`<div>
  <div v-if="loading">loading</div>
  <div v-if="!loading">
    <div v-for="x in data">
      {{x.name}}
    </div>
  </div>
  
</div>
`
}