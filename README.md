# Chat Conversation

Application de messagerie React/Vite avec API Express, Socket.IO et MongoDB.

## Lancer en local

1. Copier `.env.example` vers `.env` et renseigner `MONGO_URI` ainsi qu'une valeur aléatoire longue pour `JWT_SECRET`.
2. Installer les dépendances du serveur et du frontend :

   ```sh
   npm install
   npm install --prefix frontend
   ```

3. Dans un terminal, lancer l'API :

   ```sh
   npm start
   ```

4. Dans un autre terminal, lancer Vite :

   ```sh
   npm run dev --prefix frontend
   ```

Le frontend utilise le proxy Vite pour envoyer `/api` et Socket.IO au serveur local sur le port 5000.

## Déployer sur Render depuis GitHub

1. Envoyer le dépôt sur GitHub sans y ajouter `.env` (ce fichier est ignoré par Git).
2. Dans Render, créer un **Blueprint** et connecter le dépôt GitHub. Render lira `render.yaml` et configurera le service Web.
3. Renseigner `MONGO_URI` avec l'URI de connexion MongoDB Atlas lorsque Render le demande. Vérifier dans Atlas que les connexions depuis Render sont autorisées.
4. `JWT_SECRET` est généré par Render via le Blueprint. Ne pas le remplacer par une valeur publique ou le committer dans le dépôt.
5. Laisser Render terminer le build et vérifier l'URL du service. Les redéploiements peuvent ensuite être déclenchés à partir des commits GitHub.

Le service Express sert également le frontend construit et utilise le port `PORT` fourni par Render. L'API et Socket.IO sont donc appelés sur la même origine que l'application.
