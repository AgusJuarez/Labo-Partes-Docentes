            # language: es

            Característica: designar una persona a un cargo docente
            actividad central de información de la escuela secundaria

            Esquema del escenario: Designación de persona en una instancia de designación de cargo que YA cuenta con una designación para el mismo período. Informar el error respectivo y abortar la transacción
            Dada la persona con "<DNI>" "<nombre>" y "<apellido>"
            Y que se asigna al cargo  con tipo de designación "<tipo>" y "<nombreDesignación>"
            Y si es espacio curricular asignada a la división "<año>" "<número>" "<turno>"
            Y se designa por el período "<fechaDesde>" "<fechaHasta>"
            Cuando se presiona el botón guardar designación
            Entonces se espera el siguiente <status> con la "<respuesta>"

            Ejemplos:
            | DNI      | nombre | apellido | tipo               | nombreDesignación | año | número | turno | fechaDesde | fechaHasta | status | respuesta                                                                                                                                    |
            | 30300300 | Pedro  | Benítez  | CARGO              | Preceptor         |     |        |       | 2023-05-01 | 2024-12-31 | 200    | Pedro Benítez NO ha sido designado/a como Preceptor. pues el cargo solicitado lo ocupa Susana Álvarez para el período                        |
            | 60600600 | Inés   | Torres   | ESPACIO_CURRICULAR | Geografía         | 3   | 1      | Tarde | 2023-07-01 | 2023-10-15 | 200    | Inés Torres NO ha sido designado/a debido a que la asignatura Geografía de la división 3º 1º turno Tarde lo ocupa Raúl Gómez para el período |

