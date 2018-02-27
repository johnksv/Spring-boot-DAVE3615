package com.s305089.software.oslometasgmt3.dao;

import com.s305089.software.oslometasgmt3.Model.Building;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingDao extends CrudRepository<Building, Integer> {
}
