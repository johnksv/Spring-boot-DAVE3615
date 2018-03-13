package com.s305089.software.oslometasgmt3.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;


public class Room {
    private Integer id;
    @NotNull
    private String name;
    @NotNull
    @Min(-5)
    @Max(100)
    private Integer floor;
    @JsonIgnore
    private Integer buildingId;

    @JsonProperty
    public Integer getBuildingId(){
        if(buildingId != null){
            return buildingId;
        }
        return -1;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getFloor() {
        return floor;
    }

    public void setFloor(Integer floor) {
        this.floor = floor;
    }

    public Integer getBuilding() {
        return buildingId;
    }

    public void setBuildingId(Integer buildingId) {
        this.buildingId = buildingId;
    }


    @Override
    public String toString() {
        return "Room{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", floor=" + floor +
                ", building=" + buildingId +
                '}';
    }
}
