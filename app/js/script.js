$(function () {
    let appState = {
        tabTransitioning: false
    };

    let appElements = {
        progressCircles: []
    };

    let animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
    let animationExitClasses = "animated fadeOutLeft";
    let animationEntryClasses = "animated fadeInRight";

    $(".tabs ul").on("click", "a", function (e) {
        e.preventDefault();
        
        if (appState.tabTransitioning)
            return;

        id = $(this).attr("href").slice(1);

        $tabContentElement = $("#" + id);

        if ($tabContentElement.hasClass("active"))
            return;

        $currentActiveTabContent = $(".tab-content.active");
        $currentActiveTabLabel = $(".tabs ul li.is-active");
        $currentActiveTabLabel.removeClass("is-active");
        $(this).closest("li").addClass("is-active");
        appState.tabTransitioning = true;

        $currentActiveTabContent
            .addClass(animationExitClasses)
            .one(animationEnd, function () {
                $currentActiveTabContent.removeClass(animationExitClasses);
                $currentActiveTabContent.removeClass("active");
                $tabContentElement.addClass("active " + animationEntryClasses)
                    .one(animationEnd, function () {
                        $tabContentElement.removeClass(animationEntryClasses);
                        appState.tabTransitioning = false;
                    });
                // Animate progress circle if #skills tab selected
                if (id == "skills")
                    setTimeout(function delayAndAnimateCircleProgressBars() {
                        let circles = appElements.progressCircles;
                        circles.forEach(function (circle) {
                            let currVal = circle.value();
                            console.log(currVal);
                            circle.set(0);
                            circle.animate(currVal);
                        });
                    }, 0);
            });
    });

    // Setting up progress circles.
    $skillBars = $(".skill-bar");
    $skillBars.each(function (idx, e) {
        let $e = $(e);
        let skillName = $e.find(".skill-name").text();
        let skillPercent = $e.find(".skill-percent").text();
        $e.empty();

        let circle = new ProgressBar.Circle($e.get(0), {
            trailColor: "#eee",
            trailWidth: 0.3,
            color: "#ff6a00",
            strokeWidth: 3.1,
            easing: "easeOut",
            duration: 2000,
            text: {
                value: skillName,
                className: "skill-bar-label heading",
                style: {
                    color: '#fff',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    padding: 0,
                    margin: 0,
                    // You can specify styles which will be browser prefixed
                    transform: {
                        prefix: true,
                        value: 'translate(-50%, -50%)'
                    }
                }
            },
            from: { color: "#ee0979" },
            to: { color: "#ff6a00" },
            step: function (state, bar, attachment) {
                bar.path.setAttribute('stroke', state.color);
            }
        });

        circle.set(Number.parseInt(skillPercent.slice(0, -1)) / 100);
        appElements.progressCircles.push(circle);
    });

    // Go to tab if URL has hash
    let hashValue = location.hash;
    if (hashValue) {
        let $link = $('a[href="' + hashValue + '"]').click();
    }
});