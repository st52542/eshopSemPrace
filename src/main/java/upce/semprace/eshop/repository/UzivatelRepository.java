package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.Uzivatel;

import java.util.Optional;

public interface UzivatelRepository extends JpaRepository<Uzivatel,Long> {

    Optional<Uzivatel> findById(Long id);

    Uzivatel findByJmeno(String jmeno);

    Uzivatel findByEmail(String email);

    void removeUzivatelById(Long id);
}
