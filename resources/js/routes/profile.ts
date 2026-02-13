import { createRoute } from './_helpers';

export const edit = () => '/settings/profile';
export const update = createRoute('/settings/profile', 'patch');
export const destroy = createRoute('/settings/profile', 'delete');
