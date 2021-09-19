var create = function () {
    //lines.push(new Line(90, true, 2));
    //lines.push(new Line(180, true, 2));
    //lines.push(new Line(270, true, 2));
    //lines.push(new Line(360, true, 2));
    points.push(new Point(0, true, 1, 7, 2, 4));
    //points.push(new Point(0, true, 1, 7, 2, 4));
    //points.push(new Point(0, true, 1, 7, 2, 4));
    //points.push(new Point(0, true, 1, 7, 2, 4));
    //points.push(new Point(10, true, 1, 7, 1, 3));
    //points.push(new Point(20, true, 1, 7, 1, 3))
    //points.push(new Point(30, true, 1, 7, 1, 3))
    //points.push(new Point(40, true, 1, 7, 1, 3))
    //points.push(new Point(50, true, 1, 7, 1, 3))
    //points.push(new Point(60, true, 1, 7, 1, 3))
    //points.push(new Point(70, true, 1, 7, 1, 3))
    //points.push(new Point(80, true, 1, 7, 1, 3))
};
var speed = 60;
var can = null;
var ctx = null;
var lines = [];
var points = [];
var speedup = 5;
var loop = null;
var Line = /** @class */ (function () {
    function Line(color, rainbow, cSpeed, minSpeed, maxSpeed) {
        if (color === void 0) { color = 0; }
        if (rainbow === void 0) { rainbow = false; }
        if (cSpeed === void 0) { cSpeed = 1; }
        if (minSpeed === void 0) { minSpeed = 1; }
        if (maxSpeed === void 0) { maxSpeed = 3; }
        this.x1 = null;
        this.y1 = null;
        this.x2 = null;
        this.y2 = null;
        this.xv1 = null;
        this.yv1 = null;
        this.xv2 = null;
        this.yv2 = null;
        this.color = null;
        this.rainbow = null;
        this.cSpeed = null;
        this.x1 = Math.random() * can.width;
        this.y1 = Math.random() * can.height;
        this.x2 = Math.random() * can.width;
        this.y2 = Math.random() * can.height;
        this.xv1 = minSpeed + Math.random() * maxSpeed;
        this.yv1 = minSpeed + Math.random() * maxSpeed;
        this.xv2 = minSpeed + Math.random() * maxSpeed;
        this.yv2 = minSpeed + Math.random() * maxSpeed;
        this.color = color;
        this.rainbow = rainbow;
        this.cSpeed = cSpeed;
    }
    return Line;
}());
var Point = /** @class */ (function () {
    function Point(color, rainbow, cSpeed, radius, minSpeed, maxSpeed) {
        if (color === void 0) { color = 0; }
        if (rainbow === void 0) { rainbow = false; }
        if (cSpeed === void 0) { cSpeed = 1; }
        if (radius === void 0) { radius = 5; }
        if (minSpeed === void 0) { minSpeed = 2; }
        if (maxSpeed === void 0) { maxSpeed = 5; }
        this.x = null;
        this.y = null;
        this.xv = null;
        this.yv = null;
        this.color = null;
        this.rainbow = null;
        this.cSpeed = null;
        this.radius = null;
        this.x = Math.random() * can.width;
        this.y = Math.random() * can.height;
        this.xv = minSpeed + Math.random() * maxSpeed;
        this.yv = minSpeed + Math.random() * maxSpeed;
        this.color = color;
        this.rainbow = rainbow;
        this.cSpeed = cSpeed;
        this.radius = radius;
    }
    return Point;
}());
window.onload = function () {
    can = document.createElement("canvas");
    can.classList.add("can");
    ctx = can.getContext("2d");
    ctx.fillRect(0, 0, can.width, can.height);
    redrawCan();
    document.body.appendChild(can);
    loop = setInterval(update, 1000 / speed);
    create();
};
var update = function () {
    ctx.fillStyle = "black";
    ctx.globalAlpha = 0.02;
    ctx.fillRect(0, 0, can.width, can.height);
    ctx.globalAlpha = 1;
    for (var i = 0; i < lines.length; i++) {
        var c = lines[i];
        c["x1"] += c["xv1"];
        c["y1"] += c["yv1"];
        c["x2"] += c["xv2"];
        c["y2"] += c["yv2"];
        if (c["x1"] < 0 || c["x1"] > can.width)
            c["xv1"] *= -1;
        if (c["y1"] < 0 || c["y1"] > can.height)
            c["yv1"] *= -1;
        if (c["x2"] < 0 || c["x2"] > can.width)
            c["xv2"] *= -1;
        if (c["y2"] < 0 || c["y2"] > can.height)
            c["yv2"] *= -1;
        if (c["rainbow"])
            c["color"] += c["cSpeed"];
        ctx.strokeStyle = "hsl(" + c["color"] + ", 100%, 60%)";
        ctx.beginPath();
        ctx.moveTo(c["x1"], c["y1"]);
        ctx.lineTo(c["x2"], c["y2"]);
        ctx.stroke();
        ctx.closePath();
    }
    for (var i = 0; i < points.length; i++) {
        var c = points[i];
        c["x"] += c["xv"];
        c["y"] += c["yv"];
        if (c["x"] < 0 || c["x"] > can.width)
            c["xv"] *= -1;
        if (c["y"] < 0 || c["y"] > can.height)
            c["yv"] *= -1;
        if (c["rainbow"])
            c["color"] += c["cSpeed"];
        //ctx.beginPath();
        ctx.arc(c["x"], c["y"], c["radius"], 0, Math.PI * 2);
        ctx.fillStyle = "hsl(" + c["color"] + ", 100%, 60%)";
        ctx.fill();
        //ctx.closePath();
    }
};
var redrawCan = function () {
    can.width = window.innerWidth;
    can.height = window.innerHeight;
    ctx.fillRect(0, 0, can.width, can.height);
};
window.addEventListener("resize", redrawCan);
window.addEventListener("keydown", function (evt) {
    if (evt.key !== " ")
        return;
    clearInterval(loop);
    loop = setInterval(update, 1000 / (speed * speedup));
});
window.addEventListener("keyup", function (evt) {
    if (evt.key !== " ")
        return;
    clearInterval(loop);
    loop = setInterval(update, 1000 / speed);
});
