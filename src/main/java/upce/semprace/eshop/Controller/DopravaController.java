package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenDopravaDto;
import upce.semprace.eshop.entity.Doprava;
import upce.semprace.eshop.repository.DopravaRepository;

import java.util.List;
import java.util.Optional;

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
    public Optional<Doprava> zpracujDopravu(@RequestBody PridejZmenDopravaDto pridejZmenDopravaDto) {
        Doprava doprava = new Doprava();
        doprava.setId(pridejZmenDopravaDto.getId());
        doprava.setCena(pridejZmenDopravaDto.getCena());
        doprava.setPopis(pridejZmenDopravaDto.getPopis());
        dopravaRepository.save(doprava);
        return dopravaRepository.findById(doprava.getId());
    }
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public String smazDopravu(@PathVariable(required = false) Long id, Model model){
        Doprava odeber = dopravaRepository.findById(id).get();
        dopravaRepository.deleteById(id);
        return odeber.getPopis();
    }

    @GetMapping(value = {"","/"})
    public List<Doprava> getProducts() {
        return dopravaRepository.findAll();
    }

}
