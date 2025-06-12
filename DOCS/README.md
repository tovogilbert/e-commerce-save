DOCUMENTION COMPLETE DU PROJET WEB DEVELOPPEMENT E-COMMERCE CHALLENGE


Application full-stack avec backend Node.js/TypeScript et frontend React/Vite.

## 🚀 Déploiement

- **Frontend**: https://e-commerce-d4m6.onrender.com/

## 📋 Prérequis

- Node.js ≥18
- npm ≥9
- PostgreSQL ≥12
- Compte [Cloudinary](https://cloudinary.com) (pour le stockage de fichiers)

## 🛠 Installation

```bash
# Clonez le dépôt
git clone [https://github.com/votre-repo/projet.git](https://github.com/tovogilbert/e-commerce-save.git)
cd projet

# Backend
cd BACKEND
npm install

# Frontend
cd FRONTEND-SAVE
npm install
```

## ⚙ Configuration

### Backend
Créez un fichier `.env` dans `backend/` :

```env
PORT=3001
DB_NAME=votre_db
DB_USER=votre_user
DB_PASSWORD=votre_mdp
DB_HOST=localhost
DB_PORT=5432
CLOUDINARY_CLOUD_NAME=votre_cloud
CLOUDINARY_API_KEY=votre_key
CLOUDINARY_API_SECRET=votre_secret
JWT_SECRET=votre_jwt_secret
```

Puis exécutez les migrations :
```bash
npm run migrate
```

### Frontend
Créez un fichier `.env` dans `frontend/` :

```env
VITE_API_BASE_URL=http://localhost:3001
```

## ▶ Exécution

| Commande          | Description                          |
|-------------------|--------------------------------------|
| `cd backend && npm run dev` | Backend en mode développement |
| `cd backend && npm start`   | Backend en production       |
| `cd frontend && npm run dev` | Frontend en mode dev       |
| `cd frontend && npm run preview` | Prévisualisation production |

## 📚 Documentation API

Accédez à la documentation Swagger après avoir démarré le backend :
```
http://localhost:3002/api-docs
```


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
