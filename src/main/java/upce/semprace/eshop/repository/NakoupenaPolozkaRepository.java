package upce.semprace.eshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import upce.semprace.eshop.entity.NakoupenaPolozka;
import upce.semprace.eshop.entity.Produkt;

import java.util.Map;

public interface NakoupenaPolozkaRepository extends JpaRepository<NakoupenaPolozka,Long> {

    //void add(Long id);

   // void remove(Long id);

   // Map<NakoupenaPolozka, Integer> getCart();

    //void checkout();
}
