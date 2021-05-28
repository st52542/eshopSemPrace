package upce.semprace.eshop.Controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.entity.Nakup;
import upce.semprace.eshop.entity.Platba;
import upce.semprace.eshop.repository.NakupRepository;
import upce.semprace.eshop.repository.PlatbaRepository;

import java.util.List;

@RestController
@RequestMapping("/nakup")
@CrossOrigin("http://localhost:3000")
public class NakupController {
    @Autowired
    NakupRepository nakupRepository;

    @ExceptionHandler(RuntimeException.class)
    public String ochranaChyb() {
        return "chyba";
    }

    @GetMapping(value = {"","/"})
    public List<Nakup> getProducts() {
        return nakupRepository.findAll();
    }

    @GetMapping("/nakup-detail/{id}")
    public String zobrazDetailyPlatby(@PathVariable(required = false) Long id, Model model) {
        model.addAttribute("platba", nakupRepository.findById(id).get());
        return "platba-detail";
    }
}
