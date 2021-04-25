package upce.semprace.eshop.dto;

import javax.persistence.Column;

public class PridejZmenNakoupenaPolozkaDto {
    private Long id;
    private Integer mnozstvi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMnozstvi() {
        return mnozstvi;
    }

    public void setMnozstvi(Integer mnozstvi) {
        this.mnozstvi = mnozstvi;
    }
}
