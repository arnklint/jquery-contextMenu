/**
 * jQuery.contextMenu - Show a custom context when right clicking something
 * Jonas Arnklint, http://github.com/arnklint/jquery-contextMenu
 * Released into the public domain
 * Date: Jan 14, 2011
 * @author Jonas Arnklint
 * @version 1.3
 *  
 */
// Making a local '$' alias of jQuery to support jQuery.noConflict
(function($) {
  jQuery.fn.contextMenu = function ( name, actions, options ) {
      var me = this,
          menu = $('<ul id="'+name+'" class="context-menu"></ul>').hide().appendTo('body'),
          active_element = null, // last clicked element that responds with contextMenu
          hide_menu = function(){
            $('.context-menu').each(function() {
              $(this).trigger("closed");
              $(this).hide();
            });
          }, 
          default_options = {
              disable_native_context_menu: false // disables the native contextmenu everywhere you click
          },
          options = $.extend(default_options, options);
      
      $(document).bind('contextmenu', function(e) {
        if (options.disable_native_context_menu)
          e.preventDefault();
        hide_menu();
      });

      $.each(actions, function(me, item_options) {
          var menuItem = $('<li><a href="#">'+me+'</a></li>');

          if (item_options.klass)
            menuItem.attr("class", item_options.klass);

          menuItem.appendTo(menu).bind('click', function(e) {
              item_options.click(active_element);
              e.preventDefault();
          });
      });

      $('body').click(function() {
           hide_menu(); //Hide the menus if visible
      });

      return me.bind('contextmenu', function(e){
          // Hide any existing context menus
          hide_menu(); 

          active_element = $(this); // set clicked element

          if (options.showMenu) {
            options.showMenu.call(menu, active_element);
          }

          // Bind to the closed event if there is a hideMenu handler specified
          if (options.hideMenu) {
            menu.bind("closed", function() {
              options.hideMenu.call(menu, active_element);
            });
          }

          menu.show()
              .css({
                  position: 'absolute', 
                  top: e.pageY, 
                  left: e.pageX, 
                  zIndex: 1000 
              });
          return false;
      });
  }
})(jQuery);
