function getNodeData(node: FrameNode) {
  console.log("Node", node);
  // @ts-ignore
  // const children = node.children.map((child) => getNodeData(child.id));
  return {
    absoluteBoundingBox: node.absoluteBoundingBox,
    absoluteRenderBounds: node.absoluteBoundingBox,
    absoluteTransform: node.absoluteBoundingBox,
    attachedConnectors: node.absoluteBoundingBox,
    backgroundStyleId: node.absoluteBoundingBox,
    backgrounds: node.absoluteBoundingBox,
    blendMode: node.absoluteBoundingBox,
    bottomLeftRadius: node.absoluteBoundingBox,
    bottomRightRadius: node.absoluteBoundingBox,
    boundVariables: node.absoluteBoundingBox,
    children: node.absoluteBoundingBox,
    clipsContent: node.absoluteBoundingBox,
    componentPropertyReferences: node.absoluteBoundingBox,
    constrainProportions: node.absoluteBoundingBox,
    constraints: node.absoluteBoundingBox,
    cornerRadius: node.absoluteBoundingBox,
    cornerSmoothing: node.absoluteBoundingBox,
    counterAxisAlignContent: node.absoluteBoundingBox,
    counterAxisAlignItems: node.absoluteBoundingBox,
    counterAxisSizingMode: node.absoluteBoundingBox,
    counterAxisSpacing: node.absoluteBoundingBox,
    dashPattern: node.absoluteBoundingBox,
    detachedInfo: node.absoluteBoundingBox,
    devStatus: node.absoluteBoundingBox,
    effectStyleId: node.absoluteBoundingBox,
    effects: node.absoluteBoundingBox,
    expanded: node.absoluteBoundingBox,
    explicitVariableModes: node.absoluteBoundingBox,
    exportSettings: node.absoluteBoundingBox,
    fillGeometry: node.absoluteBoundingBox,
    fillStyleId: node.absoluteBoundingBox,
    fills: node.fills,
    gridStyleId: node.absoluteBoundingBox,
    guides: node.absoluteBoundingBox,
    height: node.absoluteBoundingBox,
    horizontalPadding: node.absoluteBoundingBox,
    inferredAutoLayout: node.absoluteBoundingBox,
    inferredVariables: node.absoluteBoundingBox,
    isAsset: node.absoluteBoundingBox,
    isMask: node.absoluteBoundingBox,
    itemReverseZIndex: node.absoluteBoundingBox,
    itemSpacing: node.itemSpacing,
    layoutAlign: node.layoutAlign,
    layoutGrids: node.layoutGrids,
    layoutGrow: node.layoutGrow,
    layoutMode: node.layoutMode,
    layoutPositioning: node.layoutPositioning,
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
    layoutWrap: node.layoutWrap,
    locked: node.locked,
    maskType: node.maskType,
    maxHeight: node.maxHeight,
    maxWidth: node.maxWidth,
    minHeight: node.minHeight,
    minWidth: node.minWidth,
    name: node.name,
    numberOfFixedChildren: node.numberOfFixedChildren,
    opacity: node.opacity,
    overflowDirection: node.overflowDirection,
    overlayBackground: node.overlayBackground,
    overlayBackgroundInteraction: node.overlayBackgroundInteraction,
    overlayPositionTypea: node.overlayPositionType,
    paddingBottom: node.paddingBottom,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    parent: node.parent,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    reactions: node.reactions,
    relativeTransform: node.relativeTransform,
    removed: node.removed,
    resolvedVariableModes: node.resolvedVariableModes,
    rotation: node.rotation,
    strokeAlign: node.strokeAlign,
    strokeBottomWeight: node.strokeBottomWeight,
    strokeCap: node.strokeCap,
    strokeGeometry: node.strokeGeometry,
    strokeJoin: node.strokeJoin,
    strokeLeftWeight: node.strokeLeftWeight,
    strokeMiterLimit: node.strokeMiterLimit,
    strokeRightWeight: node.strokeRightWeight,
    strokeStyleId: node.strokeStyleId,
    strokeTopWeight: node.strokeTopWeight,
    strokeWeight: node.strokeWeight,
    strokes: node.strokes,
    strokesIncludedInLayout: node.strokesIncludedInLayout,
    stuckNodes: node.stuckNodes,
    topLeftRadius: node.topLeftRadius,
    topRightRadius: node.topRightRadius,
    verticalPadding: node.verticalPadding,
    visible: node.visible,
    width: node.width,
    x: node.x,
    y: node.y,
  };
}

figma.on("run", () => {
  figma.showUI(__html__, { themeColors: true, height: 300 });

  console.log("Node inspector is running");
});

figma.on("selectionchange", async () => {
  const selectedNodes = figma.currentPage.selection;

  if (selectedNodes.length === 0) {
    figma.ui.postMessage({ type: "no-selection", data: {} });
    return;
  }

  if (selectedNodes[0].type === "FRAME") {
    figma.ui.postMessage({
      type: "frame",
      data: getNodeData(selectedNodes[0] as FrameNode),
    });
  }
});

// figma.ui.onmessage = (msg) => {
//   if (msg.type === "generate-tree") {
//   }

//   figma.closePlugin();
// };
