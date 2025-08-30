export const cardInvestAmount = (data, cardno) => {
    const totalInvestAmount = data.reduce((sum, row) => {
        return row.cardno === cardno && row.mode === "Invest"
            ? sum + row.amount
            : sum;
    }, 0);

    const totalCashbackAmount = data.reduce((sum, row) => {
        return row.cardno === cardno && row.mode === "cashback"
            ? sum + row.amount
            : sum;
    }, 0);

    const netAmount = totalInvestAmount - totalCashbackAmount;

    return netAmount.toLocaleString("en-IN");
};

