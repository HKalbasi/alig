export const IssuePage = {
  props: ['branch', 'issue'],
  template: `<div>
	<header-root :branch="branch" selectedTab="issues"></header-root>
	<div class="repository view issue">
		<div class="sixteen wide column title">
			<div class="ui container">
				<div class="ui grid">
					<h1 class="twelve wide column">
						<span class="index">#{{issue}}</span>
						<span id="issue-title">times: delete times / reset times on
							issue</span>
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
	</div>
</div>`
}