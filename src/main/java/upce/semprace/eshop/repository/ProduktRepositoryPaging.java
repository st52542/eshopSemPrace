package upce.semprace.eshop.repository;
import org.springframework.data.domain.Page;
import org.springframework.data.repository.PagingAndSortingRepository;
import upce.semprace.eshop.entity.Produkt;
import org.springframework.data.domain.Pageable;

public interface ProduktRepositoryPaging extends PagingAndSortingRepository<Produkt, Long> {
    Page<Produkt> findAll(Pageable pageable);
}
