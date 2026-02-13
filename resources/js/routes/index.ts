import { createRoute } from './_helpers';

export const home = () => '/';
export const login = () => '/login';
export const register = () => '/register';
export const dashboard = () => createRoute('/dashboard');
export const logout = () => '/logout';
