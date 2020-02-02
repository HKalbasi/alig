/* eslint-disable immutable/no-mutation */
/* eslint-disable immutable/no-this */
/* eslint-disable func-names */
import { getFromApi } from "../api.mjs";
import YAML from "yaml";
import Markdown from "markdown-it";
const markdown = new Markdown();

export const IssuePage = {
  props: ['branch', 'issue'],
  data: () => ({
    loading: true,
    meta: {},
    body: {},
  }),
  mounted: async function () {
    const yaml = window.atobUTF8((
      await getFromApi(`byPath/${this.branch}/.issues/${this.issue}`)
    ).data);
    const json = YAML.parse(yaml);
    console.log(json);
    console.log(markdown);
    this.meta = json.head;
    this.body = json.body.map(x => x.type === 'comment' ? ({
      ...x,
      text: markdown.render(x.text),
    }) : (x));
    this.loading = false;
  },
  template: `<div>
  <header-root :branch="branch" selectedTab="issues"></header-root>
  <div class="ui container">
    <div v-if="loading" class="repository view issue">
      <div class="sixteen wide column title">
        <div class="ui grid">
          <h1 class="twelve wide column">
            <span class="index">#{{issue}}</span>
            <span id="issue-title">loading...</span>
          </h1>
        </div>
      </div>
    </div>
    <div v-else class="repository view issue">
      <div class="sixteen wide column title">
        <div class="ui container">
          <div class="ui grid">
            <h1 class="twelve wide column">
              <span class="index">#{{issue}}</span>
              <span id="issue-title">{{meta.title}}</span>
            </h1>
          </div>
          <div v-if="meta.status==='closed'" class="ui red large label">
            Closed
          </div>
          <div v-else class="ui green large label">
            Open
          </div>
          <span class="time-desc">
            opened <time-by-now :time="meta.time"></time-by-now>
            by {{meta.author.name}}&lt;{{meta.author.email}}&gt;
            ·
            {{body.length}} comments
          </span>
        </div>
      </div>
      <div class="ui divider"></div>
      <div class="twelve wide column timeline">
        <div class="comment" v-for="x in body">

          <div v-if="x.type === 'comment'">
            <div class="content">
              <div class="ui top attached header">

                <span class="text grey">
                  {{x.author.name}}&lt;{{x.author.email}}&gt; commented
                  <time-by-now :time="x.time"></time-by-now>
                </span>
              </div>

            </div>
            <div class="ui attached segment">
              <div v-html="x.text" class="render-content markdown has-emoji">
              </div>
            </div>
          </div>
          <div v-if="x.type==='event'" class="event">
            <span class="octicon octicon-circle-slash issue-symbol"></span>
            <span class="text grey">
              {{x.author.name}}&lt;{{x.author.email}}&gt; closed this
              <time-by-now :time="x.time"></time-by-now>
            </span>
          </div>
          <div v-if="x.type==='merge-request'">
            <div class="ui attached segment">
              {{x.author.name}}&lt;{{x.author.email}}&gt;
              wants to merge
              {{x.from}} to {{x.to}}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
};
