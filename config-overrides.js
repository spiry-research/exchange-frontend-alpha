const { injectBabelPlugin } = require('react-app-rewired');
const tsImportPluginFactory = require('ts-import-plugin');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
    config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
    config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
    config = rewireLess.withLoaderOptions({
        modifyVars: { 
            "@primary-color": "#d4a668",
            "@border-radius-base": "0",
            "@border-radius-sm": "0",     
        },
    })(config, env);
    return config;
};
module.exports = function override(config, env) {

    const tsLoader = getLoader(
        config.module.rules,
        rule =>
            rule.loader &&
            typeof rule.loader === 'string' &&
            rule.loader.includes('ts-loader')
    );

    tsLoader.options = {
        getCustomTransformers: () => ({
            before: [
                tsImportPluginFactory({
                    libraryDirectory: 'es',
                    libraryName: 'antd',
                    style: true,
                }),
            ],
        })
    };

    config = rewireLess.withLoaderOptions({
        javascriptEnabled: true,
        // modifyVars: { "@primary-color": "#1DA57A" },
    })(config, env);

    return config;

};