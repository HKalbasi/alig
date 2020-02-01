/* eslint-disable immutable/no-this */
/* eslint-disable func-names */
export const timeByNow = {
  props: ['time'],
  data: () => ({
    show: false,
  }),
  mounted: function () {
    console.log(this.time);
  },
  template: `<span @mouseover="show = true"
  @mouseleave="show = false" class="pop-up-container">
    <span v-if="show" class="pop-up">{{(new Date(time)).toLocaleString()}}</span>
    {{window.timeToTextByNow(new Date(time))}}
  </span>`,
};
