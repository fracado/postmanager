describe('ConfirmDialog', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('button[id="menu"]').first().click() // open the menu
		cy.get('button').contains('Delete').first().click() // click the first "Delete" button
	})

	describe('when deleting post', () => {
		it('renders confirmation dialog', () => {
			cy.get('form[id="delete-form"]').should('exist')
		})

		it('submits the form', () => {
			cy.get('button').contains('Confirm').click()

			// check if the success alert is shown
			cy.contains('Success!').should('be.visible')
			cy.contains('Post deleted successfully.').should('be.visible')
		})
	})

	describe('when deleting post fails', () => {
		it('renders confirmation dialog', () => {
			cy.get('form[id="delete-form"]').should('exist')
		})

		it('submits the form', () => {
			cy.intercept('DELETE', 'https://jsonplaceholder.typicode.com/posts/1', {
				statusCode: 500,
			}).as('deletePost')

			cy.get('button').contains('Confirm').click()

			cy.wait('@deletePost')

			// check if the error alert is shown
			cy.contains('Error!').should('be.visible')
			cy.contains('Post deletion failed.').should('be.visible')
		})
	})

	describe('when closing dialog', () => {
		it('closes the dialog', () => {
			cy.get('button').contains('Cancel').click()

			// check if the dialog is closed
			cy.get('form[id="delete-form"]').should('not.exist')
		})
	})
})
