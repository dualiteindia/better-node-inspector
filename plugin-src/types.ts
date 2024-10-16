export interface ParentNodeInterface {
  id: string;
  children?: ReadonlyArray<SceneNode>;
  parent: (BaseNode & ChildrenMixin) | null;
  name: string;
  visible: boolean;
  locked: boolean;
  stuckNodes: SceneNode[]; //[readonly]
  attachedConnectors: ConnectorNode[]; //[readonly]
  componentPropertyReferences:
    | { [nodeProperty in "visible" | "characters" | "mainComponent"]?: string }
    | null;
  //   boundVariables?: {
  //     readonly [field in VariableBindableNodeField]?: VariableAlias;
  //   } & { readonly [field in VariableBindableTextField]?: VariableAlias[] } & {
  //     fills: VariableAlias[];
  //     strokes: VariableAlias[];
  //     effects: VariableAlias[];
  //     layoutGrids: VariableAlias[];
  //     componentProperties: { [propertyName: string]: VariableAlias };
  //     textRangeFills: VariableAlias[];
  //   };
  // inferredVariables: {
  //   readonly [field in VariableBindableNodeField]?: VariableAlias[];
  // } & { fills: VariableAlias[][]; strokes: VariableAlias[][] }; //[readonly]
  resolvedVariableModes: { [collectionId: string]: string };
  explicitVariableModes: { [collectionId: string]: string };
  opacity?: number;
  blendMode?: BlendMode;
  isMask?: boolean;
  maskType?: MaskType;
  effects?: ReadonlyArray<Effect>;
  effectStyleId?: string;
  fills?: ReadonlyArray<Paint> | symbol;
  fillStyleId?: string | symbol;
  strokes?: ReadonlyArray<Paint>;
  strokeStyleId?: string;
  strokeWeight?: number | symbol;
  strokeTopWeight?: number | symbol;
  strokeBottomWeight?: number | symbol;
  strokeLeftWeight?: number | symbol;
  strokeRightWeight?: number | symbol;
  strokeJoin?: StrokeJoin | symbol;
  strokeAlign?: "CENTER" | "INSIDE" | "OUTSIDE";
  dashPattern?: ReadonlyArray<number>;
  strokeGeometry?: VectorPaths; //[readonly]
  strokeCap?: StrokeCap | symbol;
  strokeMiterLimit?: number;
  fillGeometry?: VectorPaths; //[readonly]
  x: number;
  y: number;
  width: number; //[readonly]
  height: number; //[readonly]
  minWidth: number | null;
  maxWidth: number | null;
  minHeight: number | null;
  maxHeight: number | null;
  relativeTransform: Transform;
  absoluteTransform: Transform; //[readonly]
  absoluteBoundingBox: Rect | null; //[readonly]
  layoutAlign?: "MIN" | "CENTER" | "MAX" | "STRETCH" | "INHERIT";
  layoutGrow?: number;
  layoutPositioning?: "AUTO" | "ABSOLUTE";
  absoluteRenderBounds?: Rect | null; //[readonly]
  constrainProportions?: boolean;
  rotation?: number;
  layoutSizingHorizontal?: "FIXED" | "HUG" | "FILL";
  layoutSizingVertical?: "FIXED" | "HUG" | "FILL";
  exportSettings?: ReadonlyArray<ExportSettings>;
  reactions?: ReadonlyArray<Reaction>;
  stuckTo?: SceneNode | null;

  sectionContentsHidden?: boolean;
  type?: string;

  isAsset: boolean;
  detachedInfo?: DetachedInfo | null;
  devStatus?: DevStatus;

  paddingLeft?: number;
  paddingRight?: number;
  paddingTop?: number;
  paddingBottom?: number;
  primaryAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "SPACE_BETWEEN";
  counterAxisAlignItems?: "MIN" | "MAX" | "CENTER" | "BASELINE";
  primaryAxisSizingMode?: "FIXED" | "AUTO";
  layoutWrap?: "NO_WRAP" | "WRAP";
  counterAxisSpacing?: number | null;
  counterAxisAlignContent?: "AUTO" | "SPACE_BETWEEN";
  layoutGrids?: ReadonlyArray<LayoutGrid>;
  gridStyleId?: string;
  backgrounds?: ReadonlyArray<Paint>;
  backgroundStyleId?: string;
  guides?: ReadonlyArray<Guide>;
  expanded?: boolean;
  constraints?: Constraints;
  layoutMode?: "NONE" | "HORIZONTAL" | "VERTICAL";
  counterAxisSizingMode?: "FIXED" | "AUTO";
  itemSpacing?: number;
  overflowDirection?: OverflowDirection;
  numberOfFixedChildren?: number;
  overlayPositionType?: OverlayPositionType;
  overlayBackground?: OverlayBackground;
  overlayBackgroundInteraction?: OverlayBackgroundInteraction;
  itemReverseZIndex?: boolean;
  strokesIncludedInLayout?: boolean;
  cornerRadius?: number | symbol;
  cornerSmoothing?: number;
  topLeftRadius?: number;
  topRightRadius?: number;
  bottomLeftRadius?: number;
  bottomRightRadius?: number;
  clipsContent?: boolean;
  inferredAutoLayout?: InferredAutoLayoutResult | null;
  [key: string]: any; // Index signature added
}

export interface CommonInterface {
  [key: string]: ParentNodeInterface;
}

export interface GetDataReturnInternface {
  fillProperties: CommonInterface[];
  commonProperties: CommonInterface[];
  layoutProperties: CommonInterface[];
  postionalProperties: CommonInterface[];
  remaining: CommonInterface[];
}

export const common: string[] = ["id", "type", "name"];
export const layout: string[] = ["layout", "Axis", "layout", "padding"];
export const postion: string[] = [
  "width",
  "height",
  "Radius",
  "constraints",
  "Transform",
];
