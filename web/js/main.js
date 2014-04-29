$(document).ready(function() {

    var notificationTemplate = Hogan.compile('<div class="notification {{type}}">{{message}}');
    var showInputTemplate = Hogan.compile(
        '<li><input type="text" class="show" placeholder="{{placeholder}}"></li>'
    );
    var recommendationTemplate = Hogan.compile('<li>{{show}}</li>');

    for (var i = 0; i < 10; i++) {
        var placeholder = '';
        if (i === 0) {
            placeholder = 'E.g., Game of Thrones';
        }
        $('.shows-field').append(showInputTemplate.render({placeholder: placeholder}));
    };

    $('#username').blur(function() {
        $.ajax({
            type: 'POST',
            url: '/user',
            data: { 'user': $(this).val() },
            success: function(data) {
                $('.notifications').append(notificationTemplate.render({ message: data.message, type: 'success' }));
                cleanUpNotifications();
            },
            dataType: 'json'
        });
    });

    var inputShowBlur = function () {
        // $('.shows-field').append(showInputTemplate.render({placeholder: ''}));
        if ($(this).val() == '') {
            return;
        };
        $.ajax({
            type: 'POST',
            url: '/show',
            data: { user: $('#username').val(), show: $(this).val() },
            success: function (res) {
                $('.notifications').append(notificationTemplate.render({ message: res.message, type: 'success'}));
                cleanUpNotifications();
            },
            dataType: 'json'
        });
    };

    $('#get-button').click(function () {
        $.ajax({
            type: 'POST',
            url: '/recommend',
            data: { 'user': $('#username').val() },
            success: function(data) {
                $('#recommendations').show();
                $('#recommendations li').remove();
                for (var show in data) {
                    $('#recommendations ul').append(recommendationTemplate.render({ show: data[show] }));
                }
            }
        })
    });

    $(document).on('blur', 'input.show', inputShowBlur);
    $(document).on('click', '.notification', function () {
        $(this).hide();
    });

    function cleanUpNotifications() {
        if ($('.notifications .notification').length > 3) {
            $('.notifications .notification:first-child').remove();
        };
    }
});
