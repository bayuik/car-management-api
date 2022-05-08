## Car Management API : JWT and bcrypt

### Run server
```
npm start
```

### Database Management
- `npm run db:create` : to create a database
- `npm run db:migrate` : to run database migration
- `npm run db:seed` : to run seed. create a superadmin account
- `npm run db:drop` : to delete a database
- `npm run db:rollback` : to cancel last migration

### Open API Documentations : Swagger UI
```
/api/api-docs
```

### Open API Documentations : Open Api Json
```
/api/api-json
```

### Superadmin Account
Run `npm run db:seed` first before login with superadmin account. Only superadmin can create admin account
```
email: admin@email.com
password: admin
```
