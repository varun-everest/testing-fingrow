import { validateCredentials } from "../controllers/Users"

describe('Validating Users', () => {
    test('should check for password length', () => {
        expect(validateCredentials('Varun', '1234')).toBe('password should have altleast 8 characters')
    });
    test('should check for user exists or not', () => {
        expect(validateCredentials('varun', 'V@run765')).toBe('User Not Found');
    });
    test('should check for password matching', () => {
        expect(validateCredentials('Varun', 'V@run767')).toBe('Password mismatched');
    });
    test('Should check for successful user authentication', () => {
        expect(validateCredentials('Varun', 'V@run765')).toBe('User Found');
    });
});