/* eslint-disable immutable/no-mutation */
/* eslint-disable toplevel/no-toplevel-side-effect */
import VueRouter from "vue-router";
import Vue from "vue";
import { HeaderRoot } from "./header/header-root.js";
import { HeaderTabs } from "./header/header-tabs.js";
import { FileTable } from "./files/file-table.js";
import { FilePage } from "./files/file-page.js";
import { IssueIndexerPage } from "./issues/indexer-page.js";
import { IssuePage } from "./issues/issue-page.js";
import { timeByNow } from "./util/time-by-now.js";
import { getToken } from "../plugins/auth/client.mjs";

Vue.use(VueRouter);
Vue.component('header-root', HeaderRoot);
Vue.component('header-tabs', HeaderTabs);
Vue.component('file-table', FileTable);
Vue.component('file-page', FilePage);
Vue.component('issue-indexer-page', IssueIndexerPage);
Vue.component('issue-page', IssuePage);
Vue.component('time-by-now', timeByNow);

window.pathJoin = (x) => x.join('/').replace(/\/+/g, '/');

const p404 = {
  template: '<div> 404 not found </div>',
};
const home = {
  template:
`
<file-page branch="master" path=""></file-page>
`,
};

const BranchHome = {
  template: `
<file-page :branch="$route.params.branch" :path="$route.params.path || ''">
</file-page>`,
};

const IssueHome = {
  template: `
  <issue-indexer-page :branch="$route.params.branch"></issue-indexer-page>
  `,
};

const IssueItem = {
  template: `
  <issue-page :branch="$route.params.branch" :issue="$route.params.id"></issue-page>
  `,
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
  { path: '/:branch/issues/:id', component: IssueItem },
  { path: '*', component: p404 },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  mode: 'history',
  routes,
});

window.projectName = 'alig';
window.cloneURL = `${window.location.protocol}//${window.location.host}/${window.projectName}.git`;
window.atobUTF8 = (sBase64) => {
  return Buffer.from(sBase64, 'base64').toString('UTF8');
};
window.timeToTextByNow = (x) => {
  const prettyDate = (date, startDate) => {
    const secs = Math.floor((date.getTime() - startDate.getTime()) / 1000);
    if (secs < 60) return secs + " second ago";
    if (secs < 3600) return Math.floor(secs / 60) + " minute ago";
    if (secs < 86400) return Math.floor(secs / 3600) + " hour ago";
    if (secs < 604800) return Math.floor(secs / 86400) + " day ago";
    return startDate.toLocaleDateString();
  };
  return prettyDate(new Date(), x);
};

window.getToken = getToken;

new Vue({
  router,
}).$mount('#app');

// Now the app has started!
