# 🔗 Guide: Faire communiquer Frontend et Backend sur Vercel

## Vos URLs de déploiement
```
Frontend:  https://cofeeartsparis-front.vercel.app
Backend:   https://cofeeartsparis-back.vercel.app
```

## ✅ Étapes de configuration

### Étape 1: Configurer les variables Backend sur Vercel

1. Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur votre projet **cofeeartsparis-back**
3. Allez dans **Settings** → **Environment Variables**
4. Supprimez les anciennes variables et ajoutez ces 3:

```
MONGO_URI = mongodb+srv://entreprenariat:entreprenariat@dbcmr.ndjctdd.mongodb.net/?appName=DBCMR

JWT_SECRET = 9f3a2c8b5d7e4f1c0a9d3b6e8f2a7c4d1e5f9b0a3c7d8e2f6a1b9c4d7e3f2a9b

NODE_ENV = production
```

5. Cliquez **Save**
6. **Redéployez** le backend: allez dans **Deployments** → cherchez le dernier commit → cliquez les 3 points → **Redeploy**

### Étape 2: Configurer les variables Frontend sur Vercel

1. Allez sur [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Cliquez sur votre projet **cofeeartsparis-front**
3. Allez dans **Settings** → **Environment Variables**
4. Supprimez les anciennes et ajoutez:

```
REACT_APP_API_URL = https://cofeeartsparis-back.vercel.app/api

REACT_APP_CLOUDINARY_CLOUD = dx4frr3ak

REACT_APP_CLOUDINARY_PRESET = coffeeart
```

5. Cliquez **Save**
6. **Redéployez** le frontend: allez dans **Deployments** → cherchez le dernier commit → cliquez les 3 points → **Redeploy**

### Étape 3: Vérifier la communication

Une fois redéployés (environ 1-2 minutes chacun), testez:

**Teste le backend:**
```
https://cofeeartsparis-back.vercel.app/
https://cofeeartsparis-back.vercel.app/health
```

**Teste une requête API:**
```
https://cofeeartsparis-back.vercel.app/api/products
```

**Teste le frontend:**
Ouvrez https://cofeeartsparis-front.vercel.app et essayez:
- ✅ Se connecter (register/login)
- ✅ Voir les produits
- ✅ Voir les ateliers
- ✅ Envoyer un message contact

## 🔍 Comment ça fonctionne

```
Frontend (Vercel)
     ↓ API calls
Frontend app lance: axios.get("https://cofeeartsparis-back.vercel.app/api/products")
     ↓
Backend (Vercel)
     ↓ CORS autorise cofeeartsparis-front.vercel.app
Backend répond avec les données
     ↓
Frontend affiche les données
```

## ⚠️ Dépannage

### ❌ Erreur CORS ?
→ Vérifiez que `cofeeartsparis-front.vercel.app` est dans CORS du backend

### ❌ Connexion MongoDB échoue ?
→ Vérifiez MONGO_URI dans les variables Vercel du backend

### ❌ API retourne 404 ?
→ Vérifiez l'URL: `https://cofeeartsparis-back.vercel.app/api/` (avec `/api`)

### ❌ Rien ne change après redéploiement ?
→ Attendez 2-3 minutes et rafraîchissez (F5)

## 🎯 Résumé des modifications

- ✅ `.env.production` (Frontend): URL API mise à jour
- ✅ `server.js` (Backend): CORS avec bon domaine frontend
- ✅ Variables Vercel: configurées pour les deux projets

**C'est tout ! Votre app devrait fonctionner maintenant ! 🚀**
