package upce.semprace.eshop.entity;

import javax.persistence.*;
import java.util.Set;
@Entity
public class Vyrobce {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String nazev;
    @Column(nullable = false)
    private String adresa;
    @OneToMany(mappedBy = "id")
    private Set<Produkt> produkt;
}
