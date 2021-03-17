export type IdType = number;

export type Node = {
  id: IdType;
  label: string;
  shape: 'circle';
  margin: {
    left: 10;
    right: 10;
  };
  color?: 'red' | 'green';
  font?: {
    color: 'white';
  };
  fixed?: {
    x: boolean;
    y: boolean;
  };
  x?: number;
  y?: number;
};

export type Edge = {
  id: string;
  from: IdType;
  to: IdType;
  label: string;
  font: {
    align: 'top';
  };
  capacity: number;
  flowValue: number;
  dashes?: boolean;
};

export type StoreType = {
  counter: number;
  nodes: Node[];
  edges: Edge[];
};

export type GraphType = {
  nodes: Node[];
  edges: Edge[];
};

type PreparedNode = {
  id: number;
  isDeadEnd: boolean;
  neighbors: string[];
};

export type PreparedNodes = {
  [key: string]: PreparedNode;
};

export type PreparedEdge = {
  id: string;
  from: IdType;
  to: IdType;
  initialCapacity: number;
  currentCapacity: number;
  flowValue: number;
};

export type PreparedEdges = {
  [key: string]: PreparedEdge;
};

export type PreparedGraph = {
  nodes: PreparedNodes;
  edges: PreparedEdges;
};

export type PathSearchPropsType = {
  currentNode: PreparedNode;
  nodes: PreparedNodes;
  edges: PreparedEdges;
  target: IdType;
  trace: string[];
};

export type PathSearchReturnType = { trace: string[]; nodes: PreparedNodes } | false;

export type FindMinEdgePropsType = {
  path: string[];
  edges: PreparedEdges;
};
