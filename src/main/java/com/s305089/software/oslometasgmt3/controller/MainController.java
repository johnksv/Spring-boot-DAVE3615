package com.s305089.software.oslometasgmt3.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {

    @RequestMapping(method = RequestMethod.GET)
    public String hello (){
        return "Hello";
    }

    @RequestMapping(value = "populate",method = RequestMethod.GET)
    public String populate (){
        return "Hello";
    }


}
