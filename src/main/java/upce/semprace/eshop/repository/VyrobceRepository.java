package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.entity.Uzivatel;
import upce.semprace.eshop.entity.Vyrobce;

import java.util.Optional;

public interface VyrobceRepository extends JpaRepository<Vyrobce, Long> {
    Optional<Vyrobce> findById(Long id);

    Vyrobce findByNazev(String nazev);

    void removeVyrobceById(Long id);
}
