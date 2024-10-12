function getFrameData(node: FrameNode) {
  console.log("Node", node);
  // @ts-ignore
  // const children = node.children.map((child) => getFrameData(child.id));
  return {
    id: node.id,
    type: node.type,
    children: [],
    parent: {},
    name: node.name,
    isAsset: node.isAsset,
    detachedInfo: node.detachedInfo,
    componentPropertyReferences: node.componentPropertyReferences,
    // variableConsumptionMap: node.variableConsumptionMap,
    boundVariables: node.boundVariables,
    resolvedVariableModes: node.resolvedVariableModes,
    inferredVariables: node.inferredVariables,
    explicitVariableModes: node.explicitVariableModes,
    opacity: node.opacity,
    blendMode: node.blendMode,
    isMask: node.isMask,
    maskType: node.maskType,
    effects: node.effects,
    effectStyleId: node.effectStyleId,
    exportSettings: node.exportSettings,
    fills: node.fills,
    fillStyleId: node.fillStyleId,
    strokes: node.strokes,
    strokeStyleId: node.strokeStyleId,
    strokeWeight: node.strokeWeight,
    strokeAlign: node.strokeAlign,
    strokeJoin: node.strokeJoin,
    dashPattern: node.dashPattern,
    strokeCap: node.strokeCap,
    strokeMiterLimit: node.strokeMiterLimit,
    fillGeometry: node.fillGeometry,
    strokeGeometry: node.strokeGeometry,
    paddingLeft: node.paddingLeft,
    paddingRight: node.paddingRight,
    paddingTop: node.paddingTop,
    paddingBottom: node.paddingBottom,
    primaryAxisAlignItems: node.primaryAxisAlignItems,
    counterAxisAlignItems: node.counterAxisAlignItems,
    primaryAxisSizingMode: node.primaryAxisSizingMode,
    layoutWrap: node.layoutWrap,
    counterAxisSpacing: node.counterAxisSpacing,
    counterAxisAlignContent: node.counterAxisAlignContent,
    strokeTopWeight: node.strokeTopWeight,
    strokeBottomWeight: node.strokeBottomWeight,
    strokeLeftWeight: node.strokeLeftWeight,
    strokeRightWeight: node.strokeRightWeight,
    inferredAutoLayout: node.inferredAutoLayout,
    relativeTransform: node.relativeTransform,
    absoluteTransform: node.absoluteTransform,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    absoluteBoundingBox: node.absoluteBoundingBox,
    layoutGrids: node.layoutGrids,
    gridStyleId: node.gridStyleId,
    backgrounds: node.backgrounds,
    backgroundStyleId: node.backgroundStyleId,
    guides: node.guides,
    expanded: node.expanded,
    constraints: node.constraints,
    layoutMode: node.layoutMode,
    counterAxisSizingMode: node.counterAxisSizingMode,
    verticalPadding: node.verticalPadding,
    itemSpacing: node.itemSpacing,
    overflowDirection: node.overflowDirection,
    numberOfFixedChildren: node.numberOfFixedChildren,
    overlayPositionType: node.overlayPositionType,
    overlayBackground: node.overlayBackground,
    overlayBackgroundInteraction: node.overlayBackgroundInteraction,
    itemReverseZIndex: node.itemReverseZIndex,
    strokesIncludedInLayout: node.strokesIncludedInLayout,
    visible: node.visible,
    locked: node.locked,
    stuckNodes: node.stuckNodes,
    attachedConnectors: node.attachedConnectors,
    absoluteRenderBounds: node.absoluteRenderBounds,
    rotation: node.rotation,
    layoutAlign: node.layoutAlign,
    constrainProportions: node.constrainProportions,
    layoutGrow: node.layoutGrow,
    layoutPositioning: node.layoutPositioning,
    minWidth: node.minWidth,
    minHeight: node.minHeight,
    maxWidth: node.maxWidth,
    maxHeight: node.maxHeight,
    layoutSizingHorizontal: node.layoutSizingHorizontal,
    layoutSizingVertical: node.layoutSizingVertical,
    cornerRadius: node.cornerRadius,
    cornerSmoothing: node.cornerSmoothing,
    topLeftRadius: node.topLeftRadius,
    topRightRadius: node.topRightRadius,
    bottomLeftRadius: node.bottomLeftRadius,
    bottomRightRadius: node.bottomRightRadius,
    clipsContent: node.clipsContent,
    devStatus: node.devStatus,
    reactions: node.reactions,
    // playbackSettings: node.playbackSettings,
  };
}

function getSectionData(node: SectionNode) {
  return {
    id: node.id,
    type: node.type,
    children: node.children,
    parent: {},
    name: node.name,
    isAsset: node.isAsset,
    // detachedInfo:node.detachedInfo,
    visible: node.visible,
    locked: node.locked,
    stuckNodes: node.stuckNodes,
    attachedConnectors: node.attachedConnectors,
    exportSettings: node.exportSettings,
    relativeTransform: node.relativeTransform,
    absoluteTransform: node.absoluteTransform,
    x: node.x,
    y: node.y,
    width: node.width,
    height: node.height,
    absoluteBoundingBox: node.absoluteBoundingBox,
    fills: node.fills,
    fillStyleId: node.fillStyleId,
    componentPropertyReferences: node.componentPropertyReferences,
    // variableConsumptionMap: node.variableConsumptionMap,
    boundVariables: node.boundVariables,
    resolvedVariableModes: node.resolvedVariableModes,
    inferredVariables: node.inferredVariables,
    explicitVariableModes: node.explicitVariableModes,
    sectionContentsHidden: node.sectionContentsHidden,
    devStatus: node.devStatus,
  };
}

figma.on("run", () => {
  figma.showUI(__html__, { themeColors: true, height: 400 });

  console.log("Node inspector is running");
});

figma.on("selectionchange", async () => {
  const selectedNodes = figma.currentPage.selection;
  console.log(selectedNodes[0].type);

  if (selectedNodes.length === 0) {
    figma.ui.postMessage({ type: "no-selection", data: {} });
    return;
  }

  if (selectedNodes[0].type === "FRAME") {
    figma.ui.postMessage({
      type: "frame",
      data: getFrameData(selectedNodes[0] as FrameNode),
    });
  } else if (selectedNodes[0].type === "SECTION") {
    figma.ui.postMessage({
      type: "section",
      data: getSectionData(selectedNodes[0] as SectionNode),
    });
  }
});

// figma.ui.onmessage = (msg) => {
//   if (msg.type === "generate-tree") {
//   }

//   figma.closePlugin();
// };
