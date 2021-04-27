# OttinTimothe_7_14012021
# Contexte

Projet réalisé par OTTIN Timothé. 

Ceci est le projet numéro 7 de la formation développeur web d'OpenClassrooms.
Le projet consistait à la réalisation d'un réseau social pour une entreprise. 

L'application web se devait d'être en Javascript et utiliser une base de données relationnelles en SQL pour le stockage de données. L'utilisation d'un framework ou de librairies était autorisé. Je devais veiller aux respects des standards de l'OWASP, des W3C et des WCAG.

Nous avons une application web avec:
 - Un serveur Node.JS (avec Express) pour gérer l'API,
 - l'ORM Sequelize pour manipuler la base de données en SQL,
 - et le framework Vue.JS (V3) pour le front.
 
 Concernant l'API, elle gère:
- L'inscription d'un utilisateur sur le site,
- Les diffèrents comportements d'utilisateurs (déco/reco),
- La modification/suppression d'un profil utilisateur,
- L'ajout/modification/suppression d'un post/commentaire,
- Like/dislike d'un post/commentaire,
- Le signalement d'un post/commentaire,
- Des options d'administrations (gestion des signalements, modifications/suppressions d'un post/commentaire/user).

Ceci est mon premier projet avec Vue.JS et je n'avais jamais manipulé de base de données relationnelles. 
Concernant le design de l'application, je n'ai pas eu le temps de réaliser quelque chose qui me plaise réellement et d'aller au bout des mes idées. Arrivant en fin de formation, j'ai dû aller à l'essentiel, afin de rendre une premier version d'application fonctionnelle. 

Ce projet fut réalisé en quasi-totale autonomie. J'avais l'aide d'un mentor OpenClassrooms une fois par semaine. 

Ce projet fut évalué par un mentor évaluateur OpenClassrooms. Il validait si le projet était conforme aux attentes lors d'une soutenance.

## Installation

- Rendez-vous sur [Groupomania](http://www.groupomania.otprod.fr/)
- Naviguez !

### Ou localement

- Cloner ce [repo](https://github.com/OTTIN-T/OttinTimothe_7_14012021) dans un dossier
- Dans le dossier backend lisez et suivez le .env.example,
- Dans le dossier backend lisez et suivez le .config.example.json,
- Ouvrez dans votre IDE le dossier contenant les dossier frontend et backend,
- Dans un terminal: cd frontend, yarn, yarn serve
- Dans un second terminal: cd backend, yarn, yarn start

- Rendez-vous sur http://localhost:8080/
- Naviguez !

## Scénario

Vous êtes développeur depuis plus d'un an chez CONNECT-E, une petite agence web regroupant une douzaine d'employés.

Votre directrice, Stéphanie, invite toute l'agence à prendre un verre pour célébrer une bonne nouvelle ! Elle vient de signer un contrat pour un nouveau projet ambitieux ! 🥂

Le client en question est Groupomania, un groupe spécialisé dans la grande distribution et l'un des plus fidèles clients de l'agence.

Le projet consiste à construire un réseau social interne pour les employés de Groupomania. Le but de cet outil est de faciliter les interactions entre collègues. Le département RH de Groupomania a laissé libre cours à son imagination pour les fonctionnalités du réseau et a imaginé plusieurs briques pour favoriser les échanges entre collègues.

Stéphanie vous envoie un message via l’outil de messagerie instantanée de l’entreprise.

 
```bash
> Stéphanie : Hello, comme tu le sais, nous démarrons un très beau projet avec Groupomania et j’aimerais que ce soit toi qui gères la partie développement.
> Stéphanie : Groupomania a déjà réfléchi aux fonctionnalités à intégrer dans le réseau social. Il s’agit en fait de produits déjà existants :
9GAG - ils veulent que les employés partagent et commentent les gifs avec d'autres collègues ;
Reddit - ils veulent que les employés écrivent et/ou partagent des articles avec leurs collègues sur des sujets qui les intéressent. 
> Vous : Super, je prends note. Est-ce qu’ils t’ont fourni les spécifications fonctionnelles ?
> Stéphanie : Oui, je te les envoie par mail tout de suite :)
```
Quelques minutes plus tard, vous recevez un mail de Stéphanie.

```bash
De : Stéphanie R

À : Moi

Objet: Lancement projet Groupomania
```
Bonjour,

Comme convenu, voici les [spécifications fonctionnelles](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Specs_FR_DWJ_VF.pdf). Tu trouveras également les [logos](https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/DWJ_FR_P7/Groupomania_Logos+(3).zip) de l’organisation pour l’habillage du site.

Par ailleurs, Groupomania et moi avons convenu que l’un des employés du groupe testera un MVP du produit, avec une seule des deux fonctionnalités proposées.

Cela nous permettra de nous assurer que nous répondons à leurs attentes.

Après plusieurs réunions avec Groupomania, il semble que les paramètres du projet changent régulièrement, je pense qu’une organisation “agile” serait plus adaptée pour s’adapter aux besoins du client au fur et à mesure des commentaires et affiner l’application au fil de l’eau.

Je suis à ta disposition pour toute question.

Stéphanie

```bash
De : Moi

À : Stéphanie R

Re : Lancement projet Groupomania
```
Merci Stéphanie pour toutes ces informations !

Si je comprends bien, je dois fournir une première version d’une des fonctionnalités proposées par Groupomania et j’ai carte blanche concernant la forme que cela va prendre ?

Merci pour ces précisions.

```bash
De : Stéphanie R

À : Moi

Re : re : Lancement projet Groupomania
```

Oui, c’est ça !

La seule contrainte est que le client utilise une base de données relationnelles qui se manipule avec le langage SQL pour le stockage de données. Il faudra donc en tenir compte lorsque tu construiras ton application. Tu devras t’assurer que l’utilisateur puisse requêter les données requises depuis SQL et puisse soumettre ces changements à la base de données SQL. Les données de connexion doivent également être sécurisées. 

Merci.

```bash
De : Moi

À : Stéphanie R

Re : re : re : Lancement projet Groupomania
```
Ah oui, je vois ! Peux-tu me préciser quelles tâches entrent dans le périmètre de ma mission ?

Merci

```bash
De : Stéphanie R

À : Moi

Re : re : re : re : Lancement projet Groupomania
```
Bien sûr. Tu vas devoir :

- choisir la fonctionnalité que tu vas développer,
- estimer le temps que tu passeras sur le développement de chaque fonctionnalité,
- développer la première version de l'application.
Deux dernières choses, tu devras faire en sorte que la web app puisse se connecter et se déconnecter à l’application et que la session de l’utilisateur persiste pendant qu’il est connecté.

Tu peux utiliser le framework Front-End de ton choix (React, Vue, Angular, Ember, Meteor, Aurelia...). Par contre, le projet doit être codé en Javascript, donc n'utilise pas le framework Symfony. Enfin, tes pages devront respecter les standards WCAG.

Bon courage et à dispo si besoin :)
Stéphanie

## Soutenance

L’évaluateur jouera le rôle de Stéphanie, la directrice de l’agence (il pourra vous interrompre pour vous poser des questions).

La soutenance, d’une durée maximum de 30 minutes, se déroulera en deux parties :

Partie 1 – 20 minutes : Simulation d'une réunion professionnelle.

- Vous réaliserez une présentation de votre site en mettant en avant les fonctionnalités améliorées. L’évaluateur doit être capable de cloner l’application et de la lancer.

Partie 2 – 10 minutes : Retour sur la soutenance
- Échange de questions/réponses : l’évaluateur pourra revenir sur certains points pour vous questionner sur vos choix.

L’évaluateur vous fera un débrief de votre soutenance et de vos livrables.


### Compétences évaluées
- Implémenter un stockage de données sécurisé en utilisant SQL
- Personnaliser le contenu envoyé à un client web
- Authentifier un utilisateur et maintenir sa session
- Gérer un stockage de données à l'aide de SQL

## License
[MIT](https://choosealicense.com/licenses/mit/)
