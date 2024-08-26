import os
import subprocess

def free_memory():
    """Libera memoria en macOS ejecutando el comando `purge`."""
    try:
        # Ejecuta el comando `purge` para liberar cachés en macOS
        print("Liberando memoria caché...")
        result = subprocess.run(['sudo', 'purge'], check=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        # Verifica si el comando se ejecutó con éxito
        if result.returncode == 0:
            print("Memoria liberada exitosamente.")
        else:
            print("Error al intentar liberar memoria.")
            print("Código de retorno:", result.returncode)
            print("Salida:", result.stdout.decode())
            print("Error:", result.stderr.decode())
    except FileNotFoundError:
        print("El comando `purge` no se encuentra. Puede que no esté disponible en esta versión de macOS.")
    except subprocess.CalledProcessError as e:
        print("Error al ejecutar el comando `purge`.")
        print("Código de retorno:", e.returncode)
        print("Salida:", e.stdout.decode())
        print("Error:", e.stderr.decode())
    except Exception as e:
        print("Ocurrió un error inesperado:", str(e))

def main():
    """Función principal para ejecutar el script."""
    print("Iniciando liberación de memoria...")
    free_memory()

if __name__ == "__main__":
    main()
