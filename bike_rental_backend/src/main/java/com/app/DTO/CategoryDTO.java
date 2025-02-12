package com.app.DTO;

public class CategoryDTO {
	private long categoryId;
	private String name;
	private byte[] image; 
	

	

	
public CategoryDTO(long categoryId, String name, byte[] image) {
		this.categoryId = categoryId;
		this.name = name;
		this.image = image;
	}



	public CategoryDTO(String name2, String imagePath) {
	// TODO Auto-generated constructor stub
}



	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public byte[] getImage() {
		return image;
	}

	public void setImage(byte[] image) {
		this.image = image;
	}

	public long getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(long categoryId) {
		this.categoryId = categoryId;
	}
}
