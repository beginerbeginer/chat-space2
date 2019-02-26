// $(function(){
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
      $('.messages').animate({ scrollTop: $(".messages")[0].scrollHeight },'fast');
      $('#new_message')[0].reset();
      $('input').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  });
  var auto_reload = setInterval( function() {
    var url = location.pathname;
    var messageId = $('.message').last().data('message-id');
    console.log(url)
    $.ajax({
      url: url,
      type: 'GET',
      data: { id: messageId},
      dataType: 'json'
    })
    .done(function(messages) {
        var html = buildSendMessageHTML(message);
        $('.messages').append(html);
        $('.chat-main__body').animate({ scrollTop: $(".messages")[0].scrollHeight }, 'fast');
        $('#new_message').val();
    });
  }, 5000 );
});
