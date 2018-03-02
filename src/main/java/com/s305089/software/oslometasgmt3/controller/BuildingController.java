package com.s305089.software.oslometasgmt3.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.s305089.software.oslometasgmt3.dao.BuildingDao;
import com.s305089.software.oslometasgmt3.model.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    @Autowired
    BuildingDao buildingDao;

    @PostMapping
    public HttpStatus create(@ModelAttribute("building") @Validated Building building) {
        if (building != null) {
            buildingDao.save(building);
            return HttpStatus.CREATED;
        }
        return HttpStatus.NOT_FOUND;
    }

    @PutMapping
    public HttpStatus update(@ModelAttribute("building") @Validated Building building) {
        if (building.getId() != null && buildingDao.findById(building.getId()).isPresent()) {
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

    @GetMapping
    public Object getAll() {
        return buildingDao.findAll();
    }

    @GetMapping(value = "/{id}")
    public Object get(@PathVariable Integer id) {
        return buildingDao.findById(id);
    }

    @DeleteMapping
    public HttpStatus delete(@PathVariable Integer id) {
        Optional<Building> building = buildingDao.findById(id);
        if (building.isPresent()) {
            buildingDao.delete(building.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

}
