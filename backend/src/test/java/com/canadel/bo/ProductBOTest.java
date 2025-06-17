package com.canadel.bo;

import com.canadel.entity.Product;
import com.canadel.exception.BusinessException;
import com.canadel.repository.ProductRepo;
import com.canadel.vo.ProductVO;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class ProductBOTest {

  private static Product ANOTHER_PRODUCT;

  private static Product SAMPLE_PRODUCT;

  @Mock
  private ProductRepo productRepo;

  @InjectMocks
  private ProductBO productBO;

  @BeforeAll
  static void setUp() {
    SAMPLE_PRODUCT = new Product();
    SAMPLE_PRODUCT.setId(1);
    SAMPLE_PRODUCT.setName("Product 1 Name");
    SAMPLE_PRODUCT.setDescription("Product 1 Description");
    SAMPLE_PRODUCT.setPrice(12.4);
    SAMPLE_PRODUCT.setCreatedAt(new Date());

    ANOTHER_PRODUCT = new Product();
    ANOTHER_PRODUCT.setId(2);
    ANOTHER_PRODUCT.setName("Product 2 Name");
    ANOTHER_PRODUCT.setDescription("Product 2 Description");
    ANOTHER_PRODUCT.setPrice(14.1);
    ANOTHER_PRODUCT.setCreatedAt(new Date());
  }

  @Test
  void shouldAddProductSuccessfully() {
    // Given
    when(productRepo.save(Mockito.any(Product.class))).thenReturn(SAMPLE_PRODUCT);
    ProductVO productVO = new ProductVO(SAMPLE_PRODUCT);

    // When
    productBO.addProduct(productVO);

    // Then
    Mockito.verify(productRepo, Mockito.times(1)).save(Mockito.any(Product.class));
  }

  @Test
  void shouldDeleteProductSuccessfully() {
    // Given
    when(productRepo.findById(Mockito.anyInt())).thenReturn(Optional.of(SAMPLE_PRODUCT));

    // When
    productBO.deleteProduct(Mockito.anyInt());

    // Then
    Mockito.verify(productRepo, Mockito.times(1)).deleteById(Mockito.anyInt());
  }

  @Test
  void shouldThrowBusinessExceptionDeletingProductNotFound() {
    // Given
    when(productRepo.findById(Mockito.anyInt())).thenReturn(Optional.empty());

    // When - Then
    assertThrows(BusinessException.class, () -> productBO.deleteProduct(Mockito.anyInt()));
  }

  void shouldGetProductByIdSuccessfully() {
    // Given
    when(productRepo.findById(Mockito.anyInt())).thenReturn(Optional.of(SAMPLE_PRODUCT));

    // When
    Product result = productBO.getProduct(Mockito.anyInt());

    // Then
    assertNotNull(result);
    assertEquals(SAMPLE_PRODUCT, result);
    Mockito.verify(productRepo, Mockito.times(1)).findById(Mockito.anyInt());
  }

  @Test
  void shouldGetAllProductsSuccessfullyWhenDatabaseIsFilled() {
    // Given
    when(productRepo.findAll()).thenReturn(List.of(SAMPLE_PRODUCT, ANOTHER_PRODUCT));

    // When
    List<Product> result = productBO.getProducts();

    // Then
    assertNotNull(result);
    assertEquals(2, result.size());
    assertEquals(SAMPLE_PRODUCT, result.get(0));
    assertEquals(ANOTHER_PRODUCT, result.get(1));
    Mockito.verify(productRepo, Mockito.times(1)).findAll();
  }

  @Test
  void shouldGetEmptyListSuccessfullyWhenDatabaseIsEmpty() {
    // Given
    when(productRepo.findAll()).thenReturn(new ArrayList<>());

    // When
    List<Product> result = productBO.getProducts();

    // Then
    assertNotNull(result);
    assertEquals(0, result.size());
    Mockito.verify(productRepo, Mockito.times(1)).findAll();
  }

  @Test
  void shouldUpdateProductSuccessfully() {
    // Given
    when(productRepo.findById(Mockito.anyInt())).thenReturn(Optional.of(SAMPLE_PRODUCT));
    ProductVO productVO = new ProductVO(ANOTHER_PRODUCT);

    // When
    productBO.updateProduct(Mockito.anyInt(), productVO);

    // Then
    Mockito.verify(productRepo, Mockito.times(1)).save(Mockito.any(Product.class));
  }

  @Test
  void shouldThrowBusinessExceptionUpdatingProductNotFound() {
    // Given
    when(productRepo.findById(Mockito.anyInt())).thenReturn(Optional.empty());
    ProductVO productVO = new ProductVO(ANOTHER_PRODUCT);

    // When - Then
    assertThrows(BusinessException.class, () -> productBO.updateProduct(Mockito.anyInt(), productVO));
  }
}
