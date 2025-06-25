package com.canadel.rest;

import com.canadel.bo.ProductBO;
import com.canadel.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/products")
public class ProductRest extends BaseRest {

  @Autowired private ProductBO productBO;

  /**
   * Adds a product.
   *
   * @param productVO the product view object.
   * @return the success message.
   */
  @PostMapping()
  public ResponseEntity<?> addProduct(@RequestBody ProductVO productVO) {
    return rest(() -> productBO.addProduct(productVO));
  }

  /**
   * Deletes a product.
   *
   * @param id the product id.
   * @return the success message.
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteProduct(@PathVariable Integer id) {
    return rest(() -> productBO.deleteProduct(id));
  }

  /**
   * Gets a product based in the id.
   *
   * @param id the product id.
   * @return the product.
   */
  @GetMapping("/{id}")
  public ResponseEntity<?> getProduct(@PathVariable Integer id) {
    return rest(() -> productBO.getProduct(id));
  }

  /**
   * Gets all products.
   *
   * @return the products
   */
  @GetMapping()
  public ResponseEntity<?> getProducts() {
    return rest(productBO::getProducts);
  }

  /**
   * Updates a product.
   *
   * @param id the product id.
   * @param productVO the product new values.
   * @return the success message.
   */
  @PutMapping("/{id}")
  public ResponseEntity<?> updateProduct(
      @PathVariable Integer id, @RequestBody ProductVO productVO) {
    return rest(() -> productBO.updateProduct(id, productVO));
  }
}
