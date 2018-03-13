package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.model.CreateRoomViewModel;
import com.s305089.software.oslometasgmt3.model.Room;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class RoomController {


    @GetMapping(value = MainController.API_V1 + "/rooms")
    public Object getAllRooms() {
        return BuildingData.getAllRooms();
    }

    @GetMapping(value = MainController.API_V1 + "/rooms/{id}")
    public Object getRoom(@PathVariable Integer id) {
        return BuildingData.getAllRooms().stream().filter(room -> room.getId().equals(id)).findFirst().get();
    }

    @GetMapping(value = MainController.API_V1 + "/buildings/{buildingID}/rooms/")
    public Object getAllRooms(@PathVariable Integer buildingID) {
        return BuildingData.getAllRooms(buildingID);
    }

    @PatchMapping(value = MainController.API_V1 + "/rooms/{roomID}")
    public Object updateRoom(@PathVariable Integer roomID, @RequestBody @Validated Room editedRoom) {
        Optional<Room> roomOptional = BuildingData.findRoom(roomID);
        if (roomOptional.isPresent()) {
            Room room = roomOptional.get();
            if (editedRoom.getName() != null) {
                room.setName(editedRoom.getName());
            }
            if (editedRoom.getFloor() != null) {
                room.setFloor(editedRoom.getFloor());
            }

            BuildingData.updateRoom(roomID, room);
            return room;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @PostMapping(value = MainController.API_V1 + "/buildings/{buildingID}/rooms")
    public Object createRoom(@PathVariable Integer buildingID, @RequestBody @Validated CreateRoomViewModel roomModel) {

        if (BuildingData.buildingExsist(buildingID)) {
            Room room = new Room();

            room.setId(BuildingData.getAllRooms().size()+500);
            room.setName(roomModel.getName());
            room.setFloor(roomModel.getFloor());
            room.setBuildingId(buildingID);

            BuildingData.addRoom(buildingID, room);
            return room;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping(value = MainController.API_V1 + "/buildings/{buildingID}/rooms/{id}")
    public Object delete(@PathVariable Integer buildingID, @PathVariable Integer id) {
        if (BuildingData.deleteBuilding(buildingID)) {
                return HttpStatus.OK;
        }
        return new ResponseEntity(HttpStatus.NOT_FOUND);

    }

}
