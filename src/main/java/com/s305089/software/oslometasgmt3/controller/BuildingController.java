package com.s305089.software.oslometasgmt3.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.s305089.software.oslometasgmt3.dao.BuildingDao;
import com.s305089.software.oslometasgmt3.model.Building;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/buildings")
public class BuildingController {

    @Autowired
    BuildingDao buildingDao;

    @PostMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public Object create(@ModelAttribute("building") @Validated Building building) {
        if (building != null && !(building.getName().equals("") || building.getAddress().equals(""))) {
            return buildingDao.save(building);
        }
        return HttpStatus.NOT_FOUND;
    }

    @PatchMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public Object update(@ModelAttribute("building") @Validated Building building, BindingResult res) {
        if (building.getId() != null && buildingDao.findById(building.getId()).isPresent()) {
            return buildingDao.save(building);
        }
        return HttpStatus.NOT_FOUND;
    }

    @GetMapping
    @CrossOrigin(origins = "http://localhost:3000")
    public Object getAll() {
        return buildingDao.findAll();
    }

    @GetMapping(value = "/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public Object get(@PathVariable Integer id) {
        return buildingDao.findById(id);
    }


    @DeleteMapping(value = "/{id}")
    @CrossOrigin(origins = "http://localhost:3000")
    public HttpStatus delete(@PathVariable Integer id) {
            buildingDao.deleteById(id);
            return HttpStatus.OK;
    }
}
