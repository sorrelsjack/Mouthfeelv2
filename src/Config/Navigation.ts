import { NavigationContainerRef, ParamListBase } from '@react-navigation/native';
import React from 'react';

export const navigationRef = React.createRef<NavigationContainerRef>();

export function navigate(name: string, params?: ParamListBase) {
  navigationRef.current?.navigate(name, params);
}