package com.canadel.rest;

import com.canadel.bo.ProductBO;
import com.canadel.entity.Product;
import com.canadel.exception.BusinessException;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class ProductRestTest {

  private static Product ANOTHER_PRODUCT;

  private static Product SAMPLE_PRODUCT;

  private ResponseEntity<?> response;

  @Mock
  private ProductBO productBO;

  @InjectMocks
  private ProductRest productRest;

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
    givenAddProductSuccessfully();
    whenAddProduct();
    thenAssertSuccessResponse();
  }

  @Test
  void shouldAddProductAndReceiveABadRequest() {
    givenAddProductThrowABadRequest();
    whenAddProduct();
    thenAssertBadRequestResponse();
  }

  @Test
  void shouldDeleteProductSuccessfully() {
    givenDeleteProductSuccessfully();
    whenDeleteProduct();
    thenAssertSuccessResponse();
  }

  @Test
  void shouldDeleteProductAndReceiveABadRequest() {
    givenDeleteProductThrowABadRequest();
    whenDeleteProduct();
    thenAssertBadRequestResponse();
  }

  @Test
  void shouldGetProductByIdSuccessfully() {
    givenGetProductByIdReturnsSuccessfully();
    whenGetProductById();
    thenAssertSuccessResponse();
  }

  @Test
  void shouldGetProductByIdAndReceiveABadRequest() {
    givenGetProductByIdThrowABadRequest();
    whenGetProductById();
    thenAssertBadRequestResponse();
  }

  @Test
  void shouldGetProductsSuccessfully() {
    givenGetProductsReturnsSuccessfully();
    whenGetProducts();
    thenAssertSuccessResponse();
  }

  @Test
  void shouldGetProductsAndReceiveABadRequest() {
    givenGetProductsThrowABadRequest();
    whenGetProducts();
    thenAssertBadRequestResponse();
  }

  @Test
  void shouldUpdateProductSuccessfully() {
    givenUpdateProductSuccessfully();
    whenUpdateProduct();
    thenAssertSuccessResponse();
  }

  @Test
  void shouldUpdateAndReceiveABadRequest() {
    givenUpdateProductThrowABadRequest();
    whenUpdateProduct();
    thenAssertBadRequestResponse();
  }

  // Given

  private void givenAddProductSuccessfully() {
    doNothing().when(productBO).addProduct(Mockito.any());
  }

  private void givenAddProductThrowABadRequest() {
    doThrow(new BusinessException("")).when(productBO).addProduct(Mockito.any());
  }

  private void givenDeleteProductSuccessfully() {
    doNothing().when(productBO).deleteProduct(Mockito.any());
  }

  private void givenDeleteProductThrowABadRequest() {
    doThrow(new BusinessException("")).when(productBO).deleteProduct(Mockito.any());
  }

  private void givenGetProductByIdReturnsSuccessfully() {
    when(productBO.getProduct(Mockito.anyInt())).thenReturn(SAMPLE_PRODUCT);
  }

  private void givenGetProductByIdThrowABadRequest() {
    when(productBO.getProduct(Mockito.anyInt())).thenThrow(new BusinessException(""));
  }

  private void givenGetProductsReturnsSuccessfully() {
    when(productBO.getProducts()).thenReturn(List.of(SAMPLE_PRODUCT, ANOTHER_PRODUCT));
  }

  private void givenGetProductsThrowABadRequest() {
    when(productBO.getProducts()).thenThrow(new BusinessException(""));
  }

  private void givenUpdateProductSuccessfully() {
    doNothing().when(productBO).updateProduct(Mockito.anyInt(), Mockito.any());
  }

  private void givenUpdateProductThrowABadRequest() {
    doThrow(new BusinessException("")).when(productBO).updateProduct(Mockito.anyInt(), Mockito.any());
  }

  // When

  private void whenAddProduct() {
    response = productRest.addProduct(Mockito.any());
  }

  private void whenDeleteProduct() {
    response = productRest.deleteProduct(Mockito.any());
  }

  private void whenGetProductById() {
    response = productRest.getProduct(Mockito.anyInt());
  }

  private void whenGetProducts() {
    response = productRest.getProducts();
  }

  private void whenUpdateProduct() {
    response = productRest.updateProduct(Mockito.anyInt(), Mockito.any());
  }

  // Then

  private void thenAssertSuccessResponse() {
    assertNotNull(response);
    assertEquals(HttpStatus.OK, response.getStatusCode());
  }

  private void thenAssertBadRequestResponse() {
    assertNotNull(response);
    assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
  }
}
