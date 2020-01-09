import { getFromApi } from "../api.mjs";

export const FileTable = {
  props: ['branch', 'path'],
  data: function() {
    return {
      loading: true,
      obj: [],
    };
  },
  mounted: async function () {
    const res = await getFromApi(`byPath/${this.branch}/${this.path}`);
    this.loading = false;
    this.obj = res;
  },
  template:
`<div>
  <div v-if="loading">loading</div>
  <table v-if="!loading && obj.type === 'tree'" class="ui single line table">
    <tbody>
      <tr v-for="x in obj.data">
        <td>
          <router-link :to="'/'+window.pathJoin([branch,'file',path,x.name])">
          {{x.name}}
          </router-link>
        </td>
      </tr>
    </tbody>
  </table>
  <div v-if="!loading && obj.type === 'blob'" class="ui existing segment">
    <div class="ui top attached label">{{path}}</div>
    <pre>{{window.atobUTF8(obj.data)}}</pre>
  </div>
</div>
`
}