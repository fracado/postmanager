describe('PostsList', () => {
	beforeEach(() => {
		cy.visit('/');
	})

	it('loads posts', () => {
		cy.get('#posts-list').should('exist');

		cy.get('#posts-list tbody tr').should('have.length.greaterThan', 0);
	});

	it('shows error alert when loading users fails', () => {
		cy.intercept('GET', '/users', { forceNetworkError: true })

		cy.visit('/');

		cy.contains('Error!').should('be.visible')
		cy.contains('Users could not be loaded').should('be.visible')
	})

	it('shows error alert when loading posts fails', () => {
		cy.intercept('GET', '/posts', { forceNetworkError: true })

		cy.visit('/');

		cy.contains('Error!').should('be.visible')
		cy.contains('Posts could not be loaded.').should('be.visible')
	})

	it('opens the create post form', () => {
		cy.get('button').contains('Create new post').click();

		cy.get('form[id="create-form"]').should('exist');
	});

	it('opens the first edit post form', () => {
		cy.get('button[id="menu"]').first().click()
		cy.get('button').contains('Edit').first().click()
		cy.get('form[id="edit-form"]').should('exist')
	})

	it('opens the delete post confirmation', () => {
		cy.get('button[id="menu"]').first().click()
		cy.get('button').contains('Delete').first().click()
		cy.get('form[id="delete-form"]').should('exist')
	})
});
