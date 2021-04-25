package upce.semprace.eshop.dto;

import javax.persistence.Column;
import java.util.Date;

public class PridejZmenNakupDto {
    private Long id;
    private Date datumVytvoreni;
    private Integer objednavka;
    private Boolean stav;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDatumVytvoreni() {
        return datumVytvoreni;
    }

    public void setDatumVytvoreni(Date datumVytvoreni) {
        this.datumVytvoreni = datumVytvoreni;
    }

    public Integer getObjednavka() {
        return objednavka;
    }

    public void setObjednavka(Integer objednavka) {
        this.objednavka = objednavka;
    }

    public Boolean getStav() {
        return stav;
    }

    public void setStav(Boolean stav) {
        this.stav = stav;
    }
}
