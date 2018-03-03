package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.dao.RoomDao;
import com.s305089.software.oslometasgmt3.model.Building;
import com.s305089.software.oslometasgmt3.model.Room;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/buildings/{buildingId}/rooms")
public class RoomController {

    @Autowired
    RoomDao roomDao;

    @PostMapping
    public HttpStatus createRoom(@PathVariable Long buildingId, @Validated Room room) {
        roomDao.save(room);
        return HttpStatus.CREATED;
    }

    @PutMapping
    public Object updateRoom(@PathVariable Long buildingId, Room room) {
        if (room.getId() != null && roomDao.findById(room.getId()).isPresent()) {
            return roomDao.save(room);
        }
        return HttpStatus.NOT_FOUND;
    }

    @GetMapping
    public Object getAllRooms(@PathVariable Long buildingId) {
        return roomDao.findAll();
    }

    @GetMapping(value = "/{id}")
    public Object getRoom(@PathVariable Long buildingId, @PathVariable Integer id) {
        return roomDao.findById(id);
    }

    @PostMapping(value = "/{id}")
    public HttpStatus delete(@PathVariable Long buildingId, @PathVariable Integer id) {
        Optional<Room> room = roomDao.findById(id);
        if (room.isPresent()) {
            roomDao.delete(room.get());
            return HttpStatus.OK;
        }
        return HttpStatus.NOT_FOUND;
    }

}