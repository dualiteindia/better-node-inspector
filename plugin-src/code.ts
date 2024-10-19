import {
  ParentNodeInterface,
  CommonInterface,
  GetDataReturnInternface,
  common,
  layout,
  postion,
} from "./types";

async function instance(node: ParentNodeInterface) {
  try {
    // Ensure the node is of type COMPONENT or INSTANCE before calling getInstancesAsync
    if (node.type === "COMPONENT" || node.type === "INSTANCE") {
      const instanceNode = await node.getMainComponentAsync();
      // console.log("Instance Node", instanceNode);
      return instanceNode;
    }
  } catch (error) {
    console.error("Error in instance function", error);
    return null;
  }
}

async function getChildObject(
  node: ParentNodeInterface
): Promise<ParentNodeInterface> {
  const child: CommonInterface = {};

  console.log("Node type", node.type);
  if (node.type === "INSTANCE" || node.type === "COMPONENT") {
    const instanceNode = await instance(node);
    console.log("InstanceNode: ", instanceNode);
    if (instanceNode) {
      let data = await instanceNode.getInstancesAsync();
      const newData = (await figma.getNodeByIdAsync(
        data[0].id
      )) as ParentNodeInterface;
      console.log("Data", data[0].id, newData);
      for (const key in instanceNode) {
        child[key] = newData[key];
      }
    }
  } else {
    for (const key in node) {
      child[key] = node[key];
    }
  }

  return child as ParentNodeInterface;
}

async function getChildren(node: ParentNodeInterface) {
  let children: ParentNodeInterface[] = [];

  try {
    if (node.children) {
      for (const child of node.children) {
        // Wait for each child's processing to complete before continuing
        const childObject = await getChildObject(child);
        children.push(childObject);
      }
      return children;
    }
    return [];
  } catch (err) {
    console.error("Error in getChildren", err);
    return [];
  }
}

async function getData(node: ParentNodeInterface) {
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

    console.log("Node type", node.type);
    if (node.type === "INSTANCE" || node.type === "COMPONENT") {
      console.log("Instance node block");
      const instanceNode = await instance(node);
      console.log("InstanceNode: ", instanceNode);

      if (instanceNode) {
        let data = await instanceNode.getInstancesAsync();
        const node = (await figma.getNodeByIdAsync(
          data[0].id
        )) as ParentNodeInterface;

        console.log("Data", data[0].id, node);

        for (const key in instanceNode) {
          // skip children
          if (key === "children") continue;
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
      }
    } else {
      for (const key in node) {
        // skip children
        if (key === "children") continue;
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
        // }
      }
    }
    tempNode.fillProperties = fillProperties;
    tempNode.commonProperties = commonProperties;
    tempNode.layoutProperties = layoutProperties;
    tempNode.postionalProperties = postionalProperties;
    tempNode.remaining = remaining;
    console.log("TempNode", tempNode);
    return tempNode;
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
      value: JSON.stringify(await getData(selectedNodes[0])),
      children: [],
    });
  }
};

figma.on("selectionchange", handleSelectionChange);

figma.ui.onmessage = async (msg) => {
  const selection = figma.currentPage.selection[0];
  if (msg.type === "get-children") {
    const children = await getChildren(selection);
    console.log("children", children);

    figma.ui.postMessage({
      type: "children",
      value: JSON.stringify(children, null, 2),
    });
  }

  if (msg.type === "the-mode") {
    figma.ui.postMessage({
      type: "prod-mode",
      value: "PRODUCTION MODE ON'",
    });
  }
};
