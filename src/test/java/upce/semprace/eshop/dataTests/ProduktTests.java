package upce.semprace.eshop.dataTests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import upce.semprace.eshop.dataFarctory.ProduktTestDataFactory;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.ProduktRepository;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(ProduktTestDataFactory.class)
public class ProduktTests {

    @Autowired
    private ProduktRepository produktRepository;

    @Autowired
    private ProduktTestDataFactory produktTestDataFactory;

    @Test
    void saveProdukt() {
        produktTestDataFactory.addProdukt1();
        List<Produkt> all = produktRepository.findAll();
        Assertions.assertTrue(all.size() == 1);
    }


    @Test
    void saveMoreDoprava() {
        produktTestDataFactory.addProdukt1();
        produktTestDataFactory.addProdukt2();
        produktTestDataFactory.addProdukt3();
        List<Produkt> all = produktRepository.findAll();
        Assertions.assertTrue(all.size() == 3);
    }


    @Test
    void findDopravaViaNazev() {
        produktTestDataFactory.addProdukt1();
        produktTestDataFactory.addProdukt2();
        produktTestDataFactory.addProdukt3();
        Produkt result = produktRepository.findByNazev("produkt2");
        Assertions.assertTrue(result.getNazev() == "produkt2");
    }


    @Test
    void removeDopravaViaNazev() {
        produktTestDataFactory.addProdukt1();
        produktTestDataFactory.addProdukt2();
        produktTestDataFactory.addProdukt3();
        Produkt result = produktRepository.findByNazev("produkt2");
        produktRepository.removeProduktById(result.getId());
        Assertions.assertTrue(produktRepository.findAll().size() == 2);
    }
}
