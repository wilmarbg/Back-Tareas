#!/bin/bash
git pull
# Build del contenedor
docker compose  build

# Detener y eliminar el contenedor existente si está en ejecución
docker compose  down

# Levantar el contenedor con la nueva imagen
docker compose  up -d

# Eliminar contenedores e imágenes no utilizados
docker system prune -a --volumes -f