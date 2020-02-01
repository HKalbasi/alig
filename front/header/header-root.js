const template = `<div class="header-wrapper">
	<div class="ui container">
		<div class="ui huge breadcrumb repo-title">

			<i class="mega-octicon octicon-repo"></i>

			<a href="/"> {{ window.projectName }} </a>

			<div class="ui container stackable secondary menu mobile--margin-between-items mobile--no-negative-margins">
				<div class="fitted item choose reference">
					<div data-can-create-branch="false" data-no-results="No results found."
						class="ui floating filter dropdown custom">
						<div class="ui basic small compact button"><span class="text"><i class="octicon octicon-git-branch"></i>
								Branch:
								<strong>master</strong></span> <i tabindex="0" class="dropdown icon">
								<div tabindex="-1" class="menu"></div>
							</i></div>
						<!---->
					</div>
				</div>

				<div class="right fitted item" id="file-buttons">
					<div class="ui tiny blue buttons"></div>

				</div>
				<div class="fitted item"></div>
				<div class="fitted item">



					<div class="ui action tiny input" id="clone-panel">

						<input id="repo-clone-url" :value="window.cloneURL" readonly="">

            <button @click="Clipboard.writeText(window.cloneURL)" class="ui basic icon button poping up clipboard">
             COPY
						</button>
					</div>

				</div>
			</div>

		</div>
	</div>
	<header-tabs :selectedTab="selectedTab" :branch="branch"></header-tabs>
</div>`;

const props = ['branch', 'selectedTab'];

export const HeaderRoot = {
  template,
  props,
};
