package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.Platba;

import java.util.List;
import java.util.Optional;

public interface PlatbaRepository extends JpaRepository<Platba,Long> {

    Optional<Platba> findById(Long id);

    Platba findByPrevod(Double prevod);

    void removePlatbaById(Long id);

    List<Platba> findAll();
}
