; (function ($, w, undefined) {
    var data_name = "stickyheader",
        options = {
            readAssistOffset: 40,   // screen height - this offset value = scroll distance
            duration: 250           // scroll speed in ms
        },
        bound = false;

    function StickyHeader(el, opts) {
        this.el = $(el);
        this.options = $.extend({}, options, opts);
        this.enabled = true;
        this.init();
    }

    StickyHeader.prototype = {
        constructor: StickyHeader,
        init: function () {
            var self = this;
            $(window).bind('keydown', function (e) {
                self.keydown.call(self, e);
            });
        },
        enable: function () {
            this.enabled = true;
        },
        disable: function () {
            this.enabled = false;
        },
        keydown: function (e) {
            var doc = document.documentElement,
                stickyHeaderHeight,
                currScrollPosition,
                scrollToHere,
                newViewportHeight;

            if (this.enabled && ((e.keyCode === 32 && document.activeElement.nodeName === "BODY") || (e.keyCode === 33 || e.keyCode === 34))) {

                stickyHeaderHeight = this.el.outerHeight();
                newViewportHeight = w.innerHeight - stickyHeaderHeight - this.options.readAssistOffset;

                e.preventDefault();

                if (e) {
                    scrollUp = e.shiftKey || e.keyCode === 33 ? true : false;
                } else {
                    scrollUp = window.event.shiftKey || e.keyCode === 33 ? true : false;
                };

                currScrollPosition = $(window).scrollTop() - (doc.clientTop || 0);
                scrollToHere = scrollUp ?  currScrollPosition - newViewportHeight : newViewportHeight + currScrollPosition;
                
                $('body').stop().animate({
                    scrollTop: scrollToHere
                }, this.options.duration);
            }
        }
    }

    $.fn.stickyheader = function (opts) {
        if (!$(this).data(data_name) && !bound) {
            $(this).data(data_name, new StickyHeader(this, opts));
            bound = $(this).data(data_name);
        }
        return bound;
    }

})(jQuery, window);

