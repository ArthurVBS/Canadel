package com.canadel.bo;

import com.canadel.entity.Product;
import com.canadel.exception.BusinessException;
import com.canadel.repository.ProductRepo;
import com.canadel.vo.ProductVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;
import static com.canadel.constant.ExceptionMessages.PRODUCT_NOT_FOUND;
import static com.canadel.constant.LoggerMessages.PRODUCTS_FOUND;
import static com.canadel.constant.LoggerMessages.PRODUCT_ADDED;
import static com.canadel.constant.LoggerMessages.PRODUCT_DELETED;
import static com.canadel.constant.LoggerMessages.PRODUCT_FOUND_BY_ID;
import static com.canadel.constant.LoggerMessages.PRODUCT_UPDATED;

@Service
public class ProductBO {

  private static final Logger LOG = Logger.getLogger(ProductBO.class.getName());

  @Autowired private ProductRepo productRepo;

  /**
   * Adds a product.
   *
   * @param productVO the product view object.
   * @return the product added.
   */
  public Product addProduct(ProductVO productVO) {
    productVO.setCreatedAt(new Date());
    Product product = productRepo.save(productVO.toEntity());
    LOG.info(PRODUCT_ADDED);
    return product;
  }

  /**
   * Deletes a product.
   *
   * @param id the product id.
   * @return the product deleted.
   */
  public Product deleteProduct(Integer id) {
    Product product =
        productRepo.findById(id).orElseThrow(() -> new BusinessException(PRODUCT_NOT_FOUND));
    productRepo.deleteById(id);
    LOG.info(PRODUCT_DELETED);
    return product;
  }

  /**
   * Gets a product based in the id.
   *
   * @param id the product id.
   * @return the product.
   */
  public Product getProduct(Integer id) {
    Product product =
        productRepo.findById(id).orElseThrow(() -> new BusinessException(PRODUCT_NOT_FOUND));
    LOG.info(PRODUCT_FOUND_BY_ID);
    return product;
  }

  /**
   * Gets all products.
   *
   * @return the products.
   */
  public List<Product> getProducts() {
    List<Product> products = productRepo.findAll();
    LOG.info(PRODUCTS_FOUND);
    return products;
  }

  /**
   * Updates an existent product.
   *
   * @param id the product id.
   * @param productVO the product new values.
   * @return the product updated.
   */
  public Product updateProduct(Integer id, ProductVO productVO) {
    Product product =
        productRepo.findById(id).orElseThrow(() -> new BusinessException(PRODUCT_NOT_FOUND));
    product.setName(productVO.getName());
    product.setDescription(productVO.getDescription());
    product.setPrice(productVO.getPrice());
    product.setCreatedAt(productVO.getCreatedAt());
    productRepo.save(product);
    LOG.info(PRODUCT_UPDATED);
    return product;
  }
}
