import {
  ParentNodeInterface,
  CommonInterface,
  GetDataReturnInternface,
  common,
  layout,
  postion,
} from "./types";

function getChildObject(node: ParentNodeInterface): ParentNodeInterface {
  const child: CommonInterface = {};

  for (const key in node) {
    child[key] = node[key];
  }

  return child as ParentNodeInterface;
}

function getChildren(node: ParentNodeInterface) {
  let children: ParentNodeInterface[] = [];

  try {
    if (node.children) {
      node.children.forEach((child) => {
        // console.log("Child", child);

        children.push(getChildObject(child));
      });
      return children;
    }
    return [];
  } catch (err) {
    console.error("Error in getChildren", err);
    return [];
  }
}

function getData(node: ParentNodeInterface) {
  try {
    const tempNode: GetDataReturnInternface = {
      fillProperties: [],
      commonProperties: [],
      layoutProperties: [],
      postionalProperties: [],
      remaining: [],
    };

    const fillProperties: CommonInterface[] = [];
    const commonProperties: CommonInterface[] = [];
    const layoutProperties: CommonInterface[] = [];
    const postionalProperties: CommonInterface[] = [];
    const remaining: CommonInterface[] = [];
    for (const key in node) {
      // figma.mixed check
      if (typeof key === "symbol") {
        node[key] = "MIXED";
      }
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
  } catch (e) {
    console.error("Error in getData", e);
    return {} as GetDataReturnInternface;
  }
}

figma.on("run", () => {
  figma.showUI(__html__, { themeColors: true, height: 550, width: 300 });

  console.log("Node inspector is running");
});

const handleSelectionChange = async () => {
  const selectedNodes = figma.currentPage.selection;
  // console.log("length", selectedNodes.length);
  // console.log(selectedNodes[0].type, selectedNodes[0].name);

  if (selectedNodes.length == 0) {
    console.log("length 0", selectedNodes);
    figma.ui.postMessage({ type: "no-selection", data: {} });
    return;
  }
  if (selectedNodes.length > 0) {
    figma.ui.postMessage({
      type: "node-selected",
      value: JSON.stringify(getData(selectedNodes[0])),
      children: [],
    });
  }
};

figma.on("selectionchange", handleSelectionChange);

figma.ui.onmessage = async (msg) => {
  const selection = figma.currentPage.selection[0];
  if (msg.type === "get-children") {
    const children = getChildren(selection);
    // console.log("children", children);

    figma.ui.postMessage({
      type: "children",
      value: JSON.stringify(children, null, 2),
    });
  }
};
