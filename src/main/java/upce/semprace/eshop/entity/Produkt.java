package upce.semprace.eshop.entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Produkt {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nazev;
    @Column(nullable = false)
    private String popis;
    @Column(nullable = false)
    private int cena;
    @Column(nullable = false)
    private int slevaProcenta;
    @Column(nullable = false)
    private boolean vNabidce;
    @Column
    private String cestaKObrazku;

    public NakoupenaPolozka getNakoupenaPolozka() {
        return nakoupenaPolozka;
    }

    public void setNakoupenaPolozka(NakoupenaPolozka nakoupenaPolozka) {
        this.nakoupenaPolozka = nakoupenaPolozka;
    }

    @ManyToOne
    private NakoupenaPolozka nakoupenaPolozka;
    @ManyToOne
    private Vyrobce vyrobce;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNazev() {
        return nazev;
    }

    public void setNazev(String nazev) {
        this.nazev = nazev;
    }

    public String getPopis() {
        return popis;
    }

    public void setPopis(String popis) {
        this.popis = popis;
    }

    public int getCena() {
        return cena;
    }

    public void setCena(int cena) {
        this.cena = cena;
    }

    public int getSlevaProcenta() {
        return slevaProcenta;
    }

    public void setSlevaProcenta(int slevaProcenta) {
        this.slevaProcenta = slevaProcenta;
    }

    public boolean isvNabidce() {
        return vNabidce;
    }

    public void setvNabidce(boolean vNabidce) {
        this.vNabidce = vNabidce;
    }

    public String getCestaKObrazku() {
        return cestaKObrazku;
    }

    public void setCestaKObrazku(String cestaKObrazku) {
        this.cestaKObrazku = cestaKObrazku;
    }


    public Vyrobce getVyrobce() {
        return vyrobce;
    }

    public void setVyrobce(Vyrobce vyrobce) {
        this.vyrobce = vyrobce;
    }
}
