// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
// You can use CoffeeScript in this file: http://coffeescript.org/

var eventHandlers = function() {

    var prev_tag_form;

    $(".add-tag").click(function(clickEvent) {
        var id = $(clickEvent.target).data("comment-id");
        var form = $("#new-tag-" + id);
        if (form.is(":visible")) {
            form.hide();
            prev_tag_form = null;
        } else {
            form.show();
            if(prev_tag_form != null){
              prev_tag_form.hide();
            }
            prev_tag_form = form;
        }
    });

    var prev_form, prev_comment, prev_target;

    $(".edit-comment").click(function(clickEvent) {
      var id = $(clickEvent.target).data("edit-comment-id");
      var form = $("#edit-comment-" + id);
      var comment = $("#comment-" + id);
      if(form.is(":visible")) {
        form.hide();
        comment.show();
        // clickEvent.target.innerText = "Edit";
        prev_form = null;
        prev_comment = null;
        prev_target = null;
      } else {
        form.show();
        comment.hide();
        // clickEvent.target.innerText = "Cancel";
        if(prev_form != null){
          prev_form.hide();
          prev_comment.show();
          // prev_target.innerText = "Edit"
        }
        prev_form = form;
        prev_comment = comment;
        prev_target = clickEvent.target;
      }
    });

    $(".add-reply").click(function(clickEvent) {
        var id = $(clickEvent.target).data("comment-id");
        var form = $("#new-reply-" + id);
        if (form.is(":visible")) {
            form.hide();
        } else {
            form.show();
        }
    });
}

$(document).on("page:change", eventHandlers);
