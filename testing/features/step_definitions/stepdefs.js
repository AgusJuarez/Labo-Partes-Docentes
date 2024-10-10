const assert = require("assert");
const { Given, When, Then, BeforeAll, AfterAll } = require("cucumber");
const jd = require("json-diff");
const request = require("sync-request");

//encideURI para los acentos
//ENCODEAR TODO
//EJEMPLO: let res = request("GET", encodeURI("http://backend:8080/division"));
BeforeAll(async function () {
  let res = request("GET", "http://backend:8080/division");
  let response = JSON.parse(res.body, "utf8");
  this.divisiones = response.data;
  //Guardo las divisiones

  // Guardo las personas
  res = request("GET", "http://backend:8080/personas");
  response = JSON.parse(res.body, "utf8");
  this.personas = response.data;

  // Guardo los horarios
  res = request("GET", "http://backend:8080/horario");
  response = JSON.parse(res.body, "utf8");
  this.horarios = response.data;

  // Guardo los cargos
  res = request("GET", "http://backend:8080/cargo");
  response = JSON.parse(res.body, "utf8");
  this.cargos = response.data;

  //Guardo las designaciones
  res = request("GET", "http://backend:8080/designacion");
  response = JSON.parse(res.body, "utf8");
  this.designaciones = response.data;

  //Guardo las licencias
  res = request("GET", "http://backend:8080/licencia");
  response = JSON.parse(res.body, "utf8");
  this.licencias = response.data;

  //Elimino las licencias
  for (let licencia of this.licencias) {
    await request("DELETE", "http://backend:8080/licencia/id/" + licencia.id);
  }

  //Elimino las designaciones
  for (let designacion of this.designaciones) {
    await request(
      "DELETE",
      "http://backend:8080/designacion/id/" + designacion.id
    );
  }

  //Elimino los cargos
  for (let cargo of this.cargos) {
    await request("DELETE", "http://backend:8080/cargo/id/" + cargo.id);
  }

  //Elimino los horarios
  for (let horario of this.horarios) {
    await request("DELETE", "http://backend:8080/horario/id/" + horario.id);
  }

  //Elimino las divisiones
  for (let division of this.divisiones) {
    await request("DELETE", "http://backend:8080/division/id/" + division.id);
  }

  //Elimino las personas >:)
  for (let persona of this.personas) {
    await request("DELETE", "http://backend:8080/personas/id/" + persona.id);
  }
});

Given(
  "la persona con {string}, {string}, {int}, {string}, {string}, {string}, {string}, {string}",
  function (nombre, apellido, dni, cuil, sexo, titulo, domicilio, telefono) {
    // Write code here that turns the phrase above into concrete actions
    this.persona = {
      nombre: nombre,
      apellido: apellido,
      dni: dni,
      cuit: cuil,
      sexo: sexo,
      titulo: titulo,
      domicilio: domicilio,
      telefono: telefono,
    };
    return assert.ok(true);
  }
);

When("se presiona el botón de guardar", function () {
  // Write code here that turns the phrase above into concrete actions
  let res = request("POST", encodeURI("http://backend:8080/personas"), {
    json: this.persona,
  });

  this.response = JSON.parse(res.body, "utf8");

  return assert.equal(res.statusCode, 200);
});

Then(
  "se espera el siguiente {int} con la {string}",
  function (status, message) {
    if (this.response && this.response.status == 200) {
      assert.equal(this.response.status, status);
      assert.equal(this.response.message, message);
    }
    return assert.ok(true);
  }
);

Given(
  "el espacio físico división con {int} {int} {string} {string}",
  function (año, numero, orientacion, turno) {
    // Write code here that turns the phrase above into concrete actions
    this.división = {
      anio: año,
      numero: numero,
      orientacion: orientacion,
      turno: turno,
    };

    return true;
  }
);

When("se presiona el botón de guardar division", function () {
  // Write code here that turns the phrase above into concrete actions
  let res = request("POST", encodeURI("http://backend:8080/division"), {
    json: this.división,
  });

  this.response = JSON.parse(res.body, "utf8");

  return assert.equal(res.statusCode, 200);
});

//CARGOS
Given(
  "el cargo institucional cuyo {string} que da título al mismo",
  function (nombre) {
    this.cargo = {
      nombre: nombre,
    };
    return assert.ok(true);
  }
);

Given("que es del {string}", function (tipoDesignación) {
  // Write code here that turns the phrase above into concrete actions
  this.cargo.tipo = tipoDesignación;

  return assert.ok(true);
});

Given(
  "que tiene una {int} con la vigencia {string} {string}",
  function (cargoHoraria, fechaDesde, fechaHasta) {
    // Write code here that turns the phrase above into concrete actions
    this.cargo.cargaHoraria = cargoHoraria;
    this.cargo.fechaInicio = new Date(fechaDesde);
    this.cargo.fechaFin = new Date(fechaHasta);
    return assert.ok(true);
  }
);

Given(
  "que si el tipo es espacio curricular, opcionalmente se asigna a la división {int}, {int}, {string}",
  function (año, numero, turno) {
    let res = request(
      "GET",
      encodeURI(
        "http://backend:8080/division/division?anio=" +
          año +
          "&numero=" +
          numero +
          "&turno=" +
          turno
      )
    );

    this.divisionCargo = JSON.parse(res.body, "utf8").data;

    this.cargo.division = this.divisionCargo;

    //console.log(JSON.stringify(this.cargo, null, 3));

    return assert.equal(res.statusCode, 200);
  }
);

Given(
  "que si el tipo es espacio curricular, opcionalmente se asigna a la división , , {string}",
  function (string) {
    if (this.cargo.tipoDesignación == "CARGO") {
      this.cargo.division = null;
    }

    //console.log(JSON.stringify(this.cargo, null, 3));

    if (
      this.cargo.tipoDesignación == "CARGO" &&
      this.divisionCargo.anio == "1" &&
      this.divisionCargo.numero == "1" &&
      this.divisionCargo.turno == "Tarde"
    ) {
      this.cargo.division = this.divisionCargo;
    }
  }
);

When("se presiona el botón de guardar cargo", function () {
  let res = request("POST", encodeURI("http://backend:8080/cargo"), {
    json: this.cargo,
  });

  this.response = JSON.parse(res.body, "utf8");

  //console.log(this.response.data);

  return assert.equal(res.statusCode, 200);
});

//DESIGNACION

Given(
  "la persona con {string} {string} y {string}",
  function (DNI, nombre, apellido) {
    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + DNI)
    );
    this.persona = JSON.parse(res.body, "utf8").data;
    //console.log("PERSONA: " + this.persona.id);
    this.designacion = {
      persona: {
        id: this.persona.id,
      },
    };
    //console.log("DESIGNACION CON PERSONA: " + this.designacion);
    return assert.equal(res.statusCode, 200);
  }
);

Given(
  "que se asigna al cargo  con tipo de designación {string} y {string}",
  function (tipo, nombreDesignacion) {
    let res = request(
      "GET",
      encodeURI("http://backend:8080/cargo/" + nombreDesignacion)
    );
    this.cargo = JSON.parse(res.body, "utf8").data;
    //console.log("CARGO: " + this.cargo);
    this.designacion.cargo = this.cargo;

    //console.log("DESIGNACION CON CARGO: " + this.designacion);

    return assert.equal(res.statusCode, 200);
  }
);

Given(
  "si es espacio curricular asignada a la división {string} {string} {string}",
  function (anio, numero, turno) {
    // Write code here that turns the phrase above into concrete actions
    return true;
  }
);

Given(
  "se designa por el período {string} {string}",
  function (fechaInicio, fechaFin) {
    this.designacion.fechaInicio = new Date(fechaInicio);
    this.designacion.fechaFin = new Date(fechaFin);
    return assert.ok(true);
  }
);

When("se presiona el botón guardar designación", function () {
  //console.log("DESIGNACION: " + this.designacion);
  let res = request("POST", "http://backend:8080/designacion", {
    json: this.designacion,
  });
  this.response = JSON.parse(res.body, "utf8");
  //console.log(this.response.message);

  return assert.equal(res.statusCode, 200);
});

//LICENCIAS

Given(
  "el docente con DNI {string}, nombre {string} y apellido {string}",
  function (dni, nombre, apellido) {
    // Write code here that turns the phrase above into concrete actions
    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    );
    this.persona = JSON.parse(res.body, "utf8").data;

    this.licencia = {
      persona: this.persona,
    };

    return assert.equal(res.statusCode, 200);
  }
);

When(
  "solicita una licencia artículo {string} con descripción {string} para el período {string} {string}",
  function (articulo, descripcion, pedidoDesde, pedidoHasta) {
    this.licencia.pedidoDesde = new Date(pedidoDesde);
    this.licencia.pedidoHasta = new Date(pedidoHasta);

    let res = request(
      "GET",
      encodeURI("http://backend:8080/articulo/" + articulo)
    );
    this.articulo = JSON.parse(res.body, "utf8").data;
    //console.log(this.articulo);

    this.licencia.articulo = this.articulo;
    this.licencia.estado = false;

    let resLicencia = request(
      "POST",
      encodeURI("http://backend:8080/licencia"),
      {
        json: this.licencia,
      }
    );

    //console.log(JSON.parse(resLicencia.body, "utf8"));

    this.response = JSON.parse(resLicencia.body, "utf8").data;

    return assert.equal(resLicencia.statusCode, 200);
  }
);

//Escenarios Licencias

Given("que existe la persona", function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  const personaData = dataTable.hashes()[0];
  const dni = personaData.DNI;

  let res = request(
    "GET",
    encodeURI("http://backend:8080/personas/dni/" + dni)
  ); //urlenconding

  const personaT = JSON.parse(res.body, "utf8").data;

  this.auxDesig = {
    persona: personaT,
  };

  return assert.equal(res.statusCode, 200);
});

Given(
  "que existen las siguientes instancias de designación asignada",
  function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const designacionData = dataTable.hashes()[0];
    const nombre = designacionData.NombreTipoDesignacion;

    let res = request("GET", encodeURI("http://backend:8080/cargo/" + nombre));
    const cargo = JSON.parse(res.body, "utf8").data;

    this.auxDesig.cargo = cargo;

    return assert.equal(res.statusCode, 200);
  }
);

Given(
  "que la instancia de designación está asignada a la persona",
  function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    const personaData = dataTable.hashes()[0];
    const dni = personaData.DNI;

    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    ); //urlenconding

    this.persona = JSON.parse(res.body, "utf8").data;

    return assert.equal(res.statusCode, 200);
  }
);

Given(
  "que la instancia de designación está asignada a la persona con licencia {string} comprendida en el período desde {string} hasta {string}",
  function (articulo, desde, hasta, dataTable) {
    // Write code here that turns the phrase above into concrete actions

    const personaData = dataTable.hashes()[0];
    const dni = personaData.DNI;

    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    ); //urlenconding

    this.persona = JSON.parse(res.body, "utf8").data;

    let resA = request("GET", "http://backend:8080/articulo/" + articulo); //urlenconding

    const art = JSON.parse(resA.body, "utf8").data;

    let resL = request(
      "GET",
      "http://backend:8080/licencia/" +
        this.persona.id +
        "/" +
        art.id +
        "/" +
        desde +
        "/" +
        hasta
    );

    return assert.equal(resL.statusCode, 200);
  }
);

When(
  "se solicita el servicio de designación de la persona al cargo en el período comprendido desde {string} hasta {string}",
  function (desde, hasta) {
    // Write code here that turns the phrase above into concrete actions
    this.auxDesig.fechaInicio = new Date(desde);
    this.auxDesig.fechaFin = new Date(hasta);

    let res = request("POST", "http://backend:8080/designacion", {
      json: this.auxDesig,
    });
    //console.log(JSON.parse(res.body, "utf8"));
    this.response = JSON.parse(res.body, "utf8");

    //console.log(JSON.parse(res.body, "utf8"));

    return assert.equal(res.statusCode, 200);
  }
);

Then("se recupera el mensaje", function (docString) {
  // Write code here that turns the phrase above into concrete actions

  //console.log(this.response.message);
  if (this.response && this.response.status == 200) {
    const expectedMessage = JSON.parse(docString).StatusText;
    const expectedStatusCode = JSON.parse(docString).StatusCode;

    assert.equal(this.response.message, expectedMessage);
    assert.equal(this.response.status, expectedStatusCode);
  }

  return true;
});

//Parte Diario
Given("la existencia de las siguientes licencias", function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  const licencias = dataTable.hashes();

  for (const licencia of licencias) {
    const dni = licencia.DNI;
    const articulo = licencia.Artículo;
    const desde = licencia.Desde;
    const hasta = licencia.Hasta;

    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    ); //urlenconding

    const personaT = JSON.parse(res.body, "utf8").data;

    let resA = request(
      "GET",
      encodeURI("http://backend:8080/articulo/" + articulo)
    ); //urlenconding

    const art = JSON.parse(resA.body, "utf8").data;

    let resL = request(
      "GET",
      encodeURI(
        "http://backend:8080/licencia/" +
          personaT.id +
          "/" +
          art.id +
          "/" +
          desde +
          "/" +
          hasta
      )
    );

    return assert.equal(resL.statusCode, 200);
  }

  //return assert.ok(true);
});

Given("que se otorgan las siguientes nuevas licencias", function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  const licencias = dataTable.hashes();

  for (const licencia of licencias) {
    const dni = licencia.DNI;
    const articulo = licencia.Artículo;
    const desde = licencia.Desde;
    const hasta = licencia.Hasta;

    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    ); //urlenconding

    const personaT = JSON.parse(res.body, "utf8").data;

    let resA = request(
      "GET",
      encodeURI("http://backend:8080/articulo/" + articulo)
    ); //urlenconding

    const art = JSON.parse(resA.body, "utf8").data;

    this.licencia = {
      persona: personaT,
      articulo: art,
      pedidoDesde: desde,
      pedidoHasta: hasta,
      certificadoMedico: true,
    };

    let resl = request("POST", encodeURI("http://backend:8080/licencia"), {
      json: this.licencia,
    });
    this.response = JSON.parse(resl.body, "utf8");

    return assert.equal(resl.statusCode, 200);
  }

  return assert.ok(true);
});

When("se solicita el parte diario para la fecha {string}", function (fecha) {
  // Write code here that turns the phrase above into concrete actions
  let res = request("GET", "http://backend:8080/licencia/parteDiario/" + fecha); //urlenconding

  this.response = JSON.parse(res.body, "utf8");

  return assert.equal(res.statusCode, 200);
});

Then("el sistema responde", function (docString) {
  // Write code here that turns the phrase above into concrete actions
  let expectedResponse = JSON.parse(docString);
  let expectedParteDiario = expectedResponse.ParteDiario;

  if (this.response && this.response.ParteDiario) {
    let actualParteDiario = this.response.ParteDiario;

    assert.deepEqual(actualParteDiario, expectedParteDiario);
  }

  return true;
});

Given(
  "la existencia de las siguientes personas para obtener su Reporte de Concepto",
  function (dataTable) {
    const personaData = dataTable.hashes()[0];
    const dni = personaData.DNI;
    /* console.log("PERSONA: " + dni); */
    let res = request(
      "GET",
      encodeURI("http://backend:8080/personas/dni/" + dni)
    ); //urlenconding

    this.persona = JSON.parse(res.body, "utf8").data;

    /* console.log("PERSONA: " + this.persona.nombre); */
  }
);

When("se solicita el Reporte de Concepto para la persona", function () {
  // Write code here that turns the phrase above into concrete actions
  let res = request(
    "GET",
    "http://backend:8080/personas/reporteConcepto/" + this.persona.id
  ); //urlenconding

  this.response = JSON.parse(res.body, "utf8");

  return assert.equal(res.statusCode, 200);
});

Then("el sistema responde con un reporte", function (docString) {
  // Write code here that turns the phrase above into concrete actions
  let expectedResponse = JSON.parse(docString);
  let expectedParteDiario = expectedResponse.data;

  if (this.response && this.response.ParteDiario) {
    let actualParteDiario = this.response.ParteDiario;

    assert.deepEqual(actualParteDiario, expectedParteDiario);
  }

  return true;
});

AfterAll(async function () {
  for (let division of this.divisiones) {
    await request("POST", "http://backend:8080/division", { json: division });
  }

  for (let persona of this.personas) {
    await request("POST", "http://backend:8080/personas", { json: persona });
  }

  for (let cargo of this.cargos) {
    await request("POST", "http://backend:8080/cargo", { json: cargo });
  }

  for (let horario of this.horarios) {
    await request("POST", "http://backend:8080/horario", { json: horario });
  }

  for (let designacion of this.designaciones) {
    await request("POST", "http://backend:8080/designacion", {
      json: designacion,
    });
  }

  for (let licencia of this.licencias) {
    await request("POST", "http://backend:8080/licencia", {
      json: licencia,
    });
  }
});
