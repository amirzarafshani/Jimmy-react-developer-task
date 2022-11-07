export interface ModelsPropsInterface {
  makeId: number;
}

export interface ModelPropsInterface {
  model: ModelInterface;
}

export interface ModelInterface {
  Model_ID: number;
  Model_Name: string;
}

export interface GetModelsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ModelInterface[];
}
