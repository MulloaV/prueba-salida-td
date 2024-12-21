# Pizza App

Una aplicación web moderna para ordenar pizzas, construida con Vue.js y Vuetify.

## Características

- Interfaz moderna y responsive
- Carrito de compras interactivo
- Búsqueda y filtrado de pizzas
- Simulación de proceso de pago
- Animaciones y transiciones suaves

## Requisitos Previos

- Node.js v22.12.0
- npm (incluido con Node.js)
- Vue CLI

## Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
```

2. Navega al directorio del proyecto:
```bash
cd db-prep
```

3. Instala las dependencias:
```bash
npm install
```

## Uso

Para ejecutar el proyecto en modo desarrollo:
```bash
npm run serve
```

La aplicación estará disponible en `http://localhost:8080`

## Estructura del Proyecto

```
src/
├── assets/         # Imágenes y recursos estáticos
├── components/     # Componentes Vue reutilizables
├── data/          # Datos JSON
├── router/        # Configuración de rutas
├── store/         # Estado global (Vuex)
└── views/         # Vistas principales
```

## Tecnologías Utilizadas

- Vue.js 2
- Vuetify
- Vuex
- Vue Router
- Node.js v22.12.0

## Funcionalidades

- **Catálogo de Pizzas**
  - Vista de grid con todas las pizzas disponibles
  - Modal de vista rápida con detalles
  - Filtrado por precio y búsqueda por nombre

- **Carrito de Compras**
  - Agregar/quitar pizzas
  - Ajustar cantidades
  - Ver subtotales y total
  - Simulación de checkout

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Notas

- Este es un proyecto de demostración y no procesa pagos reales
- Las imágenes son ilustrativas
- La aplicación es completamente frontend, sin backend real
