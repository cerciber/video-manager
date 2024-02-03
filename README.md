# Node clean architecture

GitHub API for Node.js implementing Clean Architecture. Node.js.

- frameworks: This layer contains the frameworks, drivers and external tools used in the application.
- adapters: This layer receive requests from framework layer and translate them into calls to the corresponding application use cases.
- application: This layer contains the use cases o the business logic workflows.
- entities: This layer contains the conceptual representations objects of the domain and its business logic.
- utils: Store files and utility functions that do not belong to a specific layer of the architecture.

# Implementations

1. Clean architecture general structure (frameworks, adapters, application, entities).
2. Static generalized data.
3. Global functions.
4. Linters.
5. Aliases.
6. Express listener.
7. Generalized response and send response.
8. Error handler middleware.
9. Error general handler.
10. Path no found middleware.
11. Validate access middleware.
12. Swagger doc UI with dinamic paths and schemas.
13. Swagger comments files scanner.
14. FakeAPI and fakeBD implementation.
15. Controllers.
16. Schemas validators and general validators.
17. Gateways.
18. Presenters.
19. Application bussiness logic.
20. Entities with OOP.
21. Generalized enviroment variables configuration.
22. Generalized paths configuration.
23. Register and authentication by separated Auth Users with JWT.
24. Authorization controls and rols by endpoints and methods.
25. Constants.
26. Encrypt passwords.
27. Nodemon.
28. Logger with Winston in console and files.
