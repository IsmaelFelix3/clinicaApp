export interface Expediente {
    msg:        string;
    expediente: ExpedienteClass;
}

export interface ExpedienteClass {
    id_expediente:                             number;
    id_paciente:                               number;
    fecha_creacion_expediente:                 string;
    edad_paciente:                             number;
    alergias:                                  string;
    tipo_sanguineo:                            string;
    id_antecedentes_heredo_familiares:         number;
    id_antecedentes_personales_patologicos:    number;
    id_antecedentes_personales_no_patologicos: number;
    id_antecedentes_andrologicos:              number;
    id_antecedentes_gineco_obstetrico:         number;
    createdAt:                                 Date;
    updatedAt:                                 Date;
    Antecedentes_Personales_No_Patologico:     AntecedentesPersonalesNoPatologico;
    Antecedentes_Personales_Patologico:        AntecedentesPersonalesPatologico;
    Antecedentes_Andrologico:                  AntecedentesAndrologico;
    Antecedentes_Gineco_Obstetrico:            AntecedentesGinecoObstetrico;
    Antecedentes_Heredo_Familiare:             AntecedentesHeredoFamiliare;
}

export interface AntecedentesAndrologico {
    id_antecedentes_andrologicos: number;
    circuncision:                 boolean;
    criptorquidia:                boolean;
    vsa:                          number;
    numero_parejas:               number;
    ets:                          string;
    transtorno_ereccion:          string;
    andropausia:                  string;
    createdAt:                    Date;
    updatedAt:                    Date;
}

export interface AntecedentesGinecoObstetrico {
    id_antecedentes_gineco_obstetrico: number;
    menarca:                           number;
    ciclo_menstrual:                   string;
    vsa:                               number;
    numero_parejas:                    number;
    numero_embarazos:                  number;
    numero_partos:                     number;
    abortos:                           number;
    cesareas:                          number;
    metodo_anticonceptivo:             string;
    fecha_ultima_menstruacion:         Date;
    ets:                               string;
    menopausia:                        string;
    papanicolau:                       Date;
    lactancia_materna:                 string;
    createdAt:                         Date;
    updatedAt:                         Date;
}

export interface AntecedentesHeredoFamiliare {
    id_antecedentes_heredo_familiares: number;
    diabetes:                          boolean;
    hipertension_arterial:             boolean;
    cancer:                            boolean;
    tipo_cancer:                       string;
    familiar_cancer:                   string;
    cardiopatas:                       boolean;
    familiar_cardiopatas:              string;
    nefropatas:                        boolean;
    familiar_nefropatas:               string;
    descripcion_malformaciones:        string;
    createdAt:                         Date;
    updatedAt:                         Date;
}

export interface AntecedentesPersonalesNoPatologico {
    id_antecedentes_personales_no_patologicos: number;
    fumador:                                   boolean;
    alcohol:                                   boolean;
    drogas:                                    boolean;
    diabetes:                                  string;
    id_inmunizacion:                           number;
    otros:                                     string;
    createdAt:                                 Date;
    updatedAt:                                 Date;
    Inmunizaciones:                            Inmunizacione[];
}

export interface Inmunizacione {
    id_inmunizacion:          number;
    descripcion_inmunizacion: string;
    createdAt:                Date;
    updatedAt:                Date;
}

export interface AntecedentesPersonalesPatologico {
    id_antecedentes_personales_patologicos: number;
    enfermedades_infantiles:                string;
    secuelas:                               string;
    id_hospitalizacion:                     number;
    id_antecedentes_quirurgicos:            number;
    id_otras_enfermedades:                  number;
    createdAt:                              Date;
    updatedAt:                              Date;
    hospitalizaciones:                      Hospitalizaciones;
    antecedentes_quirurgicos:               AntecedentesQuirurgicos;
    otras_enfermedades:                     OtrasEnfermedades;
}

export interface AntecedentesQuirurgicos {
    id_antecedentes_quirurgicos:        number;
    descripcion_antecedente_quirurgico: string;
    createdAt:                          Date;
    updatedAt:                          Date;
}

export interface Hospitalizaciones {
    id_hospitalizacion:          number;
    descripcion_hospitalizacion: string;
    createdAt:                   Date;
    updatedAt:                   Date;
}

export interface OtrasEnfermedades {
    id_otras_enfermedades:          number;
    descripcion_otras_enfermedades: string;
    createdAt:                      Date;
    updatedAt:                      Date;
}
