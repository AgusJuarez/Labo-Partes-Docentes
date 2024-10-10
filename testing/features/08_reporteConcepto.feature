            # language: es

            Característica: Emitir el Reporte de Concepto de una persona.

            Escenario: Verificar el funcionamiento de Reporte de Concepto
            Dada la existencia de las siguientes personas para obtener su Reporte de Concepto
            | DNI      | Nombre      | Apellido |
            | 99100000 | Ermenegildo | Sábat    |
            Cuando se solicita el Reporte de Concepto para la persona
            Entonces el sistema responde con un reporte
            """
            {
                "data": {
                    "persona": {
                        "cuit": "20991000006",
                        "dni": "99100000",
                        "nombre": "Ermenegildo",
                        "apellido": "Sábat",
                        "titulo": "Fisico",
                        "sexo": "M",
                        "domicilio": "Belgrano 256",
                        "telefono": "+54 (280) 4768594"
                    },
                    "licencias": [
                        {
                            "pedidoDesde": "2023-05-07",
                            "pedidoHasta": "2023-05-17",
                            "certificadoMedico": false,
                            "persona": {
                                "cuit": "20991000006",
                                "dni": "99100000",
                                "nombre": "Ermenegildo",
                                "apellido": "Sábat",
                                "titulo": "Fisico",
                                "sexo": "M",
                                "domicilio": "Belgrano 256",
                                "telefono": "+54 (280) 4768594"
                            },
                            "articulo": {
                                "articulo": "5A",
                                "descripcion": "ENFERMEDAD CORTA EVOLUCIÓN"
                            },
                            "estado": true,
                            "anotacion": null,
                            "anotaciones": [
                                "[2024-06-07] Se otorga Licencia artículo 5A a Ermenegildo Sábat"
                            ]
                        },
                        {
                            "pedidoDesde": "2023-05-18",
                            "pedidoHasta": "2023-05-31",
                            "certificadoMedico": false,
                            "persona": {
                                "cuit": "20991000006",
                                "dni": "99100000",
                                "nombre": "Ermenegildo",
                                "apellido": "Sábat",
                                "titulo": "Fisico",
                                "sexo": "M",
                                "domicilio": "Belgrano 256",
                                "telefono": "+54 (280) 4768594"
                            },
                            "articulo": {
                                "articulo": "5A",
                                "descripcion": "ENFERMEDAD CORTA EVOLUCIÓN"
                            },
                            "estado": true,
                            "anotacion": null,
                            "anotaciones": [
                                "[2024-06-07] Se otorga Licencia artículo 5A a Ermenegildo Sábat"
                            ]
                        },
                        {
                            "pedidoDesde": "2023-10-01",
                            "pedidoHasta": "2023-10-03",
                            "certificadoMedico": false,
                            "persona": {
                                "cuit": "20991000006",
                                "dni": "99100000",
                                "nombre": "Ermenegildo",
                                "apellido": "Sábat",
                                "titulo": "Fisico",
                                "sexo": "M",
                                "domicilio": "Belgrano 256",
                                "telefono": "+54 (280) 4768594"
                            },
                            "articulo": {
                                "articulo": "5A",
                                "descripcion": "ENFERMEDAD CORTA EVOLUCIÓN"
                            },
                            "estado": true,
                            "anotacion": null,
                            "anotaciones": [
                                "[2024-06-07] Se otorga Licencia artículo 5A a Ermenegildo Sábat"
                            ]
                        }
                    ],
                    "designaciones": [
                        {
                            "situacionRevista": null,
                            "fechaInicio": "2023-03-01",
                            "fechaFin": null,
                            "cargo": {
                                "nombre": "Física",
                                "cargaHoraria": 4,
                                "fechaInicio": "2020-03-01",
                                "fechaFin": null,
                                "division": {
                                    "anio": "2",
                                    "numero": "3",
                                    "orientacion": "Historia",
                                    "turno": "Mañana"
                                },
                                "tipo": "ESPACIO_CURRICULAR",
                                "horarios": []
                            },
                            "persona": {
                                "cuit": "20991000006",
                                "dni": "99100000",
                                "nombre": "Ermenegildo",
                                "apellido": "Sábat",
                                "titulo": "Fisico",
                                "sexo": "M",
                                "domicilio": "Belgrano 256",
                                "telefono": "+54 (280) 4768594"
                            },
                            "estado": true,
                            "anotacion": null,
                            "anotaciones": [
                                "[2024-06-07]Ermenegildo Sábat ha sido designado/a a la asignatura Física a la división 2º 3º turno Mañana exitosamente"
                            ]
                        }
                    ],
                    "cantidadDiasEnLicencia": 28,
                    "cantidadLicenciasOtorgadas": 3,
                    "cantidadLicenciasNoOtorgadas": 2,
                    "cantidadDesignacionesOtorgadas": 1,
                    "cantidadDesignacionesNoOtorgadas": 0
                },
                "message": "OK",
                "status": 200
            }
            """