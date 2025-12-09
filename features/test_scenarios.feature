Feature: Tests automatisés sur Google avec Playwright et Cucumber
  Afin de vérifier le fonctionnement des pages web
  En tant que QA
  Je veux automatiser les tests avec Playwright et Cucumber

  Scenario: Ouvrir Google et vérifier le titre
    Given je vais sur la page "https://www.google.com"
    Then le titre de la page doit contenir "Google"

  Scenario: Effectuer une recherche sur Google
    Given je vais sur la page "https://www.google.com"
    When je saisis "Playwright" dans la barre de recherche
    And je lance la recherche
    Then je vois des résultats de recherche
    And je prends un screenshot de la page
