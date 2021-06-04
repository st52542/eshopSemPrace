package upce.semprace.eshop.Controller;

import org.json.JSONException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.dto.PridejZmenNakupDto;
import upce.semprace.eshop.entity.Uzivatel;
import upce.semprace.eshop.repository.UzivatelRepository;
import upce.semprace.eshop.security.services.UserPrinciple;
import upce.semprace.eshop.services.CartService;
import upce.semprace.eshop.services.KosikPair;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class NakoupenaPolozkaController {
    @Autowired
    CartService cartService;

    @Autowired
    UzivatelRepository uzivatelRepository;

    @GetMapping("/add/{id}")
    public String cartAdd(@PathVariable Long id, Model model) {
        cartService.add(id);
        return "add";
    }

    @GetMapping("/delete/{id}")
    public String cartDelete(@PathVariable Long id, Model model) {
        cartService.delete(id);
        return "delete";
    }

    @GetMapping("/show/")
    @ResponseBody
    public List<KosikPair> showCart(Model model) throws JSONException {
        return cartService.getCart();
    }

    @PostMapping(value = {"","/"})
    public String order(@RequestBody PridejZmenNakupDto pridejZmenNakupDto) {
        UserPrinciple principle;
        Optional<Uzivatel> user = null;
        try {
            principle = (UserPrinciple) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            user = uzivatelRepository.findByUsername(principle.getUsername());
        } catch (Exception ignored) {
        }

        Long idUzivatel;
        if (user != null && user.isPresent()) {
            idUzivatel = uzivatelRepository.findById(user.get().getId()).get().getId();
        }else{
            idUzivatel = uzivatelRepository.findByUsername("xxxx").get().getId();
        }
        cartService.order(idUzivatel, pridejZmenNakupDto.getDoprava(), pridejZmenNakupDto.getPlatba());
        return "order";
    }

}
