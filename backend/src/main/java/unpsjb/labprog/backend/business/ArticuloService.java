package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import unpsjb.labprog.backend.model.ArticuloLicencia;

@Service
public class ArticuloService {
    
    @Autowired
    ArticuloRepository repository;

    public List<ArticuloLicencia> findAll() {
        List<ArticuloLicencia> result = new ArrayList<>();
        repository.findAll().forEach(e -> result.add(e));
        return result;
    }

    public ArticuloLicencia findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public ArticuloLicencia findByArticulo(String articulo) {
        return repository.findByArticulo(articulo).orElse(null);
    }

    public List<ArticuloLicencia> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }
}