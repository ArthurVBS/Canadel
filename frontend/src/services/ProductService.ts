import {Product} from "@/types/Product";
import BaseService from "@/services/BaseService";
import {BASE_ROUTES, HTTP_END_POINTS, HTTP_METHODS} from "@/constants/ServiceConstants";

/**
 *
 *
 * @param product
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function addProduct(product: Product, successCallback: (data: Product) => void, errorCallback: (error: string) => void, finallyCallback: () => void) {
  const promise = BaseService.performRequest(HTTP_METHODS.POST, BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ADD, product);
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

/**
 * Gets all products
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function getProducts(successCallback: (data: Product[]) => void, errorCallback: (error: string) => void, finallyCallback: () => void) {
  const promise = BaseService.performRequest(HTTP_METHODS.GET, BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ALL);
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

export default { addProduct, getProducts }
