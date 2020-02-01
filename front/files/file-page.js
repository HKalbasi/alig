export const FilePage = {
  props: ['branch', 'path'],
  template:
`<div :key="branch+'/'+path">
  <header-root :branch="branch" selectedTab="file"></header-root>
  <div class="ui container">
    <file-table :branch="branch" :path="path"></file-table>
  </div>
</div>
`,
};
