$(document).ready(function(){
    $('#followButton').on('click', function(){
        toggleFollow();
    });
});

function toggleFollow() {
    var button = $("#followButton");
    if (button.text() === "Follow") {
        button.text("Unfollow");
    } else {
        button.text("Follow");
    }
}
