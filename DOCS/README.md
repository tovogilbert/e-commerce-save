# DOCUMENTION COMPLETE DU PROJET WEB DEVELOPPEMENT E-COMMERCE CHALLENGE


Application full-stack avec backend Node.js/TypeScript et frontend React/Vite.

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

## ▶ Exécution

| Commande          | Description                             |
|-------------------|-----------------------------------------|
| `cd backend && npm run dev` | Backend en mode développement |
| `cd backend && npm start`   | Backend en production         |
| `cd frontend && npm run dev` | Frontend en mode dev         |
| `cd frontend && npm run preview` | Prévisualisation production |

## Documentation API

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
