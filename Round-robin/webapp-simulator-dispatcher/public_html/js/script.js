    let PROCESS = [];
    let cyclesDispatcher = 0;
    let cyclesInterrupts = 0;

    function addProcess() {
    const inputElement = document.getElementById('processInput');
    const infoProcess = inputElement.value.trim();

    const validInputRegex = /^[0-9FI,T]+$/;

    if (infoProcess !== '' && validInputRegex.test(infoProcess)) {
        PROCESS.push(infoProcess);
        inputElement.value = '';
        document.getElementById("size").textContent = PROCESS.length;
    } else {
        alert("Error: La cadena contiene caracteres no permitidos. Por favor, ingrese solo números, F, I o T.");
    }
    }

    function showR() {
    const outBody = document.getElementById('outBody');
    outBody.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const Out = procesarinfoProcess(PROCESS[i]);

        const row = document.createElement('tr');
        const cellinfoProcess = document.createElement('td');
        const cellOut = document.createElement('td');

        cellinfoProcess.textContent = "P-" + i;
        cellOut.textContent = PROCESS[i];

        row.appendChild(cellinfoProcess);
        row.appendChild(cellOut);

        outBody.appendChild(row);
    }
    }

    function procesarinfoProcess(infoProcess) {
    return infoProcess.length;
    }


    function dispatcher() {
    let positionDispatcher = 100;
    const outDistpatcher = document.getElementById("outDistpatcher");
    outDistpatcher.innerHTML = '';

    for (let i = 0; i < PROCESS.length; i++) {
        const process = PROCESS[i];
        const lines = process.split(',');

        outDistpatcher.innerHTML += `<p>Executing Process P-${i}:</p>`;

        let remainingQuantum = cyclesInterrupts;

        for (let j = 0; j < lines.length; j++) {
        const line = lines[j];

        if (line === "I") {
            outDistpatcher.innerHTML += `<p>Interruption: Waiting for I/O</p>`;
        } else {
            outDistpatcher.innerHTML += `<p>Line ${j + 1}: ${line}</p>`;
            remainingQuantum--;

            if (remainingQuantum === 0 && (j + 1) < lines.length) {
            outDistpatcher.innerHTML += `<p>Context Switch: Dispatcher</p>`;
            for (let k = 0; k < cyclesDispatcher; k++) {
                outDistpatcher.innerHTML += `<p>Dispatcher ${k + 1}: ${positionDispatcher}</p>`;
                positionDispatcher++;
                if (positionDispatcher > 103) {
                positionDispatcher = 100;
                }
            }
            remainingQuantum = cyclesInterrupts; // Reiniciar el quantum después del dispatcher
            }
        }
        }
    }
    }

    
    

    function readAndDisplayData() {
    cyclesDispatcher = parseInt(prompt("Dispatcher Cycles:"));
    cyclesInterrupts = parseInt(prompt("Interrupts Cycles:"));

    document.getElementById("result").innerHTML = `
        <p>Dispatcher Cycles: ${cyclesDispatcher}</p>
        <p>Interrupts Cycles: ${cyclesInterrupts}</p>
    `;
    }
