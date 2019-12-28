export const FilePage = {
  props: ['branch', 'path'],
  template: 
`<div :key="branch+'/'+path">
  <tab-header :branch="branch" selectedTab="file"></tab-header>
  <div class="ui container">
    <file-table :branch="branch" :path="path"></file-table>
  </div>
</div>
`
};