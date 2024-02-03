# node-solid-architecture

Solid architecture for Node.js implementing Clean Architecture. Node.js.

- frameworks: This layer contains the frameworks, drivers and external tools used in the application.
- adapters: This layer receive requests from framework layer and translate them into calls to the corresponding application use cases.
- application: This layer contains the use cases o the business logic workflows.
- entities: This layer contains the conceptual representations objects of the domain and its business logic.
- utils: Store files and utility functions that do not belong to a specific layer of the architecture.
