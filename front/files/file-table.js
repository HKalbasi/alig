import { getFromApi } from "../api.mjs";

export const FileTable = {
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
  <table v-if="!loading" class="ui single line table">
    <tbody>
      <tr v-for="x in data">
        <td>
          <router-link :to="'/master/'+x.name">
          {{x.name}}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  
</div>
`
}