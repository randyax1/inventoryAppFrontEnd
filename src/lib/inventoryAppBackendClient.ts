import axios from "axios";

const localhost = "http://localhost:8080";

const host = localhost;

const BASE_ENDPOINT = "/api";
const PRODUCT_ENDPOINT = BASE_ENDPOINT + "/product";
const CATEGORY_ENDPOINT = PRODUCT_ENDPOINT + "/category";
// eslint-disable-next-line
const SUPPLIER_ENDPOINT = PRODUCT_ENDPOINT + "/supplier";

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

