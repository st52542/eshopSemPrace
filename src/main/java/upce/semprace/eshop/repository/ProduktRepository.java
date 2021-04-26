package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.Doprava;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.entity.Uzivatel;
import upce.semprace.eshop.entity.Vyrobce;

import java.util.Optional;

public interface ProduktRepository extends JpaRepository<Produkt, Long> {
    Optional<Produkt> findById(Long id);

    Produkt findByNazev(String nazev);

    void removeProduktById(Long id);
}
