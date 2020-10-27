const DummyStorage = require('./transports/dummy')

// хранилище всех объектов созданных от класса DummyStorage
// или классов унаследованных от DummyStorage
const storages = {};

/**
 * Создает именованное сохраняемое и восстанавливаемое хранилище данных типа data с именем name.
 *
 * @param   {string}        name        наименование хранилища данных
 * @param   {object|array}  data        пустой объект необходимого типа данных (массив или объект)
 * @param   {object}         transport  транспорт (должен содержать методы .store(name, data) и .restore(name)
 * @return  {object|array}    сохранаемое хранилище данных. Если данные уже были сохранены,
 * то будет содержать их восстановленную копию. Во внешнем коде использующем данные нельзя
 * работать копией данных, так как данные из копий не будут сохраняться
 */
function create(name, data = {}, transport) {
    if (!name || typeof name !== "string")
        throw new Error("`name` must be defined and be of type string");

    if (!storages[name]) {
        storages[name] = new Storage(name, data, transport);
    }

    return storages[name];
}

class Storage {
    /**
     * Constructs a new instance.
     */
    constructor(name, data = {}, transport) {
        this.name = name;
        this.data = data;
        this.setTransport(transport);
    }

    /**
     * Добавить транспорт
     * @param {Object} transport - объект транспорта, содержащий методы .store(name, data) и .restore(name)
     */
    setTransport(transport) {
        if (!transport || typeof transport !== "object" || typeof transport.store !== "function" || typeof transport.restore !== "function") {
            throw new Error("The transport must be an object containing the .store () and .restore () methods");
        }

        if (this.transport) {
            this.store();
            this.transport = transport;
            this.store();
        } else {
            this.transport = transport;
            this.restore();
        }
    }

    /**
     * сохраняет коллекцию данных с именем name (необходимо использовать только синхронные механизмы)
     */
    store() {
        this.transport.store(this.name, this.data);
    }


    /**
     * восстанавливает сохраненные данные (если были сохранены) 
     */
    restore() {
        const data = this.transport.restore(this.name);
        this.data = data || this.data;
    }
}
const toExport = {
    create,
    transports: {
        "Dummy": require('./transports/dummy'),
        "File": require('./transports/file')
    }
};

exports = module.exports = toExport;
