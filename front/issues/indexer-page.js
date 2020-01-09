import { getFromApi } from "../api.mjs";

export const IssueIndexerPage = {
  props: ['branch'],
  data: function () {
    return {
      loading: true,
      obj: [],
    };
  },
  mounted: async function () {
    const res = await getFromApi(`byPath/${this.branch}/.issues`);
    this.loading = false;
    this.obj = res;
  },
  template:
    `<div :key="branch">
  <header-root :branch="branch" selectedTab="issues"></header-root>
  <div class="ui container">
    <div v-if="loading">loading</div>
    <div class="issue list" v-if="!loading && obj.type === 'tree'">
      <li class="item" v-for="x in obj.data">
        <div class="ui white label">#{{x.name}}</div>
        <a class="title has-emoji" href="/gitea/go-sdk/issues/187">Add CRUD methods for repository files</a>
        <a class="ui label has-emoji"
          href="/gitea/go-sdk/issues?q=&amp;type=all&amp;state=open&amp;labels=408&amp;milestone=0&amp;assignee=0"
          style="color: #fff; background-color: #006b75" title="">kind/feature</a>
        <p class="desc">
          opened <span class="time-since poping up" title="" data-content="Wed, 14 Aug 2019 15:31:56 UTC"
            data-variation="inverted tiny">4 months ago</span> by <a href="/mavogel">mavogel</a>
        </p>
      </li>
    </table>
  </div>
</div>`
}