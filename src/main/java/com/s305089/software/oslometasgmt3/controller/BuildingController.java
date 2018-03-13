package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.model.Building;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.*;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(MainController.API_V1 + "/buildings")
public class BuildingController {


    private final Logger logger = LoggerFactory.getLogger(MainController.class);


    public BuildingController() {
        BuildingData.populateBuildingData();
    }

    @PostMapping(value = {"", "/add"})
    public Object create(@RequestBody @Validated Building building) {
        if (building != null && !(building.getName().equals("") || building.getAddress().equals(""))) {
            logger.info("Created new building with name {}", building.getName());
            building.setId((int) (BuildingData.BUILDING_DATA.size()+10*Math.random()));
            building.getRooms().forEach(room -> room.setBuildingId(building.getId()));

            BuildingData.postBuilding(building);

            return building;

        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PatchMapping(value = "/{id}")
    public Object update(@PathVariable Integer id, @RequestBody @Validated Building editBuilding) {
        Optional<Building> optionalBuilding = BuildingData.BUILDING_DATA.stream().filter(building -> Objects.equals(building.getId(), id)).findFirst();
        if (optionalBuilding.isPresent()) {
            Building building = optionalBuilding.get();
            if (editBuilding.getName() != null) {
                building.setName(editBuilding.getName());
            }
            if (editBuilding.getAddress() != null) {
                building.setAddress(editBuilding.getAddress());
            }

            logger.info("Updating building with id {}", building.getId());
            BuildingData.postBuilding(building);
            return building;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @GetMapping(value = {"", "/all"})
    public Object getAll() {
        return BuildingData.BUILDING_DATA;
    }

    @GetMapping(value = "/{id}")
    public Object get(@PathVariable Integer id) {
        Optional<Building> building = BuildingData.BUILDING_DATA.stream().filter(b -> Objects.equals(b.getId(), id)).findFirst();
        if (building.isPresent()) {
            return building.get();
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }


    @DeleteMapping(value = "/{id}")
    public Object delete(@PathVariable Integer id) {
        Optional<Building> building = BuildingData.BUILDING_DATA.stream().filter(b -> Objects.equals(b.getId(), id)).findFirst();
        if (building.isPresent()) {

            BuildingData.deleteBuilding(id);
            logger.info("Deleted building with id {}", id);
            return HttpStatus.OK;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }



}
