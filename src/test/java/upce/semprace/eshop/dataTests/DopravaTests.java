package upce.semprace.eshop.dataTests;

import upce.semprace.eshop.dataFarctory.DopravaTestDataFactory;
import upce.semprace.eshop.entity.Doprava;
import upce.semprace.eshop.repository.DopravaRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(DopravaTestDataFactory.class)
class DopravaTests {

    @Autowired
    private DopravaRepository dopravaRepository;

    @Autowired
    private DopravaTestDataFactory dopravaTestDataFactory;

    @Test
    void saveDoprava() {
        dopravaTestDataFactory.saveNewDoprava1();
        List<Doprava> all = dopravaRepository.findAll();
        Assertions.assertTrue(all.size()==1);
    }



    @Test
    void saveMoreDoprava() {
        dopravaTestDataFactory.saveNewDoprava1();
        dopravaTestDataFactory.saveNewDoprava2();
        dopravaTestDataFactory.saveNewDoprava3();
        List<Doprava> all = dopravaRepository.findAll();
        Assertions.assertTrue(all.size()==3);
    }



    @Test
    void findDopravaViaCena() {
        dopravaTestDataFactory.saveNewDoprava1();
        dopravaTestDataFactory.saveNewDoprava2();
        dopravaTestDataFactory.saveNewDoprava3();
        Doprava result = dopravaRepository.findByCena(109);
        Assertions.assertTrue(result.getCena()==109);
    }



    @Test
    void removeDopravaViaCena() {
        dopravaTestDataFactory.saveNewDoprava1();
        dopravaTestDataFactory.saveNewDoprava2();
        dopravaTestDataFactory.saveNewDoprava3();
        Doprava result = dopravaRepository.findByCena(109);
        dopravaRepository.removeDopravaById(result.getId());
        Assertions.assertTrue(dopravaRepository.findAll().size()==2);
    }

}
