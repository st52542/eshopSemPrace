package upce.semprace.eshop.entity;

import javax.persistence.*;

@Entity
public class NakoupenaPolozka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer mnozstvi;

    @ManyToOne
    private Nakup nakup;

    @ManyToOne
    private Produkt produkt;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getMnozstvi(Integer value) {
        return mnozstvi;
    }

    public void setMnozstvi(Integer mnozstvi) {
        this.mnozstvi = mnozstvi;
    }


    public Produkt getProdukt() {
        return produkt;
    }

    public void setProdukt(Produkt produkt) {
        this.produkt = produkt;
    }


    public Nakup getNakup() {
        return nakup;
    }

    public void setNakup(Nakup nakup) {
        this.nakup = nakup;
    }
}
