import React from 'react';
import { AuthView } from '@clerk/expo/native';

export function AuthScreen() {
  return <AuthView mode="signInOrUp" />;
}
