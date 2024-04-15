describe('PostForm', () => {
	describe('when creating post', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.get('button').contains('Create new post').click();
		})

		it('renders form fields', () => {
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
			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			cy.contains('Success!').should('be.visible')
			cy.contains('Post created successfully.').should('be.visible')
		})

		it('shows error alert if submission fails', () => {
			cy.intercept('POST', 'https://jsonplaceholder.typicode.com/posts', {
				statusCode: 500,
			}).as('createPost')

			cy.get('#title').type('Test Title')
			cy.get('#author').select('Bret')
			cy.get('#body').type('Test Body')

			cy.get('button[id="submit"]').click()

			cy.wait('@createPost')

			cy.contains('Error!').should('be.visible')
			cy.contains('Post creation failed.').should('be.visible')
		})
	});

	describe('when editing post', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.get('button[id="menu"]').first().click()
			cy.get('button').contains('Edit').first().click()
		})

		it('loads post data when opened for editing', () => {
			cy.get('#title').should('have.value', 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit')
			cy.get('select#author option:selected').should('have.text', 'Bret')
			cy.get('#body').should('have.value', 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto')
		})

		it('shows error alert when loading post data fails', () => {
			cy.visit('/');
			cy.intercept('GET', 'https://jsonplaceholder.typicode.com/posts/1', { forceNetworkError: true })
			cy.get('button[id="menu"]').first().click()
			cy.get('button').contains('Edit').first().click()

			cy.contains('Error!').should('be.visible')
			cy.contains('Post loading failed.').should('be.visible')
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

			cy.contains('Error!').should('be.visible')
			cy.contains('Post update failed.').should('be.visible')
		})
	});
});
