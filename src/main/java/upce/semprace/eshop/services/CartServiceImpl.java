package upce.semprace.eshop.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import upce.semprace.eshop.entity.NakoupenaPolozka;
import upce.semprace.eshop.entity.Nakup;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.*;

import java.util.*;

@Service
@Transactional
public class CartServiceImpl implements CartService {


    private Map<Produkt, Integer> kosik;
    @Autowired
    private final ProduktRepository produktRepository;
    @Autowired
    private final NakupRepository nakupRepository;
    @Autowired
    private final NakoupenaPolozkaRepository nakoupenaPolozkaRepository;
    @Autowired
    private final DopravaRepository dopravaRepository;
    @Autowired
    private final PlatbaRepository platbaRepository;
    @Autowired
    private final UzivatelRepository uzivatelRepository;

    public CartServiceImpl(ProduktRepository produktRepository, NakupRepository nakupRepository, NakoupenaPolozkaRepository nakoupenaPolozkaRepository, DopravaRepository dopravaRepository, PlatbaRepository platbaRepository, UzivatelRepository uzivatelRepository) {
        this.produktRepository = produktRepository;
        this.nakupRepository = nakupRepository;
        this.nakoupenaPolozkaRepository = nakoupenaPolozkaRepository;
        this.dopravaRepository = dopravaRepository;
        this.platbaRepository = platbaRepository;
        this.uzivatelRepository = uzivatelRepository;
        kosik = new HashMap<>();
    }

    @Override
    public void add(Long id) {
        Produkt product = produktRepository.findById(id).orElseThrow(NoSuchElementException::new);
        boolean nalezeno = false;
        for (Map.Entry<Produkt, Integer> entry : kosik.entrySet()) {
            if (Objects.equals(id, entry.getKey().getId())) {
                kosik.replace(entry.getKey(), entry.getValue() + 1);
                nalezeno = true;
            }
        }
        if (!nalezeno) {
            kosik.put(product, 1);
        }
    }

    @Override
    public void delete(Long id) {
        for (Map.Entry<Produkt, Integer> entry : kosik.entrySet()) {
            if (Objects.equals(id, entry.getKey().getId())) {
                if (entry.getValue() == 1) {
                    kosik.remove(entry.getKey());
                } else {
                    kosik.replace(entry.getKey(), entry.getValue() - 1);
                }

            }
        }
    }

    @Override
    public Map<String, Integer> getCart() {
        Map<String,Integer> cartForJson = new HashMap<>();
        for (Produkt prod : kosik.keySet())
            cartForJson.put(prod.getNazev(),kosik.get(prod));
        return cartForJson;
    }

    @Override
    public void order(Long idUzivatel, Long idDoprava, Long idPlatba) {
        Date datum = new Date();
        Nakup nakup = new Nakup();
        nakup.setDoprava(dopravaRepository.findById(idDoprava).get());
        nakup.setUzivatel(uzivatelRepository.findById(idUzivatel).get());
        nakup.setPlatba(platbaRepository.findById(idPlatba).get());
        nakup.setDatumVytvoreni(datum);
        nakup.setObjednavka(-((int) datum.getTime()));
        nakup.setStav(Boolean.FALSE);
        nakupRepository.save(nakup);

        for (Map.Entry<Produkt, Integer> entry : kosik.entrySet()) {
            NakoupenaPolozka nakoupenaPolozka = new NakoupenaPolozka();
            nakoupenaPolozka.setProdukt(entry.getKey());
            nakoupenaPolozka.setMnozstvi(entry.getValue());
            nakoupenaPolozkaRepository.save(nakoupenaPolozka);
            nakoupenaPolozka.setNakup(nakup);
            nakupRepository.save(nakup);
        }
        kosik.clear();

    }
}
