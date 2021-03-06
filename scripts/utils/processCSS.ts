import * as path from 'path';

import sass from 'sass';
import postcss from 'postcss';
import localByDefault from 'postcss-modules-local-by-default';
import Scope from 'postcss-modules-scope';
import cssNano from 'cssnano';

import { isProduction, stringHash } from './miscUtils';
import options from '../options.json';
import { fileLoader } from './fileLoader';

const scope = Scope({
    generateScopedName(exportedName, _, css) {
        const hash = stringHash(exportedName + css, 'sha1', 'hex').slice(0, 8);

        if (isProduction()) {
            return `css-${hash}`;
        }

        return `css_${exportedName}_${hash}`;
    }
});

const extractAssets = postcss.plugin('postcss-extract-assets', () => {
    return function(root) {
        root.each((node) => {
            if (node.type == 'rule') {
                node.each((decl) => {
                    if (decl.type == 'decl' && decl.value.startsWith('url(')) {
                        const [, srcPath] = decl.value.match(/url\((.*)\)/) || ['', ''];
                        const newPath = fileLoader(
                            srcPath,
                            path.join(process.cwd(), options.srcPath, 'dummy.css')
                        );
                        decl.value = `url(${newPath})`;
                    }
                });
            }
        });
    };
});

export async function processCSS(data: string, mode: 'local' | 'global' = 'local') {
    try {
        const exportTokens: Record<string, string> = {};

        const extractExports = postcss.plugin('postcss-extract-imports', () => {
            return function(root) {
                root.each((node) => {
                    if (node.type === 'rule' && node.selector === ':export') {
                        node.each((decl) => {
                            if (decl.type === 'decl') {
                                exportTokens[decl.prop] = decl.value;
                            }
                        });
                        node.remove();
                    }
                });
            };
        });

        const postCSSPlugins: postcss.AcceptedPlugin[] = [
            (localByDefault({ mode }) as unknown) as postcss.Transformer,
            (scope as unknown) as postcss.Transformer,
            extractExports,
            extractAssets
        ];

        if (isProduction()) {
            postCSSPlugins.push((cssNano as unknown) as postcss.Plugin<cssNano.CssNanoOptions>);
        }

        const css = sass.renderSync({
            data,
            includePaths: [path.join(process.cwd(), 'styles')]
        });
        const parser = postcss(postCSSPlugins);
        const result = await parser.process(css.css, { from: undefined });

        return { css: result.css, exports: exportTokens };
    } catch (e) {
        console.log(e);

        process.exit(1);
    }
}
