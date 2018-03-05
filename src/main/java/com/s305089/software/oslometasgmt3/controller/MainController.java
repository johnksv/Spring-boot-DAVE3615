package com.s305089.software.oslometasgmt3.controller;

import com.s305089.software.oslometasgmt3.model.Building;
import com.s305089.software.oslometasgmt3.model.Category;
import com.s305089.software.oslometasgmt3.model.Room;
import com.s305089.software.oslometasgmt3.dao.BuildingDao;
import com.s305089.software.oslometasgmt3.dao.CategoryDao;
import com.s305089.software.oslometasgmt3.dao.RoomDao;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    private Logger log = LogManager.getRootLogger();

    @Autowired
    BuildingDao buildingDao;
    @Autowired
    RoomDao roomDao;


    @RequestMapping(value={"", "/", "building/**"}, method = RequestMethod.GET)
    public ModelAndView hello() {
        return new ModelAndView("index");
    }

    @RequestMapping(value = "populate", method = RequestMethod.GET)
    @ResponseBody
    public String populate() {
        Building b = new Building();
        b.setName("OsloMet");
        b.setAddress("Pilestredet 35");

        Room r = new Room();
        r.setName("PI-556");
        r.setFloor(5);
        r.setBuilding(b);

        Category c = new Category();
        c.setName("Auditorium");

        r.setCategory(c);

        buildingDao.save(b);
        roomDao.save(r);
        return "Is now populated";
    }


}
