package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.NakoupenaPolozka;
import java.util.Optional;

public interface NakoupenaPolozkaRepository extends JpaRepository<NakoupenaPolozka,Long> {

    Optional<NakoupenaPolozka> findById(Long id);

}
