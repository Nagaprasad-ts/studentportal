import { createRoute } from './_helpers';

export const show = () => '/settings/two-factor';
export const enable = createRoute('/user/two-factor-authentication', 'post');
export const confirm = createRoute('/user/confirmed-two-factor-authentication', 'post');
export const disable = createRoute('/user/two-factor-authentication', 'delete');
export const qrCode = () => '/user/two-factor-qr-code';
export const secretKey = () => '/user/two-factor-secret-key';
export const recoveryCodes = () => '/user/two-factor-recovery-codes';
export const regenerateRecoveryCodes = createRoute('/user/two-factor-recovery-codes', 'post');
