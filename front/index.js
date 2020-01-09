import VueRouter from "vue-router";
import Vue from "vue";
import { HeaderRoot } from "./header/header-root.js";
import { HeaderTabs } from "./header/header-tabs.js";
import { FileTable } from "./files/file-table.js";
import { FilePage } from "./files/file-page.js"; 
import { IssueIndexerPage } from "./issues/indexer-page.js";

Vue.use(VueRouter);
Vue.component('header-root', HeaderRoot);
Vue.component('header-tabs', HeaderTabs);
Vue.component('file-table', FileTable);
Vue.component('file-page', FilePage);
Vue.component('issue-indexer-page', IssueIndexerPage);

window.pathJoin = (x) => x.join('/').replace(/\/+/g,'/');

const p404 = {
  template: '<div> 404 not found </div>'
};
const home = {
  template: 
`
<file-page branch="master" path=""></file-page>
`,
};

const tree = {
  template: '<div> here is file {{$route.params.path}} </div>',
};

const BranchHome = {
  template: `
<file-page :branch="$route.params.branch" :path="$route.params.path || ''">
</file-page>`,
};

const IssueHome = {
  template: `
  <issue-indexer-page :branch="$route.params.branch"></issue-indexer-page>
  `
};

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: home },
  { path: '/:branch/file/:path*', component: BranchHome },
  { path: '/:branch/issues/', component: IssueHome },
  { path: '*', component: p404 },
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes,
})

window.projectName = 'alig';
window.cloneURL = `${window.location.protocol}//${window.location.host}/${window.projectName}.git`;
window.atobUTF8 = (sBase64) => {
	return Buffer.from(sBase64,'base64').toString('UTF8');
};

const app = new Vue({
  router
}).$mount('#app')

// Now the app has started!