import { getFromApi } from "../api.mjs";
import YAML from "yaml";
import markdownBuilder from "markdown-it";
const markdown = new markdownBuilder();

export const IssuePage = {
  props: ['branch', 'issue'],
  data: function () {
    return {
      loading: true,
      meta: {},
      body: {},
    };
  },
  mounted: async function () {
    const yaml = window.atobUTF8((
      await getFromApi(`byPath/${this.branch}/.issues/${this.issue}`)
		).data);
		const json = YAML.parse(yaml);
		console.log(json);
		console.log(markdown);
    this.meta = json.head;
    this.body = json.body.map(x => ({
			...x,
			time: new Date(x.time),
			text: markdown.render(x.text),
		}));
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
					<div class="ui red large label"><i class="octicon octicon-issue-closed"></i> Closed</div>
					<span class="time-desc">
						opened <span class="time-since poping up" title="" data-content="Mon, 06 Jan 2020 01:15:25 UTC"
							data-variation="inverted tiny">1 week ago</span> by <a href="/6543">6543</a>
						·
						0 comments
					</span>
				</div>
			</div>
			<div class="ui divider"></div>
			<div class="twelve wide column timeline">
				<div class="comment" v-for="x in body">

					<div class="content">
						<div class="ui top attached header">

							<span class="text grey">
								{{x.author.name}}&lt;{{x.author.email}}&gt; commented
								{{window.timeToTextByNow(x.time)}}
							</span>
						</div>

					</div>
					<div class="ui attached segment">
						<div v-html="x.text" class="render-content markdown has-emoji">
						</div>
					</div>

				</div>
			</div>
		</div>
	</div>
</div>`
}