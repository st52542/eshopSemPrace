package upce.semprace.eshop.services;

import java.util.List;
import java.util.Map;

public interface CartService {
    void add(Long id);

    void delete(Long id);

    void order(Long idUzivatel, Long idDoprava, Long idPlatba);

    List<KosikPair> getCart();
    List<KosikPair> getCartMore();
}