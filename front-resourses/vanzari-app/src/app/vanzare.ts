export interface Vanzare {
    id: string;
    data: Date;
    numeClient: string;
    numeProdus: string;
    codProdus: number;
    pretProdus: number;
    achitat: boolean;
    artizan: boolean;  
  }

export interface Filtru{
  tip: FilterType;
  mesaj: string;
  filtreaza(data: Vanzare[]): Vanzare[];
}

export enum FilterType{
  INAINTE,
  DUPA,
  NUME_CLIENT,
  DENUMIRE_PRODUS,
  COD_PRODUS,
  PRET_MAI_MARE,
  PRET_MAI_MIC,
  ACHITAT,
  ARTIZAN
}