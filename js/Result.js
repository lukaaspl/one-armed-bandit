class Result {
    static hasUserWon(drawnColors) {
        if ((drawnColors[0] === drawnColors[1] &&
                drawnColors[1] == drawnColors[2]) ||
            (drawnColors[0] !== drawnColors[1] &&
                drawnColors[1] !== drawnColors[2] &&
                drawnColors[0] !== drawnColors[2]))
            return true;

        return false;
    }

    static winRate(bid) {
        return (bid * 3);
    }
}