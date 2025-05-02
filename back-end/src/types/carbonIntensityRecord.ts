export type CarbonIntensityRecord =
{
    id: number;
    from: string;
    to: string;
    intensity_forecast: number;
    intensity_actual: number;
    index: string;
    gas: number;
    coal: number;
    biomass: number;
    nuclear: number;
    hydro: number;
    imports: number;
    wind: number;
    solar: number;
    other: number;
    total: number;
}
