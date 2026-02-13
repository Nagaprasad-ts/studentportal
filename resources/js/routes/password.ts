import { createRoute } from './_helpers';

export const request = () => '/forgot-password';
export const email = createRoute('/forgot-password', 'post');
export const update = createRoute('/reset-password', 'post');
