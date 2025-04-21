const fastify = require('fastify')({ logger: { level: 'error' } });
const sqlite3 = require('sqlite3').verbose();

// Создание и открытие базы данных SQLite
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error('Ошибка открытия базы данных:', err.message);
    } else {
        console.log('Подключено к базе данных SQLite.');
        // Создание таблицы, если она не существует
        db.run(`CREATE TABLE IF NOT EXISTS newt (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            status TEXT NOT NULL CHECK(status IN ('true', 'false'))
        )`), (err) => {
            if (err) {
                console.error('Ошибка при создании таблицы:', err.message);
            } else {
                console.log('Таблица tasks успешно создана или уже существует.');
            }
        }
    }
});

fastify.register(require('@fastify/cors'), {
    origin: '*', //тут можно указать конкретный домен
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
});

// Добавление задачи
fastify.post('/Todosdb', async (request, reply) => {
    const { id, name, completed } = request.body;

    if (!id || !name) {
        return reply.status(400).send({ error: 'ID и имя задачи обязательны' });
    }

    const task = { id, name, status: completed ? 'true' : 'false' }

    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO newt (id, name, status) VALUES (?, ?, ?)`, [task.id, task.name, task.status], function(err) {
            if (err) {
                return reject({ error: 'Ошибка при добавлении задачи', details: err.message });
            }
            resolve({ message: 'Задача успешно добавлена', id: task.id });
        });
    });
});

// Получение всех задач
fastify.get('/Todosdb', async (request, reply) => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM newt', [], (err, rows) => {
            if (err) {
                return reject({ error: 'Ошибка при получении задач', details: err.message });
            }
            resolve(rows);
        });
    });
});


// Удаление задачи
fastify.delete('/Todosdb/:id', async (request, reply) => {
    const { id } = request.params;

    return new Promise((resolve, reject) => {
        db.run(`DELETE FROM newt WHERE id = ?`, [id], function(err) {
            if (err) {
                return reject({ error: 'Ошибка при удалении задачи', details: err.message });
            }
            if (this.changes === 0) {
                return resolve({ message: 'Задача не найдена' });
            }
            resolve({ message: 'Задача успешно удалена' });
        });
    });
});

//Переключение статуса задачи
fastify.put('/Todosdb/:id', async (request, reply) => {
    const { id } = request.params;
    const { completed } = request.body; // Получение нового статуса задачи

    // Преобразование булева значения в строку
    const statusString = completed ? 'true' : 'false';

    return new Promise((resolve, reject) => {
        db.run('UPDATE newt SET status = ? WHERE id = ?', [statusString, id], function(err) {
            if (err) {
                return reject({ error: 'Ошибка при обновлении задачи', details: err.message });
            }
            if (this.changes === 0) {
                return resolve({ message: 'Задача не найдена' });
            }
            resolve({ message: `Задача ${id} успешно обновлена, ее новый статус: ${statusString}`});
        });
    });

});

// Запуск сервера
const start = async () => {
    try {
        await fastify.listen({ port: 3001, host: '0.0.0.0' });
        console.log('Сервер запущен');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
