/* eslint-disable immutable/no-this */
/* eslint-disable func-names */
export const UserLabel = {
  props: ['user'],
  data: () => ({
    show: false,
  }),
  mounted: function () {
    console.log(this.time);
  },
  template: `<span @mouseover="show = true"
  @mouseleave="show = false" class="pop-up-container">
    <span v-if="show" class="pop-up">{{user.email}}</span>
    {{user.name}}
  </span>`,
};
