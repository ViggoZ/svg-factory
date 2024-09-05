const { optimize } = require('svgo/dist/svgo.browser.js');

export async function optimizeSVG(file: File): Promise<{ data: string; size: number }> {
  try {
    const fileContent = await file.text();
    const result = optimize(fileContent, {
      plugins: [
        'removeDoctype',
        'removeXMLProcInst',
        'removeComments',
        'removeMetadata',
        'removeEditorsNSData',
        'cleanupAttrs',
        'mergeStyles',
        'inlineStyles',
        'minifyStyles',
        'convertStyleToAttrs',
        'cleanupIds',
        'removeRasterImages',
        'removeUselessDefs',
        'cleanupNumericValues',
        'cleanupListOfValues',
        'convertColors',
        'removeUnknownsAndDefaults',
        'removeNonInheritableGroupAttrs',
        'removeUselessStrokeAndFill',
        'removeViewBox',
        'cleanupEnableBackground',
        'removeHiddenElems',
        'removeEmptyText',
        'convertShapeToPath',
        'convertEllipseToCircle',
        'moveElemsAttrsToGroup',
        'moveGroupAttrsToElems',
        'collapseGroups',
        'convertPathData',
        'convertTransform',
        'removeEmptyAttrs',
        'removeEmptyContainers',
        'mergePaths',
        'removeUnusedNS',
        'sortDefsChildren',
        'removeTitle',
        'removeDesc'
      ]
    });

    if ('data' in result) {
      return {
        data: result.data,
        size: new Blob([result.data]).size
      };
    } else {
      throw new Error('SVG optimization failed');
    }
  } catch (error) {
    throw new Error('Failed to read or optimize the file');
  }
}