var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        // Function to disable "pull-to-refresh" effect present in some webviews.
        // Especially Crosswalk 12 and above (Chromium 41+) runtimes.

        // Prefent pull up
        window.addEventListener('load', function () {
            var lastTouchY = 0;
            var maybePreventPullToRefresh = false;

            // Pull-to-refresh will only trigger if the scroll begins when the
            // document's Y offset is zero.

            var touchstartHandler = function (e) {
                if (e.touches.length != 1) {
                    return;
                }
                lastTouchY = e.touches[0].clientY;
                // maybePreventPullToRefresh = (preventPullToRefreshCheckbox.checked) && (window.pageYOffset == 0) ;
                maybePreventPullToRefresh = (window.pageYOffset === 0);
                //document.getElementById('txtLog').textContent = "maybePreventPullToRefresh: " + maybePreventPullToRefresh;
            };

            // To suppress pull-to-refresh it is sufficient to preventDefault the
            // first overscrolling touchmove.

            var touchmoveHandler = function (e) {
                var touchY = e.touches[0].clientY;
                var touchYDelta = touchY - lastTouchY;
                lastTouchY = touchY;

                if (maybePreventPullToRefresh) {
                    maybePreventPullToRefresh = false;
                    //if (touchYDelta > 0) {
                    e.preventDefault();
                    //document.getElementById('txtLog').textContent = "TouchY: " + touchYDelta;
                    // console.log("pull-to-refresh event detected") ;
                    return;
                    //}
                }
                // if (preventScrollCheckbox.checked) {
                //     e.preventDefault() ;
                //     return ;
                // }

                // if (preventOverscrollGlowCheckbox.checked) {
                //     if (window.pageYOffset == 0 && touchYDelta > 0) {
                //         e.preventDefault() ;
                //         return ;
                //     }
                // }
            };
            document.addEventListener('touchstart', touchstartHandler, false);
            document.addEventListener('touchmove', touchmoveHandler, false);
            //Call that gets the access and refresh token
            //$.ajax({
            //    url: tokenEndPoint,
            //    data: {
            //        username: "karen@uxsolutions.cz",
            //        password: "admin",
            //        grant_type: 'password',
            //        scope: 'openid offline_access',
            //        client_id: client_id,
            //        client_secret: client_secret
            //    },
            //    method: 'POST',
            //    success: function (data) {
            //        localStorage.setItem("access_token", data.access_token);
            //    },
            //    error: function (err) {
            //        alert("Cannot connect to server: " + err.responseText);
            //    }
            //})
        });
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        //navigator.splashscreen.hide();
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        $("#btn-login").on("click", function () {
            LoadView("login", null, null);
        });
    }
};
