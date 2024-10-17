import { addCategory } from "../controllers/Budget";
import { currentUser } from "../data/data";

describe('Tests related to Budget System', () => {
    test('should not add category', ()=> {
        expect(addCategory('Groceries', 1000)).toEqual('Category already exists');
    });
    test('should add category', ()=> {
        expect(addCategory('Education', 1000)).toEqual('Successfully added category');
    });
    test('should add category', ()=> {
        expect(addCategory('Tax', 10000)).toEqual('Successfully added category');
    });
    test('should not add category', ()=> {
        expect(addCategory('Clothes', 1000000000)).toEqual('Cannot add Budget to the category');
    });
});