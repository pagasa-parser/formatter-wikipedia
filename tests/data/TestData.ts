import {Bulletin, Landmass} from "pagasa-parser";

export default <Bulletin>{
    info: {
        title: "Severe Weather Bulletin #13",
        count: 13,
        url: "https://pubfiles.pagasa.dost.gov.ph/tamss/weather/bulletin.pdf",
        issued: new Date("2020-10-31T18:00:00.000Z"),
        expires: new Date("2020-11-01T00:00:00.000Z"),
        summary: "\"ROLLY\" INTENSIFIES INTO SUPER TYPHOON AND MAKES LANDFALL OVER BATO, CATANDUANES"
    },
    cyclone: {
        name: "Rolly",
        internationalName: "Goni",
        prevailing: true,
        center: {
            lat: 13.6,
            lon: 124.3
        },
        movement: {
            direction: "WSW",
            speed: 25
        }
    },
    signals: {
        1: {
            areas: {
                [Landmass.Luzon]: [
                    {
                        name: "Cagayan",
                        part: true,
                        includes: {
                            type: "mainland"
                        }
                    },
                    {
                        name: "Isabela",
                        part: false
                    },
                    {
                        name: "Apayao",
                        part: false
                    },
                    {
                        name: "Kalinga",
                        part: false
                    },
                    {
                        name: "Mountain Province",
                        part: false
                    },
                    {
                        name: "Ifugao",
                        part: false
                    },
                    {
                        name: "Abra",
                        part: false
                    },
                    {
                        name: "Ilocos Norte",
                        part: false
                    },
                    {
                        name: "Ilocos Sur",
                        part: false
                    },
                    {
                        name: "Calamian Island",
                        part: false
                    }
                ],
                [Landmass.Visayas]: [
                    {
                        name: "Antique",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "rest of the northern",
                            objects: [
                                "Sebaste",
                                "Culasi",
                                "Tibiao",
                                "Barbaza",
                                "Laua-An"
                            ]
                        }
                    },
                    {
                        name: "Aklan",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Capiz",
                        part: false
                    },
                    {
                        name: "Iloilo",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Lemery",
                                "Sara",
                                "Concepcion",
                                "San Dionisio",
                                "Batad",
                                "Estancia",
                                "Balasan",
                                "Carles"
                            ]
                        }
                    },
                    {
                        name: "Cebu",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "San Remigio",
                                "Bogo City",
                                "Medellin",
                                "Daanbantayan"
                            ]
                        },
                        islands: [
                            {
                                name: "Bantayan Island",
                                part: false
                            }
                        ]
                    },
                    {
                        name: "Biliran",
                        part: false
                    },
                    {
                        name: "Samar",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Eastern Samar",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Leyte",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "San Isidro",
                                "Tabango",
                                "Villaba",
                                "Matag-Ob",
                                "Palompon",
                                "Ormoc City",
                                "Pastrana",
                                "Palo",
                                "Calubian",
                                "Leyte",
                                "Kananga",
                                "Capoocan",
                                "Carigara",
                                "Jaro",
                                "Tunga",
                                "Barugo",
                                "Alangalang",
                                "Santa Fe",
                                "Tacloban City",
                                "Babatngon",
                                "San Miguel"
                            ]
                        }
                    }
                ]
            }
        },
        2: {
            areas: {
                [Landmass.Luzon]: [
                    {
                        name: "Aurora",
                        part: false
                    },
                    {
                        name: "Nueva Vizcaya",
                        part: false
                    },
                    {
                        name: "Quirino",
                        part: false
                    },
                    {
                        name: "Benguet",
                        part: false
                    },
                    {
                        name: "La Union",
                        part: false
                    },
                    {
                        name: "Pangasinan",
                        part: false
                    },
                    {
                        name: "Zambales",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Tarlac",
                        part: false
                    },
                    {
                        name: "Nueva Ecija",
                        part: false
                    },
                    {
                        name: "Oriental Mindoro",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Occidental Mindoro",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Romblon",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Masbate",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    }
                ],
                [Landmass.Visayas]: [
                    {
                        name: "Samar",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Catbalogan City",
                                "Jiabong",
                                "Motiong",
                                "Paranas",
                                "Hinabangan",
                                "San Sebastian",
                                "Tarangnan",
                                "Pagsanghan",
                                "San Jorge",
                                "San Jose de Buan",
                                "Matuguinao",
                                "Gandara",
                                "Santa Margarita",
                                "Calbayog City",
                                "Santo Nino",
                                "Almagro",
                                "Tagapul-An"
                            ]
                        }
                    },
                    {
                        name: "Eastern Samar",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "San Julian",
                                "Sulat",
                                "Taft",
                                "Can- Avid",
                                "Dolores",
                                "Maslog",
                                "Oras",
                                "San Policarpo",
                                "Arteche",
                                "Jipapad"
                            ]
                        }
                    },
                    {
                        name: "Antique",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "extreme northern",
                            objects: [
                                "Pandan",
                                "Libertad",
                                "Caluya"
                            ]
                        }
                    },
                    {
                        name: "Aklan",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northwestern",
                            objects: [
                                "Buruanga",
                                "Malay",
                                "Nabas",
                                "Ibajay"
                            ]
                        }
                    }
                ]
            }
        },
        3: {
            areas: {
                [Landmass.Luzon]: [
                    {
                        name: "Sorsogon",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Masbate",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Mobo",
                                "Masbate City",
                                "Milagros",
                                "Uson",
                                "Baleno",
                                "Aroroy",
                                "Mandaon"
                            ]
                        },
                        islands: [
                            {
                                name: "Ticao Island",
                                part: false
                            }
                        ]
                    },
                    {
                        name: "Quezon",
                        part: true,
                        includes: {
                            type: "rest"
                        },
                        islands: [
                            {
                                name: "Polillo Island",
                                part: false
                            }
                        ]
                    },
                    {
                        name: "Laguna",
                        part: false
                    },
                    {
                        name: "Batangas",
                        part: false
                    },
                    {
                        name: "Cavite",
                        part: false
                    },
                    {
                        name: "Rizal",
                        part: false
                    },
                    {
                        name: "Metro Manila",
                        part: false
                    },
                    {
                        name: "Bulacan",
                        part: false
                    },
                    {
                        name: "Pampanga",
                        part: false
                    },
                    {
                        name: "Bataan",
                        part: false
                    },
                    {
                        name: "Zambales",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "southern",
                            objects: [
                                "San Marcelino",
                                "San Felipe",
                                "Olongapo City",
                                "Subic",
                                "Castillejos",
                                "San Antonio",
                                "San Narciso",
                                "Botolan",
                                "Cabangan"
                            ]
                        }
                    },
                    {
                        name: "Romblon",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "central",
                            objects: [
                                "Calatrava",
                                "San Andres",
                                "San Agustin",
                                "Romblon",
                                "Magdiwang",
                                "San Fernando",
                                "Cajidiocan"
                            ]
                        }
                    },
                    {
                        name: "Occidental Mindoro",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Sablayan",
                                "Mamburao",
                                "Santa Cruz",
                                "Abra de Ilog",
                                "Paluan"
                            ]
                        },
                        islands: [
                            {
                                name: "Lubang Island",
                                part: false
                            }
                        ]
                    },
                    {
                        name: "Oriental Mindoro",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Bongabong",
                                "Gloria",
                                "Bansud",
                                "Pinamalayan",
                                "Socorro",
                                "Pola",
                                "Victoria",
                                "Naujan",
                                "Calapan City",
                                "Baco",
                                "San Teodoro",
                                "Puerto Galera"
                            ]
                        }
                    }
                ],
                [Landmass.Visayas]: [
                    {
                        name: "Northern Samar",
                        part: false
                    }
                ]
            }
        },
        4: {
            areas: {
                [Landmass.Luzon]: [
                    {
                        name: "Camarines Norte",
                        part: false
                    },
                    {
                        name: "Camarines Sur",
                        part: true,
                        includes: {
                            type: "rest"
                        }
                    },
                    {
                        name: "Sorsogon",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Donsol",
                                "Pilar",
                                "Castilla",
                                "Sorsogon City",
                                "Prieto Diaz",
                                "Gubat",
                                "Barcelona",
                                "Juban",
                                "Casiguran",
                                "Magallanes"
                            ]
                        }
                    },
                    {
                        name: "Burias Island",
                        part: false
                    },
                    {
                        name: "Quezon",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "central and southern",
                            objects: [
                                "Atimonan",
                                "Padre Burgos",
                                "Agdangan",
                                "Plaridel",
                                "Unisan",
                                "Gumaca",
                                "Pitogo",
                                "Macalelon",
                                "Catanauan",
                                "General Luna",
                                "Mulanay",
                                "San Francisco",
                                "San Andres",
                                "San Narciso",
                                "Buenavista",
                                "Lopez",
                                "Guinayangan",
                                "Tagkawayan",
                                "Calauag",
                                "Quezon",
                                "Alabat",
                                "Perez"
                            ]
                        }
                    },
                    {
                        name: "Marinduque",
                        part: false
                    },
                    {
                        name: "Romblon",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "northern",
                            objects: [
                                "Concepcion",
                                "Corcuera",
                                "Banton"
                            ]
                        }
                    }
                ]
            }
        },
        5: {
            areas: {
                [Landmass.Luzon]: [
                    {
                        name: "Catanduanes",
                        part: false
                    },
                    {
                        name: "Albay",
                        part: false
                    },
                    {
                        name: "Camarines Sur",
                        part: true,
                        includes: {
                            type: "section",
                            term: "portion",
                            part: "eastern",
                            objects: [
                                "Caramoan",
                                "Presentacion",
                                "Garchitorena",
                                "Lagonoy",
                                "Tinambac",
                                "Calabanga",
                                "Siruma",
                                "Tigaon",
                                "Bombon",
                                "Magarao",
                                "Camaligan",
                                "Gainza",
                                "Canaman",
                                "Milaor",
                                "Naga City",
                                "Minalabac",
                                "Balatan",
                                "Bula",
                                "Pili",
                                "Ocampo",
                                "Goa",
                                "San Jose",
                                "Sagnay",
                                "Buhi",
                                "Iriga City",
                                "Baao",
                                "Nabua",
                                "Bato"
                            ]
                        }
                    }
                ]
            }
        }
    }
}
