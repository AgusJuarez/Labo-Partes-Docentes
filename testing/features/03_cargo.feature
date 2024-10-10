            # language: es
            Característica: Gestión de cargos
            Esquema del escenario: ingresar nuevo cargo institucional
            Dado el cargo institucional cuyo "<nombre>" que da título al mismo
            Y que es del "<tipoDesignación>"
            Y que tiene una <cargaHoraria> con la vigencia "<fechaDesde>" "<fechaHasta>"
            Y que si el tipo es espacio curricular, opcionalmente se asigna a la división <año>, <número>, "<turno>"
            Cuando se presiona el botón de guardar cargo
            Entonces se espera el siguiente <status> con la "<respuesta>"

            Ejemplos:
            | nombre                     | tipoDesignación    | cargaHoraria | fechaDesde | fechaHasta | año | número | turno  | status | respuesta                                                                                                |
            | Vicedirector               | CARGO              | 36           | 2020-03-01 |            |     |        |        | 200    | Cargo de Vicedirector ingresado correctamente                                                            |
            | Preceptor                  | CARGO              | 36           | 2020-03-01 |            |     |        |        | 200    | Cargo de Preceptor ingresado correctamente                                                               |
            | Historia                   | ESPACIO_CURRICULAR | 4            | 2020-03-01 |            | 5   | 2      | Mañana | 200    | Espacio Curricular Historia para la división 5º 2º Turno Mañana ingresado correctamente                  |
            | Geografía                  | ESPACIO_CURRICULAR | 3            | 2020-03-01 |            | 3   | 1      | Tarde  | 200    | Espacio Curricular Geografía para la división 3º 1º Turno Tarde ingresado correctamente                  |
            | Auxiliar ADM               | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Auxiliar ADM ingresado correctamente                                                            |
            | Auxiliar ACAD              | CARGO              | 30           | 2020-03-01 |            | 1   | 1      | Tarde  | 501    | Cargo de Auxiliar ACAD es CARGO y no corresponde asignar división                                        |
            | Matemática                 | ESPACIO_CURRICULAR | 6            | 2020-03-01 |            |     |        |        | 501    | Espacio Curricular Matemática falta asignar división                                                     |
            | Física                     | ESPACIO_CURRICULAR | 4            | 2020-03-01 |            | 2   | 3      | Mañana | 200    | Espacio Curricular Física para la división 2º 3º Turno Mañana ingresado correctamente                    |
            | Matemática                 | ESPACIO_CURRICULAR | 4            | 2020-03-01 |            | 1   | 1      | Tarde  | 200    | Espacio Curricular Matemática para la división 1º 1º Turno Tarde ingresado correctamente                 |
            | Tecnología                 | ESPACIO_CURRICULAR | 4            | 2020-03-01 |            | 4   | 3      | Mañana | 200    | Espacio Curricular Tecnología para la división 4º 3º Turno Mañana ingresado correctamente                |
            | Secretario                 | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Secretario ingresado correctamente                                                              |
            | Bibliotecario              | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Bibliotecario ingresado correctamente                                                           |
            | Enfermero                  | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Enfermero ingresado correctamente                                                               |
            | Conserje                   | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Conserje ingresado correctamente                                                                |
            | Tesorero                   | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Tesorero ingresado correctamente                                                                |
            | Director de Banda          | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Director de Banda ingresado correctamente                                                       |
            | Asesor                     | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Asesor ingresado correctamente                                                                  |
            | Jardinero                  | CARGO              | 30           | 2020-03-01 |            |     |        |        | 200    | Cargo de Jardinero ingresado correctamente                                                               |
            | Biología                   | ESPACIO_CURRICULAR | 30           | 2020-03-01 |            | 1   | 2      | Mañana | 200    | Espacio Curricular Biologia para la división 1º 2º Turno Mañana ingresado correctamente                  |
            | Relaciones Internacionales | ESPACIO_CURRICULAR | 30           | 2020-03-01 |            | 6   | 1      | Noche  | 200    | Espacio Curricular Relaciones Internacionales para la división 6º 1º Turno Noche ingresado correctamente |
            | Historia de la Música      | ESPACIO_CURRICULAR | 30           | 2020-03-01 |            | 1   | 1      | Tarde  | 200    | Espacio Curricular Historia de la Música para la división 1º 1º Turno Tarde ingresado correctamente      |