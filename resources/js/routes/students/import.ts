import { createRoute } from '../_helpers';

export const importStudents = createRoute('/admin/students/import', 'post');
export const store = importStudents;
