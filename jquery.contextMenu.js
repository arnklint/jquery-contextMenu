/**
 * jQuery.contextMenu - Show a custom context when right clicking something
 * Jonas Arnklint, http://github.com/arnklint/jquery-contextMenu
 * Released into the public domain
 * Date: Jan 14, 2011
 * @author Jonas Arnklint
 * @version 1.7
 *
*/
// Making a local '$' alias of jQuery to support jQuery.noConflict
(function($) {
  jQuery.fn.contextMenu = function ( name, actions, options ) {
    var me = this,
    win = $(window),
    menu = $('<ul id="'+name+'" class="context-menu"></ul>').hide().appendTo('body'),
    activeElement = null, // last clicked element that responds with contextMenu
    hideMenu = function() {
      $('.context-menu:visible').each(function() {
        $(this).trigger("closed");
        $(this).hide();
        $('body').unbind('click', hideMenu);
      });
    },
    default_options = {
      disable_native_context_menu: false, // disables the native contextmenu everywhere you click
      leftClick: false // show menu on left mouse click instead of right
    },
    options = $.extend(default_options, options);

    $(document).bind('contextmenu', function(e) {
      if (options.disable_native_context_menu) {
        e.preventDefault();
      }
      hideMenu();
    });

    $.each(actions, function(me, itemOptions) {
      if (itemOptions.link) {
        var link = itemOptions.link;
      } else {
        var link = '<a href="#">'+me+'</a>';
      }

      var menuItem = $('<li>' + link + '</li>');

      if (itemOptions.klass) {
        menuItem.attr("class", itemOptions.klass);
      }

      menuItem.appendTo(menu).bind('click', function(e) {
        itemOptions.click(activeElement);
        e.preventDefault();
      });
    });

    // fix for ie mouse button bug
    var mouseEvent = 'contextmenu click';
    if ($.browser.msie && options.leftClick) {
      mouseEvent = 'click';
    } else if ($.browser.msie && !options.leftClick) {
      mouseEvent = 'contextmenu';
    }

    var mouseEventFunc = function(e){
      // Hide any existing context menus
      hideMenu();

      var correctButton = ( (options.leftClick && e.button == 0) || (options.leftClick == false && e.button == 2) );
      if ($.browser.msie) correctButton = true;

      if( correctButton ){

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

        menu.css({
          visibility: 'hidden',
          position: 'absolute',
          zIndex: 1000
        });

        // include margin so it can be used to offset from page border.
        var mWidth = menu.outerWidth(true),
          mHeight = menu.outerHeight(true),
          xPos = ((e.pageX - win.scrollLeft()) + mWidth < win.width()) ? e.pageX : e.pageX - mWidth,
          yPos = ((e.pageY - win.scrollTop()) + mHeight < win.height()) ? e.pageY : e.pageY - mHeight;

        menu.show(0, function() {
          $('body').bind('click', hideMenu);
        }).css({
          visibility: 'visible',
          top: yPos + 'px',
          left: xPos + 'px',
          zIndex: 1000
        });

        return false;
      }
    }

    if (options.delegateEventTo) {
      return me.on(mouseEvent, options.delegateEventTo, mouseEventFunc)
    } else {
      return me.bind(mouseEvent, mouseEventFunc);
    }
  }
})(jQuery);

