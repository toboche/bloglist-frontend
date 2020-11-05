describe('Blog app', function() {

    beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Matti Luukkainen',
          username: 'mluukkai',
          password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)         
        cy.visit('http://localhost:3000')
    })

    
    it('Login form is shown', function() {
      cy.contains('login to application')
      cy.contains('username')
      cy.contains('password')
      cy.contains('login')
    })

    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('salainen')
            cy.get('#signin').click()
            cy.contains('mluukkai is logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('mluukkai')
            cy.get('#password').type('incorrectpass')
            cy.get('#signin').click()
            cy.contains('wrong credentials')
        })
    })
  })