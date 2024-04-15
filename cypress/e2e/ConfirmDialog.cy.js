describe('ConfirmDialog', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('button[id="menu"]').first().click()
		cy.get('button').contains('Delete').first().click()
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

			cy.contains('Error!').should('be.visible')
			cy.contains('Post deletion failed.').should('be.visible')
		})
	})

	describe('when closing dialog', () => {
		it('closes the dialog', () => {
			cy.get('button').contains('Cancel').click()

			cy.get('form[id="delete-form"]').should('not.exist')
		})
	})
})
