module.exports = function (api) {
  api.cache(true);
  let plugins = [];

  // Reanimated requires its babel plugin to be last in the plugins list
  // react-native-reanimated includes worklets support; avoid adding react-native-worklets plugin twice
  plugins.push('react-native-reanimated/plugin');

  return {
    presets: [['babel-preset-expo', { jsxImportSource: 'nativewind' }], 'nativewind/babel'],

    plugins,
  };
};
