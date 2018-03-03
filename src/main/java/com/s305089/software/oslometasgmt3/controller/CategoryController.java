package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.dao.CategoryDao;
import com.s305089.software.oslometasgmt3.model.Category;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/buildings/{buildingId}/rooms/{roomId}/category")
public class CategoryController {

    @Autowired
    CategoryDao categoryDao;

    @GetMapping()
    public HttpStatus getCategory(@PathVariable Long buildingId, @PathVariable Long roomId) {

        return HttpStatus.OK;
    }

    @PostMapping()
    public HttpStatus createCategory(@PathVariable Long buildingId, @PathVariable Long roomId) {
        return HttpStatus.OK;
    }

    @PutMapping()
    public Object updateCategory(@PathVariable Long buildingId, @PathVariable Long roomId, @Validated Category category) {
        if (category.getId() != null && categoryDao.findById(category.getId()).isPresent()) {
            return categoryDao.save(category);
        }
        return HttpStatus.NOT_FOUND;
    }

    @DeleteMapping()
    public HttpStatus removeCategory(@PathVariable Long buildingId, @PathVariable Long roomId) {
        return HttpStatus.OK;
    }

}