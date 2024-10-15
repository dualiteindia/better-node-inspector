import { ParentNodeInterface } from "./types";

function getChildren(node: ParentNodeInterface) {
  let children: getDataReturnInternface[] = [];

  if (node.children) {
    node.children.forEach((child) => {
      console.log("Child", child);

      children.push(getData(child));
    });
  } else {
    return "";
  }

  // return children;
  return JSON.stringify(children, null, 2);
}

// create the return type for getFrameData and getSectionData functions
// function getFrameData(node: ParentNodeInterface): ParentNodeInterface {
//   console.log("Node", node);

//   return {
//     id: node.id,
//     type: node.type,
//     children: [],
//     parent: node.parent,
//     name: node.name,
//     isAsset: node.isAsset,
//     detachedInfo: node.detachedInfo,
//     componentPropertyReferences: node.componentPropertyReferences,
//     // boundVariables: node.boundVariables,
//     resolvedVariableModes: node.resolvedVariableModes,
//     // inferredVariables: node.inferredVariables,
//     explicitVariableModes: node.explicitVariableModes,
//     opacity: node.opacity,
//     blendMode: node.blendMode,
//     isMask: node.isMask,
//     maskType: node.maskType,
//     effects: node.effects,
//     effectStyleId: node.effectStyleId,
//     exportSettings: node.exportSettings,
//     fills: node.fills,
//     fillStyleId: node.fillStyleId,
//     strokes: node.strokes,
//     strokeStyleId: node.strokeStyleId,
//     strokeWeight: node.strokeWeight,
//     strokeAlign: node.strokeAlign,
//     strokeJoin: node.strokeJoin,
//     dashPattern: node.dashPattern,
//     strokeCap: node.strokeCap,
//     strokeMiterLimit: node.strokeMiterLimit,
//     fillGeometry: node.fillGeometry,
//     strokeGeometry: node.strokeGeometry,
//     paddingLeft: node.paddingLeft,
//     paddingRight: node.paddingRight,
//     paddingTop: node.paddingTop,
//     paddingBottom: node.paddingBottom,
//     primaryAxisAlignItems: node.primaryAxisAlignItems,
//     counterAxisAlignItems: node.counterAxisAlignItems,
//     primaryAxisSizingMode: node.primaryAxisSizingMode,
//     layoutWrap: node.layoutWrap,
//     counterAxisSpacing: node.counterAxisSpacing,
//     counterAxisAlignContent: node.counterAxisAlignContent,
//     strokeTopWeight: node.strokeTopWeight,
//     strokeBottomWeight: node.strokeBottomWeight,
//     strokeLeftWeight: node.strokeLeftWeight,
//     strokeRightWeight: node.strokeRightWeight,
//     inferredAutoLayout: node.inferredAutoLayout,
//     relativeTransform: node.relativeTransform,
//     absoluteTransform: node.absoluteTransform,
//     x: node.x,
//     y: node.y,
//     width: node.width,
//     height: node.height,
//     absoluteBoundingBox: node.absoluteBoundingBox,
//     layoutGrids: node.layoutGrids,
//     gridStyleId: node.gridStyleId,
//     backgrounds: node.backgrounds,
//     backgroundStyleId: node.backgroundStyleId,
//     guides: node.guides,
//     expanded: node.expanded,
//     constraints: node.constraints,
//     layoutMode: node.layoutMode,
//     counterAxisSizingMode: node.counterAxisSizingMode,
//     itemSpacing: node.itemSpacing,
//     overflowDirection: node.overflowDirection,
//     numberOfFixedChildren: node.numberOfFixedChildren,
//     overlayPositionType: node.overlayPositionType,
//     overlayBackground: node.overlayBackground,
//     overlayBackgroundInteraction: node.overlayBackgroundInteraction,
//     itemReverseZIndex: node.itemReverseZIndex,
//     strokesIncludedInLayout: node.strokesIncludedInLayout,
//     visible: node.visible,
//     locked: node.locked,
//     stuckNodes: node.stuckNodes,
//     attachedConnectors: node.attachedConnectors,
//     absoluteRenderBounds: node.absoluteRenderBounds,
//     rotation: node.rotation,
//     layoutAlign: node.layoutAlign,
//     constrainProportions: node.constrainProportions,
//     layoutGrow: node.layoutGrow,
//     layoutPositioning: node.layoutPositioning,
//     minWidth: node.minWidth,
//     minHeight: node.minHeight,
//     maxWidth: node.maxWidth,
//     maxHeight: node.maxHeight,
//     layoutSizingHorizontal: node.layoutSizingHorizontal,
//     layoutSizingVertical: node.layoutSizingVertical,
//     cornerRadius: node.cornerRadius,
//     cornerSmoothing: node.cornerSmoothing,
//     topLeftRadius: node.topLeftRadius,
//     topRightRadius: node.topRightRadius,
//     bottomLeftRadius: node.bottomLeftRadius,
//     bottomRightRadius: node.bottomRightRadius,
//     clipsContent: node.clipsContent,
//     devStatus: node.devStatus,
//     reactions: node.reactions,
//   };
// }

interface Common {
  [key: string]: ParentNodeInterface;
}

interface getDataReturnInternface {
  fillProperties: Common[];
  commonProperties: Common[];
  layoutProperties: Common[];
  postionalProperties: Common[];
  remaining: Common[];
}

const common: string[] = ["id", "type", "name"];
const layout: string[] = ["layout", "Axis", "layout", "padding"];
const postion: string[] = [
  "width",
  "height",
  "radius",
  "constraints",
  "transform",
];

function getData(node: ParentNodeInterface) {
  const tempNode: getDataReturnInternface = {
    fillProperties: [],
    commonProperties: [],
    layoutProperties: [],
    postionalProperties: [],
    remaining: [],
  };

  const fillProperties: Common[] = [];
  const commonProperties: Common[] = [];
  const layoutProperties: Common[] = [];
  const postionalProperties: Common[] = [];
  const remaining: Common[] = [];
  for (const key in node) {
    if (key.includes("fill")) {
      if (fillProperties.length === 0) {
        fillProperties.push({});
      }
      fillProperties[0][key] = node[key];
    } else if (common.indexOf(key) != -1) {
      if (commonProperties.length === 0) {
        commonProperties.push({});
      }
      commonProperties[0][key] = node[key];
    } else if (layout.some((substring) => key.includes(substring))) {
      if (layoutProperties.length === 0) {
        layoutProperties.push({});
      }
      layoutProperties[0][key] = node[key];
    } else if (
      postion.some((substring) => key.includes(substring)) ||
      key === "x" ||
      key === "y"
    ) {
      if (postionalProperties.length === 0) {
        postionalProperties.push({});
      }
      postionalProperties[0][key] = node[key];
    } else {
      if (remaining.length === 0) {
        remaining.push({});
      }
      remaining[0][key] = node[key];
    }
  }

  tempNode.fillProperties = fillProperties;
  tempNode.commonProperties = commonProperties;
  tempNode.layoutProperties = layoutProperties;
  tempNode.postionalProperties = postionalProperties;
  tempNode.remaining = remaining;
  // console.log("TempNode", tempNode);
  return tempNode;

  // return [
  // {
  //   id: node.id,
  //   type: node.type,
  //   children: [],
  //   parent: {},
  //   name: node.name,
  //   isAsset: node.isAsset,
  //   visible: node.visible,
  //   locked: node.locked,
  //   stuckNodes: node.stuckNodes,
  //   attachedConnectors: node.attachedConnectors,
  //   exportSettings: node.exportSettings,
  //   relativeTransform: node.relativeTransform,
  //   absoluteTransform: node.absoluteTransform,
  //   x: node.x,
  //   y: node.y,
  //   width: node.width,
  //   height: node.height,
  //   absoluteBoundingBox: node.absoluteBoundingBox,
  //   fills: node.fills,
  //   fillStyleId: node.fillStyleId,
  //   componentPropertyReferences: node.componentPropertyReferences,
  //   // boundVariables: node.boundVariables,
  //   resolvedVariableModes: node.resolvedVariableModes,
  //   // inferredVariables: node.inferredVariables,
  //   explicitVariableModes: node.explicitVariableModes,
  //   sectionContentsHidden: node.sectionContentsHidden,
  //   devStatus: node.devStatus,
  // },
  // ];
}

figma.on("run", () => {
  figma.showUI(__html__, { themeColors: true, height: 550, width: 300 });

  console.log("Node inspector is running");
});

const handleSelectionChange = async () => {
  const selectedNodes = figma.currentPage.selection;
  console.log("length", selectedNodes.length); // 0
  // console.log(selectedNodes[0].type, selectedNodes[0].name);

  if (selectedNodes.length == 0) {
    console.log("length 0", selectedNodes);
    figma.ui.postMessage({ type: "no-selection", data: {} });
    return;
  }
  if (selectedNodes.length > 0) {
    figma.ui.postMessage({
      type: "node-selected",
      value: getData(selectedNodes[0]),
      children: [],
    });
  }
};

figma.on("selectionchange", handleSelectionChange);

figma.ui.onmessage = async (msg) => {
  const selection = figma.currentPage.selection[0];
  if (msg.type === "get-children") {
    // console.log("hit");

    const children = getChildren(selection);
    console.log("children", children);

    figma.ui.postMessage({
      type: "children",
      value: children,
    });
  }
};
