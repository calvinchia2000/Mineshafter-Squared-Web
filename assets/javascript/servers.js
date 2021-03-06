var server = null;

$(document).ready(init);

function init() {
    server = new Server($('#server-data').data('json'), true);
    $('#update-server').on('click', saveServer);
    
    
    setTimeout(update, 300000);
}

function update() {
    server.getStatus();
    setTimeout(update, 300000);
}

function saveServer() {
    $('#serverlist-error').fadeOut();
    
    $('html').css('cursor', 'wait');
    
    $.ajax({
        url : '/servers/update',
        data : $('#server-form').serialize(),
        success : handleSaveServerResponse
    });
}

function handleSaveServerResponse(data) {
    $('html').css('cursor', 'auto');
    
    if(data != 'OK') {
        var alert = '<h4>Error!</h4> ' + data;
        $('#serverlist-error').html(alert).slideDown();
    } else {
        var name = $('#server-form #name').val();
        window.location = '/server/' + name.trim().split(' ').join('_');
    }
}