import { ParentNodeInterface } from "./types";

function getChildren(node: FrameNode | SectionNode) {
  let children: readonly SceneNode[] = [];

  if (node.type === "FRAME") {
    children = (node as FrameNode).children;
  } else if (node.type === "SECTION") {
    children = (node as SectionNode).children;
  }

  return children;
}

// create the return type for getFrameData and getSectionData functions
function getFrameData(node: ParentNodeInterface): any {
  console.log("Node", node);

  return [
    {
      id: node.id,
      type: node.type,
      children: [],
      parent: node.parent,
      name: node.name,
      isAsset: node.isAsset,
      detachedInfo: node.detachedInfo,
      componentPropertyReferences: node.componentPropertyReferences,
      // boundVariables: node.boundVariables,
      resolvedVariableModes: node.resolvedVariableModes,
      // inferredVariables: node.inferredVariables,
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
    },
  ];
}

function getSectionData(node: ParentNodeInterface) {
  return [
    {
      id: node.id,
      type: node.type,
      children: [],
      parent: {},
      name: node.name,
      isAsset: node.isAsset,
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
      // boundVariables: node.boundVariables,
      resolvedVariableModes: node.resolvedVariableModes,
      // inferredVariables: node.inferredVariables,
      explicitVariableModes: node.explicitVariableModes,
      sectionContentsHidden: node.sectionContentsHidden,
      devStatus: node.devStatus,
    },
  ];
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

figma.ui.onmessage = async (msg) => {
  if (msg.type === "get-children") {
    console.log("hit");
    const selection = figma.currentPage.selection[0];
    console.log(selection);
    const node = figma.getNodeById(selection.id) as FrameNode | SectionNode;
    const children = getChildren(node);

    figma.ui.postMessage({
      type: "children",
      data: children,
    });
  } else {
    figma.closePlugin("");
  }
};
