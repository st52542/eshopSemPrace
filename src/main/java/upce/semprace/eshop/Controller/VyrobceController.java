package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenVyrobceDto;
import upce.semprace.eshop.entity.Vyrobce;
import upce.semprace.eshop.repository.VyrobceRepository;

import java.util.List;

@RestController
@RequestMapping("/vyrobce")
@CrossOrigin("http://localhost:3000")
public class VyrobceController {
    @Autowired
    VyrobceRepository vyrobceRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @PostMapping(value = {"","/"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String zpracujVyrobce(@RequestBody PridejZmenVyrobceDto pridejZmenVyrobceDto) {
        Vyrobce vyrobce = new Vyrobce();
        vyrobce.setId(pridejZmenVyrobceDto.getId());
        vyrobce.setNazev(pridejZmenVyrobceDto.getNazev());
        vyrobce.setAdresa(pridejZmenVyrobceDto.getAdresa());
        vyrobceRepository.save(vyrobce);
        return "redirect:/vyrobce";
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String smazDopravu(@PathVariable(required = false) Long id, Model model){
        vyrobceRepository.deleteById(id);
        return "/";
    }

    @GetMapping(value = {"","/"})
    public List<Vyrobce> getProducts() {
        return vyrobceRepository.findAll();
    }
}
