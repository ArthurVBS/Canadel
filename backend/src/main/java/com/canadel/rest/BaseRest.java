package com.canadel.rest;

import com.canadel.exception.BusinessException;
import org.springframework.http.ResponseEntity;

import java.util.function.Supplier;

import static com.canadel.constant.ExceptionMessages.SOMETHING_WENT_WRONG;

public abstract class BaseRest {

  /**
   * Performs the rest call.
   *
   * @param supplier the supplier to be used.
   * @return the response entity.
   */
  public ResponseEntity<?> rest(Supplier<?> supplier) {
    try {
      return ResponseEntity.ok(supplier.get());
    } catch (BusinessException e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    } catch (Exception e) {
      return ResponseEntity.internalServerError().body(SOMETHING_WENT_WRONG);
    }
  }
}
