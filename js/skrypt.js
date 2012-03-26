/*globals $: false,
 document: false */
$(document).on("click", "#answerBlock li", function () {
    'use strict';
    if ($(this).attr('class') === 'answer') {
        $("#answerBlock .answerChecked").attr('class', 'answer');
        $(this).attr('class', 'answerChecked');
        $(this).children(":first").attr('checked', true);
    } else {
        $(this).attr('class', 'answer');
        $(this).children(":first").attr('checked', false);
    }
});
$(document).on("mouseover", "#answerBlock li", function () {
    'use strict';
    $('#1').text($(this).attr('class'));
});
$(document).on("mouseout", "#answerBlock li", function () {
    'use strict';
    $('#1').text($(this).attr('class'));
});
