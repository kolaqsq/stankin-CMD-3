// server.js
const express = require('express');
const app = express();
const PORT = 3000;

// Настройки оси Y
const config = {
    min_position: -28,
    max_position: -23,
    step: 1, // шаг изменения за один запрос (в мм)
    units: "mm"
};

// Текущее состояние
let state = {
    current_position: config.min_position,
    direction: 1 // 1 = вперёд (к max), -1 = назад (к min)
};

function updatePosition() {
    const next = state.current_position + state.direction * config.step;

    // Проверка на выход за пределы
    if (next >= config.max_position) {
        state.current_position = config.max_position;
        state.direction = -1; // двигаться назад
    } else if (next <= config.min_position) {
        state.current_position = config.min_position;
        state.direction = 1; // двигаться вперёд
    } else {
        state.current_position = next;
    }
}

app.get('/cnc', (req, res) => {
    updatePosition();

    const response = {
        cnc_machine: {
            machine_id: "CNC-001",
            model: "SUE XOX 24-07",
            axes: {
                y: {
                    min_position: config.min_position,
                    max_position: config.max_position,
                    current_position: parseFloat(state.current_position.toFixed(1)),
                    units: config.units
                }
            },
            timestamp: new Date().toISOString(),
            status: "running"
        }
    };

    res.json(response);
});

app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});