// padrão commonjs

const fs = require('fs');
const path = require('path');

// Formatar número com '0' na primeira posição se necessário

function pad2(num) {
    return String(num).padStart(2, 0);
}

// função para definição de data hora no horário de execução do teste

function computeRunFolder(baseDir) {
    // prepara carimbo de data para uso futuro (CI/CD)

    if (process.env.RUN_TAG) {
        const tag = process.env.RUN_TAG.replace((/[^\w-:.]/g, '_'));
        const runDir = path.join(baseDir, tag);
        fs.mkdirSync(runDir, { recursive: true });
        return runDir;
    }

    // Obtem data hora e desmembra para gravar no arquivo

    const now = new Date();
    const yyyy = now.getFullYear();
    const MM = pad2(now.getMonth());
    const dd = pad2(now.getDate());
    const hh = pad2(now.getHours());
    const mm = pad2(now.getMinutes());
    const ss = pad2(now.getSeconds());

    // Crição das pastas 

    const runDir = path.join(baseDir, `${yyyy}`, `${MM}`, `${dd}`, `${hh}-${mm}-${ss}`);

    return runDir;
}

function ensureSubdirs(runDir) {
    const dirs = {
        runDir,
        resultsDir: path.join(runDir, 'testResults'),
        screenShotDir: path.join(runDir, 'screenshots')
    }

    Object.values(dirs).forEach(d => {
        if (!fs.existsSync(d)) {
            fs.mkdirSync(d, { recursive: true });
        }
    });

    return dirs;
}


module.exports = {
    computeRunFolder,
    ensureSubdirs
};