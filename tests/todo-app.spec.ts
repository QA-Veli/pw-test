import { test, expect, type Page } from "@playwright/test";

test.beforeEach(async ({page}) => {
    await page.goto('https://demo.playwright.dev/todomvc');
});

const TODO_ITEMS = [
    'firstItem',
    'secondItem',
    'thirdItem'
]

test.describe('New ToDo', () => {

    test('should add new todo item', async ({page}) => {

        // page locators
        const newTodo = page.locator('.new-todo');
        const todoItem = page.getByTestId('todo-title');

        // create 1st todo
        await newTodo.fill(TODO_ITEMS[0]);
        await newTodo.press('Enter');

        // make sure item is created
        await expect(todoItem).toHaveText(TODO_ITEMS[0]);

        // create 2nd todo
        await newTodo.fill(TODO_ITEMS[1]);
        await newTodo.press('Enter');

        // make sure items are created
        await expect(todoItem).toHaveText([
            TODO_ITEMS[0],
            TODO_ITEMS[1]
        ]);
    })
})