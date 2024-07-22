describe('turing cafe', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', {
      fixture: 'reservations.json'
    }).as('getReservations');

    cy.intercept('POST', 'http://localhost:3001/api/v1/reservations', {
      statusCode: 201,
      body: {
        id: Date.now(),
        name: 'david',
        date: '12/25',
        time: '5:00',
        number: 2
      }
    }).as('postReservation');

    cy.visit('http://localhost:3000/');
  });

  it('should display reservations on page load', () => {
    cy.wait('@getReservations');
    cy.get('.reservations-container')
      .children()
      .should('have.length', 3); 
  });

  it('should reflect input values in the form', () => {
    cy.get('input[name="name"]')
      .type('david')
      .should('have.value', 'david');

    cy.get('input[name="date"]')
      .type('12/25')
      .should('have.value', '12/25');

    cy.get('input[name="time"]')
      .type('5:00')
      .should('have.value', '5:00');

    cy.get('input[name="number"]')
      .type('2')
      .should('have.value', '2');
  });

  it('should add a new reservation to the page', () => {
    cy.get('input[name="name"]').type('Test User');
    cy.get('input[name="date"]').type('12/25');
    cy.get('input[name="time"]').type('5:00');
    cy.get('input[name="number"]').type('2');
    cy.get('button').contains('SUBMIT').click();

    cy.wait('@postReservation');

    cy.get('.reservations-container')
      .children()
      .should('have.length', 4) 
      .last()
      .should('contain', 'david')
      .and('contain', '12/25')
      .and('contain', '5:00')
      .and('contain', '2');
  });
});

describe(' Error Handling', () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/reservations', {
      fixture: 'reservations.json'
    }).as('getReservations');

    cy.visit('http://localhost:3000/');
  });

  it('should display an error if form is submitted with empty fields', () => {
    cy.get('button').contains('SUBMIT').click();
    cy.get('.error').should('contain', 'All fields are required.');
  });

  it('should display an error if the network request fails', () => {
    cy.intercept('POST', 'http://localhost:3001/api/v1/reservations', {
      statusCode: 500,
      body: {
        error: 'Internal Server Error'
      }
    }).as('postReservation');

    cy.get('input[name="name"]').type('david');
    cy.get('input[name="date"]').type('12/25');
    cy.get('input[name="time"]').type('5:00');
    cy.get('input[name="number"]').type('2');
    cy.get('button').contains('SUBMIT').click();

    cy.wait('@postReservation');

    cy.get('.error').should('contain', 'Error adding reservation');
  });
});