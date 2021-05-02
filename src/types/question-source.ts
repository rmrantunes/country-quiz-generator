export interface Language {
  name: string;
  code: string;
}

export interface Continent {
  name: string;
}

export interface Country {
  name: string;
  capital: string;
  code: string;
  continent: Continent;
  languages: Language[];
}

export interface MappedCountry {
  name: string;
  code?: string;
  capital?: string;
}

export interface Source {
  countries: Country[];
  languages: Language[];
}
