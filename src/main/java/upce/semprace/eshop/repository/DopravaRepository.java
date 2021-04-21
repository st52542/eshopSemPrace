package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.Doprava;

import java.util.Optional;

public interface DopravaRepository extends JpaRepository<Doprava,Long> {

    Optional<Doprava> findById(Long id);

    Doprava findByPopis(String popis);

    Doprava findByCena(Integer cena);

    void removeDopravaById(Long id);
}
