## Frontend Implementation

The frontend is built with React and TypeScript and uses axios for communicating with the backend API. 

### Running the Frontend

Before running the frontend, make sure you have [Node.js and npm](https://nodejs.org/) installed. Then, install the project dependencies by running:

```bash
npm install
```

The project uses Vite as the build tool. Visit the [frontend repository](https://github.com/danilocangucu/crosskey-2025-frontend) to get its code. Here are the key npm scripts:

- **Development:**  

  ```bash
  npm run dev
  ```
  Starts the Vite development server.
  
- **Build:**  

  ```bash
  npm run build
  ```
  Compiles the TypeScript code and bundles the application.

- **Preview:**  

  ```bash
  npm run preview
  ```
  Previews the production build locally.
  
When running dev and preview, the port is automatically assigned (usually 5173, but check the Vite logs to be sure).

  
### Docker Setup for Frontend

A Dockerfile is already configured in the application. You can either build the image locally or pull it from Docker Hub.

#### Build the Docker Image Locally

Run the following command in the project root:

```bash
docker build -t danilo-crosskey-frontend-2025 .
```

Then start the container with:

```bash
docker run --rm danilo-crosskey-frontend-2025
```

#### Pulling and Running the Image from Docker Hub

Alternatively, you can pull the pre-built image from Docker Hub:

```bash
docker pull danilocangucu/danilo-crosskey-frontend-2025:latest
```

After pulling, run the container with the following command, which maps port 3000 in the container to port 5000 on your host:

```bash
docker run --rm -p 5000:3000 danilocangucu/danilo-crosskey-frontend-2025:latest
```

This mapping is needed because the app uses `serve` as its static file server on port 3000, and I usually use port 5000 for frontends.