            # language: es
            Característica: Gestión de personas
            Módulo responsable de administrar a las personas del sistema

            Esquema del escenario: ingresar nuevas personas
            Dada la persona con "<Nombre>", "<Apellido>", <DNI>, "<CUIL>", "<sexo>", "<título>", "<domicilio>", "<teléfono>"
            Cuando se presiona el botón de guardar
            Entonces se espera el siguiente <status> con la "<respuesta>"

            Ejemplos:
            | DNI      | Nombre      | Apellido     | CUIL        | sexo | título                     | domicilio      | teléfono           | status | respuesta                                                      |
            | 10100100 | Alberto     | Lopez        | 27101001009 | M    | Profesor de Biología       | Charcas 54     | +54 (280) 411-1111 | 200    | Alberto Lopez con DNI 10100100 ingresado/a correctamente       |
            | 20200200 | Susana      | Álvarez      | 20202002009 | F    | Profesora de historia      | Mitre 154      | +54 (280) 422-2222 | 200    | Susana Álvarez con DNI 20200200 ingresado/a correctamente      |
            | 30300300 | Pedro       | Benítez      | 27303003009 | M    |                            | Jujuy 255      | +54 (280) 433-3333 | 200    | Pedro Benítez con DNI 30300300 ingresado/a correctamente       |
            | 40400400 | Marisa      | Amuchástegui | 20404004009 | F    | Profesora de historia      | Zar 555        | +54 (280) 444-4444 | 200    | Marisa Amuchástegui con DNI 40400400 ingresado/a correctamente |
            | 50500500 | Raúl        | Gómez        | 27505005009 | M    | Profesor de Geografía      | Roca 2458      | +54 (280) 455-5555 | 200    | Raúl Gómez con DNI 50500500 ingresado/a correctamente          |
            | 60600600 | Inés        | Torres       | 20606006009 | F    | Licenciada en Geografía    | La Pampa 322   | +54 (280) 466-6666 | 200    | Inés Torres con DNI 60600600 ingresado/a correctamente         |
            | 70700700 | Jorge       | Dismal       | 27707007009 | M    |                            | Mitre 1855     | +54 (280) 477-7777 | 200    | Jorge Dismal con DNI 70700700 ingresado/a correctamente        |
            | 20000000 | Rosalía     | Fernandez    | 20200000009 | F    | Maestra de grado           | Maiz 356       | +54 (280) 420-0000 | 200    | Rosalía Fernandez con DNI 20000000 ingresado/a correctamente   |
            | 80800800 | Analía      | Rojas        | 20808008009 | F    | Técnica superior           | Rosa 556       | +54 (280) 488-8888 | 200    | Analía Rojas con DNI 80800800 ingresado/a correctamente        |
            | 99100000 | Ermenegildo | Sábat        | 20991000006 | M    | Fisico                     | Belgrano 256   | +54 (280) 4768594  | 200    | Ermenegildo Sábat con DNI 99100000 ingresado/a correctamente   |
            | 99200000 | María Rosa  | Gallo        | 20992000006 | F    | Profesorado de Matematica  | San Martin 158 | +54 (280) 4659467  | 200    | María Rosa Gallo con DNI 99200000 ingresado/a correctamente    |
            | 99300000 | Homero      | Manzi        | 20993000006 | M    | Ingeniero                  | Av. Gales 223  | +54 (280) 4123789  | 200    | Homero Manzi con DNI 99300000 ingresado/a correctamente        |
            | 99999999 | Raúl        | Guitierrez   | 20999999996 | M    |                            | Charcas 120    | +54 (280) 4145789  | 200    | Raúl Guitierrez con DNI 99999999 ingresado/a correctamente     |
            | 88888888 | Marisa      | Balaguer     | 20888888886 | F    |                            | Castelli 80    | +54 (280) 9865673  | 200    | Marisa Balaguer con DNI 88888888 ingresado/a correctamente     |
            | 88100000 | Raúl        | Orellanos    | 20881000006 | M    | Maestro                    | 25 de mayo 512 | +54 (280) 123123   | 200    | Raúl Orellanos con DNI 88100000 ingresado/a correctamente      |
            | 88200000 | Matías      | Barto        | 20882000006 | M    | Maestro                    | 25 de mayo 512 | +54 (280) 123123   | 200    | Matías Barto con DNI 88200000 ingresado/a correctamente        |
            | 88300000 | Andrea      | Sosa         | 20883000006 | F    | Maestro                    | 25 de mayo 512 | +54 (280) 123123   | 200    | Andrea Sosa con DNI 88300000 ingresado/a correctamente         |
            | 88400000 | Laura       | Barrientos   | 20884000006 | F    | Maestro                    | 25 de mayo 512 | +54 (280) 123123   | 200    | Laura Barrientos con DNI 88400000 ingresado/a correctamente    |
            | 88500000 | Natalia     | Zabala       | 20885000006 | F    | Maestro                    | 25 de mayo 512 | +54 (280) 123123   | 200    | Natalia Zabala con DNI 88500000 ingresado/a correctamente      |
            | 88600000 | Marta       | Ríos         | 20886000006 | F    | Doctor en Cosas de la Vida | Sarmiento 26   | +54 (280) 654321   | 200    | Marta Ríos con DNI 88600000 ingresado/a correctamente          |
            | 88700000 | Rosalía     | Ramón        | 20887000006 | F    | Doctor en Cosas de la Vida | Sarmiento 26   | +54 (280) 654321   | 200    | Rosalía Ramón con DNI 88700000 ingresado/a correctamente       |
            | 88800000 | José        | Pérez        | 20888000006 | M    | Doctor en Cosas de la Vida | Sarmiento 26   | +54 (280) 654321   | 200    | José Pérez con DNI 88800000 ingresado/a correctamente          |