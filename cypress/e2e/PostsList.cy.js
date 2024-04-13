describe('PostsList', () => {
	beforeEach(() => {
		cy.visit('/');
	})

	it('loads posts', () => {
		cy.get('#posts-list').should('exist');

		cy.get('#posts-list tbody tr').should('have.length.greaterThan', 0);
	});

	it('opens the create post form', () => {
		cy.get('button').contains('Create new post').click();

		cy.get('form[id="create-form"]').should('exist');
	});

	it('opens the first edit post form', () => {
		cy.get('button[id="menu"]').first().click() // open the menu
		cy.get('button').contains('Edit').first().click() // click the "Edit" button
		cy.get('form[id="edit-form"]').should('exist') // check if the edit post form is opened
	})

	it('opens the delete post confirmation', () => {
		cy.get('button[id="menu"]').first().click() // open the menu
		cy.get('button').contains('Delete').first().click() // click the first "Delete" button
		cy.get('form[id="delete-form"]').should('exist')
	})
});
