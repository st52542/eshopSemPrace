package upce.semprace.eshop.dto;

import upce.semprace.eshop.entity.Produkt;

import java.util.List;

public class PridejZmenNakupDto {
    private Long doprava;
    private Long platba;

    public List<Produkt> getPolozky() {
        return polozky;
    }

    public void setPolozky(List<Produkt> polozky) {
        this.polozky = polozky;
    }

    private List<Produkt> polozky;

    public Long getDoprava() {
        return doprava;
    }

    public void setDoprava(Long doprava) {
        this.doprava = doprava;
    }

    public Long getPlatba() {
        return platba;
    }

    public void setPlatba(Long platba) {
        this.platba = platba;
    }

}
