package upce.semprace.eshop.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenPlatbaDto;
import upce.semprace.eshop.entity.Doprava;
import upce.semprace.eshop.entity.Platba;
import upce.semprace.eshop.repository.PlatbaRepository;

import java.util.List;

@RestController
@RequestMapping("/platba")
@CrossOrigin("http://localhost:3000")
public class PlatbaController {
    @Autowired
    PlatbaRepository platbaRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @GetMapping("/platba-detail/{id}")
    public String zobrazDetailyPlatby(@PathVariable(required = false) Long id, Model model) {
        model.addAttribute("platba", platbaRepository.findById(id).get());
        return "platba-detail";
    }

    @GetMapping("/platba")
    public String zobrazVsechnyPlatby(Model model) {
        model.addAttribute("platbaList", platbaRepository.findAll());
        return "platba-list";
    }

    @GetMapping(value = {"/platba-reg-form", "/platba-reg-form/{id}"})
    public String zobrazPlatbu(@PathVariable(required = false) Long id, Model model) {
        if (id != null) {
            Platba byId = platbaRepository.findById(id).orElse(new Platba());
            PridejZmenPlatbaDto dto = new PridejZmenPlatbaDto();
            dto.setId(byId.getId());
            dto.setPopis(byId.getPopis());
            dto.setPrevod(byId.getPrevod());
            model.addAttribute("platba", byId);
        } else {
            model.addAttribute("platba", new PridejZmenPlatbaDto());
        }
        return "platba-reg-form";
    }

    @PostMapping("/uloz-platbu")
    public String zpracujPlatbu(@RequestBody PridejZmenPlatbaDto pridejZmenPlatbaDto) {
        Platba platba = new Platba();
        platba.setId(pridejZmenPlatbaDto.getId());
        platba.setPopis(pridejZmenPlatbaDto.getPopis());
        platba.setPrevod(pridejZmenPlatbaDto.getPrevod());
        platbaRepository.save(platba);
        return "redirect:/platba";
    }
    @DeleteMapping("/smaz/{id}")
    public String smazDopravu(@PathVariable(required = false) Long id, Model model){
        platbaRepository.deleteById(id);
        return "/";
    }

    @GetMapping(value = {"","/"})
    public List<Platba> getProducts() {
        return platbaRepository.findAll();
    }
}