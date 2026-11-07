const React = require("react");
const ReactNative = require("react-native");

function withPlusJakartaSans(Component) {
  const Wrapped = React.forwardRef(function PlusJakartaSansText(props, ref) {
    return React.createElement(Component, {
      ...props,
      ref,
      style: [{ fontFamily: "PlusJakartaSans" }, props.style],
    });
  });
  Wrapped.displayName = Component.displayName || Component.name || "PlusJakartaSansText";
  return Wrapped;
}

if (!ReactNative.Text.__plusJakartaSans) {
  const text = withPlusJakartaSans(ReactNative.Text);
  text.__plusJakartaSans = true;
  ReactNative.Text = text;
}

if (!ReactNative.TextInput.__plusJakartaSans) {
  const input = withPlusJakartaSans(ReactNative.TextInput);
  input.__plusJakartaSans = true;
  ReactNative.TextInput = input;
}

require("expo-router/entry");
