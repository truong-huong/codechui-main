$(document).ready (
  function() {
      $('.cancel-comment').click(
          function() {
              $(".comment-form-reply").hide()
          }
      )
      $("[data-click=reply]").each(function() {
          $(this).on("click", function(t) {
              t.preventDefault(), $("#comment-editor")[0].src = $(this).attr("data-href"), $(this).parent().parent().next().append($(".comment-form-reply")[0]), $(".comment-form-reply").show()
          })
      });

      $(document).on('scroll',function() {
            if ( check( $('iframe[data-comment]')) ) {
                $('#enter-comment-form')[0].src = $('iframe[data-comment]').attr("data-comment");
                $('iframe[data-comment]').removeAttr('data-comment');
            }
            $('img[data-image]').each(function() {
               if (check($(this))) {
                   $(this).attr('src', $(this).attr('data-image')).removeAttr('data-image');
               }
           });
      })
  
  }
)