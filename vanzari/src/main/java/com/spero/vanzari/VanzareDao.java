package com.spero.vanzari;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.simple.SimpleJdbcInsert;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class VanzareDao {

	@Autowired
	public JdbcTemplate jdbcTemplate;
	
	public List<VanzareDto> getAllVanzari(){
		  return jdbcTemplate.query(
	                "select * from vanzari order by data desc",
	                (rs, rowNum) ->
	                        new VanzareDto(
	                                rs.getLong("id"),
	                                rs.getDate("data"),
	                                rs.getString("Nume_client"),
	                                rs.getString("produs_denumire"),
	                                rs.getLong("produs_cod"),	                                
	                                rs.getDouble("pret"),
	                                rs.getString("achitat"),
	                                rs.getString("artizan")
	                        )
	        );
	    }

	public void saveSale(VanzareDto sale) {
		SimpleJdbcInsert simpleJdbcInsert = 
				  new SimpleJdbcInsert(jdbcTemplate).withTableName("vanzari");
			Map<String, Object> parameters = new HashMap<String, Object>();
		    parameters.put("data", sale.data.getTime());
		    parameters.put("Nume_client", sale.numeClient);
		    parameters.put("produs_denumire", sale.numeProdus);
		    parameters.put("produs_cod", sale.codProdus);
		    parameters.put("pret", sale.pretProdus);
		    parameters.put("achitat", sale.achitat);
		    parameters.put("artizan", sale.artizan);
		    simpleJdbcInsert.execute(parameters);
	}

	public void deleteSale(String id) {
		
		String deleteStatement = "DELETE FROM vanzari WHERE id=?";
		jdbcTemplate.update(deleteStatement, id);
	
	}

	public void setAchitat(String id, Boolean value) {
		String updateStm = "update vanzari set achitat = ? WHERE id=?";
		jdbcTemplate.update(updateStm, value, id);		
	}
	
}
