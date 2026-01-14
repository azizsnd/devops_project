# 🎓 Student Registry API

![CI/CD Status](https://github.com/azizsnd/devops_project/actions/workflows/node.js.yml/badge.svg)

A production-ready Node.js REST API for managing students, demonstrating modern **DevOps practices**: Containerization, CI/CD, Security Scans, and Kubernetes.

## 📋 Table of Contents
- [Features](#-features)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
- [Docker Usage](#-docker-usage)
- [Kubernetes Deployment](#-kubernetes-deployment)
- [API Documentation](#-api-documentation)

---

## ✨ Features
*   **REST API**: Express.js backend with input validation.
*   **Observability**: Prometheus Metrics (`/metrics`) and generic JSON logs.
*   **Security**: SAST (npm audit), DAST (OWASP ZAP), and non-root Docker user.
*   **CI/CD**: GitHub Actions pipeline for automated Testing and Deployment.
*   **Infrastructure**: Kubernetes manifests with Health Probes.

---

## 🛠 Prerequisites
*   Node.js v20+
*   Docker & Docker Desktop
*   Git

---

## 🚀 Getting Started (Local)

1.  **Clone the repository**
    ```bash
    git clone https://github.com/azizsnd/devops_project.git
    cd devops_project
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Server**
    ```bash
    node server.js
    ```
    The server will start on `http://localhost:3000`.

4.  **Run Tests**
    ```bash
    npm test
    ```

---

## 🐳 Docker Usage

To run the application in an isolated container:

1.  **Build the Image**
    ```bash
    docker build -t student-registry .
    ```

2.  **Run the Container**
    ```bash
    docker run -p 3000:3000 student-registry
    ```
    Access at `http://localhost:3000`.

---

## ☸ Kubernetes Deployment

Deploy to a local cluster (like Docker Desktop or Minikube).

1.  **Apply Manifests**
    ```bash
    kubectl apply -f k8s/deployment.yaml
    kubectl apply -f k8s/service.yaml
    ```

2.  **Access the App**
    *   **Docker Desktop**: Open browser to `http://localhost`.

---

## 📡 API Documentation

### 1. Health Check
*   **URL**: `/health`
*   **Method**: `GET`
*   **Response**: `200 OK`
    ```json
    { "status": "healthy" }
    ```

### 2. List Students
*   **URL**: `/students`
*   **Method**: `GET`
*   **Response**: `200 OK`
    ```json
    [
      { "id": 1, "name": "Aziz", "email": "Aziz@gmail.com" }
    ]
    ```

### 3. Create Student
*   **URL**: `/students`
*   **Method**: `POST`
*   **Body** (JSON):
    ```json
    {
      "name": "Aziz",
      "email": "Aziz@gmail.com"
    }
    ```
*   **Response**: `201 Created`

### 4. Metrics
*   **URL**: `/metrics`
*   **Method**: `GET`
*   **Description**: Returns Prometheus metrics for monitoring.
