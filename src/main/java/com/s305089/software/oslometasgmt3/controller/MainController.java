package com.s305089.software.oslometasgmt3.controller;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MainController {

    public static final String API_V1 = "/api/v1";


    private Logger log = LogManager.getRootLogger();

    @RequestMapping(value={"", "/", "building/**"}, method = RequestMethod.GET)
    public ModelAndView hello() {
        return new ModelAndView("index");
    }


}
