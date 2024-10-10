package unpsjb.labprog.backend.presenter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import unpsjb.labprog.backend.Response;
import unpsjb.labprog.backend.business.ArticuloService;
import unpsjb.labprog.backend.model.ArticuloLicencia;

@RestController
@RequestMapping("articulo")
public class ArticuloPresenter {
    
    @Autowired
    ArticuloService service;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<Object> findAll() {
        return Response.ok(service.findAll());
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<Object> findById(@PathVariable("id") int id) {
        ArticuloLicencia articuloOrNull = service.findById(id);
        return (articuloOrNull != null) ? Response.ok(articuloOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/{articulo}", method = RequestMethod.GET)
    public ResponseEntity<Object> findByArticulo(@PathVariable("articulo") String articulo) {
        ArticuloLicencia articuloOrNull = service.findByArticulo(articulo);
        return (articuloOrNull != null) ? Response.ok(articuloOrNull) : Response.notFound();
    }

    @RequestMapping(value = "/search/{term}", method = RequestMethod.GET)
    public ResponseEntity<Object> search(@PathVariable("term") String term) {
        return Response.ok(service.search(term));
    }
}