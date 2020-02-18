export const IssueAddItem = {
  data: () => ({
    user: window.user,
  }),
  template: `
<div>
  <div class="ui top attached header">
    <span class="text grey">
      <user-label :user="user.data"></user-label> wants to comment
    </span>
  </div>
  <div class="ui attached segment">
    <textarea></textarea>
    <button class="ui green button">comment</button>
  </div>
</div>
  `,
};
