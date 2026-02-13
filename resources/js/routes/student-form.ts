import { createRoute } from './_helpers';

export const show = () => '/student-form';
export const store = createRoute('/student-form', 'post');
export const update = createRoute('/student-form', 'put');
export const download = () => '/student-form/download';
