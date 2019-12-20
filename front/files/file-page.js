export const FilePage = {
  props: ['commit'],
  data: function() {
    return {
      loading: false,
      data: ['boz', 'gav'],
    }
  },
  template:
`<div>
  <div v-if="loading">loading</div>
  <div v-if="!loading">
    <div v-for="x in data">
      {{x}}
    </div>
  </div>
  
</div>
`
}