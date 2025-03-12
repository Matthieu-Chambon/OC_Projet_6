# 📽️ Projet 6 - Développez une interface utilisateur pour une application web Python

## 🎯 Objectif  
L’association **JustStreamIt** souhaite développer une **interface web interactive** pour afficher en temps réel un **classement des meilleurs films** basé sur les scores IMDB. L'objectif est de permettre aux utilisateurs de découvrir facilement les films les plus populaires et les mieux notés.  

## 🖥️ Fonctionnalités  
L'application propose les sections suivantes :  

✅ **Meilleur film** :  
- Affiche le film ayant la meilleure note IMDB.  
- Contient une image, le titre, un résumé et un bouton "Détails".  

✅ **Films les mieux notés** :  
- Liste des meilleurs films toutes catégories confondues.  

✅ **Films par catégories** :  
- Affichage des films les mieux notés pour **3 catégories** choisies dynamiquement.  
- Un menu permet de sélectionner d'autres catégories et de charger les films correspondants.  

✅ **Affichage dynamique des films** :  
- Affichage de **6 films par catégorie**, avec un bouton "Voir plus" permettant d'afficher les films cachés selon la taille de l'écran :
  - 📱 **Mobile** : 2 films visibles.  
  - 💻 **Tablette** : 4 films visibles.  
  - 🖥️ **Ordinateur** : 6 films visibles.  

✅ **Fenêtre modale avec détails du film** :  
Lorsqu’un utilisateur clique sur un film, une **fenêtre modale** s’ouvre avec :  
- Image du film 📸  
- Titre 🎬  
- Genres 🎭  
- Date de sortie 📅  
- Classification (ex : 10+, 18+) 🔞  
- Score IMDB ⭐  
- Réalisateur 🎥  
- Acteurs 🎭  
- Durée ⏳  
- Pays d’origine 🌍  
- Recettes au box-office 💰  
- Résumé 📖  

## 🛠️ Technologies utilisées  
- **HTML5**  
- **CSS3**
- **JavaScript Vanilla**
- **JQuery**
- **OCMovies-API** (API locale fournie pour récupérer les films)  

## 📥 Installation et exécution  
1️⃣ **Cloner le projet**  
```sh
cd "Chemin\complet\vers\le\dossier\du\projet"
git clone https://github.com/Matthieu-Chambon/OC_Projet_6
cd OC_Projet_6
```

2️⃣ **Installer et lancer l’API locale**  
- Cloner et installer l’API fournie dans le dépôt OCMovies-API :  
```sh
cd "Chemin\complet\vers\le\dossier\du\projet"
git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git
cd OCMovies-API-EN-FR
python3 -m venv env # (sous Linux ou Mac)
python -m venv env # (sous Windows)
source env/bin/activate  # (sous Linux ou Mac)
env\Scripts\activate # (sous Windows)
pip install -r requirements.txt
python manage.py create_db
python manage.py runserver
```
- L’API est maintenant disponible sur **http://localhost:8000/api/v1/titles/**.  

3️⃣ **Ouvrir le projet dans un navigateur**  
- Ouvrir `index.html` dans un navigateur web.  

## 📌 Contraintes techniques  
- **Responsive Design** : le site s’adapte aux mobiles, tablettes et desktops.  
- **Aucun framework JavaScript** (React, Vue, Angular interdits).  
- **Aucune erreur JavaScript** ne doit apparaître dans la console du navigateur.  
- **Interdiction d'utiliser des plugins ou modules additionnels**.