export interface Listing {
    id: number
    make: string
    price: number
    mileage: number
    sellerType: string
}

export interface ListingCSV {
    id: string
    make: string
    price: string
    mileage: string
    seller_type: string
}