            # language: es

            Característica: otorgar o denegar licencia a una persona a un cargo docente
            actividad central de información de la escuela secundaria

            Esquema del escenario: Otorgar Distintas licencias según las reglas de los distintos artículos
            Dado el docente con DNI "<DNI>", nombre "<Nombre>" y apellido "<Apellido>"
            Cuando solicita una licencia artículo "<Artículo>" con descripción "<Descripción>" para el período "<Desde>" "<Hasta>"
            Entonces se espera el siguiente <status> con la "<Respuesta>"

            Ejemplos:
            | DNI      | Nombre      | Apellido   | Artículo | Descripción                   | Desde      | Hasta      | status | Respuesta                                                                                                                  |
            | 99100000 | Ermenegildo | Sabat      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-07 | 2023-05-17 | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sabat                                                                         |
            | 99100000 | Ermenegildo | Sabat      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-18 | 2023-05-31 | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sabat                                                                         |
            | 99100000 | Ermenegildo | Sabat      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-06-01 | 2023-06-12 | 200    | NO se otorga Licencia artículo 5A a Ermenegildo Sabat debido a que supera el tope de 30 días de licencia                   |
            | 99100000 | Ermenegildo | Sabat      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-10-01 | 2023-10-03 | 200    | Se otorga Licencia artículo 5A a Ermenegildo Sabat                                                                         |
            | 99100000 | Ermenegildo | Sabat      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-10-04 | 2023-10-10 | 200    | NO se otorga Licencia artículo 5A a Ermenegildo Sabat debido a que supera el tope de 30 días de licencia                   |
            | 99200000 | María Rosa  | Gallo      | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-02-15 | 2023-03-01 | 200    | Se otorga Licencia artículo 23A a María Rosa Gallo                                                                         |
            | 99200000 | María Rosa  | Gallo      | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-04-01 | 2023-04-16 | 200    | Se otorga Licencia artículo 23A a María Rosa Gallo                                                                         |
            | 99200000 | María Rosa  | Gallo      | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-04-12 | 2023-04-20 | 200    | NO se otorga Licencia artículo 23A a María Rosa Gallo debido a que ya posee una licencia en el mismo período               |
            | 99200000 | María Rosa  | Gallo      | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-04-17 | 2023-04-20 | 200    | NO se otorga Licencia artículo 23A a María Rosa Gallo debido a que supera el tope de 30 días de licencia                   |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-05-08 | 2023-05-08 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-05-11 | 2023-05-11 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-05-20 | 2023-05-20 | 200    | NO se otorga Licencia artículo 36A a Homero Manzi debido a que supera el tope de 2 días de licencia por mes                |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-08-13 | 2023-08-13 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-08-13 | 2023-08-13 | 200    | No se otorga Licencia articulo 36A a Homero Manzi debido a que pide mas de 1 dia para la licencia                          |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-08-24 | 2023-08-24 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-10-04 | 2023-10-04 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-10-24 | 2023-10-24 | 200    | Se otorga Licencia artículo 36A a Homero Manzi                                                                             |
            | 99300000 | Homero      | Manzi      | 36A      | ASUNTOS PARTICULARES          | 2023-11-04 | 2023-11-04 | 200    | NO se otorga Licencia artículo 36A a Homero Manzi debido a que supera el tope de 6 días de licencia por año                |
            | 99999999 | Raúl        | Guitierrez | 36A      | ASUNTOS PARTICULARES          | 2023-03-04 | 2023-03-04 | 200    | NO se otorga Licencia artículo 36A a Raúl Guitierrez debido a que el agente no posee ningún cargo en la institución        |
            | 88888888 | Marisa      | Balaguer   | 36A      | ASUNTOS PARTICULARES          | 2023-03-04 | 2023-03-04 | 200    | NO se otorga Licencia artículo 36A a Marisa balaguer debido a que el agente no tiene designación ese día en la institución |
            | 20200200 | Susana      | Álvarez    | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-12 | 2023-05-30 | 200    | Se otorga Licencia artículo 5A a Susana Álvarez                                                                            |
            | 20000000 | Rosalía     | Fernandez  | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-07-05 | 2023-07-15 | 200    | Se otorga Licencia artículo 5A a Rosalía Fernandez                                                                         |
            | 88100000 | Raúl        | Orellanos  | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-07 | 2023-05-15 | 200    | Se otorga Licencia artículo 5A a Raúl Orellanos                                                                            |
            | 88200000 | Matías      | Barto      | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-10 | 2023-05-15 | 200    | Se otorga Licencia artículo 5A a Matías Barco                                                                              |
            | 88300000 | Andrea      | Sosa       | 5A       | ENFERMEDAD DE CORTA EVOLUCIÓN | 2023-05-11 | 2023-05-17 | 200    | Se otorga Licencia artículo 5A a Andrea Sosa                                                                               |
            | 88400000 | Laura       | Barrientos | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-05-08 | 2023-05-16 | 200    | Se otorga Licencia artículo 23A a Laura Barrientos                                                                         |
            | 88500000 | Natalia     | Zabala     | 23A      | ATENCIÓN DE UN MIEMBRO DEL GF | 2023-05-13 | 2023-05-22 | 200    | Se otorga Licencia artículo 23A a Natalia Zabala                                                                           |
            | 88600000 | Marta       | Ríos       | 36A      | ASUNTOS PARTICULARES          | 2023-05-15 | 2023-05-15 | 200    | Se otorga Licencia artículo 36A a Marta Ríos                                                                               |
            | 88700000 | Rosalía     | Ramón      | 36A      | ASUNTOS PARTICULARES          | 2023-05-15 | 2023-05-15 | 200    | Se otorga Licencia artículo 36A a Rosalía Ramón                                                                            |
            | 88800000 | José        | Pérez      | 36A      | ASUNTOS PARTICULARES          | 2023-05-15 | 2023-05-15 | 200    | Se otorga Licencia artículo 36A a José Pérez                                                                               |


            Escenario: 1 persona en instancias de designación de cargo que cubre una licencia de otra persona en la misma designación. Infomar que está correcto y que reemplaza al docente que solicitó licencia.
            Dado que existe la persona
            | DNI      | Nombre | Apellido |
            | 70700700 | Jorge  | Dismal   |
            Y que existen las siguientes instancias de designación asignada
            | TipoDesignacion | NombreTipoDesignacion | CargaHoraria |
            | cargo           | Preceptor             | 36           |
            Y que la instancia de designación está asignada a la persona con licencia "5A" comprendida en el período desde "2023-05-12" hasta "2023-05-30"
            | DNI      | Nombre | Apellido | Desde      | Hasta      |
            | 20200200 | Susana | Álvarez  | 2023-03-01 | 2023-12-31 |
            Cuando se solicita el servicio de designación de la persona al cargo en el período comprendido desde "2023-05-17" hasta "2023-05-29"
            Entonces se recupera el mensaje
            """
            {
                "StatusCode": 200,
                "StatusText": "Jorge Dismal ha sido designado/a como Preceptor exitosamente, en reemplazo de Susana Álvarez"
            }
            """


            Escenario: 1 persona en instancias de designación de cargo que cubre una licencia de otra persona en la misma designación, pero que no coincide el mismo período. Infomar el error respectivo y abortar la transacción.
            Dado que existe la persona
            | DNI      | Nombre | Apellido |
            | 80800800 | Analía | Rojas    |
            Y que existen las siguientes instancias de designación asignada
            | TipoDesignacion | NombreTipoDesignacion | CargaHoraria |
            | cargo           | Auxiliar ADM          | 30           |
            Y que la instancia de designación está asignada a la persona con licencia "5A" comprendida en el período desde "2023-07-05" hasta "2023-07-15"
            | DNI      | Nombre  | Apellido  | Desde      | Hasta      |
            | 20000000 | Rosalía | Fernandez | 2023-03-01 | 2023-12-31 |
            Cuando se solicita el servicio de designación de la persona al cargo en el período comprendido desde "2023-08-05" hasta "2023-09-15"
            Entonces se recupera el mensaje
            """
            {
                "StatusCode": 200,
                "StatusText": "Analía Rojas NO ha sido designado/a como Auxiliar ADM. pues el cargo solicitado lo ocupa Rosalía Fernandez para el período"
            }
            """



