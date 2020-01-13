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
    const res = (await getFromApi(`byPath/${this.branch}/.issues`)).data;
    this.loading = false;
    this.obj = res.map(x => ({
      loading: true,
      id: x.name,
    }));
    console.log(this.obj);
    await Promise.all(res.map(async (x,i) => {
      const all = window.atobUTF8((await getFromApi(`byPath/${this.branch}/.issues/${x.name}`)).data);
      this.$set(this.obj, i , {
        loading: false,
        id: x.name,
        text: all,
      });
    }));
  },
  template:
    `<div :key="branch">
  <header-root :branch="branch" selectedTab="issues"></header-root>
  <div class="ui container">
    <div v-if="loading">loading</div>
    <div class="issue list" v-else>
      <li class="item" v-for="x in obj">
        <div v-if="x.loading">
          <div class="ui white label">#{{x.id}}</div>
          <a class="title has-emoji" href="/gitea/go-sdk/issues/187">Add CRUD methods for repository files</a>
          <a class="ui label has-emoji"
            href="/gitea/go-sdk/issues?q=&amp;type=all&amp;state=open&amp;labels=408&amp;milestone=0&amp;assignee=0"
            style="color: #fff; background-color: #006b75" title="">kind/feature</a>
          <p class="desc">
            opened <span class="time-since poping up" title="" data-content="Wed, 14 Aug 2019 15:31:56 UTC"
              data-variation="inverted tiny">4 months ago</span> by <a href="/mavogel">mavogel</a>
          </p>
        </div>
        <div v-else>
          <div class="ui white label">#{{x.id}}</div>
          <div>{{x.text}}</div>
        </div>
      </li>
    </table>
  </div>
</div>`
}