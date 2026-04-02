const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

const config = {
  resolver: {
    // Add .cjs to the list of source extensions for Supabase compatibility.
    sourceExts: [...defaultConfig.resolver.sourceExts, "cjs"],
  }
};

module.exports = mergeConfig(defaultConfig, config);
