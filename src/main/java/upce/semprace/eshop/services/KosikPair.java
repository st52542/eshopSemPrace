package upce.semprace.eshop.services;
import upce.semprace.eshop.entity.Produkt;

public class KosikPair {
    private Produkt produkt;
    private Integer mnozstvi;

    public KosikPair() {
    }

    public KosikPair(Produkt produkt, Integer mnozstvi) {
        this.produkt = produkt;
        this.mnozstvi = mnozstvi;
    }

    public Produkt getProdukt() {
        return produkt;
    }

    public void setProdukt(Produkt produkt) {
        this.produkt = produkt;
    }

    public Integer getMnozstvi() {
        return mnozstvi;
    }

    public void setMnozstvi(Integer mnozstvi) {
        this.mnozstvi = mnozstvi;
    }
}
