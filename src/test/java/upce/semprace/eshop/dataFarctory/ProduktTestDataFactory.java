package upce.semprace.eshop.dataFarctory;

import org.springframework.beans.factory.annotation.Autowired;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.ProduktRepository;

public class ProduktTestDataFactory {
    @Autowired
    private ProduktRepository produktRepository;

    public Produkt addProdukt1() {
        Produkt produkt = new Produkt();
        produkt.setNazev("produkt1");
        produkt.setPopis("popis popis popis 1");
        produkt.setCena(500);
        produkt.setSlevaProcenta(0);
        produkt.setvNabidce(true);
        produkt.setCestaKObrazku("");
        return produkt;
    }

    public Produkt addProdukt2() {
        Produkt produkt = new Produkt();
        produkt.setNazev("produkt2");
        produkt.setPopis("popis popis popis 2");
        produkt.setCena(100);
        produkt.setSlevaProcenta(50);
        produkt.setvNabidce(true);
        produkt.setCestaKObrazku("");
        return produkt;
    }
}
