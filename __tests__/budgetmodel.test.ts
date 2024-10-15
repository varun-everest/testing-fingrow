import mongoose from 'mongoose';
import BudgetModel from '../src/collections/budget.collection'; 

describe('Budget Model', () => {
    beforeAll(() => {
        mongoose.connect('mongodb://127.0.0.1:27017/FingrowTestDB');
    });

    afterAll(async() => {
        // await mongoose.disconnect(); 
    });

    test('should create the Budget model successfully', () => {
        expect(BudgetModel).toBeDefined();
        expect(BudgetModel.modelName).toBe('Budgets');
    });

    test('should have the correct schema properties', () => {
       
        const schema = BudgetModel.schema;

        expect(schema.paths).toHaveProperty('userId');
        expect(schema.paths).toHaveProperty('budgets');

        expect(schema.paths.userId.instance).toBe('ObjectId');
        expect(schema.paths.budgets.instance).toBe('Array');
        
        const budgetSchemaPath = schema.paths.budgets.schema;

        expect(budgetSchemaPath.paths).toHaveProperty('category');
        expect(budgetSchemaPath.paths).toHaveProperty('allotedAmount');
        expect(budgetSchemaPath.paths).toHaveProperty('spentAmount');

        expect(budgetSchemaPath.paths.category.instance).toBe('String');
        expect(budgetSchemaPath.paths.allotedAmount.instance).toBe('Number');
        expect(budgetSchemaPath.paths.spentAmount.instance).toBe('Number');
    });
});
