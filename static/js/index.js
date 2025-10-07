window.HELP_IMPROVE_VIDEOJS = false;


$(document).ready(function() {
    // Check for click events on the navbar burger icon

    var options = {
			slidesToScroll: 1,
			slidesToShow: 1,
			loop: true,
			infinite: true,
			autoplay: true,
			autoplaySpeed: 5000,
    }

		// Initialize all div with carousel class
    var carousels = bulmaCarousel.attach('.carousel', options);
	
    bulmaSlider.attach();

    // Chat gif-like synchronized reveal in #motivation
    (function initChatGifReveal() {
        var motivation = document.getElementById('motivation');
        if (!motivation) return;

        var panels = motivation.querySelectorAll('.chat-panel');
        if (!panels.length) return;

        // collect steps per panel
        var stepsPerPanel = Array.from(panels).map(function(panel) {
            return Array.from(panel.querySelectorAll('.chat-step'));
        });

        // determine max steps across panels to stay in sync
        var maxSteps = stepsPerPanel.reduce(function(max, steps) { return Math.max(max, steps.length); }, 0);

        // hide all to start
        stepsPerPanel.forEach(function(steps) {
            steps.forEach(function(step) { step.classList.remove('is-visible'); });
        });

        var current = 0;
        var stepIntervalMs = 1100; // delay between steps

        function showStep(index) {
            stepsPerPanel.forEach(function(steps) {
                var node = steps[index];
                if (node) node.classList.add('is-visible');
            });
        }

        function hideAll() {
            stepsPerPanel.forEach(function(steps) {
                steps.forEach(function(node) { node.classList.remove('is-visible'); });
            });
        }

        function playOnce() {
            hideAll();
            current = 0;

            var revealTimer = setInterval(function() {
                showStep(current);
                current += 1;
                if (current >= maxSteps) {
                    clearInterval(revealTimer);
                    // freeze on the final frame (no restart)
                }
            }, stepIntervalMs);
        }

        // Trigger when in viewport to avoid animating off-screen
        var hasStarted = false;
        function inView(el) {
            var rect = el.getBoundingClientRect();
            return rect.top < (window.innerHeight || document.documentElement.clientHeight) && rect.bottom > 0;
        }

        function maybeStart() {
            if (!hasStarted && inView(motivation)) {
                hasStarted = true;
                playOnce();
                window.removeEventListener('scroll', maybeStart, { passive: true });
            }
        }

        window.addEventListener('scroll', maybeStart, { passive: true });
        // also check immediately on load
        maybeStart();
    })();

})
