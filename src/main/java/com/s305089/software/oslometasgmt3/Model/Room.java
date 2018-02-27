package com.s305089.software.oslometasgmt3.Model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Room {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotNull
    private String name;
    @NotNull
    private Integer floor;
    @ManyToOne()
    private Building building;
    @OneToOne
    private Category category;
}
