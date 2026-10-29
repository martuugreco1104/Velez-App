# REGLAS DE TRABAJO DEL WORKSPACE

## 1. Perfil del Usuario y Modo de Comunicación
- El usuario es diseñadora UX/UI, no programadora.
- No expliques con jerga técnica compleja ni asumas que el usuario leerá el código fuente.
- Al finalizar cada tarea, presentá SIEMPRE un resumen en 3 viñetas cortas y en español claro:
  1. Qué cambiaste visual o funcionalmente.
  2. Qué archivos tocaste puntualmente.
  3. Confirmación explícita de que no modificaste nada fuera del alcance pedido.

## 2. Estándares Visuales y de Diseño
- Priorizá siempre la fidelidad visual, la jerarquía tipográfica y el diseño responsive (mobile-first).
- No uses valores fijos en píxeles que rompan la adaptabilidad en pantallas chicas.
- Mantené y reutilizá las clases utilitarias existentes (Tailwind/CSS modules) y los tokens de color del proyecto; nunca inventes estilos hardcodeados ni introduzcas nuevas librerías sin permiso.

## 3. Seguridad, Límites y Prevención de Errores
- PROHIBIDO tocar archivos de configuración del entorno, variables de entorno (.env), dependencias del proyecto (package.json) o configuraciones de despliegue sin pedir autorización explícita antes.
- Antes de dar por finalizada cualquier tarea, ejecutá la verificación en la terminal (build/lint) para garantizar que el proyecto no tenga errores de ejecución ni rompa la previsualización en vivo.
- Si una tarea requiere modificar más de dos archivos a la vez, generá primero un plan breve de ejecución y esperá aprobación antes de aplicar cambios destructivos.
