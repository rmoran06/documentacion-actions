# 🤔 Reflexiones sobre GitHub Actions

## 1. ¿Cómo se relacionan los jobs de GitHub Actions con los procesos en un sistema operativo?

Básicamente, cada job funciona como un proceso independiente. Cuando lanzas varios jobs, es como si tuvieras varios procesos corriendo al mismo tiempo en diferentes máquinas. Cada uno tiene su propio espacio de trabajo, su propia memoria, y no se pisan entre ellos.

Si te fijas en `multi-os.yml`, cuando probamos en Ubuntu, Windows y macOS con diferentes versiones de Node, estamos creando montones de "procesos" diferentes que corren en paralelo, cada uno en su propia máquina virtual.

## 2. ¿Qué pasa con el filesystem cuando termina un job?

Todo se borra. En serio, todo. GitHub te da una máquina virtual limpia para cada job, y cuando termina, puf, desaparece. Es como si nunca hubiera existido.

Por eso en el ejercicio de artifacts tuvimos que guardar explícitamente el archivo `build.log` - si no lo subimos como artifact, se pierde para siempre cuando el runner se apaga.

## 3. ¿Por qué es importante testear en múltiples sistemas operativos?

Porque las cosas no funcionan igual en todos lados. Lo que corre perfecto en tu Mac puede explotar en Windows por algo tan simple como las barras de las rutas (`/` vs `\`). O un comando que existe en Linux tal vez no está en Windows.

Con `multi-os.yml` nos aseguramos de que la app funcione bien sin importar dónde la ejecuten. Es mejor descubrir los problemas ahora que cuando un usuario te reporte bugs raros.

## 4. ¿Cómo maneja GitHub Actions la concurrencia de workflows?

GitHub te da máquinas virtuales aisladas para cada workflow. Si haces push tres veces seguidas, GitHub puede correr esos tres workflows al mismo tiempo, cada uno en su propia VM. No se interfieren entre sí.

Eso sí, si defines dependencias entre jobs con `needs:`, GitHub respeta ese orden y espera a que terminen los jobs necesarios antes de empezar el siguiente.

## 5. ¿Qué recursos del sistema usa un runner?

Un runner es básicamente una computadora virtual que usa CPU, memoria RAM, disco y red. GitHub te asigna estos recursos automáticamente según el plan que tengas.

Cuando corremos `multi-os.yml` con 9 combinaciones, estamos pidiendo 9 máquinas virtuales al mismo tiempo. Cada una consume sus propios recursos mientras ejecuta los tests.

## 6. ¿Cómo se comunican los procesos en un pipeline de CI/CD?

Los jobs no comparten archivos directamente porque cada uno vive en su propia máquina. Para pasarse información entre ellos, tenemos que usar:

- **Artifacts**: para compartir archivos (como hicimos con `build.log`)
- **Cache**: para reutilizar dependencias y ahorrar tiempo
- **Outputs**: para pasar datos pequeños entre steps
- **Logs**: que todos pueden ver después

Es como si cada job estuviera en una oficina diferente - necesitas métodos específicos para comunicarte entre oficinas.
