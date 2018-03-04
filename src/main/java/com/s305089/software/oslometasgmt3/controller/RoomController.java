package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.dao.BuildingDao;
import com.s305089.software.oslometasgmt3.dao.CategoryDao;
import com.s305089.software.oslometasgmt3.dao.RoomDao;
import com.s305089.software.oslometasgmt3.model.Building;
import com.s305089.software.oslometasgmt3.model.Category;
import com.s305089.software.oslometasgmt3.model.CreateRoomViewModel;
import com.s305089.software.oslometasgmt3.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class RoomController {

    @Autowired
    RoomDao roomDao;
    @Autowired
    BuildingDao buildingDao;


    @GetMapping(value = "/rooms/")
    public Object getAllRooms() {
        return roomDao.findAll();
    }

    @GetMapping(value = "rooms/{id}")
    public Object getRoom(@PathVariable Integer id) {
        return roomDao.findById(id);
    }

    @GetMapping(value = "/buildings/{buildingID}/rooms/")
    public Object getAllRooms(@PathVariable Integer buildingID) {
        return buildingDao.findById(buildingID).get().getRooms();
    }

    @PatchMapping(value = "/rooms/{roomID}")
    public Object updateRoom(@PathVariable Integer roomID, @ModelAttribute @Validated Room room) {
        if (room.getId() != null && roomDao.findById(roomID).isPresent()) {
            return roomDao.save(room);
        }
        return HttpStatus.NOT_FOUND;
    }

    @PostMapping(value = "/buildings/{buildingID}/rooms")
    public Object createRoom(@PathVariable Integer buildingID, @ModelAttribute @Validated CreateRoomViewModel roomModel) {

        Optional<Building> building = buildingDao.findById(buildingID);
        if (building.isPresent()) {
            Room room = new Room();

            room.setBuilding(building.get());
            room.setName(roomModel.getName());
            room.setFloor(roomModel.getFloor());
            room.setCategory(new Category(roomModel.getCategory()));

            return roomDao.save(room);
        }
        return HttpStatus.NOT_FOUND;
    }

    @DeleteMapping(value = "/buildings/{buildingID}/rooms/{id}")
    public HttpStatus delete(@PathVariable Integer buildingID, @PathVariable Integer id) {

        Optional<Building> buildingOptional = buildingDao.findById(buildingID);
        if (buildingOptional.isPresent()) {
            Building building = buildingOptional.get();
            if (building.getRooms().removeIf(room -> room.getId().equals(id))) {
                buildingDao.save(building);

                return HttpStatus.OK;
            }
        }
        return HttpStatus.NOT_FOUND;

    }

}
