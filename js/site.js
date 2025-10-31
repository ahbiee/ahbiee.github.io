/* site.js - jQuery helpers: smooth scroll + scrollspy for left-nav */
(function($){
    $(function(){
        var $navBtns = $('.left-nav-btn');
        var $sections = $('section[id]');
        var offset = 90; // match sections-styles.css scroll-margin-top

        // Smooth scroll for anchor clicks
        $navBtns.on('click', function(e){
            var href = $(this).attr('href');
            if (href && href.indexOf('#') === 0) {
                var $target = $(href);
                if ($target.length) {
                    e.preventDefault();
                    var top = Math.max(0, $target.offset().top - offset + 2);
                    $('html, body').animate({ scrollTop: top }, 450);
                }
            }
        });

        // Scrollspy: highlight active nav button based on viewport
        var ticking = false;
        function updateActive(){
            // Use the viewport center to choose the closest section center. This is
            // more stable than edge-based checks and prevents brief mis-activations.
            var scrollPos = $(window).scrollTop();
            var viewportCenter = scrollPos + (window.innerHeight || $(window).height()) / 2;

            // If very near the top of the page, consider '#top' active
            if (scrollPos <= 20) {
                $navBtns.removeClass('active');
                $navBtns.filter('[href="#top"]').addClass('active');
                return;
            }

            var best = { id: null, distance: Infinity };

            $sections.each(function(){
                var $s = $(this);
                var sTop = $s.offset().top;
                var sMid = sTop + ($s.outerHeight() / 2);
                var d = Math.abs(sMid - viewportCenter);
                if (d < best.distance) {
                    best.distance = d;
                    best.id = '#' + $s.attr('id');
                }
            });

            if (best.id) {
                $navBtns.removeClass('active');
                $navBtns.filter('[href="'+best.id+'"]').addClass('active');
            }
        }

        function onScroll(){
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function(){
                updateActive();
                ticking = false;
            });
        }

        $(window).on('scroll resize', onScroll);
        // initial activation
        updateActive();

        /* Ensure .left-nav is not trapped by a transformed ancestor, but do NOT
           recenter on scroll — keep it fixed at the left side of the viewport. */
        var $leftNav = $('.left-nav');
        if ($leftNav.length) {
            try {
                // Move nav directly under body to avoid ancestor transform creating a new containing block
                if ($leftNav.parent()[0] !== document.body) {
                    $leftNav.appendTo(document.body);
                }
                // enforce fixed positioning with highest priority, but keep vertical centering to CSS
                $leftNav[0].style.setProperty('position', 'fixed', 'important');
                $leftNav[0].style.setProperty('left', '12px', 'important');
                $leftNav[0].style.setProperty('top', '50vh', 'important');
                $leftNav[0].style.setProperty('transform', 'translateY(-50%)', 'important');
                $leftNav[0].style.setProperty('z-index', '1200', 'important');
            } catch (err) {
                // fail silently; scrollspy/smooth scroll still function
                console.warn('left-nav reposition fallback failed:', err);
            }
        }
    });
})(jQuery);
