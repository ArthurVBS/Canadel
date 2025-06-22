package com.canadel.vo;

import com.canadel.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductVO {

  private String name;

  private String description;

  private Double price;

  private Date createdAt;

  /**
   * The Product VO constructor based in the entity.
   *
   * @param product the entity.
   */
  public ProductVO(Product product) {
    this.name = product.getName();
    this.description = product.getDescription();
    this.price = product.getPrice();
    this.createdAt = product.getCreatedAt();
  }

  /**
   * Gets the entity values (without id).
   *
   * @return the entity.
   */
  public Product toEntity() {
    Product product = new Product();
    product.setName(name);
    product.setDescription(description);
    product.setPrice(price);
    product.setCreatedAt(createdAt);
    return product;
  }
}
