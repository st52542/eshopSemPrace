package upce.semprace.eshop.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import upce.semprace.eshop.entity.Produkt;
import java.util.List;
import java.util.Optional;

public interface ProduktRepository extends JpaRepository<Produkt, Long> {
    Optional<Produkt> findById(Long id);

    List<Produkt> findAll();

    Produkt findByNazev(String nazev);

    void removeProduktById(Long id);

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true ORDER BY pr.sleva_procenta DESC LIMIT 3", nativeQuery = true)
    List<Produkt> findTop();
}
