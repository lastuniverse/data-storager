/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

/**
 * Реализация механизмов сохранения и загрузки данных в/из файлов.
 *
 * Объект данного класса реализует фоновые:
 * - сохранение данных при завершении процесса
 * - загрузки данных при старте процесса
 *
 * @class      FileStorage (name)
 */
class FileStorage {
    /**
     * Создает новый объект класса
     *
     * @param      {string}  storragePath  Путь, по которому будут сохраняться файлы-хранилища
     */
    constructor({
        storragePath,
        humanize
    }) {
        this.humanize = (typeof humanize === "boolean") ? humanize : false;
        this.path = (typeof storragePath === "string") ? storragePath : "./";
        console.log(this.path);
        if (!fs.existsSync(this.path))
            throw new Error(`"${this.path}" folder does not exist`);
    }


    /**
     * сохраняет в файл коллекцию данных с именем name (необходимо использовать
     * только синхронные механизмы)
     *
     * @param      {string}        name    наименование хранилища данных
     */
    store(name, data) {
        const fileName = path.join(this.path, name + ".json");
        const stringifyArgs = this.humanize ? [null, ' '] : [];
        fs.writeFileSync(fileName, JSON.stringify(data, ...stringifyArgs));
    }

    /**
     * читает из файла и возвращает сохраненные данные (если были сохранены) иначе возвращает ссылку
     * на текущую копию данных
     *
     * @param      {string}        name    наименование хранилища данных
     * @return     {any}  сохранаемое хранилище данных. Если данные уже были сохранены,
     * то будет содержать их восстановленную копию. Во внешнем коде использующем данные нельзя
     * работать с копией данных, так как данные из копий не будут сохраняться
     */
    restore(name) {
        const fileName = "./" + path.join(this.path, name + ".json");
        if (!fs.existsSync(fileName))
            return null;

        const data = fs.readFileSync(fileName, 'utf8');
        return JSON.parse(data);
    }
}

exports = module.exports = FileStorage;
