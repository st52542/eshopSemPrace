package upce.semprace.eshop.services;

import upce.semprace.eshop.entity.Produkt;

import java.util.List;

public interface CartService {

    void order(Long idUzivatel, Long idDoprava, Long idPlatba, List<Produkt> polozky);

}
