package upce.semprace.eshop.Controller;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import upce.semprace.eshop.entity.Produkt;
import upce.semprace.eshop.services.CartService;

import java.util.Map;

@RestController
@RequestMapping("/cart")
@CrossOrigin("http://localhost:3000")
public class NakoupenaPolozkaController {
    @Autowired
    CartService cartService;

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
    public Map<String,Integer> showCart(Model model) throws JSONException {
        return cartService.getCart();
    }

    @GetMapping("/order/{idUzivatel}/{idDoprava}/{idPlatba}")
    public String order(@PathVariable Long idUzivatel, @PathVariable Long idDoprava, @PathVariable Long idPlatba, Model model) {
        cartService.order(idUzivatel, idDoprava, idPlatba);
        return "order";
    }

}
