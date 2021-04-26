package upce.semprace.eshop.dataTests;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import upce.semprace.eshop.dataFarctory.VyrobceTestDataTest;
import upce.semprace.eshop.entity.Vyrobce;
import upce.semprace.eshop.repository.VyrobceRepository;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(VyrobceTestDataTest.class)
public class VyrobceTests {
    @Autowired
    private VyrobceRepository vyrobceRepository;

    @Autowired
    private VyrobceTestDataTest vyrobceTestDataTest;

    @Test
    void saveVyrobce() {
        vyrobceTestDataTest.addVyrobce1();
        List<Vyrobce> all = vyrobceRepository.findAll();
        Assertions.assertTrue(all.size() == 1);
    }


    @Test
    void saveMoreVyrobce() {
        vyrobceTestDataTest.addVyrobce1();
        vyrobceTestDataTest.addVyrobce2();
        vyrobceTestDataTest.addVyrobce3();
        List<Vyrobce> all = vyrobceRepository.findAll();
        Assertions.assertTrue(all.size() == 3);
    }


    @Test
    void findVyrobceViaNazev() {
        vyrobceTestDataTest.addVyrobce1();
        vyrobceTestDataTest.addVyrobce2();
        vyrobceTestDataTest.addVyrobce3();
        Vyrobce result = vyrobceRepository.findByNazev("vyrobce2");
        Assertions.assertTrue(result.getNazev() == "vyrobce2");
    }


    @Test
    void removeVyrobceViaNazev() {
        vyrobceTestDataTest.addVyrobce1();
        vyrobceTestDataTest.addVyrobce2();
        vyrobceTestDataTest.addVyrobce3();
        Vyrobce result = vyrobceRepository.findByNazev("vyrobce2");
        vyrobceRepository.removeVyrobceById(result.getId());
        Assertions.assertTrue(vyrobceRepository.findAll().size() == 2);
    }
}
