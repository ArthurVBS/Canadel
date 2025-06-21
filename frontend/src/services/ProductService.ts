import { Product } from '@/types/Product';
import BaseService from '@/services/BaseService';
import { BASE_ROUTES, HTTP_END_POINTS, HTTP_METHODS } from '@/constants/ServiceConstants';

/**
 * Adds a product.
 * @param product - The product data to be added.
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function addProduct(
  product: Product,
  successCallback: (data: Product) => void,
  errorCallback: (error: string) => void,
  finallyCallback: () => void
) {
  const promise = BaseService.performRequest(
    HTTP_METHODS.POST,
    BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ADD,
    product
  );
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

/**
 * Deletes a product.
 * @param productId - The product id related to the product to be deleted.
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function deleteProduct(
  productId: number,
  successCallback: (data: Product) => void,
  errorCallback: (error: string) => void,
  finallyCallback: () => void
) {
  const promise = BaseService.performRequest(
    HTTP_METHODS.DELETE,
    BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ID.replace('{id}', productId.toString())
  );
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

/**
 * Gets all products
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function getProducts(
  successCallback: (data: Product[]) => void,
  errorCallback: (error: string) => void,
  finallyCallback: () => void
) {
  const promise = BaseService.performRequest(
    HTTP_METHODS.GET,
    BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ALL
  );
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

/**
 * Updates a product.
 * @param product - The product data to be updated.
 * @param successCallback - The method that will be called in case of success.
 * @param errorCallback - The method that will be called in case of error.
 * @param finallyCallback - The method that will be called in any case after all.
 */
function updateProduct(
  product: Product,
  successCallback: (data: Product) => void,
  errorCallback: (error: string) => void,
  finallyCallback: () => void
) {
  const promise = BaseService.performRequest(
    HTTP_METHODS.PUT,
    BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ID.replace('{id}', product.id.toString()),
    product
  );
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

export default { addProduct, deleteProduct, getProducts, updateProduct };
