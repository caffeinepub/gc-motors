import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CarBrand {
    tagline: string;
    name: string;
    description: string;
    interiorFeatures: Array<string>;
}
export interface PartnerInfo {
    name: string;
    contactEmail: string;
}
export interface Review {
    id: bigint;
    text: string;
    author: string;
    timestamp: bigint;
    rating: bigint;
}
export interface backendInterface {
    getAllCarBrands(): Promise<Array<CarBrand>>;
    getCarBrandByName(name: string): Promise<CarBrand | null>;
    getGameFeatures(): Promise<Array<string>>;
    getPartnerInfo(): Promise<PartnerInfo>;
    getReleaseDate(): Promise<bigint>;
    getReviews(): Promise<Array<Review>>;
    submitReview(author: string, rating: bigint, text: string): Promise<bigint>;
}
