export const getRandomIntInclusive = (
    min: number,
    inclusiveMax: number,
): number => {
    return Math.floor(Math.random() * (inclusiveMax - min + 1)) + min;
};

export const getRandomTicker = (): string => {
    const TICKER_LENGTH = 3;
    let ticker = "";

    for (let i = 0; i < 3; i++) {
        // (ascii) 65 -> A
        // (ascii) 90 -> Z
        ticker = ticker.concat(
            String.fromCharCode(getRandomIntInclusive(65, 90)),
        );
    }

    return ticker;
};
