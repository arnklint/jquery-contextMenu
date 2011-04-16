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
    activeElement = null, // last clicked element that responds with contextMenu
    hideMenu = function() {
      $('.context-menu').each(function() {
        $(this).trigger("closed");
        $(this).hide();
      });
      $('body').unbind('click', hideMenu);
    },
    default_options = {
      disable_native_context_menu: false // disables the native contextmenu everywhere you click
    },
    options = $.extend(default_options, options);

    $(document).bind('contextmenu', function(e) {
      if (options.disable_native_context_menu)
        e.preventDefault();
      hideMenu();
    });

    $.each(actions, function(me, itemOptions) {
      var menuItem = $('<li><a href="#">'+me+'</a></li>');

      if (itemOptions.klass)
        menuItem.attr("class", itemOptions.klass);

      menuItem.appendTo(menu).bind('click', function(e) {
        itemOptions.click(activeElement);
        e.preventDefault();
      });
    });


    return me.bind('contextmenu', function(e){
      // Hide any existing context menus
      hideMenu();

      activeElement = $(this); // set clicked element

      if (options.showMenu) {
        options.showMenu.call(menu, activeElement);
      }

      // Bind to the closed event if there is a hideMenu handler specified
      if (options.hideMenu) {
        menu.bind("closed", function() {
          options.hideMenu.call(menu, activeElement);
        });
      }

      menu.show(0, function() { $('body').bind('click', hideMenu); }).css({
        position: 'absolute',
        top: e.pageY,
        left: e.pageX,
        zIndex: 1000
      });
      return false;
    });
  }
})(jQuery);
