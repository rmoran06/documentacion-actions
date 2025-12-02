Reflexiones sobre GitHub Actions
1. ¿Cómo se relacionan los jobs de GitHub Actions con los procesos en un sistema operativo?

Cada job de GitHub Actions funciona de manera equivalente a un proceso dentro de un sistema operativo.
Cuando se ejecutan varios jobs en un workflow, cada uno corre en una máquina virtual distinta, con su propio espacio de memoria, entorno y sistema de archivos.
Esto permite que se ejecuten en paralelo sin interferirse entre sí.

En el workflow multi-os.yml, por ejemplo, cada combinación de sistema operativo y versión de Node.js se ejecuta como un proceso independiente, lo que refleja claramente esta analogía con los procesos de un SO.

2. ¿Qué pasa con el filesystem cuando termina un job?

Una vez que un job finaliza, su sistema de archivos se destruye por completo.
Los runners de GitHub Actions proporcionan un entorno temporal que desaparece al finalizar la ejecución, de manera similar a cómo un proceso puede liberar sus recursos al terminar.

Por esta razón, si se desea conservar archivos generados durante el job —como el build.log del Ejercicio 5— es necesario subirlos explícitamente como artifacts. De lo contrario, se pierden al apagarse la máquina virtual del runner.

3. ¿Por qué es importante testear en múltiples sistemas operativos?

Las aplicaciones pueden comportarse de manera diferente según el sistema operativo.
Diferencias como rutas (/ vs \), comandos disponibles o variaciones en el shell pueden causar fallos inesperados.

El workflow multi-os.yml permite validar el código en Ubuntu, Windows y macOS, asegurando que la aplicación funcione correctamente en distintos entornos.
Esto evita bugs que pueden surgir cuando un usuario ejecuta la aplicación en un SO distinto al del desarrollador.

4. ¿Cómo maneja GitHub Actions la concurrencia de workflows?

GitHub Actions ejecuta cada workflow en una máquina virtual independiente.
Si se realizan varios push seguidos, GitHub puede correr múltiples workflows al mismo tiempo, sin que sus ejecuciones se afecten unas a otras.

Sin embargo, cuando un workflow define dependencias mediante needs:, GitHub respeta el orden establecido.
Esto se asemeja al manejo de procesos y sincronización en un sistema operativo, donde algunos procesos deben esperar a otros antes de continuar.

5. ¿Qué recursos del sistema usa un runner?

Un runner utiliza recursos computacionales como CPU, memoria RAM, almacenamiento temporal y red, tal como lo haría cualquier sistema operativo ejecutando procesos.

En nuestro caso, el workflow multi-os.yml solicita 9 máquinas virtuales simultáneamente (3 sistemas operativos × 3 versiones de Node.js).
Cada runner consume recursos propios mientras instala dependencias, ejecuta tests y realiza las tareas definidas en el workflow.

6. ¿Cómo se comunican los procesos en un pipeline de CI/CD?

Dado que cada job se ejecuta en una máquina independiente, no comparten directamente el sistema de archivos.
Para permitir comunicación y transferencia de información entre ellos, GitHub Actions ofrece varios mecanismos:

Artifacts: para compartir archivos generados (como build.log).

Cache: para reutilizar dependencias entre ejecuciones.

Outputs entre steps: para enviar datos de un step a otro dentro del mismo job.

Logs: permiten observar la salida generada por cada proceso.

En conjunto, estos mecanismos facilitan la colaboración entre jobs, similar a cómo los procesos se comunican mediante IPC (Inter-Process Communication) en un sistema operativo.