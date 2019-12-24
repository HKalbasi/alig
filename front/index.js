import VueRouter from "vue-router";
import Vue from "vue";
import { TabHeader } from "./tab-header.js";
import { FileTable } from "./files/file-page.js";

Vue.use(VueRouter);
Vue.component('tab-header', TabHeader);
Vue.component('file-table', FileTable);

const p404 = {
  template: '<div> 404 not found </div>'
};
const home = {
  template: 
`
<div> 
  <tab-header></tab-header> 
  <div class="ui container">
    <file-table commit="x"></file-table>
  </div>
</div>
`,
};

const tree = {
  template: '<div> here is file {{$route.params.path}} </div>',
};

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// `Vue.extend()`, or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: home },
  { path: '/tree/:path*', component: tree },
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

const app = new Vue({
  router
}).$mount('#app')

// Now the app has started!