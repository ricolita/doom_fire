const canvas = document.querySelector("canvas") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const fireColorsPalette = [{"r":7,"g":7,"b":7},{"r":31,"g":7,"b":7},{"r":47,"g":15,"b":7},{"r":71,"g":15,"b":7},{"r":87,"g":23,"b":7},{"r":103,"g":31,"b":7},{"r":119,"g":31,"b":7},{"r":143,"g":39,"b":7},{"r":159,"g":47,"b":7},{"r":175,"g":63,"b":7},{"r":191,"g":71,"b":7},{"r":199,"g":71,"b":7},{"r":223,"g":79,"b":7},{"r":223,"g":87,"b":7},{"r":223,"g":87,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":95,"b":7},{"r":215,"g":103,"b":15},{"r":207,"g":111,"b":15},{"r":207,"g":119,"b":15},{"r":207,"g":127,"b":15},{"r":207,"g":135,"b":23},{"r":199,"g":135,"b":23},{"r":199,"g":143,"b":23},{"r":199,"g":151,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":159,"b":31},{"r":191,"g":167,"b":39},{"r":191,"g":167,"b":39},{"r":191,"g":175,"b":47},{"r":183,"g":175,"b":47},{"r":183,"g":183,"b":47},{"r":183,"g":183,"b":55},{"r":207,"g":207,"b":111},{"r":223,"g":223,"b":159},{"r":239,"g":239,"b":199},{"r":255,"g":255,"b":255}];
canvas.width = 50;
canvas.height = 50;

class Fire {
    private lag: number;
    private alt: number;
    public intens: number;
    public struct: number[][];
    public mouseIntens: number;
    constructor(lag: number, alt: number, intens: number, struct: number[][], mouse: number) {
        this.lag = lag;
        this.alt = alt;
        this.intens = intens;
        this.struct = struct;
        this.mouseIntens = mouse;
    }
    public render(): void {
        for(let y = 0; y != this.alt; y++) {
            for(let x = 0; x != this.lag; x++) { 
                let {r,g,b} = fireColorsPalette[this.struct[y][x]];
                ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
                ctx.fillRect(x, y, 1, 1);
            }
        }
    }
    public combustao(): void {
        this.struct[this.alt - 1] = Array<number>(this.lag).fill(this.intens);
    }
    public propragacao(): void {
        for(let y = 0; y < this.alt; y++) {
            for(let x = 0; x < this.lag; x++) {
                let rand = Math.floor(Math.random() * 3);
                if(this.alt - 2 >= y && this.struct[y + 1][x] - rand >= 0) {
                    this.struct[y][x] = this.struct[y + 1][x] - rand;
                }
            }
        }
    }
}
let a = [];
for(let y = 0; y != canvas.height; y++){
    let b = [];
    for(let x = 0; x != canvas.height; x++){
        b.push(0);
    }
    a.push(b);
}
const fire = new Fire(canvas.width,canvas.height,36, a, 20);

let mouseon = false;
let [x, y] = [0, 0];
canvas.addEventListener("mousedown", () => {mouseon = true;})
canvas.addEventListener("mouseup", () => {mouseon = false;})
canvas.addEventListener("mousemove", (event) => {
    if(mouseon) {
        fire.struct[Math.floor(event.clientY / canvas.style.height / canvas.height  )][Math.floor(event.clientX / canvas.style.width / canvas.width )] = fire.mouseIntens
    }
})
function anime(): void {
    fire.combustao();
    fire.render();
    fire.propragacao();
}
setInterval(anime, 30);