package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenDopravaDto;
import upce.semprace.eshop.entity.Doprava;
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

    @PostMapping(value = {"","/"})
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String zpracujDopravu(@RequestBody PridejZmenDopravaDto pridejZmenDopravaDto) {
        Doprava doprava = new Doprava();
        doprava.setId(pridejZmenDopravaDto.getId());
        doprava.setCena(pridejZmenDopravaDto.getCena());
        doprava.setPopis(pridejZmenDopravaDto.getPopis());
        dopravaRepository.save(doprava);
        return "redirect:/doprava";
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String smazDopravu(@PathVariable(required = false) Long id, Model model){
        dopravaRepository.deleteById(id);
        return "/";
    }

    @GetMapping(value = {"","/"})
    public List<Doprava> getProducts() {
        return dopravaRepository.findAll();
    }

}
