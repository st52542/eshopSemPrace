package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenProduktDto;
import upce.semprace.eshop.dto.StrankaProduktDto;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.repository.ProduktRepository;
import upce.semprace.eshop.repository.ProduktRepositoryPaging;
import upce.semprace.eshop.repository.VyrobceRepository;
import java.util.List;

@RestController
@RequestMapping("/produkt")
@CrossOrigin("http://localhost:3000")
public class ProduktController {
    @Autowired
    ProduktRepository produktRepository;

    @Autowired
    ProduktRepositoryPaging produktRepositoryPaging;

    @Autowired
    VyrobceRepository vyrobceRepository;

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
    public String zpracujProdukt(@RequestBody PridejZmenProduktDto pridejZmenProduktDto) {
        Produkt produkt = new Produkt();
        produkt.setId(pridejZmenProduktDto.getId());
        produkt.setNazev(pridejZmenProduktDto.getNazev());
        produkt.setPopis(pridejZmenProduktDto.getPopis());
        produkt.setCena(pridejZmenProduktDto.getCena());
        produkt.setSlevaProcenta(pridejZmenProduktDto.getSlevaProcenta());
        produkt.setvNabidce(pridejZmenProduktDto.isvNabidce());
        produkt.setCestaKObrazku(pridejZmenProduktDto.getCestaKObrazku());
        produkt.setVyrobce(vyrobceRepository.findById(pridejZmenProduktDto.getVyrobce()).get());
        produktRepository.save(produkt);
        return "redirect:/produkt";
    }

    @DeleteMapping("/smaz/{id}")
    public String smazProdukt(@PathVariable(required = false) Long id, Model model) {
        produktRepository.deleteById(id);
        return "/";
    }

    @GetMapping(value = {"/all-products"})
    public List<Produkt> getProducts() {
        return produktRepository.findAll();
    }

    @GetMapping(value = {"", "/"})
    public List<Produkt> getTopProducts() {
        return produktRepository.findTop();
    }

    @GetMapping(value = {"/productASC"})
    public List<Produkt> getProductsASC() {
        return produktRepository.findACS();
    }

    @GetMapping(value = {"/productDESC"})
    public List<Produkt> getProductsDESC() {
        return produktRepository.findDESC();
    }

    @GetMapping(value = {"/productLow"})
    public List<Produkt> getProductsLow() {
        return produktRepository.findOneToTwenty();
    }

    @GetMapping(value = {"/productMiddle"})
    public List<Produkt> getProductsMiddle() {
        return produktRepository.findTwentyOneToSixty();
    }

    @GetMapping(value = {"/productHigh"})
    public List<Produkt> getProductsHigh() {
        return produktRepository.findSixtyOneToMax();
    }

    @PostMapping(value = {"/product/page"})
    public Page<Produkt> getProductsPaging(@RequestBody StrankaProduktDto strankaProduktDto) {
        Pageable secondPageWithFiveElements = PageRequest.of(strankaProduktDto.getMin(), strankaProduktDto.getMax());
        return produktRepositoryPaging.findAll(secondPageWithFiveElements);
    }
}
