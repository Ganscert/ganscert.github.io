import os
import subprocess
import platform
import time

def clear_cache():
    cache_dirs = [
        "~/Library/Caches",
        "/Library/Caches",
        "/System/Library/Caches"
    ]

    for cache_dir in cache_dirs:
        expanded_dir = os.path.expanduser(cache_dir)
        print(f"Limpiando cache en: {expanded_dir}")
        try:
            # Usar subprocess.run para eliminar los archivos en el directorio de caché
            subprocess.run(["rm", "-rf", f"{expanded_dir}/*"], check=True)
            print(f"Cache en {expanded_dir} limpiado exitosamente.")
        except subprocess.CalledProcessError as e:
            print(f"Error al limpiar {expanded_dir}: {e}")
        except Exception as e:
            print(f"Error inesperado al limpiar {expanded_dir}: {e}")

def close_apps(app_names):
    for app in app_names:
        print(f"Cerrando {app}...")
        try:
            # Intentar cerrar la aplicación con osascript
            subprocess.run(["osascript", "-e", f'tell application "{app}" to quit'], check=True)
            # Esperar un poco antes de intentar cerrar la siguiente aplicación
            time.sleep(2)
            print(f"{app} cerrado exitosamente.")
        except subprocess.CalledProcessError as e:
            print(f"Error al cerrar {app}: {e}")
        except Exception as e:
            print(f"Error inesperado al cerrar {app}: {e}")

def optimize_mac():
    print("Iniciando optimización de tu Mac...")
    clear_cache()
    close_apps(["Mail", "Photos", "Music", "Calendar", "Notes"])
    print("Optimización completa.")

if __name__ == "__main__":
    if platform.system() != "Darwin":
        print("Este script solo se puede ejecutar en macOS.")
    else:
        optimize_mac()
