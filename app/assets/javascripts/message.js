$(document).on('turbolinks:load', function() {
  function buildSendMessageHTML(message){
    var image = (message.image.url) ? `<img src = ${message.image.url} class: "lower-message__image">` : "";
    var html = `<strong>
                  <div class = "message" data-message-id="${message.id}">
                    <div class = "upper-message">
                      <div class = "upper-message__user-name">
                        ${message.user_name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                      <p class="lower-message__content">
                        ${message.content}
                      </p>
                      ${image}
                    </div>
                  </div>
                </strong>`
  return html;
  }

  function scroll() {
    $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight})
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildSendMessageHTML(message);
      $('.messages').append(html);
      $('#new_message')[0].reset();
    })
    .fail(function(){
      alert('error');
    })

    .always(function() {
      $(".submit").prop( 'disabled', false )
    })
  })


  $(function() {
    var interval = setInterval(update, 5000)

    function update() {
      if (location.href.match(/\/groups\/\d+\/messages/)) {
        var lastMessageId = $('.messages:last').data('message-id');
        $.ajax({
          url: location.href,
          type: "GET",
          data: { id: lastMessageId },
          dataType: 'json'
        })

        .done(function(data) {
          var insertHTML = '';
          data.forEach(function(message){
            insertHTML += buildSendMessageHTML(message);
            $('.messages').append(insertHTML);
            scroll()
          })
        })

        .fail(function(data) {
          alert('自動更新に失敗しました');
        })
      }
      else {
        clearInterval(interval);
      }
    }
  });
});
