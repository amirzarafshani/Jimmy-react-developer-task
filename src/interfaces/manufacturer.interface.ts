export interface ManufacturerInterface {
  Mfr_ID: number;
  Mfr_CommonName: string;
  Country: string;
}

export interface GetManufacturersAxiosResponse {
  data: GetManufacturersResponse;
}

export interface GetManufacturersResponse {
  Count: number;
  Message: string;
  Results: ManufacturerInterface[];
}

export interface ManufacturerTableRowInterface {
  manufacturer: ManufacturerInterface;
}

export interface ManufacturerDetailsPropsInterface {
  manufacturerId?: string;
}
