/* eslint-disable class-methods-use-this */
/* eslint-disable no-multi-assign */
/* eslint-disable no-console */
/**
 *
 * @module modules/storage/implementation/dummy-storrage
 *
 * @author Roman Surmanidze <lastuniverse@github.com>
 */



/**
 * Данный класс является чемто типа интерфейса. Реализации механизмов сохранения и загрузки должны
 * насследоваться от данного класса, могут переопределять методы 
 * store(name, data),  и restore(name)
 * не изменяя порядок и смысл их входных и выходных данных
 *
 * Объект данного класса реализует фоновые:
 * - сохранение данных при завершении процесса
 * - загрузки данных при старте процесса
 *
 * В реализациях, для успешного выполнения сохранения данных (в методах store(name), 
 * должны использоваться только синхронные процессы. Это
 * обусловленно спецификой работы обработчиков сигнала 'exit'
 *
 * @class      DummyStorage (name)
 */
class DummyStorage {
    /**
     * ничего не делает
     */
    constructor() {
    }

    /**
     * ничего не делает
     */
    store(name, data) {
    }

    /**
     * ничего не делает
     */
    restore(name) {
        return null;
    }
}


exports = module.exports = DummyStorage;
