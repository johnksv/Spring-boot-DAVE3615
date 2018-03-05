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

@CrossOrigin
@RestController
@RequestMapping("/buildings")
public class BuildingController {

    @Autowired
    BuildingDao buildingDao;

    @PostMapping
    public Object create(@ModelAttribute("building") @Validated Building building) {
        if (building != null && !(building.getName().equals("") || building.getAddress().equals(""))) {
            return buildingDao.save(building);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PatchMapping(value = "/{id}")
    public Object update(@PathVariable Integer id, @RequestBody @Validated Building editBuilding) {
        Optional<Building> optionalBuilding = buildingDao.findById(id);
        if (optionalBuilding.isPresent()) {
            Building building = optionalBuilding.get();
            if (editBuilding.getName() != null) {
                building.setName(editBuilding.getName());
            }
            if (editBuilding.getAddress() != null) {
                building.setAddress(editBuilding.getAddress());
            }

            return buildingDao.save(building);
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping
    public Object getAll() {
        return buildingDao.findAll();
    }

    @GetMapping(value = "/{id}")
    public Object get(@PathVariable Integer id) {
        Optional<Building> building = buildingDao.findById(id);
        if (building.isPresent()) {
            return building.get();
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping(value = "/{id}")
    public Object delete(@PathVariable Integer id) {
        if (buildingDao.findById(id).isPresent()) {

            buildingDao.deleteById(id);
            return HttpStatus.OK;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}
