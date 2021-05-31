package upce.semprace.eshop.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;
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

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true ORDER BY pr.cena ASC", nativeQuery = true)
    List<Produkt> findACS();

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true ORDER BY pr.cena DESC", nativeQuery = true)
    List<Produkt> findDESC();

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true AND pr.cena BETWEEN 1 AND 20 ORDER BY pr.cena ASC", nativeQuery = true)
    List<Produkt> findOneToTwenty();

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true AND pr.cena BETWEEN 21 AND 60 ORDER BY pr.cena ASC", nativeQuery = true)
    List<Produkt> findTwentyOneToSixty();

    @Query(value = "SELECT * FROM Produkt pr WHERE pr.v_nabidce = true AND pr.cena > 60 ORDER BY pr.cena ASC", nativeQuery = true)
    List<Produkt> findSixtyOneToMax();

    @Transactional
    @Modifying
    @Query("update Produkt u set u.vNabidce = :status where u.id = :id")
    void zmenStav(@Param("status") boolean state, @Param("id") Long id);
}
