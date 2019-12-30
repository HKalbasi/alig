export const HeaderTabs = {
  props: ['selectedTab', 'branch'],
  methods: {
    tabCss: function(id) {
      return (this.selectedTab === id ? 'active ' : '') + 'item';
    },
  },
  template: `<div>
	<div class="ui container">
		<div class="ui tabular stackable menu navbar" style="border-bottom:none">

			<router-link :to="'/'+branch+'/file/'" :class="tabCss('file')">
				Code
			</router-link>


			<router-link :to="'/'+branch+'/issues/'" :class="tabCss('issues')">
				Issues / Merge requests <span class="ui blue small label">13</span>
			</router-link>


			<a :class="tabCss('release')" href="/gitea/go-sdk/releases">
				<i class="octicon octicon-tag"></i> Releases <span class="ui gray small label">0</span>
			</a>

			<a :class="tabCss('wiki')" href="/gitea/go-sdk/wiki">
				<i class="octicon octicon-book"></i> Wiki
			</a>

			<a :class="tabCss('activity')" href="/gitea/go-sdk/activity">
				<i class="octicon octicon-pulse"></i> Activity
			</a>




		</div>
	</div>
	<div class="ui tabs divider" style="margin-top:0; margin-bottom:20px;"></div>
</div>`,
}