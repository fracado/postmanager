// Import global styles
import '@/assets/main.css'

import { mount } from 'cypress/vue'

Cypress.Commands.add('mount', mount)

// Example use:
// cy.mount(MyComponent)
