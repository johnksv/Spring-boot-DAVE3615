package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.dao.CategoryDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public HttpStatus updateCategory(@PathVariable Long buildingId, @PathVariable Long roomId) {
        return HttpStatus.OK;
    }

    @DeleteMapping()
    public HttpStatus removeCategory(@PathVariable Long buildingId, @PathVariable Long roomId) {
        return HttpStatus.OK;
    }

}
