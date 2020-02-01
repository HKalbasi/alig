import { getFromApi } from "../api.mjs";
import YAML from "yaml";

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
    await Promise.all(res.map(async (x, i) => {
      const yaml = window.atobUTF8((await getFromApi(`byPath/${this.branch}/.issues/${x.name}`)).data);
      const json = YAML.parse(yaml);
      console.log(json);
      this.$set(this.obj, i, {
        loading: false,
        id: x.name,
        meta: json.head,
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
        <div v-if="!x.loading">
          <div class="ui white label">#{{x.id}}</div>  
          <router-link :to="x.id">
            <a class="title">{{x.meta.title}}</a>
          </router-link>
          <p class="desc">
            opened <span class="time-since poping up" title="" data-content="Wed, 14 Aug 2019 15:31:56 UTC"
              data-variation="inverted tiny">4 months ago</span> by 
            {{x.meta.author.name}}&lt;{{x.meta.author.email}}&gt;
          </p>
        </div>
        <div v-else>
          <div class="ui white label">#{{x.id}}</div>
          loading...
        </div>
      </li>
    </table>
  </div>
</div>`,
};
