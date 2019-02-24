$(function(){
  function buildHTML(message){
    var image = (message.image.url) ? `<img src = ${message.image.url}>` : "";
    var html = `<strong>
                  <div class = "message" data-message-id="${message.id}">
                    <div class = "upper-message">
                      <div class = "upper-message__user-name">
                        ${message.name}
                      </div>
                      <div class="upper-message__date">
                        ${message.date}
                      </div>
                    </div>
                    <div class = "lower-meesage">
                      <div class = "content">
                        ${message.content}
                      </div>
                      <div class = "image">
                        ${image}
                      </div>
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
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.chat-main__body').animate({ scrollTop: $(".messages")[0].scrollHeight });
      $('.footer__messagebox').reset('');
    })
    .fail(function(){
      alert('error');
    })
    return false
  })
})
