package com.app.Entity;



import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

@Entity
public class Category {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    
    @Lob 
    private byte[] image; 


    
    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Vehicle> vehicle;

   
   

    public String getName() {
        return name;
    }

    public Long getCategoryId() {
		return id;
	}

	public void setCategoryId(Long categoryId) {
		this.id = categoryId;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public void setName(String name) {
        this.name = name;
    }

    public List<Vehicle> getProducts() {
        return vehicle;
    }

    public void setProducts(List<Vehicle> vehicle) {
        this.vehicle = vehicle;
    }
}

