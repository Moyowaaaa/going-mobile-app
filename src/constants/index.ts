import { Dimensions, Platform } from "react-native";

export const fontTypes = {
  regular: "Poppins_400Regular",
  bold: "Poppins_700Bold",
  medium: "Poppins_500Medium",
  semiBold: "Poppins_600SemiBold,",
};

export const isAndroid = Platform.OS === "android";

export const { width: screenWidth } = Dimensions.get("window");

export const colors = {
  black: "#000",
  grey: "#A8A8A8",
  blue: "#454DA9",
  darkGrey: "#777",
  otpGrey: "#CACACA",
  teal: "#00A596",
  white: "white",
  orange: "#FF5A00",
  red: "#F42F3C",
  green: "#37AC00",
  darkBlue: "#323549",
};

export const textType = {
  header: {
    fontFamily: fontTypes.bold,
    fontSize: 28,
    lineHeight: 40,
  },

  subHeader: {
    fontFamily: fontTypes.bold,
    fontSize: 26,
    lineHeight: 30,
  },

  paragraph: {
    fontFamily: fontTypes.medium,
    fontSize: 14,
  },
};

export const buttonVariants = {
  primary: { backgroundColor: "#454DA9", color: "#ffff" },
  secondary: { backgroundColor: "#ffffff", color: "#000" },
};

export const flightClassesStyles = {
  Economy: {
    backgroundColor: "#DBF6ED",
    color: "#009D65",
  },
  Business: {
    backgroundColor: "#FFE5E5",
    color: colors.red,
  },
  "First Class": {
    backgroundColor: colors.otpGrey,
    color: "#3841A3",
  },
};
