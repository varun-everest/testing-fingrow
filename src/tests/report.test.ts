import { generateReport } from "../controllers/Report"

describe('Tests related to Financial Report', () => {

    test('should generate Report', () => {
        expect(generateReport()).toBeTruthy;
    })
})