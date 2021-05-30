package upce.semprace.eshop.services;

import upce.semprace.eshop.entity.Produkt;

import java.util.Map;

public interface CartService {
    void add(Long id);

    void delete(Long id);

    void order(Long idUzivatel, Long idDoprava, Long idPlatba);

    Map<String, Integer> getCart();
}
