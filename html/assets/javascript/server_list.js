
$(document).ready(init);

function init() {
    $('#add-server').on('click', display_new_server_form);
    $('.editable').on('focusin', clearText);
    $('.editable').on('focusout', restoreText);
    $('#server-list .navbar li').on('click', toggleFilter);
    $('#create-server').on('click', addServer);
}

function display_new_server_form() {
    var element = $('#new-server');
    
    if(element.css('display') == 'none') {
        element.slideDown();
    }
}

function clearText() {
    var $this = $(this);
    var content = $this.data('default');
    console.log('focusin');
    if(content == undefined || content == '') {
        var text = $this.html();
        $this.data('default', text);
        $this.html(' ');
    }
}

function restoreText() {
    var $this = $(this);
    var content = $this.html().trim();
    
    if(content == '&nbsp;' || content == '') {
        var text = $this.data('default');
        $this.html(text);
        $this.data('default', '');
    }
}

function toggleFilter() {
    $(this).toggleClass('active');
}

function addServer() {
    var name    = $('#new-server #serverName').html().trim();
    var address = $('#new-server #serverAddress').html().trim();
    var text    = $('#new-server #serverText').html().trim();
    
    var fieldsFilled = true;
    $('#server-list .editable').each(function(){
        if($(this).data('default') == undefined)
        {
            fieldsFilled = false;
        }
    });
    
    if(fieldsFilled) {
        $.ajax({
            url : '/server_list/add_new_server',
            data : {
                serverName          : name,
                serverAddress       : address,
                serverDescription   : text
            },
            success : handleAddServerResponse
        });
    } else {
        handleAddServerResponse('fields not filled');
    }
}

function handleAddServerResponse(data) {
    alert(data);
    
    switch(data) {
        case 'fields not filled':
            break;
        
        case 'name too short':
            break;
        
        case 'invalid characters':
            
            break;
        
        case 'name taken':
            break;
        
        case 'invalid address':
            break;
        
        case 'address taken':
            break;
        
        case 'manager error':
            break;
        
        case 'server error':
            break;
        
        case 'OK':
            break;
    }
}