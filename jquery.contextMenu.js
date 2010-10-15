/**
 * jQuery.contextMenu - Show a custom context when right clicking something
 * Jonas Arnklint, http://github.com/arnklint/jquery-contextMenu
 * Released into the public domain
 * Date: Oct 7, 2010
 * @author Jonas Arnklint
 * @version 1.1
 *  
 */
jQuery.fn.contextMenu = function ( name, actions ) {
    $(document).bind("contextmenu",function(e){ return false; }); // yuk :)
    
    var menu = $('<ul id="'+name+'" class="context-menu"></ul>').hide().appendTo('body'),
        active_element = null, // last clicked element that responds with contextMenu
        hide_menu = function(){
            $('.context-menu').hide()
        };
    
    $(".context-menu").delegate("a", "click", function(e){
        e.preventDefault();
    });

    $.each(actions, function(me, item_options){
        $('<li class="'+item_options.class+'"><a href="#">'+me+'</a></li>')
            .appendTo(menu)
            .bind('click', function(e){
                item_options.click(active_element);
            });
    });

    $('body').click(function() {
         hide_menu(); //Hide the menus if visible
    });

    return $(this).live('mousedown', function(e){
        if( e.which == 3 ){
            active_element = $(this); // set clicked element
            hide_menu(); 
            menu.show()
                .css({ 
                    position: 'absolute', 
                    top: e.pageY, 
                    left: e.pageX, 
                    zIndex: 1000 
                });
            e.preventDefault();
        }
    });
}
