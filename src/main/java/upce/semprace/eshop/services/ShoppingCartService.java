package upce.semprace.eshop.services;

import upce.semprace.eshop.entity.Produkt;

import java.util.Map;

public interface ShoppingCartService {
    void add(Long id);

    void remove(Long id);

    Map<Produkt, Integer> getCart();

    void checkout();
}
