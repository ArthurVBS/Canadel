import {Product} from "@/types/Product";
import BaseService from "@/services/BaseService";
import {BASE_ROUTES, HTTP_END_POINTS, HTTP_METHODS} from "@/constants/ServiceConstants";

/**
 * Gets all products
 *
 * @param successCallback - the method that will be called in case of success.
 * @param errorCallback - the method that will be called in case of error.
 * @param finallyCallback - the method that will be called in any case after all.
 */
function getProducts(successCallback: (data: Product[]) => void, errorCallback: (error: any) => void, finallyCallback: () => void) {
  const promise = BaseService.performRequest(HTTP_METHODS.GET, BASE_ROUTES.PRODUCT + HTTP_END_POINTS.ALL);
  BaseService.executePromise(promise, successCallback, errorCallback, finallyCallback);
}

export default { getProducts }
