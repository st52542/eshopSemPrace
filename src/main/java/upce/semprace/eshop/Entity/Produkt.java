package upce.semprace.eshop.Entity;

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
    @OneToMany(mappedBy = "id")
    private Set<NakoupenaPolozka> nakoupenaPolozka;
    @ManyToOne
    private Vyrobce vyrobce;
}
