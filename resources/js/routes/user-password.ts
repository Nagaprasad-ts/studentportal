import { createRoute } from './_helpers';

export const edit = () => '/settings/password';
export const update = createRoute('/settings/password', 'put');
