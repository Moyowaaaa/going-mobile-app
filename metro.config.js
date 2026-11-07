const path = require("path");
const { createRequire } = require("module");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);
const nativeWindConfig = withNativeWind(config, { input: "./global.css" });

const previousResolveRequest = nativeWindConfig.resolver.resolveRequest;

// These packages publish TypeScript as their Metro entry. Loading that source
// throws Hermes errors like Property 'rue' / 'UIImagePickerControllerQuaityType'
// doesn't exist. Use the prebuilt JavaScript instead.
const lucideRequire = createRequire(require.resolve("lucide-react-native"));
const svgEntry = lucideRequire.resolve("react-native-svg/lib/commonjs/index.js");
const imagePickerEntry = path.join(
  path.dirname(require.resolve("expo-image-picker")),
  "../build/ImagePicker.js",
);

nativeWindConfig.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native-svg") {
    return { type: "sourceFile", filePath: svgEntry };
  }

  if (moduleName === "expo-image-picker") {
    return { type: "sourceFile", filePath: imagePickerEntry };
  }

  if (previousResolveRequest) {
    return previousResolveRequest(context, moduleName, platform);
  }

  return context.resolveRequest(context, moduleName, platform);
};

module.exports = nativeWindConfig;
