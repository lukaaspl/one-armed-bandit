class Statistics {
    constructor() {
        this.gameResults = [];
        this.turnover = 0;
    }

    addGameToStatistics(win, turnover) {
        this.gameResults.push({
            win
        });

        this.turnover += turnover;
    }

    getStatistics() {
        return {
            totalGames: this.gameResults.length,
            wins: this.gameResults.filter(result => result.win).length,
            losses: this.gameResults.filter(result => !result.win).length,
            turnover: this.turnover,
        }

    }
}

const statistics = new Statistics();