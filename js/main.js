$(function () {
    $(".create").on('click', Create);
    $('.clear').click(function () {
        $('td').css('background', 'rgba(255,255,255,0)');
    });

    $('table').on({
        mouseenter: function () {
            var $this = $(this);
            var mode = $('#mode').val();
            $this.removeClass('transition');
            var colour = "rgba(255,255,255,1)";
            $(this).removeClass('transition');
            switch (mode) {
                case 'normal':
                    break;
                case 'random':
                    var r = Math.round(255 * Math.random());
                    var g = Math.round(255 * Math.random());
                    var b = Math.round(255 * Math.random());
                    colour = 'rgba(' + r + ',' + g + ',' + b + ',1)';
                    break;
                case 'opacity':
                    var clr = $this.css('background-color');
                    clr = clr.replace('rgba(', '');
                    clr = clr.replace(')', '');
                    var arr = clr.split(',');
                    var a;
                    if (arr[0] != 255 || arr[1] != 255 || arr[2] != 255) {
                        a = 0;
                    }
                    else {
                        var a = Number(arr[3]);
                        if (a != 1) {
                            a += 0.2;
                        }
                    }
                    colour = 'rgba(255,255,255,' + a + ')';
                    break;
                case 'trace':
                    break;
                default:
                    break;
            }
            $this.css('background', colour);
        },
        mouseleave: function () {
            var $this = $(this);
            var mode = $('#mode').val();
            if (mode == 'trace') {
                $this.addClass('transition');
                $this.css('background', 'rgba(255,255,255,0)');
            }
        }
    }, 'td');
});

function Create() {
    var result = prompt("Enter number of columns (<32): ", 15);
    if (result == null || result > 32) {
        return;
    }
    var availableHeight = $(window).height() - $('.button-container').height() - 20; // margin of conatiner
    var availableWidth = $(window).width;
    var side = (availableHeight > availableWidth) ? availableWidth : availableHeight;
    var size = Math.floor(side / result) - 2; // subtract border

    $('table').empty();
    var html = "";
    for (var i = 0; i < result; ++i) {
        html += "<tr>";
        for (var j = 0; j < result; ++j) {
            html += "<td></td>";
        }
        html += "</tr>";
    }
    $('table').append(html);
    $('td').css('height', size + 'px');
    $('td').css('width', size + 'px');

    while ($('table').height() > side) {
        size -= 1;
        $('td').css('height', size + 'px');
        $('td').css('width', size + 'px');
    }
}