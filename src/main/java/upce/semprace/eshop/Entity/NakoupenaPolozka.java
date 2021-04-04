package upce.semprace.eshop.Entity;

import javax.persistence.*;
import java.util.Set;

@Entity
public class NakoupenaPolozka {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Integer mnozstvi;

    @OneToMany(mappedBy = "id")
    private Set<Nakup> nakup;

    @ManyToOne
    private Produkt produkt;

    public void setId(Long id) {
        this.id = id;
    }


    public Long getId() {
        return id;
    }

    public Integer getMnozstvi() {
        return mnozstvi;
    }

    public void setMnozstvi(Integer mnozstvi) {
        this.mnozstvi = mnozstvi;
    }

    public Set<Nakup> getNakup() {
        return nakup;
    }

    public void setNakup(Set<Nakup> nakup) {
        this.nakup = nakup;
    }
}
