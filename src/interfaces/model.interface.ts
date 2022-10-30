export interface ModelsPropsInterface {
  makeId: number;
}

export interface ModelPropsInterface {
  model: ModelInterface;
}

export interface ModelInterface {
  Make_ID: number;
  Make_Name: string;
  Model_ID: number;
  Model_Name: string;
}

export interface GetModelsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ModelInterface[];
}
