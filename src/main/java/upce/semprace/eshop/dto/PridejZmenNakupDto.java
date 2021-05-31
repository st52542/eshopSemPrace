package upce.semprace.eshop.dto;

import javax.persistence.Column;
import java.util.Date;

public class PridejZmenNakupDto {
    private Long doprava;
    private Long platba;

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
