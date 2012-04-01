/*globals $: false,
  document: false,
  setInterval: false */
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

function dodajZero(liczba) {
    'use strict';
    if (liczba < 10) {
        return "0" + liczba.toString();
    }
    return liczba;
}

$(document).ready(function () {
    'use strict';
    var futureDate = new Date("March 27, 2012 01:00:00 GMT+2"),
        futureTime = futureDate.getTime();
    setInterval(function () {
        var now = new Date(),
            timeLeft = Math.floor((futureTime - now.getTime()) / 1000);
        $(".sec").text(dodajZero(timeLeft % 60));
        timeLeft = Math.floor(timeLeft / 60);
        $(".min").text(dodajZero(timeLeft % 60));
        timeLeft = Math.floor(timeLeft / 60);
        $(".hours").text(dodajZero(timeLeft % 24));
         timeLeft = Math.floor(timeLeft / 24);
        $(".days").text(dodajZero(timeLeft));
        $(".currentTime").text(now.toString());
        $(".endTime").text(futureDate.toString());
    }, 1000);
});

$(document).on("mouseover", "#answerBlock li", function () {
    'use strict';
    $('#1').text($(this).attr('class'));
});
$(document).on("mouseout", "#answerBlock li", function () {
    'use strict';
    $('#1').text($(this).attr('class'));
});
