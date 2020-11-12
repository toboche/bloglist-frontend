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
                .should('have.css', 'color', 'rgb(0, 0, 0)')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.request('POST', 'http://localhost:3001/api/login', {
                username: 'mluukkai', password: 'salainen'
            }).then(response => {
                localStorage.setItem('user', JSON.stringify(response.body))
                console.log(response.body)
                cy.visit('http://localhost:3000')
            })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#blogname').type('some random blog')
            cy.get('#author').type('unknoown')
            cy.get('#url').type('www.www.ww')
            cy.contains('save').click()
            cy.contains('some random blog unknoown')
        })

        describe('When a note is already craeted', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'some random title',
                    author: 'unknown',
                    url: 'www',
                    likes: 0
                 })
            })

            it('A blog can be liked', function() {
                cy.contains('view').click()
                cy.contains('0')
                cy.contains('like').click()
                cy.contains('1')
            })

            it('A blog can be deleted', function() {
                cy.contains('view').click()
                cy.contains('0')
                cy.contains('delete').click()
                cy.get('delete').should('not.exist')
                cy.get('#blogitem').should('not.exist')
            })
        })

        describe('When multiple notes are already craeted', function() {
            beforeEach(function() {
                cy.createBlog({
                    title: 'some random title',
                    author: 'unknown',
                    url: 'www',
                    likes: 0
                 })
                 cy.createBlog({
                    title: 'some random title with 2 likes',
                    author: 'unknown',
                    url: 'www',
                    likes: 2
                 })
                 cy.createBlog({
                    title: 'some random title with 1 like',
                    author: 'unknown',
                    url: 'www',
                    likes: 1
                 })
            })

            it('Blogs are orederd', function() {
                cy.contains('view').click()
                cy.contains('view').click()
                cy.contains('view').click()
                cy.get('#blogitems')
                    .children()
                    .should(items => {
                        expect(items.eq(1)).to.contain('some random title with 2 likes')
                        expect(items.eq(2)).to.contain('some random title with 1 like')
                        expect(items.eq(3)).to.contain('some random title')
                    })
            })
        })
      })
  })