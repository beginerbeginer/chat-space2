

$(document).on('turbolinks:load', function() {

  var user_search_list = $("#user-search-result");
  var member_list = $("#chat-group-users");

  function appendUser(user) {
     var html = `<div class="chat-group-user clearfix">
                   <p class="chat-group-user__name">${user.name}</p>
                   <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                 </div>`
     user_search_list.append(html);
  }

  function appendNoUser(notice) {
    var html = `<div class="chat-group-user clearfix">
                  ${ notice }
                </div>`
    user_search_list.append(html);
  }

  function buildUser(id, name) {
     var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                   <input name='group[user_ids][]' type='hidden' value='${id}'>
                   <p class='chat-group-user__name'>${name}</p>
                   <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
       member_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    var preInput = ''

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      user_search_list.empty();
      if (preInput !== input && users.length !== 0) {
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendNoUser("一致するユーザーはいません");
      }
    })

    .fail(function(){
        alert('ユーザー検索に失敗しました');
    });
  });

  $(document).on('click', ".user-search-add", function() {
      var id = $(this).data('user-id');
      var name = $(this).data('user-name');
      $(this).parent().remove();
      buildUser(id, name);
  });

  $(document).on('click', ".user-search-remove", function() {
    $(this).parent().remove();
  });
});
