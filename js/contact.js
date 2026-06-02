$(function() {

    // 처음에 sub 숨김
    $(".sub").hide();

    // .text_boxx 클릭 시 토글
    $(".text_boxx").click(function() {
        $(this).next(".sub").slideToggle(300);
    });

});