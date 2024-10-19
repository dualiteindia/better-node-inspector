import { getChildren, getData } from "./pluginUtils";

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
    // console.log("children", children);

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
