package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.dao.BuildingDao;
import com.s305089.software.oslometasgmt3.model.Building;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/buildings")
public class BuildingController {

    private final Logger logger = LoggerFactory.getLogger(MainController.class);

    @Autowired
    BuildingDao buildingDao;

    @PostMapping
    public Object create(@RequestBody @Validated Building building) {
        if (building != null && !(building.getName().equals("") || building.getAddress().equals(""))) {
            logger.info("Created new building with name {}", building.getName());
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
            logger.info("Updating building with id {}", building.getId());
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
            logger.info("Deleted building with id {}", id);
            return HttpStatus.OK;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }
}
