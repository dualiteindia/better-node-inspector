figma.showUI(__html__, { themeColors: true, height: 300 });

figma.on("selectionchange", () => {
  console.clear();
  console.log("Figma Plugin is running");

  const selectedNodes = figma.currentPage.selection;
  console.log(selectedNodes[0]);
  figma.ui.postMessage({
    type: "selection-changed",
    data: selectedNodes[0],
  });
});

// figma.ui.onmessage = (msg) => {
//   if (msg.type === "generate-tree") {
//   }

//   figma.closePlugin();
// };