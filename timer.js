(function () {
 console.log("timer code");
    // Set the deadline in UTC format (7:30 PM IST = 2:00 PM UTC)
    var deadlineUTC = '2025-02-06T14:00:00Z';

    function pad(num, size) {
        var s = "0" + num;
        return s.substr(s.length - size);
    }

    function getTimeRemaining(endtime) {
        const nowUTC = new Date().getTime(); // Current time in milliseconds (UTC)
        const endUTC = Date.parse(endtime); // Deadline in milliseconds (UTC)
        let total = endUTC - nowUTC;

        let seconds = Math.floor((total / 1000) % 60);
        let minutes = Math.floor((total / 1000 / 60) % 60);
        let hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        let days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    }

    function clock(id, endtime) {
    		console.log("getting id");
        let days = document.getElementById(id + '-days');
        let hours = document.getElementById(id + '-hours');
        let minutes = document.getElementById(id + '-minutes');
        let seconds = document.getElementById(id + '-seconds');

        var timeinterval = setInterval(function () {
            var time = getTimeRemaining(endtime);
            if (time.total <= 0) {
                clearInterval(timeinterval);
            } else {
                days.innerHTML = pad(time.days, 2);
                hours.innerHTML = pad(time.hours, 2);
                minutes.innerHTML = pad(time.minutes, 2);
                seconds.innerHTML = pad(time.seconds, 2);
            }
        }, 1000);
    }

    clock('js-clock', deadlineUTC);

})();

