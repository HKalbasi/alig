const template = `<div class="header-wrapper">
	<div class="ui container">
		<div class="ui huge breadcrumb repo-title">

			<i class="mega-octicon octicon-repo"></i>

			<a href="/"> {{ window.projectName }} </a>

			<div class="ui stackable secondary menu mobile--margin-between-items mobile--no-negative-margins">
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

						<button class="ui basic clone button blue" id="repo-clone-https"
							data-link="https://gitea.com/gitea/go-sdk.git">
							HTTPS
						</button>



						<input id="repo-clone-url" value="https://gitea.com/gitea/go-sdk.git" readonly="">


						<button class="ui basic icon button poping up clipboard" id="clipboard-btn" data-original="Copy"
							data-success="Link has been copied" data-error="Use ⌘C or Ctrl-C to copy" data-content="Copy"
							data-variation="inverted tiny" data-clipboard-target="#repo-clone-url">
							<i class="octicon octicon-clippy"></i>
						</button>

						<div class="ui basic jump dropdown icon button poping up" data-content="Download Repository"
							data-variation="tiny inverted" data-position="top right" tabindex="0">
							<i class="download icon"></i>
							<div class="menu hidden transition" tabindex="-1">
								<a class="item" href="/gitea/go-sdk/archive/master.zip" tabindex="-1"><i
										class="octicon octicon-file-zip"></i> ZIP</a>
								<a class="item" href="/gitea/go-sdk/archive/master.tar.gz" tabindex="-1"><i
										class="octicon octicon-file-zip"></i> TAR.GZ</a>
							</div>
						</div>
					</div>

				</div>
			</div>

		</div>
	</div>
	<header-tabs :selectedTab="selectedTab" :branch="branch"></header-tabs>
</div>`;

const props = ['projectName', 'branch', 'selectedTab'];

export const HeaderRoot = {
  template,
  props,
};