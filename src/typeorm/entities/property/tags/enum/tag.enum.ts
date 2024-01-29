export enum FurnitureEnum {
  Exist = "Exist",
  NotExist = "Not Exist",
  PartialFurniture = "Partial Furniture",
  ByAgreement = "By Agreement",
}

export enum RepairEnum {
  OldRepair = "Old Repair",
  PartialRepair = "Partial Repair",
  CosmeticRepair = "Cosmetic Repair",
  EuroRenovated = "Euro-renovated",
  DesignerStyle = "Renovated In Designer Style",
  Reconstructed = "Thoroughly Reconstructed",
}

export type Furniture =
  | "Exist"
  | "Not Exist"
  | "Partial Furniture"
  | "By Agreement";

export type Repair =
  | "Old Repair"
  | "Partial Repair"
  | "Cosmetic Repair"
  | "Euro-renovated"
  | "Renovated In Designer Style"
  | "Thoroughly Reconstructed";
