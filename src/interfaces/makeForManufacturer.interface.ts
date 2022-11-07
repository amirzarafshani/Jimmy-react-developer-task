export interface MakeForManufacturer {
  Make_ID: number;
  Make_Name: string;
  Mfr_Name?: string;
}

export interface MakesListPropsInterface {
  manufacturerId?: string;
}

export interface GetMakesListResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: MakeForManufacturer[];
}
