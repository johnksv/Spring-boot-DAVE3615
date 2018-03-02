package com.s305089.software.oslometasgmt3.dao;

import com.s305089.software.oslometasgmt3.model.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomDao extends CrudRepository<Room, Integer> {
}
