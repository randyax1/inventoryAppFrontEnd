import axios from "axios";

const localhost = "http://localhost:8080";

const host = localhost;

const BASE_ENDPOINT = "/api";
const PRODUCT_ENDPOINT = BASE_ENDPOINT + "/product";
const CATEGORY_ENDPOINT = PRODUCT_ENDPOINT + "/category";
const SUPPLIER_ENDPOINT = PRODUCT_ENDPOINT + "/supplier";

export const inventoryAppCreateProduct = async (name: string, supplier: string, category: string, quantity: number, unitPrice: number) => {

    const body = {
        "name": name,
        "supplier": supplier,
        "category": category,
        "quantity": quantity,
        "unitPrice": unitPrice
    };

    return await axios.post(
        `${host}${PRODUCT_ENDPOINT}`,
        body
    );
};

export const inventoryAppGetProducts = async () => {

    return await axios.get(
        `${host}${PRODUCT_ENDPOINT}`
    );

};

export const inventoryAppUpdateProduct = async (
    productId: string, name: string, supplier: string, category: string, quantity: number, unitPrice: number
) => {

    let supply = {
        "name": name,
        "supplier": supplier,
        "category": category,
        "quantity": quantity,
        "unitPrice": unitPrice
    };

    if (name) supply.name = name;
    if (supplier) supply.supplier = supplier;
    if (category) supply.category = category;
    if (quantity) supply.quantity = quantity;
    if (unitPrice) supply.unitPrice = unitPrice;

    return await axios.put(
        `${host}${PRODUCT_ENDPOINT}/${productId}`,
        supply
    );

};

export const inventoryAppDeleteProductById = async (productId: string) => {

    return await axios.delete(
        `${host}${PRODUCT_ENDPOINT}/${productId}`
    );

};


export const inventoryAppCreateSupplier = async (name: String, email: String, contactNumber: Number, state: String, city: String) => {

    const body = {
        "name": name,
        "email": email,
        "contactNumber": contactNumber,
        "state": state,
        "city": city
    };

    return await axios.post(
        `${host}${SUPPLIER_ENDPOINT}`,
        body
    );
};

export const inventoryAppGetSuppliers = async () => {

    return await axios.get(
        `${host}${SUPPLIER_ENDPOINT}`
    );

};

export const inventoryAppUpdateSupplier = async (
    supplierId: string, name: string, email: string, contactNumber: number, state: string, city: string
) => {

    let supplier = {
        "name": name,
        "email": email,
        "contactNumber": contactNumber,
        "state": state,
        "city": city
    };

    if (name) supplier.name = name;
    if (email) supplier.email = email;
    if (contactNumber) supplier.contactNumber = contactNumber;
    if (state) supplier.state = state;
    if (city) supplier.city = city;

    return await axios.put(
        `${host}${SUPPLIER_ENDPOINT}/${supplierId}`,
        supplier
    );

};

export const inventoryAppDeleteSupplierById = async (supplierId: string) => {

    return await axios.delete(
        `${host}${SUPPLIER_ENDPOINT}/${supplierId}`
    );

};


export const inventoryAppCreateCategory = async (
    name: string) => {

    const body = {
        "name": name
    };

    return await axios.post(
        `${host}${CATEGORY_ENDPOINT}`,
        body
    );

}

export const inventoryAppGetCategories = async () => {

    return await axios.get(
        `${host}${CATEGORY_ENDPOINT}`
    );

};

export const inventoryAppUpdateCategory = async (
    categoryId: string, categoryName?: string) => {

    let category = { "name": categoryName, };

    if (categoryName) category.name = categoryName;

    return await axios.put(
        `${host}${CATEGORY_ENDPOINT}/${categoryId}`,
        category
    );

};

export const inventoryAppDeleteCategoryById = async (categoryId: string) => {

    return await axios.delete(
        `${host}${CATEGORY_ENDPOINT}/${categoryId}`
    );

};

