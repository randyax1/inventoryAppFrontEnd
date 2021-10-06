export interface SupplierInterface {
    _id: string,
    name: string,
    email: string,
    contactNumber: number,
    state: string,
    city: string

};

export interface CategoryInterface {
    _id: string,
    name: string
}

export interface ProductInterface {
    _id: string,
    name: string,
    supplier: string,
    category: string,
    quantity: number,
    unitPrice: number
}

