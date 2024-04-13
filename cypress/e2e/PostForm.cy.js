describe('PostForm', () => {
	describe('when creating post', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.get('button').contains('Create new post').click();
		})

		it('renders form fields', () => {
			// check if form fields are rendered
			cy.get('#title').should('exist')
			cy.get('#author').should('exist')
			cy.get('#body').should('exist')
		})

		it('shows validation errors if submitted empty', () => {
			cy.get('button[id="submit"]').click()

			// should still show form fields
			cy.get('#title').should('exist')
			cy.get('#author').should('exist')
			cy.get('#body').should('exist')

			// check if there are 3 validation errors
			cy.get('.error').should('have.length', 3)
		})

		it('submits the filled in form', () => {
			// fill form fields
			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			// check if the success alert is shown
			cy.contains('Success!').should('be.visible')
			cy.contains('Post created successfully.').should('be.visible')
		})

		it('shows error alert if submission fails', () => {
			cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
				statusCode: 500,
			}).as('createPost')

			// fill form fields
			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			cy.wait('@createPost')

			// check if the error alert is shown
			cy.contains('Error!').should('be.visible')
			cy.contains('Post creation failed.').should('be.visible')
		})
	});

	describe('when editing post', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.get('button[id="menu"]').first().click() // open the menu
			cy.get('button').contains('Edit').first().click() // click the "Edit" button
		})

		it('renders form fields', () => {
			cy.get('#title').should('exist')
			cy.get('#author').should('exist')
			cy.get('#body').should('exist')
		})

		it('submits the form', () => {
			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			// check if the success alert is shown
			cy.contains('Success!').should('be.visible')
			cy.contains('Post updated successfully.').should('be.visible')
		})

it('shows error alert if submission fails', () => {
			cy.intercept('PUT', 'https://jsonplaceholder.typicode.com/posts/1', {
				statusCode: 500,
			}).as('updatePost')

			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			cy.wait('@updatePost')

			// check if the error alert is shown
			cy.contains('Error!').should('be.visible')
			cy.contains('Post update failed.').should('be.visible')
		})
	});
});
