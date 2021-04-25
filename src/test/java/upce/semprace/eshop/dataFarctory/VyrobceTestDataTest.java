package upce.semprace.eshop.dataFarctory;

import org.springframework.beans.factory.annotation.Autowired;
import upce.semprace.eshop.entity.Vyrobce;
import upce.semprace.eshop.repository.VyrobceRepository;

public class VyrobceTestDataTest {
    @Autowired
    private VyrobceRepository vyrobceRepository;

    public Vyrobce addVyrobce1() {
        Vyrobce vyrobce = new Vyrobce();
        vyrobce.setNazev("vyrobce1");
        vyrobce.setAdresa("tamATam1");
        return vyrobce;
    }

    public Vyrobce addVyrobce2() {
        Vyrobce vyrobce = new Vyrobce();
        vyrobce.setNazev("vyrobce2");
        vyrobce.setAdresa("tamATam2");
        return vyrobce;
    }
}
