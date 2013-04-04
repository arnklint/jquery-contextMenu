# jQuery context menu

jQuery plugin that shows a custom context menu when right clicking something. Super simple implementation. Used to modify visualization of the form analytics metrics for [RevRise Form Analytics](http://revrise.com "Web Form Analytic tool"), but can be used in pretty much any context as long as jQuery is present.

For questions, either [follow me](http://twitter.com/arnklint "Follow Jonas Arnklint") on twitter or post an issue here.

## Basic calling syntax:

    // context_menu_id becomes the id of the context menu, context_menu_items contains the items to be shown in the menu, and options is a set of options for this menu
    $(selector for elements that will launch the menu).contextMenu( context_menu_id, context_menu_items, options );

A complete example:

    $("selector").contextMenu('context-menu-1', {
        'Context Menu Item 1': {
            click: function(element){  // element is the jquery obj clicked on when context menu launched
                alert('Menu item 1 clicked');
                element.css({backgroundColor: 'pink'}); // just as example the clicked items backgorund is changed
            },
            klass: "custom-class1" // a custom css class for this menu item (usable for styling)
        },
        'Second menu item': {
            click: function(element){ alert('second clicked'); },
            klass: "custom-class2"
        }
      },
      {
        delegateEventTo: 'childrenSelector',
        disable_native_context_menu: true,
        showMenu: function() { alert("Showing menu"); },
        hideMenu: function() { alert("Hiding menu"); },
        leftClick: true // trigger on left click instead of right click
      }
    );


## Markup, and css

All context menus gets the class 'context-menu', so it´s quite easy to keep a consistent look over multiple menus. The look is all up to you and the structure of a menu looks like this:

    <ul id="contextMenu" class="context-menu">
      <li class="custom-class1"><a href="#">Context Menu Item 1</a></li>
      <li class="custom-class2"><a href="#">Second menu item</a></li>
    </ul>

Style it however you want with CSS, it does not come with any predefined styles so thats completely up to you.

## Callback

In the example above, when a user clicks on the first context menu item, the original element that launched the context menu is passed in as the only argument for the click callback. Thus, we can make the clicked element green by doing this:

    clickFirstItem = function(element){
        element.css({color: "green"});
    }

    $(".targets").contextMenu({
        'Context Menu Item 1': {
            click: clickFirstItem,
            klass: "menu-item-1"
        }
    });

Simple, yet powerful.

## Version History

### Version 1.6
Added IE8 compability. Thanks to
[TheRealAnaconda](https://github.com/TheRealAnaconda) the nice work!

### Version 1.5
Left click mode added. Trigger the menu on left click instead of right
click.

### Version 1.4
Added support for window boundaries, making the menu always stay
inside them no matter where you click.

### Version 1.3
Added callbacks showMenu and hideMenu to allow the caller to perform actions when the menu is shown
and hidden (such as custom styling of the menu target)

### Version 1.2
Added an option to disable the browsers native context menu no matter where you click:
$('selector').contextMenu('context-menu-name', actions, { disable_native_context_menu: true })

## CONTRIBUTORS:
  Jonas Arnklint [https://github.com/arnklint](https://github.com/arnklint)

  Evan Worley [https://github.com/evanworley](https://github.com/evanworley)

  Marc-Andre Ferland [http://madrang.blogspot.com/](http://madrang.blogspot.com/)

  Soetji Anto

  Jonny Strömberg [https://github.com/javve](https://github.com/javve)
  
  Thomas Jakobi [https://github.com/Jako](https://github.com/Jako)

## License

Copyright (c) 2010 [Jonas Arnklint](http://arnklint.com), released under the MIT license.

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
