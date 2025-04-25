
export type PriceModel = {
    strømstøtte: number;
};
export type ApiResponse = {
    year?: number;
    profil: string;
    best_modell: string;
    best_price: number;
    percent_savings_vs_others: PriceModel
};

export type QueryParams = {
    profil: string;
    year: string;
};
