import {
  ParentNodeInterface,
  CommonInterface,
  GetDataReturnInternface,
  common,
  layout,
  postion,
} from "./types";

export async function instanceData(node: ParentNodeInterface) {
  try {
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

export async function getChildObject(
  node: ParentNodeInterface
): Promise<ParentNodeInterface> {
  const child: CommonInterface = {};

  console.log("Node type", node.type);
  if (node.type === "INSTANCE" || node.type === "COMPONENT") {
    const instanceNode = await instanceData(node);
    // console.log("InstanceNode: ", instanceNode);
    if (instanceNode) {
      let data = await instanceNode.getInstancesAsync();
      const node = (await figma.getNodeByIdAsync(
        data[0].id
      )) as ParentNodeInterface;
      for (const key in instanceNode) {
        child[key] = node[key];
      }
    }
  } else {
    for (const key in node) {
      child[key] = node[key];
    }
  }

  return child as ParentNodeInterface;
}

export async function getChildren(node: ParentNodeInterface) {
  let children: ParentNodeInterface[] = [];

  try {
    if (node.children) {
      for (const child of node.children) {
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

export async function getData(node: ParentNodeInterface) {
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

    function loopData(
      node: ParentNodeInterface,
      instanceNode: ParentNodeInterface
    ) {
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

    console.log("Node type", node.type);
    if (node.type === "INSTANCE" || node.type === "COMPONENT") {
      // console.log("Instance node block");
      const instanceNode = await instanceData(node);

      if (instanceNode) {
        let data = await instanceNode.getInstancesAsync();
        const node = (await figma.getNodeByIdAsync(
          data[0].id
        )) as ParentNodeInterface;

        loopData(node, instanceNode);
      }
    } else {
      loopData(node, node);
    }
    tempNode.fillProperties = fillProperties;
    tempNode.commonProperties = commonProperties;
    tempNode.layoutProperties = layoutProperties;
    tempNode.postionalProperties = postionalProperties;
    tempNode.remaining = remaining;
    // console.log("TempNode", tempNode);
    return tempNode;
  } catch (e) {
    console.error("Error in getData", e);
    return {} as GetDataReturnInternface;
  }
}
