
describe('Home Page', () => {
  beforeEach(() => {
    cy.fixture('courses.json').as('coursesJSON');
    //demarre le mock
    cy.server();
    //route est deprecated donc intercept
    cy.route('/api/courses', '@coursesJSON').as('courses');
    cy.visit('/');//cy est le var global de cypress
  });

  it('should display a list of ourses', () => {
    cy.contains('All Courses');
    cy.wait('@courses');
    cy.get('mat-card').should('have.length', 9);
  });

  it('should display a list of ourses', () => {
    cy.get('.mat-tab-label').should('have.length', 2);
    cy.get('.mat-tab-label').last().click();
    cy.get('.mat-tab-body-active .mat-card-title').its('length').should('be.gt', 1);
    cy.get('.mat-tab-body-active .mat-card-title').first().should('contain', 'Angular Security Course');
  });
});