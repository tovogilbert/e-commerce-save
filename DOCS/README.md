# DOCUMENTION COMPLETE DU PROJET WEB DEVELOPPEMENT E-COMMERCE CHALLENGE


**Application complète e-commerce** avec :
- Backend Node.js/TypeScript (Architecture Hexagonale)
- Frontend React/Vite (Clean Architecture)
- PostgreSQL 16
- Système d'authentification JWT
- Gestion des rôles (Admin/Client)

## Déploiement

- **Frontend**: https://e-commerce-d4m6.onrender.com/

## 📋 Prérequis

- Node.js ≥18
- npm ≥9
- PostgreSQL ≥12
- Compte [Cloudinary](https://cloudinary.com) (pour le stockage de fichiers images)

## Installation


### Clonez le dépôt
```bash
git clone https://github.com/tovogilbert/e-commerce-save.git
```
### cd projet
```bash
cd e-commerce-save
```
### Backend
```bash
cd BACKEND
```

```bash
npm install
```

### Frontend
```bash
cd FRONTEND-SAVE
```
```bash
npm install
```

🗃 Initialisation PostgreSQL avec pgAdmin4

```
CREATE DATABASE "e-commerce"
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'en_US.UTF-8'
    LC_CTYPE = 'en_US.UTF-8'
    CONNECTION LIMIT = -1;
```
    
⚙ Configuration
🔧 Fichier .env (Backend)

- DB_NAME=e-commerce
- DB_USER=Votre _nom_utilisateur_dans_posgtresql
- DB_PASSWORD=votre_mot_de_passe
- DB_HOST=localhost
- DB_PORT=5432
- PORT=3002
- JWT_SECRET=votre_secret_secure
- CLOUDINARY_URL=cloudinary://api_key:api_secret@cloud_name

 ### Lancer les migrations

```
cd BACKEND
npm run migrate

```


## ▶ Exécution

| Commande          | Description                             | port 
|-------------------|-----------------------------------------|
| `cd backend && npm run dev` | Backend en mode développement | 3002
| `cd backend && npm start`   | Backend en production         |
| `cd frontend && npm run dev` | Frontend en mode dev         | 5173
| `cd frontend && npm run preview` | Prévisualisation production |


## Documentation API

Accédez à la documentation Swagger complète après avoir démarré le backend :

```
http://localhost:3002/api-docs
```

Inclut :

Tous les endpoints

Exemples de requêtes

Schémas de données

Authentification

**Backend**:
```bash
npm run build       # Compile TypeScript
npm run migrate    # Exécute les migrations
```

**Frontend**:
```bash
npm run build      # Build de production
npm run lint       # Vérification du code
```



## 🌟 Fonctionnalités

### 🛒 Coté Client
- Catalogue produits 
- Panier persistant
- Passer commande
- Passer au payment
- Valider le commande
- Passer au livraison

### 🔐 Coté Admin
- CRUD complet produits , commande , client , brand , feature , payment
- Gestion utilisateurs

