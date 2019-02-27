$(document).on('turbolinks:load', function() {

  function appendUser(user) {
     var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                 </div>`;
      return html;
  }
  function buildUser(id, name) {
     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value='${id}'>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`;
      return html;
  }

  $(document).on("keyup", "#user-search-field", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
       var search = "";
       users.forEach(function(user){
         var html = appendUser(user);
         search =  search + html;
       });
       $(".user-search-result").html(search);
    })
    .fail(function(){
        alert('ユーザー検索に失敗しました');
    });
  });

  $(".chat-group-form").on('click', ".user-search-add", function() {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      var html = buildUser(id, name);
      $('.chat-group-users').append(html);
      var user = $(this).parent();
      user.remove();
  });

  $(".chat-group-form").on('click', ".user-search-remove", function() {
      var user = $(this).parent();
      user.remove();
  });
});
