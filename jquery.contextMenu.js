/**
 * jQuery.contextMenu - Show a custom context when right clicking something
 * Jonas Arnklint, http://starksignal.com
 * Released into the public domain
 * Date: Oct 7, 2010
 * @author Jonas Arnklint
 * @version 1.0
 *
 *
 * Basic calling syntax: 
 
$("selector").contextMenu({
    'Context Menu Item 1': {
        click: function(element){  // element is the jquery obj clicked on when contextMenu launched
            alert('Menu item 1 clicked');
            element.css({backgroundColor: 'pink'}); // just as example the clicked items backgorund is changed
        },
        class: "menu-item-1" // a custom css class for this menu item (usable for styling)
    },
    'Second menu item': {
        click: function(element){ alert('second clicked'); },
        class: "second-menu-item"
    }
});

 * These are the options you can pass into the plugin. No fancy schmancy, but KISS. 
 *  
 */
jQuery.fn.contextMenu = function ( actions ) {
    $(document).bind("contextmenu",function(e){ return false; }); // yuk :)
    
    var menu = $('<ul id="contextMenu"></ul>').hide().appendTo('body'),
        active_element = null; // last clicked element that responds with contextMenu

    $.each(actions, function(me, item_options){
        $('<li class="'+item_options.class+'">'+me+'</li>')
            .appendTo(menu)
            .bind('click', function(e){
                item_options.click(active_element);
            });
    });

    $('body').click(function() {
        menu.hide() //Hide the menus if visible
    });

    return $(this).live('mousedown', function(e){
        if( e.which == 3 ){
            menu.show()
                .css({ 
                    position: 'absolute', 
                    top: $(this).position().top, 
                    left: $(this).position().left, 
                    zIndex: 1000 
                });
            e.preventDefault();
        }
    });
}
