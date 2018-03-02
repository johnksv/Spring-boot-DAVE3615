package com.s305089.software.oslometasgmt3.dao;

import com.s305089.software.oslometasgmt3.model.Building;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BuildingDao extends CrudRepository<Building, Integer> {
}
