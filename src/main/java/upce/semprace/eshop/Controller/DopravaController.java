package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenDopravaDto;
import upce.semprace.eshop.entity.Doprava;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.DopravaRepository;

import java.util.List;

@RestController
@RequestMapping("/doprava")
@CrossOrigin("http://localhost:3000")
public class DopravaController {
    @Autowired
    DopravaRepository dopravaRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @GetMapping("/doprava-detail/{id}")
    public String zobrazDetailyDopravy(@PathVariable(required = false) Long id, Model model) {
        model.addAttribute("doprava", dopravaRepository.findById(id).get());
        return "doprava-detail";
    }

    @GetMapping("/doprava")
    public String zobrazVsechnuDopravu(Model model) {
        model.addAttribute("dopravaList", dopravaRepository.findAll());
        return "doprava-list";
    }

    @GetMapping(value = {"/doprava-reg-form", "/doprava-reg-form/{id}"})
    public String zobrazDopravu(@PathVariable(required = false) Long id, Model model) {
        if (id != null) {
            Doprava byId = dopravaRepository.findById(id).orElse(new Doprava());
            PridejZmenDopravaDto dto = new PridejZmenDopravaDto();
            dto.setId(byId.getId());
            dto.setPopis(byId.getPopis());
            dto.setCena(byId.getCena());
            model.addAttribute("doprava", byId);
        } else {
            model.addAttribute("doprava", new PridejZmenDopravaDto());
        }
        return "doprava-reg-form";
    }

    @PostMapping("/uloz-dopravu")
    public String zpracujDopravu(PridejZmenDopravaDto pridejZmenDopravaDto) {
        Doprava doprava = new Doprava();
        doprava.setId(pridejZmenDopravaDto.getId());
        doprava.setCena(pridejZmenDopravaDto.getCena());
        doprava.setPopis(pridejZmenDopravaDto.getPopis());
        dopravaRepository.save(doprava);
        return "redirect:/doprava";
    }
    @DeleteMapping("/smaz/{id}")
    public String smazDopravu(@PathVariable(required = false) Long id, Model model){
        dopravaRepository.deleteById(id);
        return "/";
    }

    @GetMapping(value = {"","/"})
    public List<Doprava> getProducts() {
        return dopravaRepository.findAll();
    }

}
