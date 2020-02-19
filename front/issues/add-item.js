/* eslint-disable immutable/no-this */
export const IssueAddItem = {
  data: () => ({
    user: window.user,
    textareaText: 'Enter comment here',
  }),
  methods: {
    sendItem() {
      this.$emit('add-item', {
        type: 'comment',
        text: this.textareaText,
      });
    },
  },
  template: `
<div>
  <div class="ui top attached header">
    <span class="text grey">
      <user-label :user="user.data"></user-label> wants to comment
    </span>
  </div>
  <div class="ui attached segment">
    <textarea v-model="textareaText"></textarea>
    <button class="ui green button" @click="sendItem">comment</button>
  </div>
</div>
  `,
};
