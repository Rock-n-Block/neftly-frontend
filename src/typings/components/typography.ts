enum Values {
  white,
  red,
  black,
  darkenGray,
  gray,
  lightGray,
  middleGray,
  secondary,
  primary,
  inherit,
  purple
}

enum SizeValues {
  xxxs,
  xxs,
  xs,
  s,
  m,
  l,
  xl,
  xxl,
  xxxl,
  xxxxl,
  inherit,
}

enum WeightValues {
  normal,
  medium,
  bold,
  inherit,
}

enum Aligns {
  center,
  left,
  right,
  inherit,
}

enum HeadingTypes {
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
}

export type TextColor = keyof typeof Values;
export type TextSize = keyof typeof SizeValues;
export type TextWeight = keyof typeof WeightValues;
export type TextAlign = keyof typeof Aligns;
export type HeadingType = keyof typeof HeadingTypes;
