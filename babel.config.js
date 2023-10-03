module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          hooks: './src/hooks',
          components:"./src/components",
          config:"./src/config",
          navigation:"./src/navigation",
          screens:"./src/screens"
        },
      },
    ],
  ],
};
