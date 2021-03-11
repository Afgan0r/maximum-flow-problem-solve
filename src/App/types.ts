export type IdType = number;

export type Node = {
  id: IdType;
  label: string;
  shape: 'circle';
  margin: {
    left: 10;
    right: 10;
  };
};

export type Edge = {
  id: string;
  from: IdType;
  to: IdType;
  label: string;
  font: {
    align: 'top';
  };
  initialCapacity: number;
  currentCapacity: number;
  flowValue: number;
};

export type StoreType = {
  counter: number;
  nodes: Node[];
  edges: Edge[];
};
