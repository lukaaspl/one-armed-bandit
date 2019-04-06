class Draw {
    constructor() {
        this.options = [
            "red;rgba(255, 0, 0, .6)",
            "green;rgba(0, 128, 0, .6)",
            "blue;rgba(0, 0, 255, .6)"
        ];
        let _drawnColors = this.drawColors();

        this.getDrawnColors = () => _drawnColors;
    }

    drawColors() {
        const drawnColors = [];

        for (let i = 0; i < this.options.length; i++) {
            const index = Math.floor(Math.random() * this.options.length);
            const drawnColor = this.options[index];

            drawnColors.push(drawnColor);
        }

        return drawnColors;
    }
}

const draw = new Draw();