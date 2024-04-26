export class CategoryWiseBlock {
  SfdcJunctonID: string | null = null;
  Category: string | null = null;
  BlockStatus: number | null = null;
  CategoryBlockInvestigationStatus: string | null = null;
  BlockType: string | null = null;
  Anomalyfrequency: number | null = null;

  constructor(data?: Partial<CategoryWiseBlock>) {
    Object.assign(this, data);
  }
}

export class STBlockingStatus {
  UniqueId: string | null = null;
  ServiceTechBlockStatus: number | null = null;
  CategoryWiseBlocking: CategoryWiseBlock[] = [];

  constructor(data?: Partial<STBlockingStatus>) {
    Object.assign(this, data);
  }
}