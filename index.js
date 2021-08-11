var canvas = document.querySelector("canvas");
var ctx = canvas.getContext("2d");
var fireColorsPalette = [{ "r": 7, "g": 7, "b": 7 }, { "r": 31, "g": 7, "b": 7 }, { "r": 47, "g": 15, "b": 7 }, { "r": 71, "g": 15, "b": 7 }, { "r": 87, "g": 23, "b": 7 }, { "r": 103, "g": 31, "b": 7 }, { "r": 119, "g": 31, "b": 7 }, { "r": 143, "g": 39, "b": 7 }, { "r": 159, "g": 47, "b": 7 }, { "r": 175, "g": 63, "b": 7 }, { "r": 191, "g": 71, "b": 7 }, { "r": 199, "g": 71, "b": 7 }, { "r": 223, "g": 79, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 223, "g": 87, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 95, "b": 7 }, { "r": 215, "g": 103, "b": 15 }, { "r": 207, "g": 111, "b": 15 }, { "r": 207, "g": 119, "b": 15 }, { "r": 207, "g": 127, "b": 15 }, { "r": 207, "g": 135, "b": 23 }, { "r": 199, "g": 135, "b": 23 }, { "r": 199, "g": 143, "b": 23 }, { "r": 199, "g": 151, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 159, "b": 31 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 167, "b": 39 }, { "r": 191, "g": 175, "b": 47 }, { "r": 183, "g": 175, "b": 47 }, { "r": 183, "g": 183, "b": 47 }, { "r": 183, "g": 183, "b": 55 }, { "r": 207, "g": 207, "b": 111 }, { "r": 223, "g": 223, "b": 159 }, { "r": 239, "g": 239, "b": 199 }, { "r": 255, "g": 255, "b": 255 }];
canvas.width = 50;
canvas.height = 50;
var Fire = /** @class */ (function () {
    function Fire(lag, alt, intens, struct, mouse) {
        this.lag = lag;
        this.alt = alt;
        this.intens = intens;
        this.struct = struct;
        this.mouseIntens = mouse;
    }
    Fire.prototype.render = function () {
        for (var y_1 = 0; y_1 != this.alt; y_1++) {
            for (var x_1 = 0; x_1 != this.lag; x_1++) {
                var _a = fireColorsPalette[this.struct[y_1][x_1]], r = _a.r, g = _a.g, b = _a.b;
                ctx.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
                ctx.fillRect(x_1, y_1, 1, 1);
            }
        }
    };
    Fire.prototype.combustao = function () {
        this.struct[this.alt - 1] = Array(this.lag).fill(this.intens);
    };
    Fire.prototype.propragacao = function () {
        for (var y_2 = 0; y_2 < this.alt; y_2++) {
            for (var x_2 = 0; x_2 < this.lag; x_2++) {
                var rand = Math.floor(Math.random() * 3);
                if (this.alt - 2 >= y_2 && this.struct[y_2 + 1][x_2] - rand >= 0) {
                    this.struct[y_2][x_2] = this.struct[y_2 + 1][x_2] - rand;
                }
            }
        }
    };
    return Fire;
}());
var a = [];
for (var y_3 = 0; y_3 != canvas.height; y_3++) {
    var b = [];
    for (var x_3 = 0; x_3 != canvas.height; x_3++) {
        b.push(0);
    }
    a.push(b);
}
var fire = new Fire(canvas.width, canvas.height, 36, a, 20);
var mouseon = false;
var _a = [0, 0], x = _a[0], y = _a[1];
canvas.addEventListener("mousedown", function () { mouseon = true; });
canvas.addEventListener("mouseup", function () { mouseon = false; });
canvas.addEventListener("mousemove", function (event) {
    if (mouseon) {
        fire.struct[Math.floor(event.clientY / canvas.style.height / canvas.height)][Math.floor(event.clientX / canvas.style.width / canvas.width)] = fire.mouseIntens;
    }
});
function anime() {
    fire.combustao();
    fire.render();
    fire.propragacao();
}
setInterval(anime, 30);
