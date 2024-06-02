import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import colors from "@/src/utils/colors";

export function TabBarIcon({ style, ...rest }: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return <Ionicons size={28} style={[{ marginBottom: -3, color: colors.black }, style]} {...rest} />;
}
