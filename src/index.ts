import os from "node:os";
import cluster from "node:cluster";
import process from "node:process"; // necessário para evitar erro com 'process' no TS

const runPrimaryProcess = () => {
    // const processCount = os.cpus().length * 2;

    const processCount = 3
    console.log("Primary", process.pid, "is running");
    console.log("Forking server with", processCount, "\n");

    for (let i = 0; i < processCount; i++) {
        cluster.fork();
    }

    cluster.on("exit", (worker, code, signal) => {
        if (code !== 0 && !worker.exitedAfterDisconnect) {
            console.log("Worker", worker.process.pid, "died. Restarting...");
            cluster.fork();
        }
    });
};

const runWorkerProcess = async () => {
    await import("./app"); // 👈 extensão .js não é necessária em TS e pode causar erro
};

// cluster.isPrimary → substituído por cluster.isMaster em algumas versões
// cluster.isPrimary é válido em Node 16+, senão use cluster.isMaster

if (cluster.isPrimary || (cluster as any).isMaster) {
    runPrimaryProcess();
} else {
    runWorkerProcess();
}
