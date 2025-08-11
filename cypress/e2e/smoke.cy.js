it('charge la page et affiche le canvas', () => {
  cy.visit('/index.html');           // adapte le chemin si ton fichier s'appelle autrement
  cy.get('canvas').should('be.visible');
});
