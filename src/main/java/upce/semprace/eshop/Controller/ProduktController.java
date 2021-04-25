package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import upce.semprace.eshop.dto.PridejZmenProduktDto;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.ProduktRepository;

public class ProduktController {
    @Autowired
    ProduktRepository produktRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @GetMapping("/produkt-detail/{id}")
    public String zobrazDetailyProdukt(@PathVariable(required = false) Long id, Model model) {
        model.addAttribute("produkt", produktRepository.findById(id).get());
        return "produkt-detail";
    }

    @GetMapping("/produkt")
    public String zobrazVsechnyProdukt(Model model) {
        model.addAttribute("produktList", produktRepository.findAll());
        return "produkt-list";
    }

    @GetMapping(value = {"/produkt-reg-form", "/produkt-reg-form/{id}"})
    public String zobrazProdukt(@PathVariable(required = false) Long id, Model model) {
        if (id != null) {
            Produkt byId = produktRepository.findById(id).orElse(new Produkt());
            PridejZmenProduktDto dto = new PridejZmenProduktDto();
            dto.setId(byId.getId());
            dto.setNazev(byId.getNazev());
            dto.setPopis(byId.getPopis());
            dto.setCena(byId.getCena());
            dto.setSlevaProcenta(byId.getSlevaProcenta());
            dto.setvNabidce(byId.isvNabidce());
            dto.setCestaKObrazku(byId.getCestaKObrazku());
            model.addAttribute("produkt", byId);
        } else {
            model.addAttribute("produkt", new PridejZmenProduktDto());
        }
        return "produkt-reg-form";
    }

    @PostMapping("/uloz-produkt")
    public String zpracujProdukt(PridejZmenProduktDto pridejZmenProduktDto) {
        Produkt produkt = new Produkt();
        produkt.setId(pridejZmenProduktDto.getId());
        produkt.setNazev(pridejZmenProduktDto.getNazev());
        produkt.setPopis(pridejZmenProduktDto.getPopis());
        produkt.setCena(pridejZmenProduktDto.getCena());
        produkt.setSlevaProcenta(pridejZmenProduktDto.getSlevaProcenta());
        produkt.setvNabidce(pridejZmenProduktDto.isvNabidce());
        produkt.setCestaKObrazku(pridejZmenProduktDto.getCestaKObrazku());
        produktRepository.save(produkt);
        return "redirect:/produkt";
    }
}
