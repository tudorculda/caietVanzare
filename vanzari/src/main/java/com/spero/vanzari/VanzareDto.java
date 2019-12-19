package com.spero.vanzari;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Date;

public class VanzareDto {
	public Long id;
	public Date data;
	public String numeClient;
	public String numeProdus;
	public Long codProdus;
	public Double pretProdus;
	public Boolean achitat;
	public Boolean artizan;
	
	public VanzareDto() {};
	
	public VanzareDto(Long id, Date data, String numeClient, String numeProdus, Long codProdus, Double pretProdus,
			String achitat, String artizan) {
		super();
		this.id = id;
		this.data = data;
		this.numeClient = numeClient;
		this.numeProdus = numeProdus;
		this.codProdus = codProdus;
		this.pretProdus = pretProdus;
		this.achitat = Boolean.parseBoolean(achitat);
		this.artizan = Boolean.parseBoolean( artizan);
	}
	
}
