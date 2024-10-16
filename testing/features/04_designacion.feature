            # language: es

            Característica: designar una persona a un cargo docente
            actividad central de información de la escuela secundaria

            Esquema del escenario: Designación de persona en cargos NO cubiertos aún en el perído indicado de forma existosa
            Dada la persona con "<DNI>" "<nombre>" y "<apellido>"
            Y que se asigna al cargo  con tipo de designación "<tipo>" y "<nombreDesignación>"
            Y si es espacio curricular asignada a la división "<año>" "<número>" "<turno>"
            Y se designa por el período "<fechaDesde>" "<fechaHasta>"
            Cuando se presiona el botón guardar designación
            Entonces se espera el siguiente <status> con la "<respuesta>"

            Ejemplos:
            | DNI      | nombre      | apellido     | tipo               | nombreDesignación | año | número | turno  | fechaDesde | fechaHasta | status | respuesta                                                                                                      |
            | 10100100 | Alberto     | Lopez        | CARGO              | Vicedirector      |     |        |        | 2023-03-01 |            | 200    | Alberto Lopez ha sido designado/a como Vicedirector exitosamente                                               |
            | 20200200 | Susana      | Álvarez      | CARGO              | Preceptor         |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Susana Álvarez ha sido designado/a como Preceptor exitosamente                                                 |
            | 40400400 | Marisa      | Amuchástegui | ESPACIO CURRICULAR | Historia          | 5   | 2      | Mañana | 2023-03-01 |            | 200    | Marisa Amuchástegui ha sido designado/a a la asignatura Historia a la división 5º 2º turno Mañana exitosamente |
            | 50500500 | Raúl        | Gómez        | ESPACIO CURRICULAR | Geografía         | 3   | 1      | Tarde  | 2023-03-01 | 2025-12-31 | 200    | Raúl Gómez ha sido designado/a a la asignatura Geografía a la división 3º 1º turno Tarde exitosamente          |
            | 20000000 | Rosalía     | Fernandez    | CARGO              | Auxiliar ADM      |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Rosalía Fernandez ha sido designado/a como Auxiliar ADM exitosamente                                           |
            | 99100000 | Ermenegildo | Sabat        | ESPACIO CURRICULAR | Física            | 2   | 3      | Mañana | 2023-03-01 |            | 200    | Ermenegildo Sábat ha sido designado/a a la asignatura Física a la división 2º 3º turno Mañana exitosamente     |
            | 99200000 | María Rosa  | Gallo        | ESPACIO CURRICULAR | Matemática        | 1   | 1      | Tarde  | 2023-03-01 |            | 200    | María Rosa Gallo ha sido designado/a a la asignatura Matemática a la división 1º 1º turno Tarde exitosamente   |
            | 99300000 | Homero      | Manzi        | ESPACIO CURRICULAR | Tecnología        | 4   | 3      | Mañana | 2023-03-01 |            | 200    | Homero Manzi ha sido designado/a a la asignatura Tecnología a la división 4º 3º turno Mañana exitosamente      |
            | 88100000 | Raúl        | Orellanos    | CARGO              | Secretario        |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Raúl Orellanos ha sido designado/a como Secretario exitosamente                                                |
            | 88200000 | Matías      | Barto        | CARGO              | Bibliotecario     |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Matías Barto ha sido designado/a como Bibliotecario exitosamente                                               |
            | 88300000 | Andrea      | Sosa         | CARGO              | Enfermero         |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Andrea Sosa ha sido designado/a como Enfermero exitosamente                                                    |
            | 88400000 | Laura       | Barrientos   | CARGO              | Conserje          |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Laura Barrientos ha sido designado/a como Conserje exitosamente                                                |
            | 88500000 | Natalia     | Zabala       | CARGO              | Tesorero          |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Natalia Zabala ha sido designado/a como Tesorero exitosamente                                                  |
            | 88600000 | Marta       | Ríos         | CARGO              | Director de Banda |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Marta Ríos ha sido designado/a como Director de Banda exitosamente                                             |
            | 88700000 | Rosalía     | Ramón        | CARGO              | Asesor            |     |        |        | 2023-03-01 | 2023-12-31 | 200    | Rosalía Ramón ha sido designado/a como Asesor exitosamente                                                     |
            | 88800000 | José        | Pérez        | CARGO              | Jardinero         |     |        |        | 2023-03-01 | 2023-12-31 | 200    | José Pérez ha sido designado/a como Jardinero exitosamente                                                     |