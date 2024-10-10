package unpsjb.labprog.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import unpsjb.labprog.backend.Response;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@SpringBootApplication
public class BackendApplication {

	private static final Logger logger = LoggerFactory.getLogger(BackendApplication.class);

	@RequestMapping(value = "/", method=RequestMethod.GET)
	public ResponseEntity home() {
		return Response.response(
			HttpStatus.OK,
			"Server Online",
			"Hola Labprog!");
	}

	public static void main(String[] args) {
		SpringApplication.run(BackendApplication.class, args);
		logger.info("Mensaje de ejemplo a la consola");
	}

}
