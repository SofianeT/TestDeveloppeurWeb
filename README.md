Fiche Produit - Application CRUD

Ce projet est une application de gestion de fiches produits comprenant un backend en NestJS et un frontend en Next.js. L’application permet de créer, lire, mettre à jour et supprimer des produits, avec une architecture bien structurée et des bonnes pratiques.

Fonctionnalités

Backend :

CRUD produits : Gestion des produits avec les opérations Créer, Lire, Mettre à jour, Supprimer.

Base de données PostgreSQL : Utilisation de TypeORM pour les interactions avec la base de données.

Validation des données : Validation des entrées utilisateurs avec class-validator.

Gestion des erreurs : Middleware global pour la gestion des erreurs.

Logs : Intégration de winston pour les logs.

Pagination : Implémentée pour la liste des produits.

Frontend :

Affichage des produits : Liste paginée des produits.

CRUD produits : Formulaires pour créer, modifier, et supprimer des produits.

API Fetching : Utilisation de React Query pour gérer les requêtes API.

UI moderne : Conception avec TailwindCSS.
