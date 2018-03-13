package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.model.Building;
import com.s305089.software.oslometasgmt3.model.Room;
import org.springframework.http.*;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class BuildingData {
    public static final List<Building> BUILDING_DATA = new ArrayList<>();


    public static List<Room> getAllRooms() {
        return BUILDING_DATA.stream().map(Building::getRooms).flatMap(List::stream).collect(Collectors.toList());
    }

    public static List<Room> getAllRooms(int buldingID) {
        return BUILDING_DATA.stream().filter(building-> building.getId() == buldingID).map(Building::getRooms).flatMap(List::stream).collect(Collectors.toList());
    }

    public static boolean buildingExsist (int buildingID) {
        return BUILDING_DATA.stream().anyMatch(building -> building.getId().equals(buildingID));
    }

    public static void addRoom(int buildingID, Room room){
        Building building = BUILDING_DATA.stream().filter(b -> b.getId().equals(buildingID)).findFirst().get();
        building.getRooms().add(room);
        postBuilding(building);
    }

    public static Optional<Room> findRoom(Integer roomID) {
        return getAllRooms().stream().filter(room -> room.getId().equals(roomID)).findFirst();
    }

    public static void updateRoom(Integer roomID, Room updated) {

        for (Building b: BUILDING_DATA) {
            for (Room room : b.getRooms()) {
                if(roomID.equals(room.getId())){
                    room.setName(updated.getName());
                    room.setFloor(updated.getFloor());
                    postBuilding(b);
                    return;
                }
            }
        }
    }

    public static void populateBuildingData() {
        HttpHeaders http = new HttpHeaders();
        http.setContentType(MediaType.APPLICATION_JSON);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Building[]> responseEntity = restTemplate.getForEntity("https://norveg.no/api/v1/buildings/all", Building[].class);

        BUILDING_DATA.clear();
        Collections.addAll(BUILDING_DATA, responseEntity.getBody());

        for (Building b: BUILDING_DATA) {
            for (Room room : b.getRooms()) {
                room.setBuildingId(b.getId());
            }
        }
    }

    public static void postBuilding(Building building){
        String url = "https://norveg.no/api/v1/buildings/add";

        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<Building> request = new HttpEntity<>(building);

        restTemplate.exchange(url, HttpMethod.POST, request, Building.class);
        populateBuildingData();
    }

    public static boolean deleteBuilding(Integer id) {
        String url = "https://norveg.no/api/v1/buildings/delete/";

        HttpHeaders http = new HttpHeaders();
        http.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Building> requestBody = new HttpEntity<>(http);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> exchange = restTemplate.exchange(url + id, HttpMethod.GET, requestBody, String.class);
        populateBuildingData();
        return exchange.getStatusCode().is2xxSuccessful();
    }

}
