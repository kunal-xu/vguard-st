export class TaggedCategoryDetail {
  SfdcJunctionID: string | null = null;
  Category: string | null = null;

  constructor(data?: Partial<TaggedCategoryDetail>) {
    Object.assign(this, data);
  }
}

export class STInviteDetail {
  Name: string | null = null;
  DOB: Date | null = null;
  UniqueId: string | null = null;
  Contact: string | null = null;
  MappedParentName: string | null = null;
  MappedParentId: string | null = null;
  TaggedCategory: string | null = null;
  STType: string | null = null;
  SEorPICCode: string | null = null;
  SEorPICName: string | null = null;
  SalesOffice: string | null = null;
  Aadhar: string | null = null;
  PAN: string | null = null;
  TaggedCateogry: TaggedCategoryDetail[] = [];

  constructor(data?: Partial<STInviteDetail>) {
    Object.assign(this, data);
  }
}
