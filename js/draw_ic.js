//main.js
(function () {
    var svg = document.querySelector("#svg");
    var star = svg.querySelector(".star");
    var lineLong = svg.querySelector(".line-long");
    var lines = svg.querySelectorAll(".st");
    var circles = svg.querySelectorAll(".cir");
    var linesG1 = svg.querySelectorAll(".st-g1");
    var linesG2 = svg.querySelectorAll(".st-g2");
    
    function pathPrepare(el) {
        var lineLength = el.getTotalLength();
        el.style.strokeDasharray = lineLength + 10;
        el.style.strokeDashoffset = lineLength + 10;
    }
    
    pathPrepare(lineLong);
    lines.forEach(function (e) {
        pathPrepare(e);
    });
    
    
    var shootingAni = new TimelineMax()
        .addLabel("start")
        .to(lineLong, 0.4, {
        strokeDashoffset: 0
        })
        .from(star, 0.35, {
        autoAlpha: 0,
        scale: "0",
        rotation: -360,
        transformOrigin: '50% 50%'
        }, "start+=0.3")
        .to(linesG1, 0.66, {
        autoAlpha: 1,
        strokeDashoffset: 0,
        }, "start+=0.45")
        .to(linesG2, 0.45, {
        autoAlpha: 1,
        strokeDashoffset: 0,
        }, "start+=0.65")
        .fromTo(circles, 0.5, {
        scale: 0,
        autoAlpha: 0,
        transformOrigin: '50% 50%'
        }, {
        scale: 0.8,
        y: 0,
        autoAlpha: 1,
        transformOrigin: '50% 50%'
        }, "start+=0.66")
    
    
    
    document.querySelector("#button").addEventListener("click", function(){
        shootingAni.restart();
    });
    
    }());
