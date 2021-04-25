package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import upce.semprace.eshop.dto.PridejZmenVyrobceDto;
import upce.semprace.eshop.entity.Vyrobce;
import upce.semprace.eshop.repository.VyrobceRepository;

public class VyrobceController {
    @Autowired
    VyrobceRepository vyrobceRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @GetMapping("/vyrobce-detail/{id}")
    public String zobrazDetailyVyrobce(@PathVariable(required = false) Long id, Model model) {
        model.addAttribute("vyrobce", vyrobceRepository.findById(id).get());
        return "vyrobce-detail";
    }

    @GetMapping("/vyrobce")
    public String zobrazVsechnyVyrobce(Model model) {
        model.addAttribute("vyrobceList", vyrobceRepository.findAll());
        return "vyrobce-list";
    }

    @GetMapping(value = {"/vyrobce-reg-form", "/vyrobce-reg-form/{id}"})
    public String zobrazVyrobce(@PathVariable(required = false) Long id, Model model) {
        if (id != null) {
            Vyrobce byId = vyrobceRepository.findById(id).orElse(new Vyrobce());
            PridejZmenVyrobceDto dto = new PridejZmenVyrobceDto();
            dto.setId(byId.getId());
            dto.setNazev(byId.getNazev());
            dto.setAdresa(byId.getAdresa());
            model.addAttribute("vyrobce", byId);
        } else {
            model.addAttribute("vyrobce", new PridejZmenVyrobceDto());
        }
        return "vyrobce-reg-form";
    }

    @PostMapping("/uloz-vyrobce")
    public String zpracujVyrobce(PridejZmenVyrobceDto pridejZmenVyrobceDto) {
        Vyrobce vyrobce = new Vyrobce();
        vyrobce.setId(pridejZmenVyrobceDto.getId());
        vyrobce.setNazev(pridejZmenVyrobceDto.getNazev());
        vyrobce.setAdresa(pridejZmenVyrobceDto.getAdresa());
        vyrobceRepository.save(vyrobce);
        return "redirect:/vyrobce";
    }
}
