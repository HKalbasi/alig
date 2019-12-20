const template = 
/*html*/`
<div class="header-wrapper">

<div class="ui tabs container">
  <div class="ui huge breadcrumb repo-title">
          
  <i class="mega-octicon octicon-repo"></i>

  <a href="/"> {{ window.projectName }} </a>

  </div>
    <div class="ui tabular stackable menu navbar" style="border-bottom:none">
      
      <a class="active item" href="/gitea/go-sdk">
        <i class="octicon octicon-code"></i> Code
      </a>
      

      
        <a class=" item" href="/gitea/go-sdk/issues">
          <i class="octicon octicon-issue-opened"></i> Issues <span class="ui blue small label">13</span>
        </a>
      

      

      
        <a class=" item" href="/gitea/go-sdk/pulls">
          <i class="octicon octicon-git-pull-request"></i> Pull Requests <span class="ui blue small label">10</span>
        </a>
      

      
      <a class=" item" href="/gitea/go-sdk/releases">
        <i class="octicon octicon-tag"></i> Releases <span class="ui gray small label">0</span>
      </a>
      

      
        <a class=" item" href="/gitea/go-sdk/wiki">
          <i class="octicon octicon-book"></i> Wiki
        </a>
      

      
        <a class=" item" href="/gitea/go-sdk/activity">
          <i class="octicon octicon-pulse"></i> Activity
        </a>
      

      

      
    </div>
  
</div>
<div class="ui tabs divider" style="margin-top:0; margin-bottom:20px;"></div>
</div>
`;

const props = ['projectName'];

export const TabHeader = {
  template,
  props,
};