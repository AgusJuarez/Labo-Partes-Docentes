package unpsjb.labprog.backend.business;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import unpsjb.labprog.backend.model.Division;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Sort;

@Service
public class DivisionService {

    @Autowired
    DivisionRepository repository;

    public List<Division> findAll() {
        List<Division> result = new ArrayList<>();
        repository.findAllOrder().forEach(e -> result.add(e));
        return result;
    }

    public Page<Division> findByPage2(int page, int size) {
        Sort.Order order = Sort.Order.asc("anio"); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        return repository.findAll(
            PageRequest.of(page, size, sort));
    }

    public Page<Division> findByPage(int page, int size, String textoBusqueda) {
        Sort.Order order = Sort.Order.asc("anio"); // Orden ascendente, puedes usar Sort.Order.desc() para descendente
        Sort sort = Sort.by(order);
        PageRequest pageRequest = PageRequest.of(page, size, sort);
        if (textoBusqueda == null || textoBusqueda.trim().isEmpty()) {
            return repository.findAll(pageRequest);
        } else {
            return repository.findByAnioContainingIgnoreCase("%" + textoBusqueda.toLowerCase() + "%", pageRequest);
        }
    }

    public Division findById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Division findByAnioNumero(String anio, String numero) {
        return repository.findByAnioNumero(anio, numero).orElse(null);
    }
 
    @Transactional
    public Division save(Division division) {
        return repository.save(division);
    }

    @Transactional
    public Division delete(int id) {
        Division division = findById(id);
        if (division != null)
            repository.delete(division);

        return division;
    }

    public List<Division> search(String term) {
        return repository.search("%" + term.toUpperCase() + "%");
    }

    
    
}