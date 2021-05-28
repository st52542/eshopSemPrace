package upce.semprace.eshop.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.repository.NakoupenaPolozkaRepository;
import upce.semprace.eshop.repository.NakupRepository;
import upce.semprace.eshop.services.ShoppingCartService;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class NakoupenaPolozkaController {
    @Autowired
    ShoppingCartService shoppingCartService;

    @PostMapping("/shopping-cart-add/{id}")
    public String shoppingCartAdd(@RequestBody Long id, Model model) {
        shoppingCartService.add(id);
        return "redirect:/shopping-cart";
    }

    @GetMapping("/shopping-cart")
    public String showShoppingCart(Model model) {
        model.addAttribute("shoppingCart", shoppingCartService.getCart());
        return "shopping-cart";
    }
}
