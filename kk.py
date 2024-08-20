import psutil
import os
import subprocess

def limpiar_archivos_temporales():
    rutas = [
        "~/Library/Caches/*",
        "/Library/Caches/*",
        "/System/Library/Caches/*",
        "/private/var/folders/*",
        "/private/var/tmp/*",
        "/private/tmp/*"
    ]
    for ruta in rutas:
        os.system(f"rm -rf {ruta}")

def desfragmentar_disco():
    subprocess.run(["sudo", "diskutil", "defragment", "/"])

def optimizar_memoria():
    subprocess.run(["sudo", "purge"])

def optimizar_mac():
    print("Limpiando archivos temporales...")
    limpiar_archivos_temporales()
    print("Desfragmentando disco...")
    desfragmentar_disco()
    print("Optimizando memoria...")
    optimizar_memoria()
    print("Optimización completa.")

if __name__ == "__main__":
    optimizar_mac()



def cerrar_aplicaciones_no_esenciales():
    aplicaciones = ["Safari", "Mail", "Photos", "iTunes"]
    for app in aplicaciones:
        os.system(f"osascript -e 'quit app \"{app}\"'")

def liberar_memoria():
    subprocess.run(["sudo", "purge"])

def limpiar_archivos_temporales():
    rutas = [
        "~/Library/Caches/*",
        "/Library/Caches/*",
        "/System/Library/Caches/*",
        "/private/var/folders/*",
        "/private/var/tmp/*",
        "/private/tmp/*"
    ]
    for ruta in rutas:
        os.system(f"rm -rf {ruta}")

def optimizar_cpu():
    for proc in psutil.process_iter(['pid', 'name']):
        if proc.info['name'] in ["mds", "mdworker", "mds_stores"]:
            os.system(f"sudo kill -9 {proc.info['pid']}")

def optimizar_mac():
    print("Cerrando aplicaciones no esenciales...")
    cerrar_aplicaciones_no_esenciales()
    print("Liberando memoria...")
    liberar_memoria()
    print("Limpiando archivos temporales...")
    limpiar_archivos_temporales()
    print("Optimizando uso de CPU...")
    optimizar_cpu()
    print("Optimización completa.")

if __name__ == "__main__":
    optimizar_mac()
