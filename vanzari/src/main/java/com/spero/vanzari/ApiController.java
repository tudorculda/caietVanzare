package com.spero.vanzari;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class ApiController {
	
	Logger logger = LoggerFactory.getLogger(ApiController.class);
	
	@Autowired
	private VanzareDao dao;
	
	@GetMapping("/getVanzari")
	public List<VanzareDto> getAll(){
		logger.debug("Returneaza toate vanzarile");
		return dao.getAllVanzari();
	}
	
	@PostMapping("/salveazaVanzare")
	public void saveSale(@RequestBody VanzareDto sale) {
		logger.debug("Salvare o noua vanzare");
		dao.saveSale(sale);
	}
	
	@PostMapping("/setAchitat/{id}")
	public void setAchitat(@PathVariable String id, @RequestBody Boolean value) {
		logger.debug("Modificare achtat pentru id=");
		dao.setAchitat(id, value);
	}
	
	@PostMapping("/stergeVanzarea")
	public void deleteSale(@RequestBody String id) {
		logger.debug("Sterge salvarea cu id =",id);
		dao.deleteSale(id);
	}

}
